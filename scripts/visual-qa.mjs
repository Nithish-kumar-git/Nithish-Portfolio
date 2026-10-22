import { chromium } from '@playwright/test';
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const outputDir = resolve(root, 'artifacts', 'visual-qa');
const baseUrl = 'http://127.0.0.1:5173/';
const viteEntry = resolve(root, 'node_modules', 'vite', 'bin', 'vite.js');
const browsersDir = resolve(root, 'node_modules', 'playwright-core', '.local-browsers');
const server = spawn(process.execPath, [viteEntry, '--host', '127.0.0.1'], {
  cwd: root,
  stdio: ['ignore', 'pipe', 'pipe'],
  windowsHide: true,
});

let serverOutput = '';
let serverError = '';
server.stdout.on('data', (chunk) => { serverOutput += chunk; });
server.stderr.on('data', (chunk) => { serverError += chunk; });

function fail(message) {
  throw new Error(`${message}\nVite output:\n${serverOutput}\n${serverError}`);
}

async function waitForServer() {
  const deadline = Date.now() + 15_000;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) fail(`Vite exited with code ${server.exitCode}.`);
    if (/Local:\s+http:\/\/127\.0\.0\.1:5173\//.test(serverOutput)) return;
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 150));
  }
  fail('Timed out waiting for Vite at 127.0.0.1:5173.');
}

function trackPage(page, events) {
  page.on('console', (message) => {
    if (message.type() === 'error') events.consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => events.pageErrors.push(error.message));
  page.on('requestfailed', (request) => events.failedRequests.push({
    url: request.url(), error: request.failure()?.errorText ?? 'unknown',
  }));
}

async function imageState(page) {
  return page.locator('img').evaluateAll((images) => images.map((image) => ({
    src: image.getAttribute('src'), alt: image.alt,
    loaded: image.complete && image.naturalWidth > 0,
    width: image.naturalWidth, height: image.naturalHeight,
  })));
}

async function overflowState(page) {
  return page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    hasOverflow: document.documentElement.scrollWidth > document.documentElement.clientWidth,
  }));
}

async function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function openPage(browser, viewport, events) {
  const context = await browser.newContext({ viewport });
  const page = await context.newPage();
  trackPage(page, events);
  await page.goto(baseUrl, { waitUntil: 'networkidle' });
  return { context, page };
}

