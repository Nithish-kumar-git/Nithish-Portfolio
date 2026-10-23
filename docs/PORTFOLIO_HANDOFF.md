# Portfolio website — maintenance handoff

Updated 22 October 2026 (Asia/Calcutta). This handoff governs factual content and safe resumption of the static portfolio.

## Local luxury refinement — 23 October 2026 (not pushed or deployed)

- The refinement is isolated on local branch `feature/luxury-education-projects`,
  created from the clean, verified release tip `b00aa39`. `main`, `origin/main`
  and the Vercel production site were not changed.
- The light-first visual system now uses warm ivory, charcoal and restrained
  champagne-bronze accents. It retains the existing portrait and authentic
  FWMS, Finora and Chit Fund dashboard captures; the source-only RAG project
  remains a clearly labelled workflow representation rather than a fabricated
  product screenshot.
- A semantic Education section records MCA — Hindustan Institute of Technology
  & Science, Chennai — CGPA 8.96 / 10, expected 2026; BCA — Hindustan College
  of Arts & Science, Chennai — CGPA 7.96 / 10, 2024; HSC — AEHSS-2, Chennai —
  85.86%, 2021; and SSC — AECS-2, Chennai — 80.40%, 2019. The included resume
  was visually checked as the authority; it resolves the former page conflict
  by confirming 8.96 rather than 8.97 for the MCA.
- Supporting project cards are now a responsive, scroll-snap carousel with
  labelled previous/next buttons, keyboard Left/Right operation and native
  touch scrolling. It has no autoplay. The visual QA runner exercises this
  behaviour in addition to desktop/mobile screenshots, lazy image loading,
  overflow, hover/focus, skip link, mobile-menu Escape/focus return, dialog
  focus return, reduced motion, console errors and failed requests.
- Local Playwright QA captured and visually reviewed ignored
  `artifacts/visual-qa/desktop-1440.png` and `mobile-390.png` on this branch.
  It recorded no horizontal overflow, console errors, page errors or failed
  requests; all portrait and project images loaded with HTTP 200 after native
  lazy-loading was triggered.
- Final pre-release QA repeated the rendered review at 1440px and 390px after
  a clean `npm ci`. It passed pointer, keyboard and touch activation for the
  project rail, hover/focus, skip link, dialog focus return, mobile-menu
  Escape/focus return and reduced motion. The four linked public destinations
  (FWMS, Finora, Chit Fund Analytics and the Evidence-Grounded RAG source)
  each returned HTTP 200 in a read-only check.
- Release checklist discrepancy: the included resume is the available
  authoritative source and states a BCA CGPA of **7.96 / 10**. A separate
  release request expected 8.20 / 10. The feature branch deliberately keeps
  7.96 and no value was invented. Resolve that factual conflict with an
  updated authoritative source or explicit approval before an intentional
  production release that must claim 8.20.

## Release verification — 23 October 2026

- The reviewed redesign and security update were pushed to `origin/main` as
  `e56aee942f2de30affa8ad6f47bf321bd3e0c809`; the remote ref was verified to
  match exactly after the push.
- Vercel production deployment `dpl_88bhcwSa6Fjdm8WFfhrhdVik29fC` is `READY`
  for that exact commit. The public production URL
  `https://nithish-portfolio-seven.vercel.app/` was inspected read-only in
  desktop Chrome and at a 390px viewport.
- The live smoke check confirmed the light-first redesign, HTTP `200` responses
  for the homepage and representative images, loaded portrait/FWMS/Finora/Chit
  screenshots, no horizontal overflow, working mobile-menu Escape behavior,
  and no captured browser or request errors.

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
- A clean `npm ci`, `npm run build`, JavaScript syntax checks and `git diff
  --check` completed successfully. Rendered local QA reviewed the desktop and
  mobile redesign, so visual review is no longer an outstanding pre-release
  limitation.
- The development-only Vite toolchain was updated from `8.0.16` to `8.1.6` to
  remediate the prior audit findings. It resolves patched `postcss@8.5.31`,
  `nanoid@3.3.20` and `source-map-js@1.2.2`; a follow-up `npm audit` reported
  zero vulnerabilities. The dependency update passed clean installation,
  production build and rendered visual QA.
- A project-local Playwright runner exists at `scripts/visual-qa.mjs` and is
  available as `npm run qa:visual`. It checks loopback capability before
  starting Vite, generates 1440px/390px screenshots when permitted, and checks
  loaded images, horizontal overflow, console/request failures, keyboard
  skip-link/menu/dialog behavior and reduced motion. It records child-process
  lifecycle events, Vite stdout/stderr, and port checks in the ignored
  `artifacts/visual-qa/diagnostics.json` file.
- A normal local PowerShell run completed the Playwright QA against the local
  light-first redesign. It generated and reviewed the ignored
  `artifacts/visual-qa/desktop-1440.png` and `mobile-390.png` screenshots.
  All four genuine images returned HTTP `200`; Finora and Chit Fund begin as
  native lazy images outside the 390px viewport and load correctly after the
  runner scrolls them into view. Both viewports have no horizontal overflow,
  and the run recorded no console errors, page errors or failed requests.
- The same run passed dialog focus return, skip-link focus, mobile-menu Escape
  focus return, mobile-navigation destination focus and reduced-motion checks.
  The runner now strips ANSI color codes from Vite readiness output, preserves
  partial results on failures, and scrolls reveal sections before full-page
  capture. `main` and mobile-menu anchor destinations are programmatically
  focusable, fixing the two confirmed focus defects. The sandbox loopback
  restriction remains environment-specific and is not evidence against this
  successful local run.

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
