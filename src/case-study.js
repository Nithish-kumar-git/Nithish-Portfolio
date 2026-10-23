import './redesign.css';
import './case-study.css';

const sourceLinks = {
  fwms: 'https://github.com/Nithish-kumar-git/fwms-workload-system',
  finora: 'https://github.com/Nithish-kumar-git/family-finance-tracker',
  chit: 'https://github.com/Nithish-kumar-git/chitfund-analytics',
  rag: 'https://github.com/Nithish-kumar-git/evidence-grounded-rag',
};

const studies = {
  fwms: {
    number: '01 / 04',
    name: 'Faculty Workload Management System',
    eyebrow: 'Synthetic-data recruiter demo',
    status: 'Public demo · synthetic data',
    overview: 'A role-based workflow for collecting faculty preferences, setting up an academic cycle and reviewing workload allocation. The public recruiter path is an isolated synthetic-data demo, deliberately separate from the institutional application.',
    audience: 'Designed for faculty, timetable coordinators and HOD-level reviewers who need to move from preference collection to workload review with clear roles and records.',
    gallery: [
      { src: '/images/dashboard.png', alt: 'FWMS HOD dashboard with workload management options', caption: 'HOD dashboard — genuine capture from the recruiter-demo workflow.' },
      { src: '/images/preferences.png', alt: 'FWMS subject preference screen', caption: 'Subject preferences — genuine capture of the faculty-facing workflow.' },
      { src: '/images/workload.png', alt: 'FWMS workload allocation screen', caption: 'Workload allocation — genuine capture of the allocation workflow.' },
      { src: '/images/login.png', alt: 'FWMS recruiter demo login screen', caption: 'Recruiter demo entry — genuine capture of the synthetic-data experience.' },
    ],
    features: ['Role-based application flow for faculty, coordinator and HOD review.', 'Subject preference collection and semester/cycle context.', 'Workload allocation review and report-oriented exports.', 'A separate recruiter demo that keeps public exploration on synthetic data.'],
    stack: ['React', 'TypeScript', 'Vite', 'FastAPI', 'PostgreSQL', 'Docker'],
    architecture: 'The source separates a React/TypeScript client, FastAPI routes and PostgreSQL persistence. The public recruiter demo is a distinct deployment path; it is not evidence of institutional data or adoption.',
    decisions: ['Keep the recruiter experience isolated from the institutional environment.', 'Use role boundaries to make preference and allocation responsibilities reviewable.', 'Present the public app as a demonstration, not an institutional-production claim.'],
    testing: 'The source repository documents pytest coverage for health, demo login, authentication/authorization and selected workflow paths. This case study does not present a new institutional or production test run.',
    limits: 'The portfolio demo uses synthetic data. Its presence does not establish institutional deployment, data quality or production readiness.',
    links: [{ label: 'Open recruiter demo', href: 'https://fwms-recruiter-demo.vercel.app/' }, { label: 'View source', href: sourceLinks.fwms }],
  },
  finora: {
    number: '02 / 04',
    name: 'Finora',
    eyebrow: 'Synthetic household finance demo',
    status: 'Public demo · browser-local edits',
    overview: 'A financial-tracking interface for a fictional household, covering expenses, budgets, assets, goals, reports and an assisted chat workflow. The public experience is a synthetic demo; it is not a personal cloud-finance product.',
    audience: 'A portfolio demonstration of household finance workflows and reviewable local state, intended for recruiters and technical reviewers rather than real household record-keeping.',
    gallery: [
      { src: '/images/fft-dashboard.png', alt: 'Finora synthetic household dashboard with finance overview', caption: 'Dashboard — genuine production capture using the fictional demo household.' },
      { src: '/images/fft-expenses.png', alt: 'Finora expense history screen', caption: 'Expense history — genuine capture of categories, filters and monthly records.' },
      { src: '/images/fft-milestones.png', alt: 'Finora goals and milestones screen', caption: 'Goals and milestones — genuine capture of the planning workflow.' },
      { src: '/images/fft-report.png', alt: 'Finora report screen with financial summaries', caption: 'Reports — genuine capture of the local financial-summary workflow.' },
      { src: '/images/fft-chatbot.png', alt: 'Finora assistant chat screen', caption: 'Assistant — genuine capture of the synthetic-context chat experience.' },
      { src: '/images/fft-auth.png', alt: 'Finora application entry screen', caption: 'Application entry — genuine capture from the Finora project.' },
    ],
    features: ['Local expense, budget, asset, goal and report workflows.', 'A public synthetic household that can be explored without an account.', 'Browser-local demo edits and a reset flow.', 'A chat route built around server-owned fictional context rather than browser financial entries.'],
    stack: ['React', 'Vite', 'React Router', 'Zustand', 'FastAPI', 'PostgreSQL', 'Gemini'],
    architecture: 'The documented public route opens the React demo workspace. Demo records are kept in a dedicated browser-local namespace; the synthetic assistant request goes to a FastAPI endpoint with a fixed fictional context. A separately guarded API and personal workspace exist, but the browser PIN flow is not server authentication.',
    decisions: ['Make the public demo synthetic by default rather than exposing personal records.', 'Keep demo edits local to the browser.', 'Do not imply cross-device cloud synchronization where the documented flow remains incomplete.'],
    testing: 'The project documentation records frontend and backend regression suites using synthetic records, mocks and isolated checks. Those records are project evidence, not a new live-database validation in this portfolio release.',
    limits: 'Personal browser data remains device-local, and personal cloud synchronization is not connected. Do not enter private information into the public demo or its chat.',
    links: [{ label: 'Open live demo', href: 'https://scintillating-donut-a597ff.netlify.app/' }, { label: 'View source', href: sourceLinks.finora }],
  },
  chit: {
    number: '03 / 04',
    name: 'Chit Fund Analytics',
    eyebrow: 'Review-assisted financial workflow',
    status: 'Live app · human review required',
    overview: 'An authenticated tracking workflow that separates source messages, expected calculations, reviewed discrepancies and cash-flow records. The design makes the review step explicit rather than presenting calculations as an authoritative financial record.',
    audience: 'A portfolio-scale workflow for a reviewer who needs to inspect source inputs, calculation expectations and discrepancies before relying on a recorded financial view.',
    gallery: [
      { src: '/images/chit-sc-dashboard.png', alt: 'Chit Fund Analytics financial overview dashboard', caption: 'Command center — genuine capture of the financial overview.' },
      { src: '/images/chit-sc-detail.png', alt: 'Chit Fund Analytics chit detail screen', caption: 'Chit detail — genuine capture of the selected group workflow.' },
      { src: '/images/chit-sc-rounds.png', alt: 'Chit Fund Analytics rounds screen', caption: 'Rounds — genuine capture of the contribution and review view.' },
    ],
    features: ['Authenticated views for source information, expected calculations and recorded cash flow.', 'Explicit discrepancy/review treatment rather than a silent calculation pipeline.', 'Financial overview and individual chit/round detail screens.'],
    stack: ['Next.js', 'TypeScript', 'Supabase', 'PostgreSQL'],
    architecture: 'The project uses a web application layer with authenticated financial views and database-backed records. The portfolio represents the implementation as review-assisted: a displayed total or export remains subject to human validation.',
    decisions: ['Keep source, expected state and review outcome distinct.', 'Avoid describing the app as authoritative financial software.', 'Treat data-quality and integrity checks as part of the workflow rather than a claim that every record is correct.'],
    testing: 'The local project includes financial-integrity closeout documentation and automated project checks. This case study makes no new claim about current third-party financial correctness or a regulated-production release.',
    limits: 'Human review remains required. The application should not be used as an authoritative financial system without separate operational, audit and domain validation.',
    links: [{ label: 'Open live app', href: 'https://chitfund-analytics.vercel.app/' }, { label: 'View source', href: sourceLinks.chit }],
  },
  rag: {
    number: '04 / 04',
    name: 'Evidence-Grounded RAG',
    eyebrow: 'Supervised local workflow',
    status: 'Local only · no public deployment',
    overview: 'A local demonstration for asking questions about synthetic PDF or TXT documents, then reviewing retrieved support. It aims to make citations, literal quote checks and abstention visible instead of treating a generated answer as sufficient evidence.',
    audience: 'A supervised local demonstration for a reviewer who wants to inspect evidence returned alongside an answer and test an unsupported question.',
    gallery: [],
    features: ['Synthetic PDF/TXT upload with bounded file validation.', 'Retrieved evidence and displayed source/quote inspection.', 'A response contract that includes citations and an abstention state.', 'Owner-scoped local document workflow rather than a shared public app.'],
    stack: ['React', 'FastAPI', 'PostgreSQL', 'pgvector', 'Gemini'],
    architecture: 'The documented local workflow is: synthetic document → chunking and retrieval → evidence-backed answer or abstention. The source validates source/quote relationships. A public deployment is not included, and the current live Gemini/pgvector path was not re-verified for this portfolio release.',
    decisions: ['Use synthetic documents for supervised demonstrations.', 'Expose retrieved support and abstention instead of implying an answer is inherently reliable.', 'Keep the portfolio claim scoped to the documented local workflow.'],
    testing: 'The local repository includes offline route/client checks and historical evaluation records. They do not renew live Gemini, pgvector or deployment verification, so no current live-integration metric is asserted here.',
    limits: 'No verified product screenshot or architecture capture is available in this portfolio checkout, and there is no public deployment. Live Gemini and pgvector integration remain unverified in the current documented environment.',
    links: [{ label: 'View source', href: sourceLinks.rag }],
  },
};

