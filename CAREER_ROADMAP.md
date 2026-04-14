# Career Roadmap — Harshit Gupta

---

## What's Strong Right Now

- Oracle AI certs (RAG, Vector DB, OCI) are legit and current (2025)
- Backend depth is real — Flask, MySQL, PostgreSQL, Python across multiple projects
- Breadth exists — Full Stack, AI/ML, Frontend, Tools, Creative all covered

---

## Projects

### Build These (Critical — Do First)

#### 1. RAG Document Q&A App *(new project)*
- **Why:** You have 3 Oracle AI certs (RAG, Vector Search, AI Foundations) but zero projects using any of it. Biggest red flag on the profile.
- **What to build:** Upload PDFs → ask questions → get cited answers
- **Stack:** Python + OCI Generative AI (or OpenAI) + ChromaDB or Qdrant + Flask
- **Goal:** Live demo URL. This directly backs all 3 Oracle AI certs.

#### 2. Microservices Demo App *(new project)*
- **Why:** Bio says 20+ production microservices at CertifyMe but nothing visible to hiring managers.
- **What to build:** 3-service system — Auth Service + Core API + Notification Service
- **Stack:** Flask + Docker Compose + PostgreSQL + Redis
- **Goal:** Public GitHub repo with a clear architecture diagram in the README.

### Fix These (Existing Projects)

#### 3. Add Redis caching to ViBlog or TRAVELIX
- **Why:** Redis is in your skills and bio but absent from every single project.
- **What to add:** Session caching + rate limiting on the API layer
- **Effort:** One PR per project. Makes the Redis skill credible immediately.

#### 4. Deploy at least 4–5 projects with live demo URLs
- **Why:** 15 projects, almost no `demo` URL. Projects without live links get skipped.
- **Which ones to deploy first:**
  - ViBlog → Railway or Render (Flask)
  - TRAVELIX → Railway or Render (Flask)
  - Explorix → Vercel (static)
  - DJoz → Render (if Flask backend)
  - Flask Login System → Railway

#### 5. Add CI/CD pipelines to 2–3 repos
- **Why:** Recruiters check GitHub repos. No `.github/workflows/` means no DevOps credibility.
- **Which repos:** ViBlog, TRAVELIX, Microservices Demo (once built)
- **What to add:** GitHub Actions — lint + test on push. Even a 10-line YAML counts.

### Nice to Have (Do After Above)

- **Real-time feature** — Add WebSockets or SSE to any project (live notifications, typing indicator, live search). Shows you can go beyond basic request-response.

---

## Certifications

### Get These Now (High Signal)

| # | Certification | Issuer | Why |
|---|---|---|---|
| 1 | **AWS Cloud Practitioner (CLF-C02)** | AWS | Oracle cloud is good but AWS is the hiring standard. Without at least CP, cloud skills read as narrow. |
| 2 | **Python (Intermediate)** | HackerRank | You only have Basic. Intermediate takes ~1 hour. Directly upgrades the cert section. |
| 3 | **REST API (Intermediate)** | HackerRank | You build APIs in every project but have no cert for it. Easiest win on this list. |
| 4 | **MongoDB Associate Developer** | MongoDB University | NoSQL is a complete gap. SQL Advanced is great but every AI/backend role uses Mongo too. Free official cert. |

### Get These Next (Medium Signal)

| # | Certification | Issuer | Why |
|---|---|---|---|
| 5 | **Docker Essentials** | IBM (Coursera) or KodeKloud | Bio claims microservices experience. Docker cert makes it credible without needing production code to show. |
| 6 | **LangChain for LLM App Development** | DeepLearning.AI (Coursera) | Backs the Oracle AI certs with a project-track cert from a recognized AI educator. |
| 7 | **Problem Solving (Intermediate)** | HackerRank | Upgrade from Basic. Matters for roles that DSA screen. |
| 8 | **Redis University — RU101** | Redis | Free, official, ~4 hours. Directly maps to a skill already in your bio. |

### Remove or Archive These (Hurting More Than Helping)

| Certification | Reason |
|---|---|
| **HTML Course** (Sololearn, 2021) | Student-level. Hurts credibility at senior level next to Oracle 2025 certs. |
| **C Course** (Sololearn, 2021) | Same — irrelevant to your current AI/backend trajectory. |
| **SQL (Basic)** (HackerRank, 2023) | Redundant. You already have SQL Advanced. Basic adds noise. |
| **Python (Basic)** (HackerRank, 2023) | Upgrade to Intermediate (cert #2 above) and remove this. |
| **Problem Solving (Basic)** (HackerRank, 2023) | Upgrade to Intermediate (cert #7 above) and remove this. |
| **Blockchain Basics** (Great Learning, 2023) | Reads as unfocused next to your AI trajectory unless you pivot to Web3. |

---

## Priority Order (What to Do First)

```
1. HackerRank — Python Intermediate        (1 hour)
2. HackerRank — REST API Intermediate      (1 hour)
3. HackerRank — Problem Solving Intermediate (2 hours)
4. Redis University — RU101               (4 hours, free)
5. MongoDB Associate Developer             (1–2 days, free)
6. AWS Cloud Practitioner                  (1–2 weeks study)
7. Add Redis to ViBlog or TRAVELIX         (1–2 days coding)
8. Deploy 4–5 projects with live URLs      (1 weekend)
9. Build RAG Document Q&A App             (1–2 weeks)
10. Add CI/CD pipelines to 2–3 repos       (few hours)
11. Docker Essentials cert                 (3–5 days)
12. DeepLearning.AI LangChain course       (1 week)
13. Build Microservices Demo App           (2–3 weeks)
```

---

## The One-Line Summary

> You look like a strong backend/Flask developer who recently got AI certs.
> To look like an **AI-backend engineer**, you need one real RAG project with a live demo,
> one visible microservices repo, and AWS + Docker certs to complete the cloud/infra story.
