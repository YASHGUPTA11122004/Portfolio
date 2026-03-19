"use client";
import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   GLOBAL STYLES
═══════════════════════════════════════════════════════════════ */
const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,700;1,400&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

    :root {
      --bg: #050505;
      --surface: rgba(255,255,255,0.028);
      --surface-2: rgba(255,255,255,0.05);
      --border: rgba(255,255,255,0.075);
      --border-bright: rgba(99,179,255,0.45);
      --blue: #3b9eff;
      --purple: #8b5cf6;
      --cyan: #06b6d4;
      --green: #10b981;
      --amber: #f59e0b;
      --text: #efefef;
      --muted: #555;
      --dim: #888;
      --font-sans: 'Space Grotesk', sans-serif;
      --font-mono: 'JetBrains Mono', monospace;
      --r: 16px;
    }

    html { scroll-behavior: smooth; }
    body {
      background: var(--bg);
      color: var(--text);
      font-family: var(--font-sans);
      line-height: 1.6;
      overflow-x: hidden;
      -webkit-font-smoothing: antialiased;
      cursor: none;
    }
    @media (pointer: coarse) { body { cursor: auto; } }

    ::-webkit-scrollbar { width: 3px; }
    ::-webkit-scrollbar-track { background: transparent; }
    ::-webkit-scrollbar-thumb { background: rgba(59,158,255,0.3); border-radius: 2px; }
    ::selection { background: rgba(59,158,255,0.28); color: #fff; }

    @keyframes fadeUp    { from{opacity:0;transform:translateY(36px)} to{opacity:1;transform:translateY(0)} }
    @keyframes fadeIn    { from{opacity:0} to{opacity:1} }
    @keyframes blink     { 0%,100%{opacity:1} 50%{opacity:0} }
    @keyframes float     { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-10px)} }
    @keyframes noise     { 0%,100%{transform:translate(0,0)} 20%{transform:translate(-2%,-3%)} 40%{transform:translate(3%,-1%)} 60%{transform:translate(-1%,2%)} 80%{transform:translate(2%,3%)} }
    @keyframes scanline  { 0%{top:-5%} 100%{top:105%} }
    @keyframes pulseRing { 0%{transform:scale(0.85);opacity:1} 100%{transform:scale(1.6);opacity:0} }
    @keyframes orb1      { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(60px,-40px) scale(1.08)} 66%{transform:translate(-40px,50px) scale(0.94)} }
    @keyframes orb2      { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(-50px,30px) scale(1.06)} 66%{transform:translate(40px,-50px) scale(0.96)} }
    @keyframes orb3      { 0%,100%{transform:translate(0,0) scale(1)} 50%{transform:translate(30px,40px) scale(1.04)} }
    @keyframes shimmer   { 0%{background-position:-200% center} 100%{background-position:200% center} }
    @keyframes borderGlow{ 0%,100%{border-color:rgba(59,158,255,0.13)} 50%{border-color:rgba(59,158,255,0.42)} }

    .reveal { opacity:0; transform:translateY(30px); transition:opacity 0.75s cubic-bezier(.22,1,.36,1), transform 0.75s cubic-bezier(.22,1,.36,1); }
    .reveal.visible { opacity:1; transform:translateY(0); }

    .gc {
      position:relative; border:1px solid var(--border); border-radius:var(--r);
      background:var(--surface); backdrop-filter:blur(16px);
      transition:border-color 0.35s, box-shadow 0.35s, transform 0.35s;
      overflow:hidden;
    }
    .gc::before {
      content:''; position:absolute; inset:0; border-radius:inherit;
      background:radial-gradient(500px circle at var(--mx,50%) var(--my,50%), rgba(59,158,255,0.07), transparent 55%);
      opacity:0; transition:opacity 0.4s; pointer-events:none;
    }
    .gc:hover::before { opacity:1; }
    .gc:hover { border-color:var(--border-bright); box-shadow:0 0 40px rgba(59,158,255,0.12),0 0 80px rgba(139,92,246,0.06),inset 0 1px 0 rgba(255,255,255,0.05); transform:translateY(-3px); }

    .chip {
      display:inline-flex; align-items:center; gap:5px;
      padding:4px 11px; border-radius:999px;
      border:1px solid var(--border); background:var(--surface);
      font-family:var(--font-mono); font-size:11.5px; color:var(--dim);
      transition:all 0.2s; white-space:nowrap;
    }
    .chip:hover { border-color:rgba(59,158,255,0.5); color:var(--blue); background:rgba(59,158,255,0.07); }

    .btn-p {
      display:inline-flex; align-items:center; gap:8px;
      padding:12px 26px; border-radius:10px;
      background:linear-gradient(135deg,#3b9eff,#6366f1);
      color:#fff; font-family:var(--font-sans); font-size:14px; font-weight:600;
      border:none; cursor:pointer; text-decoration:none;
      transition:transform 0.2s, box-shadow 0.2s; position:relative; overflow:hidden;
    }
    .btn-p:hover { transform:translateY(-2px); box-shadow:0 10px 36px rgba(59,158,255,0.38); }

    .btn-g {
      display:inline-flex; align-items:center; gap:8px;
      padding:11px 22px; border-radius:10px;
      background:transparent; color:var(--dim);
      font-family:var(--font-sans); font-size:14px; font-weight:500;
      border:1px solid var(--border); cursor:pointer; text-decoration:none;
      transition:all 0.2s;
    }
    .btn-g:hover { border-color:rgba(255,255,255,0.22); color:var(--text); background:var(--surface-2); }

    .gt {
      background:linear-gradient(135deg,#3b9eff 0%,#8b5cf6 50%,#06b6d4 100%);
      background-size:200% auto; -webkit-background-clip:text;
      -webkit-text-fill-color:transparent; background-clip:text;
      animation:shimmer 5s linear infinite;
    }

    nav { position:fixed; top:0; left:0; right:0; z-index:200; padding:18px 48px; display:flex; align-items:center; justify-content:space-between; border-bottom:1px solid transparent; transition:all 0.4s; }
    nav.scrolled { background:rgba(5,5,5,0.9); backdrop-filter:blur(24px); border-color:var(--border); }
    .nav-logo { font-family:var(--font-mono); font-size:15px; font-weight:700; color:var(--text); text-decoration:none; }
    .nav-logo span { color:var(--blue); }
    .nav-links { display:flex; gap:36px; list-style:none; }
    .nav-links a { font-size:13px; font-weight:500; color:var(--muted); text-decoration:none; transition:color 0.2s; position:relative; }
    .nav-links a::after { content:''; position:absolute; bottom:-4px; left:0; right:0; height:1px; background:var(--blue); transform:scaleX(0); transition:transform 0.2s; transform-origin:center; }
    .nav-links a.active, .nav-links a:hover { color:var(--text); }
    .nav-links a.active::after, .nav-links a:hover::after { transform:scaleX(1); }

    #scroll-progress { position:fixed; top:0; left:0; height:2px; background:linear-gradient(90deg,#3b9eff,#8b5cf6,#06b6d4); z-index:300; transition:width 0.1s linear; }

    #cursor-dot  { position:fixed; width:8px; height:8px; background:var(--blue); border-radius:50%; pointer-events:none; z-index:9999; transform:translate(-50%,-50%); mix-blend-mode:screen; }
    #cursor-ring { position:fixed; width:36px; height:36px; border:1px solid rgba(59,158,255,0.5); border-radius:50%; pointer-events:none; z-index:9998; transform:translate(-50%,-50%); transition:width 0.25s,height 0.25s,border-color 0.2s; }
    @media(pointer:coarse){#cursor-dot,#cursor-ring{display:none}}

    @media(max-width:768px){
      nav{padding:16px 20px;}
      .nav-links{display:none;}
      .nav-links.open{display:flex;flex-direction:column;position:fixed;top:61px;left:0;right:0;background:rgba(5,5,5,0.97);backdrop-filter:blur(24px);padding:24px;gap:20px;border-bottom:1px solid var(--border);z-index:199;animation:fadeIn 0.2s ease;}
    }
    @media(max-width:640px){ section{padding-left:20px !important;padding-right:20px !important;} }
  `}</style>
);

/* ── Cursor ── */
const Cursor = () => {
  const dot = useRef(null), ring = useRef(null);
  const pos = useRef({ x: 0, y: 0 }), rpos = useRef({ x: 0, y: 0 }), raf = useRef(null);
  useEffect(() => {
    const move = e => { pos.current = { x: e.clientX, y: e.clientY }; if (dot.current) { dot.current.style.left = e.clientX + "px"; dot.current.style.top = e.clientY + "px"; } };
    const lerp = () => { rpos.current.x += (pos.current.x - rpos.current.x) * 0.13; rpos.current.y += (pos.current.y - rpos.current.y) * 0.13; if (ring.current) { ring.current.style.left = rpos.current.x + "px"; ring.current.style.top = rpos.current.y + "px"; } raf.current = requestAnimationFrame(lerp); };
    window.addEventListener("mousemove", move);
    raf.current = requestAnimationFrame(lerp);
    const expand = () => { if (ring.current) { ring.current.style.width = "52px"; ring.current.style.height = "52px"; ring.current.style.borderColor = "rgba(59,158,255,0.8)"; } };
    const shrink = () => { if (ring.current) { ring.current.style.width = "36px"; ring.current.style.height = "36px"; ring.current.style.borderColor = "rgba(59,158,255,0.5)"; } };
    document.querySelectorAll("a,button").forEach(el => { el.addEventListener("mouseenter", expand); el.addEventListener("mouseleave", shrink); });
    return () => { window.removeEventListener("mousemove", move); cancelAnimationFrame(raf.current); };
  }, []);
  return <><div id="cursor-dot" ref={dot} /><div id="cursor-ring" ref={ring} /></>;
};

/* ── Scroll Progress ── */
const ScrollProgress = () => {
  const ref = useRef(null);
  useEffect(() => {
    const h = () => { const p = window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100; if (ref.current) ref.current.style.width = p + "%"; };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  return <div id="scroll-progress" ref={ref} style={{ width: "0%" }} />;
};

/* ── Stars Canvas ── */
const Stars = () => {
  const ref = useRef(null);
  useEffect(() => {
    const c = ref.current, ctx = c.getContext("2d");
    let w = c.width = window.innerWidth, h = c.height = window.innerHeight;
    const stars = Array.from({ length: 130 }, () => ({ x: Math.random() * w, y: Math.random() * h, r: Math.random() * 1.1 + 0.2, a: Math.random(), da: (Math.random() - 0.5) * 0.004, speed: Math.random() * 0.25 + 0.04 }));
    let raf;
    const draw = () => { ctx.clearRect(0, 0, w, h); stars.forEach(s => { s.a = Math.max(0.05, Math.min(1, s.a + s.da)); if (s.a <= 0.05 || s.a >= 1) s.da *= -1; s.y -= s.speed; if (s.y < -2) { s.y = h + 2; s.x = Math.random() * w; } ctx.beginPath(); ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); ctx.fillStyle = `rgba(180,210,255,${s.a * 0.55})`; ctx.fill(); }); raf = requestAnimationFrame(draw); };
    draw();
    const onResize = () => { w = c.width = window.innerWidth; h = c.height = window.innerHeight; };
    window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", onResize); };
  }, []);
  return <canvas ref={ref} style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", opacity: 0.5 }} />;
};

/* ── Mesh Orbs ── */
const MeshBg = () => (
  <div style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", overflow: "hidden" }}>
    <div style={{ position: "absolute", top: "5%", left: "15%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle,rgba(59,158,255,0.07) 0%,transparent 70%)", animation: "orb1 14s ease-in-out infinite" }} />
    <div style={{ position: "absolute", top: "45%", right: "5%", width: 550, height: 550, borderRadius: "50%", background: "radial-gradient(circle,rgba(139,92,246,0.065) 0%,transparent 70%)", animation: "orb2 18s ease-in-out infinite" }} />
    <div style={{ position: "absolute", bottom: "5%", left: "35%", width: 450, height: 450, borderRadius: "50%", background: "radial-gradient(circle,rgba(6,182,212,0.05) 0%,transparent 70%)", animation: "orb3 22s ease-in-out infinite" }} />
    <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)", backgroundSize: "64px 64px" }} />
  </div>
);

/* ── Noise ── */
const Noise = () => (
  <div style={{ position: "fixed", inset: 0, zIndex: 1, pointerEvents: "none", opacity: 0.025, backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`, backgroundSize: "200px 200px", animation: "noise 0.5s steps(1) infinite" }} />
);

