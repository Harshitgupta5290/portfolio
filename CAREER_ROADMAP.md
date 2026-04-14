# Career Roadmap — Harshit Gupta

---

## What's Strong Right Now

- Oracle AI certs (RAG, Vector DB, OCI) are legit and current (2025)
- Backend depth is real — Flask, MySQL, PostgreSQL, Python across multiple projects
- Breadth exists — Full Stack, AI/ML, Frontend, Tools, Creative all covered

---

# PHASE 1 — Fill the Holes
> Goal: Make the profile *defensible*. No obvious gaps, no weak claims.

---

## Phase 1 — Certifications

### Get These (Gap Fillers)

| # | Certification | Issuer | Time | Why |
|---|---|---|---|---|
| 1 | **Python (Intermediate)** | HackerRank | 1 hour | Upgrade from Basic. Minimum bar. |
| 2 | **REST API (Intermediate)** | HackerRank | 1 hour | You build APIs in every project but have no cert. |
| 3 | **Problem Solving (Intermediate)** | HackerRank | 2 hours | Upgrade from Basic. Matters for DSA screening. |
| 4 | **Redis University — RU101** | Redis | 4 hours | Free, official. Directly backs Redis in your skills. |
| 5 | **MongoDB Associate Developer** | MongoDB University | 1–2 days | NoSQL is a complete gap. Free official cert. |
| 6 | **Docker Essentials** | IBM / KodeKloud | 3–5 days | Bio claims microservices. Docker cert makes it credible. |
| 7 | **AWS Cloud Practitioner (CLF-C02)** | AWS | 1–2 weeks | Foundation for SAA. Don't skip — SAA assumes this knowledge. |
| 8 | **LangChain for LLM App Development** | DeepLearning.AI | 1 week | Short course but backs Oracle AI certs with a project track. |

---

## Phase 1 — Projects

### Build These

#### 1. RAG Document Q&A App
- **Why:** 3 Oracle AI certs with zero RAG project = biggest credibility gap on the profile.
- **What:** Upload PDFs → ask questions → get cited answers
- **Stack:** Python + OCI Generative AI (or OpenAI) + ChromaDB/Qdrant + Flask
- **Goal:** Live demo URL. Backs all 3 Oracle AI certs directly.

#### 2. Microservices Demo App
- **Why:** Bio says 20+ production microservices but nothing visible to hiring managers.
- **What:** 3-service system — Auth + Core API + Notification Service
- **Stack:** Flask + Docker Compose + PostgreSQL + Redis
- **Goal:** Public GitHub repo with architecture diagram in README.

### Fix These (Existing Projects)

#### 3. Add Redis caching to ViBlog or TRAVELIX
- Session caching + rate limiting on the API layer. One PR. Makes Redis skill credible.

#### 4. Deploy 4–5 projects with live demo URLs
- ViBlog → Railway or Render
- TRAVELIX → Railway or Render
- Explorix → Vercel (static, 5 minutes)
- DJoz → Render
- Flask Login System → Railway

#### 5. Add CI/CD to 2–3 repos
- GitHub Actions — lint + test on push. Even a 10-line YAML counts.
- Repos: ViBlog, TRAVELIX, Microservices Demo

---

## Phase 1 — Priority Order

```
1.  HackerRank — Python Intermediate          (1 hour)
2.  HackerRank — REST API Intermediate        (1 hour)
3.  HackerRank — Problem Solving Intermediate (2 hours)
4.  Redis University — RU101                  (4 hours)
5.  MongoDB Associate Developer               (1–2 days)
6.  Add Redis to ViBlog or TRAVELIX           (1–2 days)
7.  Deploy 4–5 projects with live URLs        (1 weekend)
8.  Build RAG Document Q&A App               (1–2 weeks)
9.  AWS Cloud Practitioner                    (1–2 weeks study)
10. Add CI/CD pipelines to 2–3 repos         (few hours)
11. Docker Essentials cert                    (3–5 days)
12. DeepLearning.AI LangChain course          (1 week)
13. Build Microservices Demo App              (2–3 weeks)
```

---

# PHASE 2 — Go Legendary
> Goal: Stand out. Be the candidate they remember.

---

## Phase 2 — Certifications

