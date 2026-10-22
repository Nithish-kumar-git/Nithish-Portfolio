import { chromium } from '@playwright/test';
import { mkdir, readdir, writeFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import net from 'node:net';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const outputDir = resolve(root, 'artifacts', 'visual-qa');
const baseUrl = 'http://127.0.0.1:5173/';
const viteEntry = resolve(root, 'node_modules', 'vite', 'bin', 'vite.js');
const browsersDir = resolve(root, 'node_modules', 'playwright-core', '.local-browsers');
const ansiPattern = /\u001B\[[0-?]*[ -/]*[@-~]/g;
let server;
let serverOutput = '';
let serverError = '';
const diagnostics = {
  baseUrl,
  startedAt: new Date().toISOString(),
  lifecycle: [],
  socketChecks: [],
};

function recordLifecycle(event, details = {}) {
  diagnostics.lifecycle.push({ at: new Date().toISOString(), event, ...details });
}

function probePort(port = 5173) {
  return new Promise((resolveProbe) => {
    const socket = net.createConnection({ host: '127.0.0.1', port });
    const finish = (state, details = {}) => {
      socket.destroy();
      resolveProbe({ state, ...details });
    };
    socket.setTimeout(1_000);
    socket.once('connect', () => finish('listening'));
    socket.once('timeout', () => finish('timed-out'));
    socket.once('error', (error) => finish('unavailable', { code: error.code, message: error.message }));
  });
}

function verifyLoopbackCapability() {
  return new Promise((resolveCheck) => {
    const testServer = net.createServer();
    let client;
    let settled = false;
    const finish = (result) => {
      if (settled) return;
      settled = true;
      clearTimeout(timeout);
      client?.destroy();
      if (testServer.listening) {
        testServer.close(() => resolveCheck(result));
      } else {
        resolveCheck(result);
      }
    };
    const timeout = setTimeout(() => finish({ state: 'timed-out' }), 1_500);
    testServer.once('error', (error) => finish({ state: 'bind-failed', code: error.code, message: error.message }));
    testServer.listen(0, '127.0.0.1', () => {
      const address = testServer.address();
      client = net.createConnection({ host: '127.0.0.1', port: address.port });
      client.once('connect', () => finish({ state: 'available', address }));
      client.once('error', (error) => finish({
        state: 'connection-failed', address, code: error.code, message: error.message,
      }));
    });
  });
}

function processState() {
  if (!server) return { started: false };
  let alive = false;
  try {
    process.kill(server.pid, 0);
    alive = true;
  } catch (error) {
    if (error.code !== 'ESRCH') throw error;
  }
  return { pid: server.pid, alive, exitCode: server.exitCode, signalCode: server.signalCode };
}

async function captureSocketState(stage) {
  const socket = await probePort();
  diagnostics.socketChecks.push({ at: new Date().toISOString(), stage, socket, process: processState() });
  return socket;
}

async function writeDiagnostics(error) {
  if (error) diagnostics.failure = { message: error.message, stack: error.stack };
  diagnostics.serverOutput = serverOutput;
  diagnostics.serverError = serverError;
  diagnostics.finishedAt = new Date().toISOString();
  await mkdir(outputDir, { recursive: true });
  await writeFile(resolve(outputDir, 'diagnostics.json'), `${JSON.stringify(diagnostics, null, 2)}\n`);
}

function startServer() {
  server = spawn(process.execPath, [viteEntry, '--host', '127.0.0.1', '--port', '5173', '--strictPort'], {
    cwd: root,
    stdio: ['ignore', 'pipe', 'pipe'],
    windowsHide: true,
  });
  recordLifecycle('spawn-requested', { pid: server.pid, args: server.spawnargs });
  server.once('spawn', () => recordLifecycle('spawn', processState()));
  server.once('error', (error) => recordLifecycle('error', { code: error.code, message: error.message }));
  server.once('exit', (code, signal) => recordLifecycle('exit', { code, signal }));
  server.once('close', (code, signal) => recordLifecycle('close', { code, signal }));
  server.stdout.on('data', (chunk) => { serverOutput += chunk; });
  server.stderr.on('data', (chunk) => { serverError += chunk; });
}

function fail(message) {
  throw new Error(`${message}\nVite output:\n${serverOutput}\n${serverError}`);
}

function plainServerOutput() {
  return serverOutput.replace(ansiPattern, '');
}

async function waitForServer() {
  const deadline = Date.now() + 15_000;
  let readyAt;
  while (Date.now() < deadline) {
    if (server.exitCode !== null || server.signalCode !== null) {
      await captureSocketState('vite-exited');
      fail(`Vite exited with code ${server.exitCode} and signal ${server.signalCode}.`);
    }
    if (/Local:\s+http:\/\/127\.0\.0\.1:5173\//.test(plainServerOutput())) {
      readyAt ??= Date.now();
      const socket = await captureSocketState('vite-reported-ready');
      if (socket.state === 'listening') return;
      if (Date.now() - readyAt >= 1_000) {
        fail(`Vite reported ready but port 5173 is not accepting connections (${socket.code ?? socket.state}).`);
      }
    }
    await new Promise((resolveDelay) => setTimeout(resolveDelay, 150));
  }
  await captureSocketState('wait-timeout');
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
  page.on('response', (response) => {
    if (response.request().resourceType() === 'image') {
      events.imageResponses.push({ url: response.url(), status: response.status(), statusText: response.statusText() });
    }
  });
}

async function imageState(page) {
  return page.locator('img').evaluateAll((images) => images.map((image) => ({
    src: image.getAttribute('src'), currentSrc: image.currentSrc, alt: image.alt,
    loaded: image.complete && image.naturalWidth > 0,
    naturalWidth: image.naturalWidth, naturalHeight: image.naturalHeight,
    loading: image.loading,
    inViewport: (() => {
      const rect = image.getBoundingClientRect();
      return rect.bottom > 0 && rect.top < innerHeight && rect.right > 0 && rect.left < innerWidth;
    })(),
  })));
}

async function loadImages(page) {
  const images = page.locator('img');
  const count = await images.count();
  for (let index = 0; index < count; index += 1) {
    const image = images.nth(index);
    await image.scrollIntoViewIfNeeded();
    await image.evaluate((element) => new Promise((resolveImage) => {
      if (element.complete) {
        resolveImage();
        return;
      }
      element.addEventListener('load', resolveImage, { once: true });
      element.addEventListener('error', resolveImage, { once: true });
    }));
  }
  await page.evaluate(() => window.scrollTo(0, 0));
  return imageState(page);
}

async function revealPage(page) {
  const elements = page.locator('.reveal');
  const count = await elements.count();
  for (let index = 0; index < count; index += 1) {
    await elements.nth(index).scrollIntoViewIfNeeded();
  }
  await page.waitForTimeout(100);
  await page.evaluate(() => window.scrollTo(0, 0));
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
  diagnostics.loopbackControl = await verifyLoopbackCapability();
  if (diagnostics.loopbackControl.state !== 'available') {
    fail(`This runtime cannot connect to its own loopback server (${diagnostics.loopbackControl.code ?? diagnostics.loopbackControl.state}).`);
  }
  const portBeforeStart = await captureSocketState('before-vite-start');
  if (portBeforeStart.state === 'listening') {
    fail('Port 5173 already accepts connections before Visual QA starts; the runner will not replace that process.');
  }
  startServer();
  await waitForServer();

  const events = { consoleErrors: [], pageErrors: [], failedRequests: [], imageResponses: [] };
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
    results.desktop.initialImages = await imageState(desktop.page);
    results.desktop.images = await loadImages(desktop.page);
    await revealPage(desktop.page);
    results.desktop.overflow = await overflowState(desktop.page);
    await assert(!results.desktop.overflow.hasOverflow, 'Desktop page has horizontal overflow.');
    await assert(results.desktop.images.every((image) => image.loaded), 'One or more desktop images failed to load.');
    await assert(await desktop.page.locator('#education').count() === 1, 'Education section is missing.');
    await assert(await desktop.page.getByText('CGPA 8.96 / 10', { exact: true }).count() === 1, 'Verified MCA CGPA is missing.');
    await desktop.page.locator('.project--featured').hover();
    await desktop.page.locator('[data-dialog="fwms-dialog"]').focus();
    results.interactions.projectCardHoverAndFocus = 'passed';
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
    results.mobile.initialImages = await imageState(mobile.page);
    results.mobile.images = await loadImages(mobile.page);
    await revealPage(mobile.page);
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

    const projectTrack = mobile.page.locator('[data-carousel-track]');
    const carouselNext = mobile.page.locator('[data-carousel-next]');
    await projectTrack.scrollIntoViewIfNeeded();
    const carouselBefore = await projectTrack.evaluate((track) => ({
      scrollLeft: track.scrollLeft, scrollWidth: track.scrollWidth, clientWidth: track.clientWidth,
    }));
    await assert(carouselBefore.scrollWidth > carouselBefore.clientWidth, 'Mobile project carousel is not horizontally scrollable.');
    await carouselNext.focus();
    await carouselNext.press('Enter');
    await mobile.page.waitForTimeout(350);
    const carouselAfter = await projectTrack.evaluate((track) => track.scrollLeft);
    await assert(carouselAfter > carouselBefore.scrollLeft, 'Mobile project carousel next control did not advance.');
    await projectTrack.focus();
    await projectTrack.press('ArrowRight');
    await mobile.page.waitForTimeout(350);
    await assert(await projectTrack.evaluate((track) => track.scrollLeft) >= carouselAfter, 'Mobile project carousel did not respond to ArrowRight.');
    results.interactions.mobileProjectCarousel = 'passed';

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
    results.events.imageResponses = results.events.imageResponses.filter((response, index, all) => index === all.findIndex((candidate) => candidate.url === response.url));
    await assert(results.events.consoleErrors.length === 0, `Console errors: ${results.events.consoleErrors.join('; ')}`);
    await assert(results.events.pageErrors.length === 0, `Page errors: ${results.events.pageErrors.join('; ')}`);
    await assert(results.events.failedRequests.length === 0, `Failed requests: ${results.events.failedRequests.map((request) => request.url).join(', ')}`);
    await writeFile(resolve(outputDir, 'results.json'), `${JSON.stringify(results, null, 2)}\n`);
    console.log(`Visual QA passed. Screenshots: ${results.screenshots.join(', ')}`);
  } catch (error) {
    results.failure = { message: error.message, stack: error.stack };
    results.events.consoleErrors = [...new Set(results.events.consoleErrors)];
    results.events.pageErrors = [...new Set(results.events.pageErrors)];
    results.events.failedRequests = results.events.failedRequests.filter((request, index, all) => index === all.findIndex((candidate) => candidate.url === request.url));
    results.events.imageResponses = results.events.imageResponses.filter((response, index, all) => index === all.findIndex((candidate) => candidate.url === response.url));
    await writeFile(resolve(outputDir, 'results.json'), `${JSON.stringify(results, null, 2)}\n`);
    throw error;
  } finally {
    await browser.close();
  }
}

let runError;
try {
  await run();
} catch (error) {
  runError = error;
  if (server) await captureSocketState('run-failure');
  throw error;
} finally {
  if (server && server.exitCode === null && server.signalCode === null) {
    recordLifecycle('termination-requested', processState());
    server.kill();
  }
  await new Promise((resolveDelay) => setTimeout(resolveDelay, 250));
  if (server) await captureSocketState('after-cleanup');
  await writeDiagnostics(runError);
}