const requestedProject = new URLSearchParams(window.location.search).get('project');
const projectKey = Object.hasOwn(studies, requestedProject) ? requestedProject : 'fwms';
const project = studies[projectKey];
const main = document.querySelector('#main-content');
const studyKeys = Object.keys(studies);
const currentIndex = studyKeys.indexOf(projectKey);
const previous = studyKeys[(currentIndex + studyKeys.length - 1) % studyKeys.length];
const next = studyKeys[(currentIndex + 1) % studyKeys.length];

const externalLink = ({ label, href }) => `<a class="button button--secondary" href="${href}" target="_blank" rel="noopener">${label} <span aria-hidden="true">↗</span></a>`;
const list = (items) => `<ul>${items.map((item) => `<li>${item}</li>`).join('')}</ul>`;

const galleryMarkup = project.gallery.length ? `
  <section class="case-section case-section--gallery" aria-labelledby="gallery-title">
    <div class="case-section__heading"><div><p class="eyebrow">Genuine interface captures</p><h2 id="gallery-title">The workflow, in view.</h2></div><p>Use the controls, thumbnails or arrow keys to review the available captures. Select the image to enlarge it.</p></div>
    <div class="case-gallery" data-gallery tabindex="0" aria-roledescription="carousel" aria-label="${project.name} screenshot gallery">
      <div class="case-gallery__stage"><button class="case-gallery__image-button" type="button" data-enlarge aria-label="Enlarge current image"><img data-gallery-image src="${project.gallery[0].src}" alt="${project.gallery[0].alt}" width="1920" height="1080" /></button><div class="case-gallery__caption"><p data-gallery-caption>${project.gallery[0].caption}</p><span data-gallery-counter>1 / ${project.gallery.length}</span></div><button class="case-gallery__control case-gallery__control--previous" type="button" data-gallery-previous aria-label="Show previous screenshot">←</button><button class="case-gallery__control case-gallery__control--next" type="button" data-gallery-next aria-label="Show next screenshot">→</button></div>
      <div class="case-gallery__thumbs" role="tablist" aria-label="Choose a screenshot">${project.gallery.map((image, index) => `<button type="button" role="tab" aria-label="Show screenshot ${index + 1}: ${image.caption}" aria-selected="${index === 0}" data-gallery-thumb="${index}"><img src="${image.src}" alt="" width="192" height="108" loading="lazy" /></button>`).join('')}</div>
    </div>
  </section>` : `
  <section class="case-section case-section--gallery" aria-labelledby="workflow-title"><div class="case-section__heading"><div><p class="eyebrow">Implementation flow</p><h2 id="workflow-title">No product gallery is fabricated.</h2></div><p>No verified RAG UI capture is available in this portfolio checkout. This implementation flow is intentionally labelled as a text representation, not a screenshot.</p></div><div class="case-flow" role="img" aria-label="Synthetic PDF or TXT document, retrieved evidence, then grounded answer or abstention"><span>Synthetic PDF / TXT</span><i aria-hidden="true">→</i><span>Retrieved evidence</span><i aria-hidden="true">→</i><span>Grounded answer<br />or abstention</span></div></section>`;

