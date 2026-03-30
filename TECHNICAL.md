# 🗂️ TECHNICAL.md — Yash Gupta Portfolio

> **Kisi bhi AI ko yeh file do + relevant code files do — vo poora context samajh kar changes kar payega.**

---

## 📁 Project Structure

```
Portfolio/                  ← GitHub Repository (YASHGUPTA11122004/Portfolio)
  app/
    globals.css             ← CSS variables, theme system (dark/light)
    layout.js               ← Next.js root layout (fonts, metadata, data-theme)
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
| Styling | CSS variables (globals.css) + inline styles (page.jsx) |
| Fonts | Space Grotesk (headings) + JetBrains Mono (code/data) |
| Deployment | Vercel (auto-deploy on GitHub push) |
| Repo | github.com/YASHGUPTA11122004/Portfolio |
| Live URL | portfolio-sdab.vercel.app |

---

## 🎨 Theme System (Dark / Light)

### Kaise kaam karta hai:
1. `globals.css` mein CSS variables defined hain — `:root` (dark) aur `[data-theme="light"]`
2. `layout.js` mein `<html data-theme="dark">` — server-side default dark mode (no flash)
3. `page.jsx` mein toggle button — `document.documentElement.setAttribute("data-theme", ...)`
4. Saare colors CSS variables se aate hain — ek jagah change karo, poora portfolio update

### Theme toggle kahan hai:
- `Nav` component mein — `ThemeToggle` button (moon/sun sliding toggle)
- `App` component mein `dark` state + `useEffect`

### Colors change karne ke liye:
- **Dark mode** → `globals.css` mein `:root { }` block
- **Light mode** → `globals.css` mein `[data-theme="light"] { }` block

---

## 🏗️ Architecture — `app/page.jsx`

Poora portfolio **ek hi file** mein hai. Components is order mein hain:

```
1.  "use client"            ← ZARURI — pehli line honi chahiye HAMESHA
2.  GlobalStyles            ← Animations, keyframes, component CSS classes only
3.  Cursor                  ← Custom glowing cursor (desktop only)
4.  ScrollProgress          ← Top progress bar
5.  Stars                   ← Canvas starfield background
6.  MeshBg                  ← Animated gradient orbs + grid overlay
7.  Noise                   ← Grain texture overlay
8.  Reveal                  ← Scroll-triggered fade-up wrapper
9.  Counter                 ← Animated number counter (0 to target on scroll)
10. GC (GlowCard)           ← Mouse-tracking glow card component
11. ThemeToggle             ← Dark/Light toggle button (sliding knob)
12. Terminal                ← Typing animation terminal widget (fixed 260px)
13. Nav                     ← Fixed navbar with active section + theme toggle
14. useActive               ← Section observer hook
15. Hero                    ← HERO SECTION (Classic Split layout)
16. Bento                   ← Proof of Work grid (IEEE, Coding, Cloud, CGPA)
17. Experience              ← Timeline with glowing dots
18. Projects                ← Filterable project cards with tilt + hover effects
19. Skills                  ← Animated progress bars + extra-curricular (7 categories)
20. Contact                 ← Email copy + social boxes + footer
21. App (default export)    ← Root — manages dark/light state
```

---

## 🎨 Design System

### CSS Variables (defined in `globals.css`)
```css
--bg              ← page background
--surface         ← card background
--surface-2       ← elevated card background
--border          ← default border
--border-bright   ← hover/active border
--blue: #3b9eff
--purple: #8b5cf6
--cyan: #06b6d4
--green: #10b981
--amber: #f59e0b
--text            ← primary text
--dim             ← secondary text
--muted           ← tertiary/placeholder text
--nav-bg          ← scrolled nav background
--font-sans: Space Grotesk
--font-mono: JetBrains Mono
--r: 16px
```

### Key CSS Classes (in `GlobalStyles` inside `page.jsx`)
```
.gc          → Glow card (mouse tracking radial gradient)
.chip        → Pill badge
.btn-p       → Primary gradient button
.btn-g       → Ghost/outline button
.gt          → Gradient shimmer text
.reveal      → Scroll reveal
nav.scrolled → Frosted glass navbar
```

---

## 📐 Hero Section Layout

**Classic Split — Left 58% / Right 42%**

```
LEFT (58%)                       RIGHT (42%)
────────────────────────────────────────────
[Open to Opportunities badge]    [Photo 240px]
Hi, I'm                          [glow ring]
Yash Gupta                       [spin ring]
Software Engineer · Delhi        [green dot]