async function run() {
  await mkdir(outputDir, { recursive: true });
  await waitForServer();

  const events = { consoleErrors: [], pageErrors: [], failedRequests: [] };
  const chromiumDirectory = (await readdir(browsersDir, { withFileTypes: true }))
    .find((entry) => entry.isDirectory() && entry.name.startsWith('chromium-'))?.name;
  if (!chromiumDirectory) throw new Error('Project-local Playwright Chromium was not installed.');
  const chromiumPath = resolve(browsersDir, chromiumDirectory);
  const executableDirectory = (await readdir(chromiumPath, { withFileTypes: true }))
    .find((entry) => entry.isDirectory() && entry.name.startsWith('chrome-win'))?.name;
  if (!executableDirectory) throw new Error('Project-local Playwright Chromium executable was not found.');
  const browser = await chromium.launch({
    headless: true,
    executablePath: resolve(chromiumPath, executableDirectory, 'chrome.exe'),
  });
  const results = { baseUrl, screenshots: [], desktop: {}, mobile: {}, interactions: {}, reducedMotion: {}, events };

  try {
    const desktop = await openPage(browser, { width: 1440, height: 1200 }, events);
    results.desktop.images = await imageState(desktop.page);
    results.desktop.overflow = await overflowState(desktop.page);
    await assert(!results.desktop.overflow.hasOverflow, 'Desktop page has horizontal overflow.');
    await assert(results.desktop.images.every((image) => image.loaded), 'One or more desktop images failed to load.');
    await desktop.page.screenshot({ path: resolve(outputDir, 'desktop-1440.png'), fullPage: true });
    results.screenshots.push('desktop-1440.png');

    const dialogTrigger = desktop.page.locator('[data-dialog="finora-dialog"]');
    await dialogTrigger.focus();
    await dialogTrigger.press('Enter');
    await assert(await desktop.page.locator('#finora-dialog').evaluate((dialog) => dialog.open), 'Finora dialog did not open from the keyboard.');
    await desktop.page.keyboard.press('Escape');
    await assert(await dialogTrigger.evaluate((trigger) => document.activeElement === trigger), 'Dialog did not restore focus to its trigger.');
    results.interactions.dialogFocusReturn = 'passed';
    await desktop.context.close();

    const mobile = await openPage(browser, { width: 390, height: 844 }, events);
    results.mobile.images = await imageState(mobile.page);
    results.mobile.overflow = await overflowState(mobile.page);
    await assert(!results.mobile.overflow.hasOverflow, 'Mobile page has horizontal overflow.');
    await assert(results.mobile.images.every((image) => image.loaded), 'One or more mobile images failed to load.');
    await mobile.page.screenshot({ path: resolve(outputDir, 'mobile-390.png'), fullPage: true });
    results.screenshots.push('mobile-390.png');

    await mobile.page.keyboard.press('Tab');
    await assert(await mobile.page.locator('.skip-link').evaluate((link) => document.activeElement === link), 'Skip link is not first in the keyboard order.');
    await mobile.page.keyboard.press('Enter');
    await assert(await mobile.page.locator('#main-content').evaluate((main) => document.activeElement === main), 'Skip link did not move focus to main content.');
    results.interactions.skipLink = 'passed';

    const toggle = mobile.page.locator('[data-menu-toggle]');
    await toggle.focus();
    await toggle.press('Enter');
    await assert(await toggle.getAttribute('aria-expanded') === 'true', 'Mobile menu did not open from the keyboard.');
    await mobile.page.keyboard.press('Escape');
    await assert(await toggle.getAttribute('aria-expanded') === 'false', 'Mobile menu did not close with Escape.');
    await assert(await toggle.evaluate((button) => document.activeElement === button), 'Closing the mobile menu did not restore focus to its toggle.');
    results.interactions.mobileMenuEscape = 'passed';

    await toggle.press('Enter');
    const workLink = mobile.page.locator('#mobile-menu a[href="#work"]');
    await workLink.click();
    await assert(await mobile.page.locator('#work').evaluate((section) => document.activeElement === section), 'Mobile navigation did not move focus to its destination.');
    results.interactions.mobileNavigationFocus = 'passed';

    const reducedContext = await browser.newContext({ viewport: { width: 390, height: 844 }, reducedMotion: 'reduce' });
    const reducedPage = await reducedContext.newPage();
    await reducedPage.goto(baseUrl, { waitUntil: 'networkidle' });
    const reduced = await reducedPage.locator('.reveal').first().evaluate((element) => ({
      opacity: getComputedStyle(element).opacity,
      motion: matchMedia('(prefers-reduced-motion: reduce)').matches,
    }));
    await assert(reduced.motion && reduced.opacity === '1', 'Reduced-motion page leaves reveal content hidden.');
    results.reducedMotion = { ...reduced, passed: true };
    await reducedContext.close();

    results.events.consoleErrors = [...new Set(results.events.consoleErrors)];
    results.events.pageErrors = [...new Set(results.events.pageErrors)];
    results.events.failedRequests = results.events.failedRequests.filter((request, index, all) => index === all.findIndex((candidate) => candidate.url === request.url));
    await assert(results.events.consoleErrors.length === 0, `Console errors: ${results.events.consoleErrors.join('; ')}`);
    await assert(results.events.pageErrors.length === 0, `Page errors: ${results.events.pageErrors.join('; ')}`);
    await assert(results.events.failedRequests.length === 0, `Failed requests: ${results.events.failedRequests.map((request) => request.url).join(', ')}`);
    await writeFile(resolve(outputDir, 'results.json'), `${JSON.stringify(results, null, 2)}\n`);
    console.log(`Visual QA passed. Screenshots: ${results.screenshots.join(', ')}`);
  } finally {
    await browser.close();
  }
}

try {
  await run();
} finally {
  server.kill();
}
