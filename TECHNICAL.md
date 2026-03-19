# 🗂️ TECHNICAL.md — Yash Gupta Portfolio

> **Kisi bhi AI ko yeh file do + `app/page.jsx` ka code do — vo poora context samajh jayega aur changes kar payega.**

---

## 📁 Project Structure

```
Portfolio/                  ← GitHub Repository
  app/
    layout.js               ← Next.js root layout (metadata)
    page.jsx                ← POORA PORTFOLIO CODE (single file)
  package.json              ← Next.js 14.2.3 dependencies
  photo.jpeg                ← Profile photo
  README.md
  TECHNICAL.md              ← Yeh file
```

---

## 🛠️ Tech Stack

| Item | Detail |
|------|--------|
| Framework | Next.js 14.2.3 (App Router) |
| Language | React (JSX) — single file architecture |
| Styling | Pure inline CSS + CSS-in-JS (`<style>` tag) |
| Fonts | Space Grotesk (headings) + JetBrains Mono (code/data) |
| Deployment | Vercel (auto-deploy on GitHub push) |
| Repo | github.com/YASHGUPTA11122004/Portfolio |
| Live URL | portfolio-sdab.vercel.app |

---

## 🏗️ Architecture — Single File (`app/page.jsx`)

Poora portfolio **ek hi file** mein hai. Components is order mein hain:

```
1.  "use client"            ← ZARURI — pehli line honi chahiye
2.  GlobalStyles            ← CSS variables, keyframes, global classes
3.  Cursor                  ← Custom glowing cursor (desktop only)
4.  ScrollProgress          ← Top progress bar
5.  Stars                   ← Canvas starfield background
6.  MeshBg                  ← Animated gradient orbs
7.  Noise                   ← Grain texture overlay
8.  Reveal                  ← Scroll-triggered fade-up wrapper
9.  Counter                 ← Animated number counter
10. GC (GlowCard)           ← Mouse-tracking glow card component
11. Terminal                ← Typing animation terminal widget
12. Nav                     ← Fixed navbar with active section highlight
13. useActive               ← Section observer hook
14. Hero                    ← HERO SECTION (Classic Split layout)
15. Bento                   ← Proof of Work grid
16. Experience              ← Timeline
17. Projects                ← Filterable project cards
18. Skills                  ← Animated progress bars
19. Contact                 ← Email copy + social links
20. App (default export)    ← Root component
```

---

## 🎨 Design System

### CSS Variables (defined in GlobalStyles)
```css
--bg: #050505           ← background
--surface: rgba(255,255,255,0.028)  ← card background
--border: rgba(255,255,255,0.075)   ← card border
--blue: #3b9eff         ← primary accent
--purple: #8b5cf6       ← secondary accent
--cyan: #06b6d4         ← tertiary accent
--green: #10b981        ← success/online
--amber: #f59e0b        ← warning/building
--text: #efefef         ← primary text
--dim: #888             ← secondary text
--muted: #555           ← tertiary text
--font-sans: Space Grotesk
--font-mono: JetBrains Mono
```

### Key CSS Classes
```
.gc          → Glow card (mouse tracking radial gradient)
.chip        → Pill badge
.btn-p       → Primary gradient button
.btn-g       → Ghost/outline button
.gt          → Gradient shimmer text
.reveal      → Scroll reveal (add .visible to trigger)
```

---

## 📐 Hero Section Layout

**Classic Split — Left 58% / Right 42%**

```
LEFT COLUMN (58%)              RIGHT COLUMN (42%)
─────────────────────────────────────────────────
[Open to Opportunities badge]  [Photo — 240px circle]
Hi, I'm                        [glow ring + spin ring]
Yash Gupta                     [green online dot]
Software Engineer · Delhi
                               [8.41 CGPA] [500+ Problems]
Engineering Scalable           [100d Streak] [2 Internships]
Systems & Researching AI.

CS Undergrad @ GEHU · 8.41 CGPA
Code. Build. Ship. Repeat.

[Building: AI Traffic Detection...]

[View Projects] [GitHub] [LinkedIn] [Résumé]

[Terminal Animation]
```

**Photo URL:**
```
https://raw.githubusercontent.com/YASHGUPTA11122004/Portfolio/main/photo.jpeg
```

---

## 👤 Personal Data

| Field | Value |
|-------|-------|
| Name | Yash Gupta |
| Email | yashgupta11122004@gmail.com |
| Phone | +91 92XXX XXXX6 |
| Location | New Delhi, India / Bhimtal, Uttarakhand |
| College | Graphic Era Hill University (GEHU), Bhimtal |
| Degree | B.Tech CSE — 2022–2026 |
| CGPA | 8.41/10 |
| Sem | 8th Sem (Final Year) |