Engineering Scalable             [8.41][500+]
Systems & Researching AI.        [100d][ 2  ]

CS Undergrad @ GEHU · 8.41 CGPA
Code. Build. Ship. Repeat.

[Building: AI Traffic Detection...]
[View Projects][GitHub][LinkedIn][Resume]
[Terminal — fixed 260px]
```

**Photo URL:**
`https://raw.githubusercontent.com/YASHGUPTA11122004/Portfolio/main/photo.jpeg`

---

## 👤 Personal Data

| Field | Value |
|-------|-------|
| Name | Yash Gupta |
| Email | yashgupta11122004@gmail.com |
| Phone | +91 92683 19936 |
| Location | New Delhi, India / Bhimtal, Uttarakhand |
| College | Graphic Era Hill University (GEHU), Bhimtal |
| Degree | B.Tech CSE — 2022–2026 |
| CGPA | 8.41/10 |
| Sem | 8th Sem (Final Year) |
| Tagline | Code. Build. Ship. Repeat. |

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
| IEEE Paper | ieeexplore.ieee.org/abstract/document/10212224 |
| Live Portfolio | portfolio-sdab.vercel.app |

---

## 💼 Experience Data

### ARIES (Aryabhatta Research Institute of Observational Sciences)
- Role: Software Developer Intern
- Period: Aug 2024 – Dec 2024
- Location: Nainital, India
- Tools: Python, Odoo, Linux, PostgreSQL, Agile, ERP
- Work: ERP modules, dynamic reporting tools, Linux deployment, Agile sprints

### Technohacks Edutech
- Role: Java Developer Intern
- Period: Jul 2024 – Aug 2024
- Location: Remote
- Tools: Java, Swing, OOP, Event-Driven, GUI
- Work: Desktop GUI apps, OOP architecture, modular code

---

## 🚀 Projects Data (All 6)

### 1. CodeBox ⭐ Featured
- Stack: React.js + Django + Python + REST API + AST
- GitHub: github.com/YASHGUPTA11122004/CodeBox
- Live: codebox-rho.vercel.app
- Backend: codebox-895s.onrender.com
- Period: Feb 2025 – Jun 2025
- Badge: 100+ Students (green)

### 2. OS Simulator
- Stack: Python + Queues + OS Concepts + Vercel
- GitHub: github.com/YASHGUPTA11122004/OS-Simulator
- Live: os-simulator-black.vercel.app
- Period: Aug 2024 – Feb 2025
- Badge: Live Demo (purple)

### 3. Nimbus Weather
- Stack: JavaScript + OpenWeather API + GitHub Pages
- GitHub: github.com/YASHGUPTA11122004/Nimbus-Weather
- Live: yashgupta11122004.github.io/Nimbus-Weather/
- Period: Nov 2023 – Dec 2023
- Badge: Live API (cyan)

### 4. Instant Tech News Radar ⭐ Featured
- Stack: React 18 + Vite 5 + Cloudflare Pages + HackerNews API
- GitHub: github.com/YASHGUPTA11122004/Instant-tech-news-radar
- Live: itnr.pages.dev
- Period: 2024
- Badge: Live · Edge (amber)
- Deploy: Cloudflare Pages (NOT Vercel) — has its own TECHNICAL.md

### 5. Supreme AI
- Stack: React.js + AI APIs + Vercel
- GitHub: github.com/YASHGUPTA11122004/supreme-ai
- Live: supreme-ai-eta.vercel.app
- Period: 2025 – Present
- Badge: In Development (blue)
- Status: Actively being built

### 6. AI Biometrics Research ⭐ Featured
- Stack: Python + TensorFlow + OpenCV + CNN + NumPy
- GitHub: None (research paper)
- Live: ieeexplore.ieee.org/abstract/document/10212224
- Period: 2023
- Badge: IEEE Published (amber)

---

## 🛠️ Skills Data (7 Categories)

### Languages
Python 90% · JavaScript 84% · Java 82% · C++ 78% · C 75% · SQL 82% · TypeScript 60%

