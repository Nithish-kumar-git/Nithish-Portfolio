# Portfolio website — maintenance handoff

Updated 21 October 2026 (Asia/Calcutta). This handoff governs factual content and safe resumption of the static portfolio.

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
