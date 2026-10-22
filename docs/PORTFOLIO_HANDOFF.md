# Portfolio website — maintenance handoff

Updated 22 October 2026 (Asia/Calcutta). This handoff governs factual content and safe resumption of the static portfolio.

## 22 October 2026 interface redesign (not deployed)

The portfolio was redesigned locally from the clean `main` checkout at
`21a0e028f01cb1a03ce0762d826ef37b04b6c22a`. The implementation stays in the
existing static Vite/vanilla-JavaScript architecture and replaces the previous
dark, component-heavy presentation with a premium light-first interface.

- New design system: warm ivory base, pale neutral sections, deep charcoal text,
  restrained blue action color, fine borders, soft shadows and glass only on the
  fixed header / small supporting elements.
- New semantic responsive navigation: desktop links, an accessible mobile menu,
  Escape-to-close behavior, focus return and visible keyboard focus styles.
- Work cards distinguish live demos, source repositories and local-only work;
  project notes use native dialogs. FWMS, Finora and Chit Fund use genuine
  repository-provided captures with intrinsic dimensions and descriptive alt
  text. The RAG repository includes no authentic screenshot and its local
  service was not safe to start here, so it is clearly shown as a labelled
  workflow representation rather than a claimed running UI.
- Read-only checks confirmed `200` responses for the Finora, FWMS and Chit Fund
  public URLs, plus current `main` refs for all four source repositories. RAG
  remains source-only, without a public deployment.
- `npm ci` and `npm run build` completed in this portfolio checkout. The build
  produced the static Vite assets successfully. A local browser automation
  endpoint could not reach the machine-local dev server, so desktop and mobile
  visual review remains a manual pre-release check; no deployment was started.
- Focused static QA corrected two mobile accessibility details: project/contact
  text actions now have 44px minimum touch targets, and following a mobile-menu
  link preserves the destination focus instead of returning it to the menu
  button. The browser-rendering limitation above still applies.
- Final QA also confirmed that no local renderer is available in this execution
  environment: Playwright, Puppeteer and a DevTools client are absent, while an
  installed headless Chrome can initialize an isolated profile but emits no
  local-server screenshots. This is an environment limitation, not rendered
  approval; retain the manual desktop/mobile review before release.
- A project-local Playwright runner now exists at `scripts/visual-qa.mjs` and is
  available as `npm run qa:visual`. It starts Vite, generates 1440px/390px
  screenshots, checks loaded images, horizontal overflow, console/request
  failures, keyboard skip-link/menu/dialog behavior and reduced motion. The
  pinned `@playwright/test` development dependency and its browser setup are
  described in README. Its first run in this sandbox reached Vite's ready state
  and launched bundled Chromium, but navigation to `127.0.0.1:5173` failed with
  `net::ERR_NETWORK_ACCESS_DENIED`; no screenshots or rendered approval were
  produced. This must be rerun in a local environment where Chromium is allowed
  to access loopback before a release.

Before a push to `main`, review the local commit/diff, open the Vite preview at
desktop and mobile widths, confirm keyboard menu and dialog behavior, and then
verify the Vercel deployment separately. Do not infer deployment success from a
local build or from this documentation.

## 22 October 2026 deployment verification

This bounded, read-only verification did not change Vercel settings, deploy,
push, install dependencies, or touch any linked-project repository.

| Item | Verified value |
| --- | --- |
| Active branch / HEAD | `main` / `3f34599d3dcf1931a963e2aa5afc27612d672946` |
| Remote synchronization | `origin/main` at the same commit; zero ahead, zero behind |
| Checked worktree | Clean; no modified or untracked files |
| Vercel production deployment | `READY`, `dpl_G4jPZ9v8uZEBvAzSdfuxYSGp6PES`, target `production` |
| Deployment source | Git `main` at `3f34599d3dcf1931a963e2aa5afc27612d672946` |
| Public URL check | `https://nithish-portfolio-seven.vercel.app/` returned `200` |
| Provider project metadata | Vite framework, configured Node `24.x`; no local Vercel manifest or CI workflow is present |

The live HTML identifies the site as **Nithish Kumar V — Analytics Systems
Builder**, uses `/favicon.svg`, and presents the current Finora, FWMS, Chit Fund
Analytics and Evidence-Grounded RAG descriptions. The Finora **Live App** link
targets the Netlify frontend (`scintillating-donut-a597ff.netlify.app`), not the
Vercel API host. Read-only requests confirmed `200` responses for the favicon,
portrait, FWMS, Finora and Chit Fund representative images. No resume retrieval
was attempted because it is not needed for deployment verification.