/* ── Reveal ── */
const Reveal = ({ children, delay = 0, style = {} }) => {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { el.classList.add("visible"); obs.disconnect(); } }, { threshold: 0.08 });
    if (el) obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return <div ref={ref} className="reveal" style={{ transitionDelay: `${delay}ms`, ...style }}>{children}</div>;
};

/* ── Animated Counter ── */
const Counter = ({ target, suffix = "", duration = 1800, decimals = 0 }) => {
  const [val, setVal] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setStarted(true); obs.disconnect(); } }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  useEffect(() => {
    if (!started) return;
    let start = null;
    const step = ts => { if (!start) start = ts; const p = Math.min((ts - start) / duration, 1); const ease = 1 - Math.pow(1 - p, 3); const cur = ease * target; setVal(decimals ? parseFloat(cur.toFixed(decimals)) : Math.floor(cur)); if (p < 1) requestAnimationFrame(step); };
    requestAnimationFrame(step);
  }, [started, target, duration, decimals]);
  return <span ref={ref} style={{ fontFamily: "var(--font-mono)", fontWeight: 700 }}>{decimals ? val.toFixed(decimals) : val}{suffix}</span>;
};

/* ── Glow Card ── */
const GC = ({ children, style = {}, className = "", tilt = false }) => {
  const ref = useRef(null);
  const onMove = e => { const r = ref.current.getBoundingClientRect(); ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`); ref.current.style.setProperty("--my", `${e.clientY - r.top}px`); if (tilt) { const cx = (e.clientX - r.left - r.width / 2) / r.width; const cy = (e.clientY - r.top - r.height / 2) / r.height; ref.current.style.transform = `perspective(900px) rotateY(${cx * 7}deg) rotateX(${-cy * 5}deg) translateY(-3px)`; } };
  const onLeave = () => { if (tilt && ref.current) ref.current.style.transform = ""; };
  return <div ref={ref} className={`gc ${className}`} onMouseMove={onMove} onMouseLeave={onLeave} style={style}>{children}</div>;
};

/* ── Terminal ── */
const Terminal = () => {
  const cmds = [
    { cmd: "pip install efficiency", out: "Successfully installed efficiency-∞" },
    { cmd: 'git commit -m "innovation"', out: "[main] 1 file changed, ∞ insertions(+)" },
    { cmd: "npm run impact", out: "✓ Impact delivered to 100+ students" },
    { cmd: "kubectl deploy scalable-api", out: "deployment scaled to 10 replicas ✓" },
    { cmd: "python research.py --publish", out: "📄 Published: IEEE Xplore ICECAA 2023" },
  ];
  const [idx, setIdx] = useState(0);
  const [text, setText] = useState("");
  const [phase, setPhase] = useState("typing");
  const [showOut, setShowOut] = useState(false);
  const [history, setHistory] = useState([]);
  useEffect(() => {
    const cmd = cmds[idx].cmd;
    if (phase === "typing") { if (text.length < cmd.length) { const t = setTimeout(() => setText(cmd.slice(0, text.length + 1)), 55); return () => clearTimeout(t); } const t = setTimeout(() => { setShowOut(true); setPhase("wait"); }, 300); return () => clearTimeout(t); }
    if (phase === "wait") { const t = setTimeout(() => { setHistory(h => [...h.slice(-3), { cmd: cmds[idx].cmd, out: cmds[idx].out }]); setIdx(i => (i + 1) % cmds.length); setText(""); setShowOut(false); setPhase("typing"); }, 1800); return () => clearTimeout(t); }
  }, [text, phase, idx]);
  return (
    <div className="gc" style={{ padding: "22px 26px", background: "rgba(0,0,0,0.72)", border: "1px solid rgba(255,255,255,0.1)", maxWidth: 500, width: "100%", position: "relative", height: "260px", overflow: "hidden", display: "flex", flexDirection: "column" }}>
      <div style={{ position: "absolute", left: 0, right: 0, height: 1, background: "linear-gradient(90deg,transparent,rgba(59,158,255,0.4),transparent)", animation: "scanline 2.8s linear infinite", pointerEvents: "none" }} />
      {/* Title bar */}
      <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 18, flexShrink: 0 }}>
        {["#ff5f57", "#febc2e", "#28c840"].map(c => <div key={c} style={{ width: 11, height: 11, borderRadius: "50%", background: c }} />)}
        <span style={{ marginLeft: 10, fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)" }}>yash@gehu — bash</span>
      </div>
      {/* Content area — fixed, no layout shift */}
      <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
        {history.map((h, i) => (
          <div key={i} style={{ marginBottom: 6, opacity: Math.max(0.12, 0.4 - i * 0.1), flexShrink: 0 }}>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11.5 }}><span style={{ color: "var(--green)" }}>yash</span><span style={{ color: "var(--blue)" }}>@dev</span><span style={{ color: "var(--dim)" }}>:~$ </span><span style={{ color: "#e2e8f0" }}>{h.cmd}</span></div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)", paddingLeft: 4 }}>{h.out}</div>
          </div>
        ))}
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, flexShrink: 0 }}>
          <div><span style={{ color: "var(--green)" }}>yash</span><span style={{ color: "var(--blue)" }}>@dev</span><span style={{ color: "var(--dim)" }}>:~$ </span><span style={{ color: "#e2e8f0" }}>{text}</span><span style={{ display: "inline-block", width: 7, height: 15, background: "var(--blue)", marginLeft: 1, verticalAlign: "middle", animation: "blink 1s step-end infinite" }} /></div>
          {showOut && <div style={{ fontFamily: "var(--font-mono)", fontSize: 11.5, color: "var(--green)", paddingLeft: 4, marginTop: 4, animation: "fadeIn 0.3s ease" }}>{cmds[idx].out}</div>}
        </div>
      </div>
    </div>
  );
};

/* ── Nav ── */
const Nav = ({ active }) => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => { const h = () => setScrolled(window.scrollY > 50); window.addEventListener("scroll", h, { passive: true }); return () => window.removeEventListener("scroll", h); }, []);
  const links = ["About", "Work", "Projects", "Skills", "Contact"];
  return (
    <nav className={scrolled ? "scrolled" : ""}>
      <a href="#hero" className="nav-logo">yg<span>.</span>dev</a>
      <ul className={`nav-links${open ? " open" : ""}`}>
        {links.map(l => <li key={l}><a href={`#${l.toLowerCase()}`} className={active === l.toLowerCase() ? "active" : ""} onClick={() => setOpen(false)}>{l}</a></li>)}
      </ul>
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <a href="mailto:yashgupta11122004@gmail.com" className="btn-p" style={{ padding: "9px 18px", fontSize: 13 }}>Hire Me</a>
        <button onClick={() => setOpen(o => !o)} style={{ background: "none", border: "1px solid var(--border)", borderRadius: 8, padding: "8px 10px", cursor: "pointer", color: "var(--text)", display: "none" }} id="ham">
          <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>{open ? <path d="M6 18L18 6M6 6l12 12" strokeLinecap="round" /> : <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" />}</svg>
        </button>
      </div>
      <style>{`@media(max-width:768px){#ham{display:flex !important}}`}</style>
    </nav>
  );
};

/* ── Section Observer ── */
const useActive = ids => {
  const [active, setActive] = useState("");
  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id); }), { threshold: 0.35 });
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);
  return active;
};