---

## 🔗 All Links

| Platform | URL |
|----------|-----|
| GitHub | github.com/YASHGUPTA11122004 |
| LinkedIn | linkedin.com/in/yashgupta11122004 |
| LeetCode | leetcode.com/u/yashgupta11122004/ |
| GFG | geeksforgeeks.org/profile/yashguptaidtb |
| CodeChef | codechef.com/users/yashgupta_04 |
| Resume | drive.google.com/file/d/1w8IwRzTqEJP5QccNCDxuK6njsAWu0Wgq/view |
| IEEE | ieeexplore.ieee.org |
| Live Site | portfolio-sdab.vercel.app |

---

## 💼 Experience Data

### ARIES (Aryabhatta Research Institute)
- Role: Software Developer Intern
- Period: Aug 2024 – Dec 2024
- Location: Nainital, India
- Tools: Python, Odoo, Linux, PostgreSQL, Agile, ERP
- Work: ERP modules, reporting tools, Linux deployment

### Technohacks Edutech
- Role: Java Developer Intern
- Period: Jul 2024 – Aug 2024
- Location: Remote
- Tools: Java, Swing, OOP, Event-Driven, GUI
- Work: Desktop GUI apps, OOP architecture

---

## 🚀 Projects Data

| Project | Stack | GitHub | Status |
|---------|-------|--------|--------|
| CodeBox | React + Django + AST | github.com/Yash-Git2004/compiler | Featured |
| OS Simulator | Python + CLI | github.com/Geet9337/software_en | Public |
| Weather Dashboard | JavaScript + OpenWeather API | No GitHub | Public |
| AI Biometrics | TensorFlow + OpenCV + CNN | No GitHub | IEEE Published |

---

## 📊 Stats Data

| Metric | Value |
|--------|-------|
| LeetCode | 150+ problems |
| CodeChef | 200+ problems |
| GFG | 150+ problems |
| Total | 500+ problems |
| LeetCode Streak | 100 days |
| CodeChef Streak | 100 days |
| CGPA | 8.41 |
| Year-wise | Y1: 85.25% · Y2: 84.7% · Y3: 82.55% · Y4(S7): 79.9% |

---

## 🌐 Google Cloud Badges
- Kubernetes, BigQuery, IAM, Cloud Run, Pub/Sub
- Cohort 1 & 2 completed

---

## 📄 Publication
- Title: "The Role of Artificial Intelligence in Biometrics"
- Conference: ICECAA 2023 (2nd Int. Conf. on Edge Computing & Applications)
- Published: IEEE Xplore, July 2023

---

## 🎯 Extra-Curricular
- NSS Volunteer — campus outreach
- Eco Club — Waste-to-Best campaigns
- URSI-RCRS 24 Organizer — IEEE conference logistics & tech

---

## 🔧 How to Make Changes

### Kisi AI ko instructions dene ka tarika:

```
"Yeh mera portfolio hai. TECHNICAL.md padho poora context ke liye.
Ab mujhe [YEH CHANGE] karni hai: ..."
```

### Common changes aur kahan karein:

| Change | File | Search karo |
|--------|------|-------------|
| Name/Title | page.jsx | "Yash Gupta" |
| Photo | page.jsx | "PHOTO =" |
| Currently Building | page.jsx | "Currently Building" |
| Tagline | page.jsx | "Code. Build. Ship." |
| Projects add/edit | page.jsx | "const projects = [" |
| Skills edit | page.jsx | "const groups = [" |
| Stats numbers | page.jsx | "const stats = [" |
| Experience edit | page.jsx | "const jobs = [" |
| Colors | page.jsx | ":root {" in GlobalStyles |
| Contact links | page.jsx | "const socials = [" |

---

## ⚠️ Important Rules

1. **File ka pehla line hamesha `"use client";` hona chahiye** — warna Vercel build fail hoga
2. **Single file architecture** — sab kuch `app/page.jsx` mein hai, alag files mat banao
3. **Inline styles use hoti hain** — Tailwind nahi hai
4. **GitHub push karte hi Vercel auto-deploy** ho jata hai

---

## 🚀 Deploy Process

```
GitHub (Portfolio repo) → Vercel (auto-detect Next.js) → Live
```

- Branch: `main`
- Framework: Next.js (auto-detected)
- Root Directory: `./`
- Build Command: `npm run build` (auto)

---

*Last updated: March 2026*
