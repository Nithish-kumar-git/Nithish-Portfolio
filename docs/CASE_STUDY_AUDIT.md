# Case-study asset and evidence audit

Audit date: 23 October 2026. This record was prepared before the case-study
implementation so the portfolio can distinguish documented functionality from
unverified claims.

## Asset inventory

| Project | Available genuine visual material | Dimensions / purpose | Portfolio use |
| --- | --- | --- | --- |
| Faculty Workload Management System | `public/images/dashboard.png`, `workload.png`, `preferences.png`, `login.png` | Each is 1920 x 1080; the matching source repository also records the same four screenshots in `docs/screenshots/`. | Four-image gallery. The older `src/assets/fwms-diagram.svg` was inspected but is not published: it does not render reliably as an image and contains historical implementation labels that are not re-verified here. |
| Finora | `public/images/fft-dashboard.png`, `fft-expenses.png`, `fft-auth.png`, `fft-chatbot.png`, `fft-milestones.png`, `fft-report.png` | Each is 1920 x 1080. The Family Finance Tracker repository documents matching synthetic-demo captures. | Six-image gallery, labelled as synthetic/demo data where relevant. |
| Chit Fund Analytics | `public/images/chit-sc-dashboard.png`, `chit-sc-detail.png`, `chit-sc-rounds.png` | Each is 1920 x 1080. The dashboard capture visually matches the Chit Fund Analytics application. | Three-image gallery. Earlier `*-mockup.jpg` assets are deliberately not used. |
| Evidence-Grounded RAG | No verified product UI capture or diagram is bundled in the portfolio or the accessible local RAG repository. | The local repository documents a supervised, synthetic-document workflow only. | No image gallery is fabricated. The case study uses an explicitly labelled implementation-flow treatment and names the missing gallery evidence. |

## Evidence-backed project details

- **FWMS:** the accessible source records a React/TypeScript/Vite frontend,
  FastAPI backend and PostgreSQL persistence. The portfolio’s public link is the
  separate synthetic-data recruiter demo, not the institutional deployment.
  The project documentation records role-based workflow, preference collection,
  workload allocation and CSV export; the public case study does not assert
  institutional adoption or production readiness.
- **Finora:** the local source documents a React/Vite application with Zustand,
  FastAPI, SQLAlchemy/PostgreSQL, Gemini and a public synthetic household
  experience. Public-demo edits are browser-local; personal cloud
  synchronization is explicitly incomplete. The synthetic chat has a
  server-owned example and is not a personal-data upload path.
- **Chit Fund Analytics:** the accessible repository and screenshots support an
  authenticated review workflow for messages, expected calculations,
  discrepancies and cash-flow records. It must be described as
  review-assisted portfolio software, not authoritative financial software.
- **Evidence-Grounded RAG:** the accessible local source supports synthetic
  PDF/TXT documents, source/quote validation and abstention. It has no public
  deployment. Fresh live Gemini/pgvector integration was not re-verified, so
  the portfolio must not claim a currently live integration, evaluation score
  or production readiness.

## Certification evidence

`public/Nithish_Kumar_Analyst_Resume.pdf` records **Cloud Computing
Fundamentals — NPTEL (2025)**. No separate certificate file, credential ID,
score, issue date or public verification URL is present in this checkout. The
portfolio may show only the documented credential and this limitation. Earlier
historical portfolio claims for other certificates are not restored.

## Implementation decisions

1. Keep the homepage project cards concise and link their notes to direct,
   shareable case-study URLs.
2. Use only the inventory above; use `object-fit: contain` in the detailed
   gallery so the genuine 16:9 captures are not cropped.
3. Give each gallery explicit captions, thumbnail navigation, keyboard controls,
   touch-friendly targets and an accessible lightbox. RAG receives equivalent
   navigable detail content, but no invented gallery.
4. Record availability gaps rather than filling them with stock or generated
   imagery.
