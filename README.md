# Nithish Kumar V — Portfolio

A static portfolio for data analytics, full-stack engineering and applied AI work. It is built with semantic HTML, CSS, vanilla JavaScript and Vite, and deployed on Vercel.

## Interface refresh

The current interface is a light-first, editorial portfolio with warm-neutral
surfaces, restrained champagne-bronze accents and selective frosted navigation. It retains
the static Vite architecture while adding responsive navigation, keyboard-safe
project dialogs, a visible focus treatment, reduced-motion support and stable
image dimensions.

The current local refinement branch adds a concise Education section and a
user-controlled, scroll-snap rail for the three supporting project cards. The
rail has labelled previous/next controls, keyboard Left/Right support and touch
scrolling; it does not autoplay. Academic values were checked against the
included resume: the MCA CGPA is **8.96 / 10** (expected 2026), not the former
8.97 value shown in an earlier hero summary.

The work section uses genuine project imagery where it is available:

- FWMS: HOD recruiter-demo dashboard capture.
- Finora: synthetic-household production dashboard capture.
- Chit Fund Analytics: illustrative dashboard capture using fictional data.
- Evidence-Grounded RAG: no screenshot is represented as a product capture. It
  is a local-only demo with no public deployment, so its card uses a clearly
  labelled workflow representation instead.

Project links are intentionally explicit: live applications are labelled as
such, repository links are labelled **Source**, and the RAG project has only a
source link. Claims and release limitations are maintained in the project cards
and dialogs rather than being implied by visual polish.

[![Portfolio](https://img.shields.io/badge/Live_portfolio-Vercel-0EA5E9?logo=vercel)](https://nithish-portfolio-seven.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Nithish--kumar--git-181717?logo=github)](https://github.com/Nithish-kumar-git)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-nithishkumar246-0A66C2?logo=linkedin)](https://www.linkedin.com/in/nithishkumar246/)

## Featured work

### Faculty Workload Management System

FWMS implements faculty preference, semester/cycle and workload-allocation workflows for three enforced application roles: faculty, timetable coordinator and HOD. The public recruiter demo uses synthetic, isolated data and is distinct from the institutional configuration.

- Recruiter/institutional frontend entry: <https://fwms-workload-system.vercel.app/>
- Source: <https://github.com/Nithish-kumar-git/fwms-workload-system>
- Status: the two local repair commits `f6b61d3` and `cb9f324` are not pushed or deployed. PostgreSQL repair checks passed; Docker and hosted browser workflows remain unverified. No claim of institutional adoption or production readiness is made.

### Finora

**Your finances, clearly understood.** Finora is an interactive personal-finance portfolio demo covering expenses, budgets, assets, goals, reports and Gemini chat. The public site uses synthetic data. Personal browser data remains device-local because personal cloud synchronization is incomplete.

- Public demo: <https://scintillating-donut-a597ff.netlify.app/>
- Backend health/API host: <https://family-finance-tracker-pearl.vercel.app/health>
- Source: <https://github.com/Nithish-kumar-git/family-finance-tracker>

### Chit Fund Analytics

An authenticated personal chit-fund tracker separating source messages, expected calculations, reviewed discrepancies and recorded cash flow. It includes statements and exports, but remains blocked on import semantics, historical dates, atomic ingestion, correction concurrency, verification races and stronger database constraints.

- Authenticated app: <https://chitfund-analytics.vercel.app/>
- Source: <https://github.com/Nithish-kumar-git/chitfund-analytics>

### Evidence-Grounded RAG

A supervised local React/FastAPI/PostgreSQL-pgvector/Gemini demonstration for synthetic PDF/TXT documents. Its evaluator supports mocks and an explicitly authorized live mode. Citation/quote integrity does not prove semantic entailment, and there is no public deployment.

- Source: <https://github.com/Nithish-kumar-git/evidence-grounded-rag>

## Local development

Requires Node.js and npm:

```sh
npm ci
npm run dev
```

Create a production build with:

```sh
npm run build
npm run preview
```

## Local visual QA

The repository includes a Playwright-based local QA runner. It first confirms
that the active runtime can make a loopback connection, then starts Vite on
`127.0.0.1:5173`, captures full-page desktop (1440px) and mobile (390px)
screenshots under the ignored `artifacts/visual-qa/` directory, and checks image
loading, horizontal overflow, console/network failures, keyboard navigation,
dialog focus return, mobile project-rail controls and reduced-motion handling. It writes
`artifacts/visual-qa/diagnostics.json` on both success and failure, including
the Vite child lifecycle, output and local-port checks.

After `npm ci`, install the development browser once in the project-local
Playwright location, then run the check:

```powershell
$env:PLAYWRIGHT_BROWSERS_PATH = '0'
npx playwright install chromium
npm run qa:visual
```

A normal local PowerShell run completed visual QA successfully. It captured and
reviewed the light-first redesign at 1440px and 390px, loaded all four genuine
images (including lazy-loaded project captures), found no horizontal overflow,
console errors, page errors or failed requests, and passed keyboard/dialog/menu
and reduced-motion checks. The runner strips ANSI color codes from Vite's ready
message, scrolls native lazy images into view before asserting their load state,
and saves partial results when a future run fails. Its ignored screenshot and
JSON artifacts remain the evidence for each run.

## Dependency security

The development-only Vite toolchain was updated to `vite@8.1.6` on 23 October
2026. Its patched dependency tree resolves `postcss@8.5.31`, `nanoid@3.3.20`
and `source-map-js@1.2.2`; `npm audit` reported zero vulnerabilities after a
clean `npm ci`, build and visual-QA run.

There are no runtime environment variables or automated test script in this repository. The content-only closeout uses the production build plus link/image checks.

## Deployment

The approved redesign was released on 23 October 2026 from commit
`e56aee942f2de30affa8ad6f47bf321bd3e0c809`. Vercel deployment
`dpl_88bhcwSa6Fjdm8WFfhrhdVik29fC` completed with status `READY` and the
production URL served the redesigned page. Read-only desktop and 390px mobile
smoke checks confirmed navigation, image loading and no horizontal overflow or
browser/network errors.

See [docs/PORTFOLIO_HANDOFF.md](docs/PORTFOLIO_HANDOFF.md) for repository state, validation evidence and the safe resumption boundary.