main.innerHTML = `
  <article class="case-study shell">
    <a class="case-back" href="/#work">← Back to selected work</a>
    <header class="case-hero"><div><p class="eyebrow">${project.number} · ${project.eyebrow}</p><h1>${project.name}</h1><p class="case-hero__lede">${project.overview}</p><div class="case-hero__actions">${project.links.map(externalLink).join('')}</div></div><aside class="case-status"><span class="status ${projectKey === 'chit' ? 'status--caution' : projectKey === 'fwms' || projectKey === 'finora' ? 'status--live' : ''}">${project.status}</span><p>${project.audience}</p></aside></header>
    ${galleryMarkup}
    <section class="case-section case-details" aria-label="Case study details"><div class="case-details__primary"><div><p class="eyebrow">Implemented workflow</p><h2>What is documented.</h2>${list(project.features)}</div><div><p class="eyebrow">Technical stack</p><div class="tag-list case-tags">${project.stack.map((item) => `<span>${item}</span>`).join('')}</div></div></div><div class="case-details__secondary"><section><p class="eyebrow">Architecture</p><p>${project.architecture}</p>${project.diagram ? `<img class="case-diagram" src="${project.diagram.src}" alt="${project.diagram.alt}" />` : ''}</section><section><p class="eyebrow">Engineering decisions</p>${list(project.decisions)}</section></div></section>
    <section class="case-section case-evidence" aria-label="Testing and limitations"><div><p class="eyebrow">Testing & evaluation evidence</p><p>${project.testing}</p></div><div><p class="eyebrow">Honest scope</p><p>${project.limits}</p></div></section>
    <nav class="case-pagination" aria-label="Browse case studies"><a href="/case-study.html?project=${previous}">← ${studies[previous].name}</a><a href="/case-study.html?project=${next}">${studies[next].name} →</a></nav>
  </article>`;

