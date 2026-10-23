# Portfolio website — maintenance handoff

Updated 22 October 2026 (Asia/Calcutta). This handoff governs factual content and safe resumption of the static portfolio.

## Detailed case studies — 23 October 2026 (local release candidate)

- `case-study.html` is a separately emitted Vite entry. It loads directly with
  `?project=fwms`, `finora`, `chit` or `rag`; the homepage cards link to those
  URLs while retaining concise quick-overview dialogs.
- Asset/evidence inventory: FWMS uses four genuine recruiter-demo captures;
  Finora uses six genuine synthetic-household captures; Chit Fund Analytics
  uses three genuine app captures. Every capture is 1920×1080. RAG has no
  verified UI capture in this checkout and therefore renders an explicitly
  labelled implementation flow, not an invented gallery. Full provenance and
  known gaps are in `docs/CASE_STUDY_AUDIT.md`.
- Case-study content describes source-supported workflows, stacks, architecture,
  testing evidence, trade-offs and limits. It preserves the isolated FWMS
  recruiter-demo URL and source URL, Finora’s synthetic/device-local boundary,
  Chit Fund’s review-required boundary, and RAG’s unverified live-integration
  and no-public-deployment boundary.
- Gallery interactions include prior/next controls, thumbnails, Arrow-key
  navigation, touch-friendly controls, captions, descriptive main-image alt
  text and a native-dialog lightbox with Escape and focus return. Gallery images
  use `height:auto` plus a deliberate 16:9 frame after a real 390px review found
  the HTML height attribute had produced an oversized stage.
- Verified locally with system Chrome against the project-owned loopback Vite
  server: desktop 1440px, tablet 768px and mobile 390px had no horizontal
  overflow; all gallery assets loaded; FWMS/Finora/Chit gallery next/keyboard/
  thumbnail/lightbox checks passed; FWMS mobile touch passed; all four direct
  case-study URLs loaded; existing skip-link, dialog, mobile-menu, project-rail
  and reduced-motion checks still passed. No console errors, page errors or
  failed requests were recorded. The reviewed ignored screenshots include
  `case-fwms-desktop-1440.png`, `case-finora-desktop-1440.png`,
  `case-chit-desktop-1440.png`, `case-rag-desktop-1440.png` and
  `gallery-fwms-mobile-390.png` under `artifacts/visual-qa/`.
- `npm run build`, JavaScript syntax checks, `git diff --check` and `npm audit`
  passed; the audit reported zero vulnerabilities. This candidate is local only:
  it has not been committed, pushed or deployed. Before release, review the
  exact diff, confirm `origin/main` remains at the reviewed base, then verify
  the Vercel deployment’s Git commit and live case-study URLs.

## Project showcase refinement — 23 October 2026 (released)

- The FWMS capture is a genuine 1920×1080 recruiter-demo dashboard image. Its
  apparent left-side clipping was caused by the featured card’s media column
  stretching to the height of adjacent copy and applying `object-fit: cover`.
  The revised featured stage uses `object-fit: contain`, preserving the full
  screenshot without stretching it.
- Supporting projects retain the existing accessible scroll-snap rail: desktop
  shows three aligned cards, tablet shows two with an intentional next-card
  peek, and mobile exposes one touch-scrollable card at a time. Previous/next,
  keyboard arrow and touch-control coverage remains in the QA runner.
- A concise Certifications section restores only **Cloud Computing
  Fundamentals — NPTEL (2025)**. The bundled resume is the available evidence;
  there is no standalone certificate file or public verification URL, so no
  credential ID, score, date, image or external verification link is claimed.
- The local Chrome fallback completed visual QA at 1440px, 768px and 390px:
  all images loaded, the FWMS presentation computed as `contain`, no
  horizontal overflow occurred, and no console, page or request errors were
  captured. It also passed skip-link, native-dialog focus return, mobile-menu
  Escape/focus return, carousel pointer/keyboard/touch and reduced-motion
  checks. The ignored screenshot evidence is in
  `artifacts/visual-qa/desktop-1440.png`, `tablet-768.png` and
  `mobile-390.png`.
- The refinement passed `npm run build`, JavaScript syntax checks,
  `git diff --check` and `npm audit` (zero vulnerabilities).
- Application commit `818abc23e07b26091e91a12a67834ba0655dbcb3` was pushed
  normally to `main`. Vercel production deployment
  `dpl_8n2A2NeR1UZJKx9x41AYzNMnxpqr` reached `READY`, is Git-sourced from
  that exact commit, and is assigned to
  `https://nithish-portfolio-seven.vercel.app/`.
- A read-only live desktop/mobile smoke test confirmed no horizontal overflow,
  the contained FWMS dashboard, the certification section, matching FWMS
  recruiter-demo/source links in the card and native dialog, mobile-menu
  Escape/focus return, and no observed console or failed-network requests.