/* ══════════════════════════════════════════════════════
   HERO — Classic Split Layout
══════════════════════════════════════════════════════ */
const Hero = () => {
  const words = ["Engineering", "Scalable", "Systems", "&", "Researching", "AI."];
  const PHOTO = "https://raw.githubusercontent.com/YASHGUPTA11122004/Portfolio/main/photo.jpeg";
  const stats = [
    { val: 8.41, suf: "", label: "CGPA", color: "var(--blue)", dec: 2 },
    { val: 500, suf: "+", label: "Problems", color: "var(--purple)", dec: 0 },
    { val: 100, suf: "d", label: "Streak", color: "var(--green)", dec: 0 },
    { val: 2, suf: "", label: "Internships", color: "var(--amber)", dec: 0 },
  ];
  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "flex-start", padding: "100px 48px 60px", maxWidth: 1200, margin: "0 auto" }}>

      {/* ── LEFT COLUMN (60%) ── */}
      <div style={{ flex: "0 0 58%", paddingRight: 48 }}>

        {/* Status badge */}
        <div style={{ animation: "fadeUp 0.6s ease both", animationDelay: "0.05s", opacity: 0, marginBottom: 20 }}>
          <span className="chip" style={{ display: "inline-flex", borderColor: "rgba(16,185,129,0.35)", background: "rgba(16,185,129,0.07)" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--green)", boxShadow: "0 0 8px var(--green)", animation: "pulseRing 2s ease infinite" }} />
            <span style={{ color: "var(--green)" }}>Open to Opportunities · 8th Sem CSE</span>
          </span>
        </div>

        {/* Hi intro */}
        <div style={{ animation: "fadeUp 0.6s ease both", animationDelay: "0.12s", opacity: 0, marginBottom: 6 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 16, color: "var(--blue)" }}>Hi, I'm</span>
        </div>

        {/* Name only */}
        <div style={{ animation: "fadeUp 0.6s ease both", animationDelay: "0.2s", opacity: 0, marginBottom: 4 }}>
          <h2 style={{ fontSize: "clamp(40px,5.5vw,68px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.05 }}>
            Yash Gupta
          </h2>
        </div>

        {/* Role */}
        <div style={{ animation: "fadeUp 0.6s ease both", animationDelay: "0.28s", opacity: 0, marginBottom: 24 }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 14, color: "var(--dim)" }}>
            Software Engineer · <span style={{ color: "var(--blue)" }}>New Delhi, India</span>
          </span>
        </div>

        {/* Headline */}
        <h1 style={{ fontSize: "clamp(22px,3.2vw,38px)", fontWeight: 700, lineHeight: 1.2, letterSpacing: "-0.025em", marginBottom: 16, animation: "fadeUp 0.6s ease both", animationDelay: "0.36s", opacity: 0 }}>
          {words.map((w, i) => (
            <span key={i} style={{ display: "inline-block", marginRight: "0.2em" }}>
              {(i === 1 || i === 2) ? <span className="gt">{w}</span> : w}
            </span>
          ))}
        </h1>

        {/* Sub */}
        <p style={{ fontSize: 14, color: "var(--dim)", maxWidth: 480, marginBottom: 20, lineHeight: 1.75, animation: "fadeUp 0.6s ease both", animationDelay: "0.44s", opacity: 0 }}>
          CS Undergrad <span style={{ color: "var(--blue)", fontWeight: 600 }}>@ Graphic Era Hill University</span>, Bhimtal ·{" "}
          <span style={{ fontFamily: "var(--font-mono)", color: "var(--text)", fontSize: 13 }}>8.41 CGPA</span> · Code. Build. Ship. Repeat.
        </p>

        {/* Currently building */}
        <div style={{ animation: "fadeUp 0.6s ease both", animationDelay: "0.52s", opacity: 0, marginBottom: 28 }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "7px 14px", borderRadius: 8, border: "1px solid rgba(245,158,11,0.25)", background: "rgba(245,158,11,0.06)", fontSize: 12 }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--amber)", animation: "blink 1.5s ease infinite", flexShrink: 0 }} />
            <span style={{ fontFamily: "var(--font-mono)", color: "var(--amber)" }}>Building: </span>
            <span style={{ color: "var(--dim)" }}>AI-Driven Traffic Violation Detection System</span>
          </div>
        </div>

        {/* CTAs */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 40, animation: "fadeUp 0.6s ease both", animationDelay: "0.6s", opacity: 0 }}>
          <a href="#projects" className="btn-p">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" strokeLinecap="round" strokeLinejoin="round"/></svg>
            View Projects
          </a>
          <a href="https://github.com/YASHGUPTA11122004" target="_blank" rel="noopener" className="btn-g">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            GitHub
          </a>
          <a href="https://linkedin.com/in/yashgupta11122004" target="_blank" rel="noopener" className="btn-g">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            LinkedIn
          </a>
          <a href="https://drive.google.com/file/d/1w8IwRzTqEJP5QccNCDxuK6njsAWu0Wgq/view?usp=sharing" target="_blank" rel="noopener" className="btn-g">
            <svg width="14" height="14" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Résumé
          </a>
        </div>

        {/* Terminal */}
        <div style={{ animation: "fadeUp 0.6s ease both", animationDelay: "0.72s", opacity: 0 }}>
          <Terminal />
        </div>
      </div>

      {/* ── RIGHT COLUMN (42%) — Photo top aligned with name ── */}
      <div style={{ flex: "0 0 42%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "flex-start", paddingTop: 0, gap: 24, animation: "fadeIn 0.8s ease both", animationDelay: "0.4s", opacity: 0 }}>

        {/* Big Photo — top */}
        <div style={{ position: "relative" }}>
          <div style={{
            width: 240, height: 240, borderRadius: "50%",
            background: "linear-gradient(135deg,#3b9eff,#8b5cf6,#06b6d4)",
            padding: 4,
            boxShadow: "0 0 60px rgba(59,158,255,0.4), 0 0 100px rgba(139,92,246,0.25)",
            animation: "float 5s ease-in-out infinite",
          }}>
            <img
              src={PHOTO}
              alt="Yash Gupta"
              style={{ width: "100%", height: "100%", borderRadius: "50%", objectFit: "cover", objectPosition: "center top", border: "4px solid var(--bg)" }}
            />
          </div>
          {/* Online dot */}
          <div style={{ position: "absolute", bottom: 14, right: 14, width: 18, height: 18, borderRadius: "50%", background: "var(--green)", border: "3px solid var(--bg)", boxShadow: "0 0 12px var(--green)" }} />
          {/* Spinning ring */}
          <div style={{ position: "absolute", inset: -10, borderRadius: "50%", border: "1px dashed rgba(59,158,255,0.25)", animation: "spin 20s linear infinite" }} />
        </div>

        {/* Stats grid — below photo */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, width: "100%", maxWidth: 280 }}>
          {stats.map((s, i) => (
            <div key={s.label} style={{
              padding: "18px 14px", borderRadius: 12,
              border: "1px solid var(--border)", background: "var(--surface)",
              textAlign: "center", backdropFilter: "blur(12px)",
              animation: `float ${4 + i * 0.5}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
              transition: "border-color 0.2s, box-shadow 0.2s",
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.boxShadow = `0 0 20px ${s.color}33`; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = ""; e.currentTarget.style.boxShadow = ""; }}
            >
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 26, fontWeight: 700, color: s.color, lineHeight: 1 }}>
                <Counter target={s.val} suffix={s.suf} decimals={s.dec} />
              </div>
              <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 5, fontFamily: "var(--font-mono)" }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media(max-width:900px){
          #hero { flex-direction: column !important; padding-top: 100px !important; }
          #hero > div:first-child { padding-right: 0 !important; flex: unset !important; }
          #hero > div:last-child { flex: unset !important; width: 100% !important; }
          #hero > div:last-child > div:first-child > div:first-child { width: 180px !important; height: 180px !important; }
          .name-avatar { display: none !important; }
        }
      `}</style>
    </section>
  );
};

/* ══════════════════════════════════════════════════════
   BENTO — PROOF OF WORK
══════════════════════════════════════════════════════ */
const Bento = () => {
  const cloud = [
    { name: "Kubernetes", color: "#326CE5", bg: "rgba(50,108,229,0.12)", icon: "⎈" },
    { name: "BigQuery", color: "#4285F4", bg: "rgba(66,133,244,0.12)", icon: "◈" },
    { name: "IAM", color: "#EA4335", bg: "rgba(234,67,53,0.12)", icon: "🔐" },
    { name: "Cloud Run", color: "#34A853", bg: "rgba(52,168,83,0.12)", icon: "▶" },
    { name: "Pub/Sub", color: "#FBBC05", bg: "rgba(251,188,5,0.12)", icon: "◎" },
  ];
  const coding = [
    { n: 200, suf: "+", label: "LeetCode", color: "var(--blue)", url: "https://leetcode.com/u/yashgupta11122004/" },
    { n: 200, suf: "+", label: "CodeChef", color: "var(--purple)", url: "https://www.codechef.com/users/yashgupta_04" },
    { n: 150, suf: "+", label: "GFG", color: "var(--green)", url: "https://www.geeksforgeeks.org/profile/yashguptaidtb" },
  ];
  return (
    <section id="about" style={{ padding: "80px 48px", maxWidth: 1200, margin: "0 auto" }}>
      <Reveal>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--blue)", marginBottom: 10 }}>proof of work</div>
        <h2 style={{ fontSize: "clamp(28px,4.5vw,48px)", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: 48 }}>By the Numbers</h2>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }}>

        {/* IEEE */}
        <Reveal delay={0}>
          <GC style={{ padding: "30px", height: "100%" }} tilt>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <div style={{ width: 38, height: 38, borderRadius: 9, background: "rgba(59,158,255,0.1)", border: "1px solid rgba(59,158,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>📄</div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <span className="chip" style={{ fontSize: 10, borderColor: "rgba(59,158,255,0.3)", color: "var(--blue)", background: "rgba(59,158,255,0.08)" }}>IEEE Xplore</span>
                <span className="chip" style={{ fontSize: 10, borderColor: "rgba(16,185,129,0.3)", color: "var(--green)", background: "rgba(16,185,129,0.08)" }}>Peer Reviewed</span>
              </div>
            </div>
            <h3 style={{ fontSize: 15, fontWeight: 600, marginBottom: 10, lineHeight: 1.4 }}>Published Research</h3>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--blue)", lineHeight: 1.6, marginBottom: 14, background: "rgba(59,158,255,0.05)", padding: "10px 12px", borderRadius: 8, border: "1px solid rgba(59,158,255,0.1)" }}>
              "The Role of AI in Biometrics"
            </div>
            <p style={{ fontSize: 12, color: "var(--dim)", lineHeight: 1.65, marginBottom: 14 }}>
              Published at <span style={{ color: "var(--text)" }}>ICECAA 2023</span> — 2nd Int. Conf. on Edge Computing & Applications. AI-based pattern recognition for biometric accuracy under real-world conditions.
            </p>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {["AI/ML", "Biometrics", "Edge Computing", "2023"].map(t => <span key={t} className="chip">{t}</span>)}
            </div>
          </GC>
        </Reveal>

        {/* Coding Grit */}
        <Reveal delay={80}>
          <GC style={{ padding: "30px", height: "100%" }} tilt>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--amber)", marginBottom: 6 }}>coding grit</div>
            <div style={{ fontSize: 13, color: "var(--dim)", marginBottom: 22 }}>Consistent · Relentless · Improving</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 22 }}>
              {coding.map(s => (
                <a key={s.label} href={s.url} target="_blank" rel="noopener" style={{ textDecoration: "none", textAlign: "center", padding: "10px 6px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--surface)", transition: "all 0.2s", cursor: "pointer" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = s.color; e.currentTarget.style.background = `${s.color}11`; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = ""; e.currentTarget.style.background = ""; }}>
                  <div style={{ fontSize: "clamp(18px,2.5vw,26px)", fontWeight: 700, color: s.color, lineHeight: 1, fontFamily: "var(--font-mono)" }}>
                    <Counter target={s.n} suffix={s.suf} />
                  </div>
                  <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 4 }}>{s.label}</div>
                </a>
              ))}
            </div>
            <div style={{ borderTop: "1px solid var(--border)", paddingTop: 18, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 40, fontWeight: 700, lineHeight: 1 }}>
                  <Counter target={500} suffix="+" />
                </div>
                <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 3 }}>Total Problems Solved</div>
              </div>
              <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: 6 }}>
                <span className="chip" style={{ fontSize: 10, color: "var(--green)", borderColor: "rgba(16,185,129,0.3)", background: "rgba(16,185,129,0.08)" }}>🔥 LeetCode 100d</span>
                <span className="chip" style={{ fontSize: 10, color: "var(--amber)", borderColor: "rgba(245,158,11,0.3)", background: "rgba(245,158,11,0.08)" }}>🔥 CodeChef 100d</span>
              </div>
            </div>
          </GC>
        </Reveal>

        {/* Cloud */}
        <Reveal delay={160}>
          <GC style={{ padding: "30px", height: "100%" }} tilt>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
              <div style={{ width: 38, height: 38, borderRadius: 9, background: "rgba(234,67,53,0.1)", border: "1px solid rgba(234,67,53,0.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>☁️</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600 }}>Google Cloud</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>Skill Boost — Cohort 1 & 2</div>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
              {cloud.map(b => (
                <div key={b.name} style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 12px", borderRadius: 8, background: b.bg, border: `1px solid ${b.color}33`, fontSize: 12, fontWeight: 500, transition: "transform 0.2s", cursor: "default" }}
                  onMouseEnter={e => e.currentTarget.style.transform = "scale(1.06)"}
                  onMouseLeave={e => e.currentTarget.style.transform = ""}>
                  <span>{b.icon}</span><span style={{ color: b.color }}>{b.name}</span>
                </div>
              ))}
            </div>
            <div style={{ padding: "9px 12px", borderRadius: 8, background: "rgba(255,255,255,0.025)", border: "1px solid var(--border)", fontFamily: "var(--font-mono)", fontSize: 10.5, color: "var(--muted)" }}>
              $ gcloud container clusters list --filter="status=RUNNING"
            </div>
          </GC>
        </Reveal>

        {/* CGPA span-3 */}
        <Reveal delay={240} style={{ gridColumn: "span 3" }}>
          <GC style={{ padding: "28px 36px", background: "linear-gradient(135deg,rgba(59,158,255,0.04),rgba(139,92,246,0.04))", border: "1px solid rgba(99,179,255,0.12)", animation: "borderGlow 4s ease-in-out infinite" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 40, flexWrap: "wrap" }}>
              <div>
                <div style={{ fontSize: 11, color: "var(--muted)", fontFamily: "var(--font-mono)", marginBottom: 6 }}>academic performance</div>
                <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1 }}><span className="gt">8.41</span></div>
                <div style={{ fontSize: 12, color: "var(--muted)", marginTop: 6 }}>CGPA · GEHU Bhimtal · B.Tech CSE · 2022–2026</div>
              </div>
              <div style={{ flex: 1, minWidth: 200 }}>
                {[["Year 1", 85.25], ["Year 2", 84.7], ["Year 3", 82.55], ["Year 4 (Sem 7)", 79.9]].map(([label, v]) => (
                  <div key={label} style={{ marginBottom: 9 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 10, color: "var(--muted)", marginBottom: 4, fontFamily: "var(--font-mono)" }}><span>{label}</span><span>{v}%</span></div>
                    <div style={{ height: 4, background: "rgba(255,255,255,0.05)", borderRadius: 2, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${v}%`, borderRadius: 2, background: "linear-gradient(90deg,var(--blue),var(--purple))", transition: "width 1.5s cubic-bezier(.22,1,.36,1)", transitionDelay: "0.5s" }} />
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[{ label: "IEEE Publication", val: "1", color: "var(--blue)" }, { label: "Internships", val: "2", color: "var(--purple)" }, { label: "Projects", val: "15+", color: "var(--cyan)" }].map(s => (
                  <div key={s.label} style={{ textAlign: "center", padding: "10px 18px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--surface)" }}>
                    <div style={{ fontFamily: "var(--font-mono)", fontSize: 26, fontWeight: 700, color: s.color }}>{s.val}</div>
                    <div style={{ fontSize: 10, color: "var(--muted)", marginTop: 2 }}>{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </GC>
        </Reveal>
      </div>
      <style>{`@media(max-width:768px){#about .gc{grid-column:span 1 !important} #about>div>div:last-child{grid-template-columns:1fr !important}}`}</style>
    </section>
  );
};

/* ══════════════════════════════════════════════════════
   EXPERIENCE
══════════════════════════════════════════════════════ */
const Experience = () => {
  const jobs = [
    {
      role: "Software Developer Intern", company: "ARIES", full: "Aryabhatta Research Institute of Observational Sciences",
      period: "Aug 2024 – Dec 2024", location: "Nainital, India", color: "var(--blue)", icon: "🔭",
      tools: ["Python", "Odoo", "Linux", "PostgreSQL", "Agile", "ERP"],
      points: [
        "Developed ERP modules using Python (Odoo) to automate HR and inventory workflows for improved data handling",
        "Built dynamic reporting tools with auto summaries, charts, and activity logs for administrative insights",
        "Deployed solutions on Linux servers with rollback support and unit testing for stable delivery",
        "Collaborated in Agile sprint planning and backend architecture discussions for scalable system design",
      ],
    },
    {
      role: "Java Developer Intern", company: "Technohacks Edutech", full: "Technohacks Edutech",
      period: "Jul 2024 – Aug 2024", location: "Remote", color: "var(--purple)", icon: "💻",
      tools: ["Java", "Swing", "OOP", "Event-Driven", "GUI"],
      points: [
        "Developed interactive desktop applications to strengthen core Java concepts and event-driven programming",
        "Implemented GUI-based programs using Swing, focusing on user input handling and dynamic interfaces",
        "Practiced OOP design principles and logic structuring for real-time response and modular code",
      ],
    },
  ];
  return (
    <section id="work" style={{ padding: "80px 48px", maxWidth: 1200, margin: "0 auto" }}>
      <Reveal>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--blue)", marginBottom: 10 }}>experience</div>
        <h2 style={{ fontSize: "clamp(28px,4.5vw,48px)", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: 56 }}>Engineering Timeline</h2>
      </Reveal>
      <div style={{ position: "relative" }}>
        <div style={{ position: "absolute", left: 19, top: 8, bottom: 0, width: 2, background: "linear-gradient(to bottom,var(--blue),var(--purple),transparent)", borderRadius: 1 }} />
        <div style={{ paddingLeft: 56, display: "flex", flexDirection: "column", gap: 28 }}>
          {jobs.map((j, i) => (
            <Reveal key={j.company} delay={i * 120}>
              <div style={{ position: "relative" }}>
                <div style={{ position: "absolute", left: -45, top: 30, width: 12, height: 12, borderRadius: "50%", background: j.color, boxShadow: `0 0 16px ${j.color},0 0 32px ${j.color}66`, border: "2px solid var(--bg)" }} />
                <GC style={{ padding: "28px 32px" }} tilt>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 18 }}>
                    <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                      <div style={{ width: 44, height: 44, borderRadius: 10, border: `1px solid ${j.color}33`, background: `${j.color}11`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22 }}>{j.icon}</div>
                      <div>
                        <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 2 }}>{j.role}</h3>
                        <div style={{ fontSize: 13, color: j.color, fontWeight: 600 }}>{j.company}</div>
                        <div style={{ fontSize: 11, color: "var(--muted)", marginTop: 1 }}>{j.full} · {j.location}</div>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <span className="chip" style={{ borderColor: `${j.color}44`, color: j.color, background: `${j.color}0d` }}>{j.period}</span>
                    </div>
                  </div>
                  <ul style={{ listStyle: "none", marginBottom: 18 }}>
                    {j.points.map((p, pi) => (
                      <li key={pi} style={{ fontSize: 13.5, color: "var(--dim)", lineHeight: 1.65, paddingLeft: 18, position: "relative", marginBottom: 8 }}>
                        <span style={{ position: "absolute", left: 0, color: j.color, fontWeight: 700 }}>›</span>{p}
                      </li>
                    ))}
                  </ul>
                  <div style={{ display: "flex", gap: 7, flexWrap: "wrap" }}>
                    {j.tools.map(t => <span key={t} className="chip">{t}</span>)}
                  </div>
                </GC>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════════════
   PROJECTS
══════════════════════════════════════════════════════ */
const Projects = () => {
  const [filter, setFilter] = useState("All");
  const tags = ["All", "Python", "React", "JavaScript", "AI/ML"];
  const projects = [
    {
      name: "CodeBox", emoji: "📦",
      stack: ["React.js", "Django", "Python", "REST API", "AST"],
      tags: ["React", "Python"],
      desc: "Educational compiler tool for pseudocode and syntax tree generation. Enabled live debugging and AST visualization used by 100+ students in compiler lab.",
      badge: "100+ Students", badgeColor: "var(--green)",
      highlight: "React + Django · Live AST Visualization",
      github: "https://github.com/Yash-Git2004/compiler",
      live: null, featured: true,
      period: "Feb 2025 – Jun 2025",
    },
    {
      name: "Process Management System", emoji: "⚙️",
      stack: ["Python", "Queues", "OS Concepts", "CLI"],
      tags: ["Python"],
      desc: "Simulated FCFS and Round Robin CPU scheduling in Python with real-time process state visuals. Used queues and data structures for CPU cycle management.",
      badge: "OS Simulator", badgeColor: "var(--purple)",
      highlight: "Scheduling Algorithm Visualization",
      github: "https://github.com/Geet9337/software_en",
      live: null, featured: false,
      period: "Aug 2024 – Feb 2025",
    },
    {
      name: "Weather Dashboard", emoji: "🌤",
      stack: ["JavaScript", "OpenWeather API", "Async/Await", "JSON"],
      tags: ["JavaScript"],
      desc: "Live weather dashboard using OpenWeather API with responsive UI, multi-city toggle, and async API handling. Practiced RESTful design and JSON parsing.",
      badge: "Live API", badgeColor: "var(--cyan)",
      highlight: "OpenWeather API · Async JavaScript",
      github: null,
      live: null, featured: false,
      period: "Nov 2023 – Dec 2023",
    },
    {
      name: "AI Biometrics Research", emoji: "🔬",
      stack: ["Python", "TensorFlow", "OpenCV", "CNN", "NumPy"],
      tags: ["AI/ML", "Python"],
      desc: "Deep learning model for AI-based biometric pattern recognition. Published in IEEE Xplore at ICECAA 2023. Focused on accuracy improvements under real-world conditions.",
      badge: "IEEE Published", badgeColor: "var(--amber)",
      highlight: "Published · IEEE Xplore · ICECAA 2023",
      github: null,
      live: "https://ieeexplore.ieee.org", featured: true,
      period: "2023",
    },
  ];
  const filtered = filter === "All" ? projects : projects.filter(p => p.tags.includes(filter));
  return (
    <section id="projects" style={{ padding: "80px 48px", maxWidth: 1200, margin: "0 auto" }}>
      <Reveal>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--blue)", marginBottom: 10 }}>featured projects</div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 20, marginBottom: 40 }}>
          <h2 style={{ fontSize: "clamp(28px,4.5vw,48px)", fontWeight: 700, letterSpacing: "-0.025em" }}>Things I've Built</h2>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {tags.map(t => (
              <button key={t} onClick={() => setFilter(t)} style={{ padding: "7px 16px", borderRadius: 999, fontSize: 12, fontFamily: "var(--font-mono)", border: `1px solid ${filter === t ? "var(--blue)" : "var(--border)"}`, background: filter === t ? "rgba(59,158,255,0.12)" : "var(--surface)", color: filter === t ? "var(--blue)" : "var(--muted)", cursor: "pointer", transition: "all 0.2s" }}>{t}</button>
            ))}
          </div>
        </div>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(310px,1fr))", gap: 18 }}>
        {filtered.map((p, i) => (
          <Reveal key={p.name + filter} delay={i * 70}>
            <GC style={{ padding: "28px", height: "100%", display: "flex", flexDirection: "column", border: p.featured ? "1px solid rgba(59,158,255,0.2)" : undefined }} tilt>
              {p.featured && <div style={{ position: "absolute", top: 0, right: 0, padding: "4px 12px", borderRadius: "0 16px 0 12px", background: "linear-gradient(135deg,#3b9eff,#6366f1)", fontSize: 10, fontWeight: 600, color: "#fff", fontFamily: "var(--font-mono)" }}>★ Featured</div>}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                <div style={{ fontSize: 28 }}>{p.emoji}</div>
                <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                  <span className="chip" style={{ fontSize: 10, color: "var(--muted)", fontFamily: "var(--font-mono)" }}>{p.period}</span>
                  <span className="chip" style={{ fontSize: 10, borderColor: `${p.badgeColor}44`, color: p.badgeColor, background: `${p.badgeColor}11` }}>{p.badge}</span>
                </div>
              </div>
              <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, letterSpacing: "-0.01em" }}>{p.name}</h3>
              <p style={{ fontSize: 13.5, color: "var(--dim)", lineHeight: 1.7, marginBottom: 16, flex: 1 }}>{p.desc}</p>
              <div style={{ padding: "8px 12px", borderRadius: 7, background: "rgba(59,158,255,0.05)", border: "1px solid rgba(59,158,255,0.1)", marginBottom: 14 }}>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--blue)" }}>★ {p.highlight}</span>
              </div>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
                {p.stack.map(s => <span key={s} className="chip">{s}</span>)}
              </div>
              <div style={{ display: "flex", gap: 8, marginTop: "auto" }}>
                {p.github && <a href={p.github} target="_blank" rel="noopener" className="btn-g" style={{ flex: 1, justifyContent: "center", fontSize: 12 }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                  GitHub
                </a>}
                {p.live && <a href={p.live} target="_blank" rel="noopener" className="btn-g" style={{ flex: 1, justifyContent: "center", fontSize: 12 }}>View ↗</a>}
                {!p.github && !p.live && <div className="btn-g" style={{ flex: 1, justifyContent: "center", fontSize: 12, opacity: 0.5, cursor: "default" }}>Private / Research</div>}
              </div>
            </GC>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════════════
   SKILLS
══════════════════════════════════════════════════════ */
const Skills = () => {
  const groups = [
    { label: "Languages", color: "var(--blue)", items: [{ n: "Python", p: 90 }, { n: "Java", p: 85 }, { n: "JavaScript", p: 78 }, { n: "C++", p: 80 }, { n: "C", p: 75 }, { n: "SQL", p: 82 }] },
    { label: "Web Development", color: "var(--cyan)", items: [{ n: "React.js", p: 82 }, { n: "Django", p: 84 }, { n: "HTML5/CSS3", p: 88 }, { n: "REST APIs", p: 86 }] },
    { label: "Databases", color: "var(--purple)", items: [{ n: "PostgreSQL", p: 80 }, { n: "MySQL", p: 78 }] },
    { label: "AI / ML", color: "var(--amber)", items: [{ n: "TensorFlow", p: 70 }, { n: "OpenCV", p: 72 }, { n: "NumPy", p: 85 }, { n: "Pandas", p: 84 }] },
    { label: "Tools & Cloud", color: "var(--green)", items: [{ n: "Git/GitHub", p: 90 }, { n: "Linux", p: 80 }, { n: "Docker", p: 68 }, { n: "Kubernetes", p: 62 }, { n: "GCP", p: 68 }, { n: "Figma", p: 65 }] },
    { label: "Core CS", color: "#e879f9", items: [{ n: "DSA", p: 88 }, { n: "OOP", p: 90 }, { n: "OS", p: 82 }, { n: "DBMS", p: 84 }, { n: "CN", p: 78 }, { n: "Compiler Design", p: 80 }] },
  ];

  const Bar = ({ name, pct, color }) => {
    const ref = useRef(null);
    const [go, setGo] = useState(false);
    useEffect(() => {
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setGo(true); obs.disconnect(); } }, { threshold: 0.5 });
      if (ref.current) obs.observe(ref.current);
      return () => obs.disconnect();
    }, []);
    return (
      <div ref={ref} style={{ marginBottom: 11 }}>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: "var(--dim)", marginBottom: 5, fontFamily: "var(--font-mono)" }}>
          <span>{name}</span><span style={{ color }}>{pct}%</span>
        </div>
        <div style={{ height: 4, background: "rgba(255,255,255,0.05)", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ height: "100%", borderRadius: 3, background: `linear-gradient(90deg,${color},${color}88)`, width: go ? `${pct}%` : "0%", transition: "width 1.4s cubic-bezier(.22,1,.36,1)", transitionDelay: "0.2s" }} />
        </div>
      </div>
    );
  };

  return (
    <section id="skills" style={{ padding: "80px 48px", maxWidth: 1200, margin: "0 auto" }}>
      <Reveal>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--blue)", marginBottom: 10 }}>tech stack</div>
        <h2 style={{ fontSize: "clamp(28px,4.5vw,48px)", fontWeight: 700, letterSpacing: "-0.025em", marginBottom: 48 }}>Skills & Tools</h2>
      </Reveal>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(260px,1fr))", gap: 18 }}>
        {groups.map((g, gi) => (
          <Reveal key={g.label} delay={gi * 70}>
            <GC style={{ padding: "24px" }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: g.color, marginBottom: 18, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 6, height: 6, borderRadius: "50%", background: g.color, boxShadow: `0 0 8px ${g.color}` }} />
                {g.label}
              </div>
              {g.items.map(s => <Bar key={s.n} name={s.n} pct={s.p} color={g.color} />)}
            </GC>
          </Reveal>
        ))}
      </div>

      {/* Extra-curricular */}
      <Reveal delay={200} style={{ marginTop: 32 }}>
        <GC style={{ padding: "28px 32px" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--purple)", marginBottom: 16 }}>extra-curricular</div>
          <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
            {[
              { icon: "🤝", title: "NSS Volunteer", desc: "Campus outreach & awareness drives" },
              { icon: "🌱", title: "Eco Club", desc: "Waste-to-Best campaigns & clean campus" },
              { icon: "📡", title: "URSI-RCRS 24 Organizer", desc: "Logistics & tech for IEEE conference" },
            ].map(a => (
              <div key={a.title} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "14px 18px", borderRadius: 10, border: "1px solid var(--border)", background: "var(--surface)", flex: "1 1 200px", transition: "border-color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(139,92,246,0.4)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = ""}>
                <span style={{ fontSize: 20 }}>{a.icon}</span>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 2 }}>{a.title}</div>
                  <div style={{ fontSize: 12, color: "var(--muted)" }}>{a.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </GC>
      </Reveal>
    </section>
  );
};

/* ══════════════════════════════════════════════════════
   CONTACT
══════════════════════════════════════════════════════ */
const Contact = () => {
  const [copied, setCopied] = useState(false);
  const email = "yashgupta11122004@gmail.com";
  const copy = async () => { await navigator.clipboard.writeText(email); setCopied(true); setTimeout(() => setCopied(false), 2200); };

  const socials = [
    { label: "GitHub", url: "https://github.com/YASHGUPTA11122004" },
    { label: "LinkedIn", url: "https://linkedin.com/in/yashgupta11122004" },
    { label: "LeetCode", url: "https://leetcode.com/u/yashgupta11122004/" },
    { label: "GFG", url: "https://www.geeksforgeeks.org/profile/yashguptaidtb" },
    { label: "CodeChef", url: "https://www.codechef.com/users/yashgupta_04" },
    { label: "IEEE", url: "https://ieeexplore.ieee.org" },
  ];

  return (
    <section id="contact" style={{ padding: "80px 48px 100px", maxWidth: 1200, margin: "0 auto" }}>
      <Reveal>
        <GC style={{ padding: "clamp(36px,6vw,72px)", textAlign: "center", background: "linear-gradient(135deg,rgba(59,158,255,0.04),rgba(139,92,246,0.04))", border: "1px solid rgba(99,179,255,0.13)", animation: "borderGlow 4s ease-in-out infinite" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--blue)", marginBottom: 10 }}>get in touch</div>
          <h2 style={{ fontSize: "clamp(30px,5.5vw,58px)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 14, marginTop: 8 }}>
            Let's Build Something
          </h2>
          <p style={{ fontSize: 16, color: "var(--dim)", maxWidth: 480, margin: "0 auto 42px", lineHeight: 1.75 }}>
            Open to internships, full-time roles, and interesting side-projects. Always excited about backend systems, AI/ML, and distributed architecture.
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 48 }}>
            <button onClick={copy} className="btn-p" style={{ minWidth: 200 }}>
              {copied
                ? <><svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/></svg>Copied!</>
                : <><svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/></svg>Copy Email</>}
            </button>
            <a href={`mailto:${email}`} className="btn-g">
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round" strokeLinejoin="round"/></svg>
              yashgupta11122004@gmail.com
            </a>
            <a href="tel:+919268319936" className="btn-g">
              <svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round" strokeLinejoin="round"/></svg>
              +91 92683 19936
            </a>
          </div>
          <div style={{ paddingTop: 32, borderTop: "1px solid var(--border)", display: "flex", gap: 24, justifyContent: "center", flexWrap: "wrap" }}>
            {socials.map(l => (
              <a key={l.label} href={l.url} target="_blank" rel="noopener" style={{ fontSize: 13, color: "var(--muted)", textDecoration: "none", transition: "color 0.2s", fontWeight: 500, fontFamily: "var(--font-mono)" }}
                onMouseEnter={e => e.currentTarget.style.color = "var(--text)"}
                onMouseLeave={e => e.currentTarget.style.color = ""}>
                {l.label} ↗
              </a>
            ))}
          </div>
        </GC>
      </Reveal>

      {/* Footer */}
      <div style={{ marginTop: 44, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12, paddingTop: 24, borderTop: "1px solid var(--border)" }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 12, color: "var(--muted)" }}>
          Designed & Built by <span style={{ color: "var(--blue)" }}>Yash Gupta</span> · {new Date().getFullYear()}
        </div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)" }}>
          <span style={{ color: "var(--dim)" }}>New Delhi, India</span> · <span style={{ color: "var(--dim)" }}>Bhimtal, Uttarakhand</span>
        </div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════════════════════
   ROOT APP
══════════════════════════════════════════════════════ */
export default function App() {
  const active = useActive(["hero", "about", "work", "projects", "skills", "contact"]);
  return (
    <>
      <GlobalStyles />
      <ScrollProgress />
      <Cursor />
      <Noise />
      <Stars />
      <MeshBg />
      <div style={{ position: "relative", zIndex: 2 }}>
        <Nav active={active} />
        <main>
          <Hero />
          <Bento />
          <Experience />
          <Projects />
          <Skills />
          <Contact />
        </main>
      </div>
    </>
  );
}