These are hard, rare, and respected. Each one puts you in a different tier.

| # | Certification | Issuer | Why It's Legendary |
|---|---|---|---|
| 1 | **AWS Solutions Architect Associate (SAA-C03)** | AWS | The one recruiters actually respect. Not Practitioner — that's the warm-up. SAA signals you can design real cloud systems. |
| 2 | **TensorFlow Developer Certificate** | Google | Proctored, timed, hands-on coding exam. Hard to fake. Directly backs your AI trajectory with a Google name on it. |
| 3 | **AWS Developer Associate (DVA-C02)** | AWS | Pairs with SAA. Shows you can both architect and implement on AWS. Strong signal for SDE/backend roles at product companies. |
| 4 | **Kubernetes CKA** | CNCF | Expensive and hard. But if you're claiming 20+ microservices in production, this is the cert that makes hiring managers stop scrolling. |
| 5 | **Google Professional ML Engineer** | Google | The hardest on this list. Very few people have it. If you get this, you don't need the others — it speaks for itself. |

---

## Phase 2 — Projects

These are not portfolio pieces. They are things that get used, starred, shared, or generate revenue.

#### 1. An Open-Source Tool Developers Actually Use
- **Why:** One repo with 100 GitHub stars is worth more than 10 solo projects. It proves real-world value, not just technical ability.
- **What to build:** A CLI tool, a developer utility, a Flask extension, or an AI wrapper that solves a specific pain point.
- **Goal:** Ship it, post it on Reddit/HN/dev.to, iterate on feedback. Stars will follow if it's genuinely useful.

#### 2. A Real AI Agent (Not Just Q&A)
- **Why:** RAG Q&A is now commodity. An agent with tool use, memory, multi-step planning, and real integrations is where the bar is moving.
- **What to build:** An agent that can browse, write code, call APIs, and remember context across sessions — built on LangChain or LlamaIndex.
- **Stack:** Python + LangChain/LlamaIndex + tool integrations (search, code exec, calendar, etc.) + streaming UI
- **Goal:** Live demo. Make it do something genuinely impressive in the demo.

#### 3. A SaaS With Real Users
- **Why:** You've built SaaS at CertifyMe but have nothing public to show for it. One public product with even 10 paying users signals you can ship and retain — not just build.
- **What to build:** Pick a micro-SaaS in the AI/productivity space. Small scope, real value, real users.
- **Goal:** Launched, live, monetized (even $1 MRR counts — it proves the loop works).

#### 4. Real-Time System with WebSockets/SSE
- **Why:** Most Flask developers have never built real-time systems. This differentiates backend depth.
- **What to build:** Add live notifications, real-time collaboration, or a streaming AI response interface to an existing project.
- **Stack:** Flask-SocketIO or SSE + Redis pub/sub for broadcast
- **Goal:** Working demo showing real-time updates without polling.

#### 5. A Merged PR to a Major OSS Project
- **Why:** One merged PR to LangChain, FastAPI, Celery, or similar is worth more than any solo project for credibility with technical hiring managers.
- **What to do:** Pick a project you actually use, find a good first issue or a real bug you hit, fix it, open a PR.
- **Goal:** Merged. Link it from your portfolio and LinkedIn.

---

## Phase 2 — Priority Order

```
1.  AWS Solutions Architect Associate          (3–4 weeks study)
2.  Build the Real AI Agent                    (2–3 weeks)
3.  TensorFlow Developer Certificate           (2–3 weeks)
4.  AWS Developer Associate                    (2 weeks, after SAA)
5.  Build the Open-Source Tool + launch it     (2–4 weeks)
6.  Add real-time feature to an existing app   (1 week)
7.  Kubernetes CKA                             (1–2 months study)
8.  Launch micro-SaaS                          (1–3 months)
9.  Merged OSS PR                              (ongoing — start early)
10. Google Professional ML Engineer            (3–6 months study)
```

---

## The One-Line Summary Per Phase

> **Phase 1:** You look like a strong backend/Flask developer who recently got AI certs.
> Fill the gaps — deploy your work, prove your tools, get the foundational certs.

> **Phase 2:** You look like an AI-backend engineer who ships real things and has receipts.
> Build things people use. Get the certs that are genuinely hard to get.
