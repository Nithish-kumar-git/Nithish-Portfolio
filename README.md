<div align="center">

# Nithish Kumar V

**Data Analyst · Full Stack Engineer · Gen AI Builder**

[![Portfolio](https://img.shields.io/badge/Portfolio-nithish--portfolio--seven.vercel.app-0EA5E9?style=for-the-badge&logo=vercel&logoColor=white)](https://nithish-portfolio-seven.vercel.app)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/nithishkumar246)
[![GitHub](https://img.shields.io/badge/GitHub-Nithish--kumar--git-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Nithish-kumar-git)
[![Location](https://img.shields.io/badge/Chennai-India-FF6B35?style=for-the-badge&logo=googlemaps&logoColor=white)](#)

</div>

---

## 🎓 Education

| Degree | Institution | CGPA |
|--------|-------------|:----:|
| **MCA** | Hindustan Institute of Technology and Science, Chennai | **8.97** |
| **BCA** | Hindustan College of Arts & Science, Chennai | **8.20** |

---

## 🚀 Projects

### 🏛️ Faculty Workload Management System (FWMS)

> **Institutionally deployed at HITS Chennai** — governing workload across 50+ faculty

![FWMS Dashboard](public/images/dashboard.png)

| Metric | Value |
|--------|-------|
| 📚 Unique subjects managed | 112 across 4 programs |
| 👨🏫 Faculty served | 50+ |
| 🗄️ Database tables | 22 (15 core + 7 audit/legacy) |
| 📊 KPIs tracked per faculty | 15 |
| 🔌 REST API endpoints | 102 |
| 🔐 RBAC roles | 4 (Faculty · TT Coordinator · HOD · Admin) |

**Key features:**
- Rule-based allocation engine with 3-stage pipeline (First Preference → Lower Preference → Unallocated)
- Workload constraints: 14h min · 18h norm · 21.6h max (20% overload threshold)
- Excel compliance exports via openpyxl · PDF reports via reportlab
- Cycle states: `OPEN → CLOSED → ALLOCATED → FROZEN`

**Power BI Analytics Layer** — 3-page dashboard built on FWMS data:
- 40% faculty overload rate identified · 53% department workload gap flagged
- Overload/underload classification against 18-hour threshold business rule
- Department and program-level breakdowns for leadership review

![FWMS Workload View](public/images/workload.png)

**Stack:**
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white)
![SQLAlchemy](https://img.shields.io/badge/SQLAlchemy-D71F00?style=flat&logo=python&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Python](https://img.shields.io/badge/Python-3776AB?style=flat&logo=python&logoColor=white)
![Power BI](https://img.shields.io/badge/Power%20BI-F2C811?style=flat&logo=powerbi&logoColor=black)

---

### 💰 Chit Fund Analytics

> **Authenticated financial tracking and verification platform for chit funds**

🔒 Live app requires an authorized account · [chitfund-analytics.vercel.app](https://chitfund-analytics.vercel.app)

| Financial Overview | Round Detail & Verification | Chit Structure |
|:--:|:--:|:--:|
| ![Dashboard](public/images/chit-sc-dashboard.png) | ![Rounds](public/images/chit-sc-rounds.png) | ![Detail](public/images/chit-sc-detail.png) |

**Key engineering decisions:**
- Append-only actual transaction ledger — no silent overwrites
- Explicit verification states: `VERIFIED_FORMULA` · `CONFIRM_SOURCE` · `MANUAL_OVERRIDE` · `FLAGGED_MISMATCH`
- ROI calculation gated by completion + completeness + verification (not estimated mid-run)
- Idempotency protection on payout recording
- 501 tests passing · 0 failing · Row-level security throughout

**Financial safety model:** Expected payment ≠ actual payment · Auction date ≠ payment date · Installment savings ≠ profit

**Stack:**
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=black)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat&logo=vercel&logoColor=white)
![GitHub Actions](https://img.shields.io/badge/GitHub_Actions-2088FF?style=flat&logo=githubactions&logoColor=white)

---

### 🏠 Family Finance Tracker

> **React PWA using Google Gemini to parse SMS expense messages**

🌐 Live: [family-finance-tracker-pearl.vercel.app](https://family-finance-tracker-pearl.vercel.app)

| Dashboard | Expenses | AI Chatbot |
|:--:|:--:|:--:|
| ![FFT Dashboard](public/images/fft-dashboard.png) | ![FFT Expenses](public/images/fft-expenses.png) | ![FFT AI](public/images/fft-chatbot.png) |

- Multi-user household budgeting across 5 asset classes
- Google Gemini parses raw SMS text into structured expense records
- Offline-capable via service worker · Recharts data visualizations
- Milestone tracking · Monthly reports · Full expense history

**Stack:**
![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=flat&logo=fastapi&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=flat&logo=postgresql&logoColor=white)
![Gemini](https://img.shields.io/badge/Gemini_API-8E75B2?style=flat&logo=google&logoColor=white)
![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=flat&logo=pwa&logoColor=white)

---

## 📄 Research

**"Shift-Aware Threshold Adaptation for Cross-Dataset Wearable Anomaly Detection"**
IEEE ICSCST 2026 · Co-authored with Nathiya R
- False positive rate reduced: **46.69% → 1.02%**

---

## 🏅 Certifications

| Certification | Period | Score |
|---|---|:---:|
| NPTEL Cloud Computing | Jan–Apr 2025 | **67/100** |
| NPTEL Introduction to Algorithms & Analysis | Jul–Oct 2025 | **62/100** |
| NPTEL Enhancing Soft Skills & Personality | Feb–Apr 2026 | **84/100** |
| Intellithon'25 — 24-hr National Hackathon, HITS Chennai | Oct 2025 | 🏆 |
| Practical Data Analytics using SQL & Cloud — 5-day workshop, HITS | Feb 2026 | ✅ |

---

<div align="center">

*Portfolio built with Vite · Deployed on Vercel*

![CSS](https://img.shields.io/badge/CSS-71.2%25-1572B6?style=flat&logo=css3&logoColor=white)
![HTML](https://img.shields.io/badge/HTML-19.6%25-E34F26?style=flat&logo=html5&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-9.2%25-F7DF1E?style=flat&logo=javascript&logoColor=black)

</div>