document.title = `${project.name} case study — Nithish Kumar V`;

const gallery = document.querySelector('[data-gallery]');
const lightbox = document.querySelector('[data-lightbox]');
let activeImage = 0;
let touchStartX = null;

function updateGallery(nextIndex, shouldFocus = false) {
  if (!gallery || !project.gallery.length) return;
  activeImage = (nextIndex + project.gallery.length) % project.gallery.length;
  const image = project.gallery[activeImage];
  const stageImage = gallery.querySelector('[data-gallery-image]');
  stageImage.src = image.src;
  stageImage.alt = image.alt;
  gallery.querySelector('[data-gallery-caption]').textContent = image.caption;
  gallery.querySelector('[data-gallery-counter]').textContent = `${activeImage + 1} / ${project.gallery.length}`;
  gallery.querySelectorAll('[data-gallery-thumb]').forEach((thumb, index) => {
    const selected = index === activeImage;
    thumb.setAttribute('aria-selected', String(selected));
    thumb.tabIndex = selected ? 0 : -1;
    if (selected && shouldFocus) thumb.focus();
  });
}

gallery?.querySelector('[data-gallery-previous]')?.addEventListener('click', () => updateGallery(activeImage - 1));
gallery?.querySelector('[data-gallery-next]')?.addEventListener('click', () => updateGallery(activeImage + 1));
gallery?.querySelectorAll('[data-gallery-thumb]').forEach((thumb) => thumb.addEventListener('click', () => updateGallery(Number(thumb.dataset.galleryThumb), true)));
gallery?.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') { event.preventDefault(); updateGallery(activeImage - 1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); updateGallery(activeImage + 1); }
});
gallery?.addEventListener('pointerdown', (event) => { touchStartX = event.clientX; });
gallery?.addEventListener('pointerup', (event) => {
  if (touchStartX === null) return;
  const distance = event.clientX - touchStartX;
  if (Math.abs(distance) > 42) updateGallery(activeImage + (distance < 0 ? 1 : -1));
  touchStartX = null;
});

gallery?.querySelector('[data-enlarge]')?.addEventListener('click', () => {
  const image = project.gallery[activeImage];
  lightbox.querySelector('[data-lightbox-image]').src = image.src;
  lightbox.querySelector('[data-lightbox-image]').alt = image.alt;
  lightbox.querySelector('[data-lightbox-caption]').textContent = image.caption;
  lightbox.showModal();
});
lightbox?.querySelector('[data-close-lightbox]')?.addEventListener('click', () => lightbox.close());
lightbox?.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });
lightbox?.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft') { event.preventDefault(); updateGallery(activeImage - 1); }
  if (event.key === 'ArrowRight') { event.preventDefault(); updateGallery(activeImage + 1); }
});