The production deployment is therefore current with the documentation/content
commit `3f34599d`; the prior `9e4a469f` deployment is an available rollback
candidate, not the live version. `node_modules` is absent in this checkout, so a
local `npm run build` was intentionally **not run** and no dependency install was
performed. Vercel's `READY` production metadata confirms its hosted build, but it
does not replace a repeatable local-build check.

README was updated to correct its public deployment SHA and verification date.
Before any future push, run `npm ci` and `npm run build` in a clean disposable
checkout, review the exact diff, then verify the resulting Vercel deployment SHA,
state and public page. With no pending content change, the portfolio may remain
frozen after this documentation update is published.

## Repository and Git state

| Item | Verified value |
| --- | --- |
| Repository | <https://github.com/Nithish-kumar-git/Nithish-Portfolio> |
| Authoritative checkout for this closeout | `C:\Users\itsni\OneDrive\Documents\ChatGPT\project collections\Nithish-Portfolio` |
| Default / active branch | `main` / `main` |
| Documentation base commit | `9e4a469f152803f1779f02edb74e8a7551914caa` |
| Base synchronization | Local `main` matched `origin/main`; zero ahead and zero behind |
| Base working tree | Clean; no modified or untracked user work |

The documentation/content commit containing this file cannot embed its own hash. After commit, obtain it with `git log -1 --format=%H -- docs/PORTFOLIO_HANDOFF.md` and compare `git ls-remote origin refs/heads/main`. Never reset, clean, stash, force-push or rewrite history.

## Purpose, architecture and assumptions

The site presents selected analytics, full-stack and applied-AI work. It is a static Vite application using `index.html`, modular CSS under `src/design_system/`, vanilla JavaScript in `src/main.js`, and static assets under `public/` and `src/assets/`.

The verified environment assumption is a normal Node.js/npm workflow on Windows or another Vite-supported OS. There are no project environment-variable names, backend services, database connections or credential requirements.

## Setup, build and run

```sh
npm ci
npm run dev
npm run build
npm run preview
```

No automated test or lint script is declared. For content-only changes, run the production build and focused local link/image checks; do not invent a passing test suite.

## Deployment state

| Item | Verified value |
| --- | --- |
| URL | <https://nithish-portfolio-seven.vercel.app/> |
| Vercel state | `READY`, production |
| Deployed commit before closeout | `9e4a469f152803f1779f02edb74e8a7551914caa` |
| Deployment ID | `dpl_5K8fUi4R7T8nq4mnv2NyJnHgTmc3` |
| HTTP check | `200` on 21 October 2026 |

A push to `main` can create a new Vercel deployment through the existing Git integration. Treat a successful push and a successful deployment as separate states and verify deployment metadata after pushing.

## Factual-content boundary

- Finora links must use the Netlify frontend for the live app; the Vercel root is the backend/API, not the interactive frontend.
- Finora’s public demo is synthetic. Personal cloud synchronization remains incomplete.
- FWMS has faculty, coordinator and HOD roles; no separately enforced Admin role is claimed.
- FWMS recruiter-demo and institutional paths are distinct. Do not claim institutional adoption, production readiness, or that local repair commits are deployed.
- Chit Fund Analytics must not be called production-ready while its documented integrity/concurrency blockers remain.
- Evidence-Grounded RAG is a local demo with no public deployment. Mock evaluation is not live Gemini/pgvector proof, and citation integrity is not semantic entailment.

## Validation evidence

The Vercel metadata and public HTTP result above were checked live. Application repositories supplied the factual status. This closeout does not rerun their test suites and does not turn historical evidence into fresh verification.

The portfolio production build and local reference checks must pass before publishing this content correction. Check every relative image referenced by `index.html` and `README.md`; verify the four public project/repository URLs separately.

## Next action, approvals and freeze decision

Exact next action after any content push: verify the Vercel production deployment SHA/state and open the public site to confirm the Finora frontend link and revised FWMS/Chit/RAG wording.

Explicit approval is required before changing hosting settings, domains, analytics, external accounts, credentials, resume content, or application code in the linked projects. Never infer a production claim from a repository README alone.

After the content correction is built, pushed and verified, the portfolio can be **frozen**. Reopen only for a factual correction, verified new project milestone or intentional design change.