## Production release — 23 October 2026

- Application release commit `3df3207be00732112601f649dc902f55d24d5a28` was
  fast-forwarded to `main` and pushed normally; no history was rewritten.
- Vercel production deployment `dpl_9F4dgySNFQ2be4fT96r75cDQuWAT` is `READY`,
  Git-sourced from that exact commit, and assigned to
  `https://nithish-portfolio-seven.vercel.app/`.
- Read-only production smoke testing opened the homepage, project captures and
  mobile navigation. The menu opened, Escape returned focus to its toggle, and
  the live Education section visibly displayed BCA CGPA 8.20 / 10. The local
  1440px/390px suite had already confirmed loaded images, no horizontal
  overflow, carousel pointer/keyboard/touch controls, skip-link and dialog
  focus behavior, reduced motion, and no console/page/network errors.
- The release passed `npm ci`, production build, JavaScript syntax checks,
  `git diff --check`, `npm audit` with zero vulnerabilities, and local visual
  QA. The bundled resume remains intentionally unchanged: it records BCA 7.96
  / 10, while the user-confirmed portfolio value is 8.20 / 10. A marksheet or
  transcript is still required before changing the resume.

## FWMS recruiter-demo link audit — 23 October 2026 (released)

- The featured FWMS card and its project dialog now use the public recruiter-demo
  destination: <https://fwms-recruiter-demo.vercel.app/>. The source link remains
  <https://github.com/Nithish-kumar-git/fwms-workload-system>.
- The public recruiter demo is a separately hosted synthetic-data experience with
  faculty, timetable-coordinator and HOD workflows. It uses its dedicated demo
  backend and must not be represented as the institutional application, evidence
  of institutional adoption, or a production-readiness claim.
- The project card no longer says that the isolated demo rollout is pending. The
  link/content change was released in `1bd534cd8a58215a9b66316ccb8c994cbb122643`;
  Vercel production deployment `dpl_E9scdChgE74NYPJ5M8L2gSidseA6` reached `READY`
  for that exact Git commit and was assigned to
  `https://nithish-portfolio-seven.vercel.app/`. It does not alter the FWMS
  backend, institutional frontend or any provider setting.
- This local content audit passed `npm ci` (zero vulnerabilities), `npm run
  build`, JavaScript syntax checks and `git diff --check`. The stock
  `npm run qa:visual` runner reached its local Vite server and completed its
  desktop image/overflow/hover/focus checks, but the freshly installed bundled
  Chromium closed during screenshot capture. A separate same-machine run using
  the installed Chrome captured and visually reviewed
  `artifacts/visual-qa/desktop-1440-system-chrome-revealed.png` and
  `mobile-390-system-chrome-revealed.png`: all project images loaded, no
  horizontal overflow or browser errors occurred, the FWMS CTA used the recruiter
  demo URL, and no rendered link used the institutional frontend URL. This is
  visual evidence for the content change, not a replacement claim that the full
  Playwright interaction suite completed in this audit. The same fallback also
  verified the FWMS dialog CTA and focus return, skip link, mobile-menu
  Escape/focus return and reduced-motion behavior.

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
  of Arts & Science, Chennai — CGPA 8.20 / 10, 2024; HSC — AEHSS-2, Chennai —
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
- Academic-record discrepancy: the user explicitly confirmed the portfolio BCA
  CGPA is **8.20 / 10** for release. The bundled resume still states **7.96 /
  10** and was deliberately not altered because no authoritative
  marksheet/transcript was supplied. Update the resume only after that source
  is available; until then, the portfolio and resume values differ by record.

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
- FWMS recruiter-demo and institutional paths are distinct. The isolated recruiter
  demo is separately released; do not claim institutional adoption or production
  readiness, and do not conflate its reviewed static-artifact source with the
  institutional deployment.
- Chit Fund Analytics must not be called production-ready while its documented integrity/concurrency blockers remain.
- Evidence-Grounded RAG is a local demo with no public deployment. Mock evaluation is not live Gemini/pgvector proof, and citation integrity is not semantic entailment.

## Validation evidence

The Vercel metadata and public HTTP result above were checked live. Application repositories supplied the factual status. This closeout does not rerun their test suites and does not turn historical evidence into fresh verification.

The portfolio production build and local reference checks must pass before publishing this content correction. Check every relative image referenced by `index.html` and `README.md`; verify the four public project/repository URLs separately.

## Next action, approvals and freeze decision

Exact next action after any content push: verify the Vercel production deployment SHA/state and open the public site to confirm the Finora frontend link and revised FWMS/Chit/RAG wording.

Explicit approval is required before changing hosting settings, domains, analytics, external accounts, credentials, resume content, or application code in the linked projects. Never infer a production claim from a repository README alone.

After the content correction is built, pushed and verified, the portfolio can be **frozen**. Reopen only for a factual correction, verified new project milestone or intentional design change.