### Web Development
React.js 85% · Django 84% · HTML5/CSS3 88% · REST APIs 87% · Tailwind CSS 78% · Node.js 62% · Vite 72%

### Databases
PostgreSQL 80% · MySQL 78%

### AI / ML
TensorFlow 70% · OpenCV 72% · NumPy 86% · Pandas 84% · Scikit-learn 65%

### DevOps & Cloud
Git/GitHub 92% · Linux 80% · Docker 68% · Kubernetes 62% · GCP 68% · GitHub Actions 65%

### Platforms & Deploy ← NEW
Vercel 88% · Cloudflare Pages 78% · GitHub Pages 85% · Render 72% · Figma 65%

### Core CS
DSA 88% · OOP 90% · OS 82% · DBMS 84% · CN 78% · Compiler Design 80%

---

## 📊 Stats Data

| Metric | Value |
|--------|-------|
| LeetCode | 200+ problems |
| CodeChef | 200+ problems |
| GFG | 150+ problems |
| Total | 500+ problems |
| LeetCode Streak | 100 days |
| CodeChef Streak | 100 days |
| CGPA | 8.41 |
| Year-wise | Y1: 85.25% · Y2: 84.7% · Y3: 82.55% · Y4(S7): 79.9% |
| Projects | 15+ |
| Internships | 2 |
| IEEE Publications | 1 |

---

## 🌐 Google Cloud Badges
Kubernetes · BigQuery · IAM · Cloud Run · Pub/Sub — Cohort 1 & 2

---

## 📄 Publication
- Title: "The Role of Artificial Intelligence in Biometrics"
- Conference: ICECAA 2023 (2nd Int. Conf. on Edge Computing & Applications)
- Published: IEEE Xplore, July 2023
- Link: ieeexplore.ieee.org/abstract/document/10212224

---

## 🎯 Currently Building
- AI-Driven Traffic Violation Detection System

---

## 🎭 Extra-Curricular
- NSS Volunteer — campus outreach & awareness drives
- Eco Club — Waste-to-Best campaigns & clean campus
- URSI-RCRS 24 Organizer — logistics & tech for IEEE conference

---

## 🔧 How to Make Changes

### Kisi AI ko context dene ka tarika:
```
"Mera portfolio hai. TECHNICAL.md padho context ke liye.
page.jsx: [paste karo]
globals.css: [paste karo agar theme change karni ho]
Mujhe [YEH CHANGE] karni hai..."
```

### Common changes — kahan karein:

| Change | File | Search karo |
|--------|------|-------------|
| Dark theme colors | globals.css | :root { |
| Light theme colors | globals.css | [data-theme="light"] { |
| Name / Title | page.jsx | "Yash Gupta" |
| Photo | page.jsx | const PHOTO = |
| Currently Building | page.jsx | "Building:" |
| Tagline | page.jsx | "Code. Build. Ship." |
| Projects add/edit | page.jsx | const projects = [ |
| Skills add/edit | page.jsx | const groups = [ |
| Stats numbers | page.jsx | const stats = [ |
| Experience edit | page.jsx | const jobs = [ |
| Contact links | page.jsx | const socials = [ |
| Fonts | layout.js | googleapis.com |
| Page title/meta | layout.js | export const metadata |

---

## ⚠️ Important Rules

1. **`page.jsx` ki pehli line hamesha `"use client";` honi chahiye** — warna Vercel build fail
2. **Theme flash fix:** `layout.js` mein `<html data-theme="dark">` hona chahiye
3. **CSS variables:** `globals.css` mein hain — `page.jsx` mein mat daalo
4. **Single file:** Sab kuch `page.jsx` mein hai
5. **Inline styles:** Tailwind nahi — pure inline CSS use hoti hai
6. **Project buttons:** GitHub = grey hover, Live = blue hover — dono translateY(-2px) on hover

---

## 🚀 Deploy Process

```
GitHub push → Vercel auto-detect Next.js → Build → Live
```

- Repo: YASHGUPTA11122004/Portfolio
- Branch: main
- Framework: Next.js (auto-detected)
- Root Directory: ./
- Live: portfolio-sdab.vercel.app

---

## 📦 package.json

```json
{
  "name": "yash-portfolio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start"
  },
  "dependencies": {
    "next": "14.2.3",
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  }
}
```

---

*Last updated: March 2026*
