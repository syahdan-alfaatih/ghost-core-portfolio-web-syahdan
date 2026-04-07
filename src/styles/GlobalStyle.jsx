// src/styles/GlobalStyle.jsx
import React from 'react';

export const GlobalStyle = () => (
  <style>{`
    html { scroll-behavior: smooth; }
    :root {
      --cyan: #22d3ee;
      --emerald: #34d399;
      --bg: #09090b;
      --mid: #18181b;
      --ease-expo: cubic-bezier(0.16, 1, 0.3, 1);
      --ease-power3: cubic-bezier(0.215, 0.61, 0.355, 1);
    }

    /* ---- PARALLAX LAYERS ---- */
    .parallax-bg { will-change: transform; }
    .parallax-mid { will-change: transform; }

    /* ---- FILM GRAIN TEXTURE ---- */
    @keyframes grainShift {
      0%,100% { transform: translate(0,0); }
      10% { transform: translate(-2%,-3%); }
      30% { transform: translate(3%,2%); }
      50% { transform: translate(-1%,4%); }
      70% { transform: translate(4%,-1%); }
      90% { transform: translate(-3%,3%); }
    }
    .grain-overlay {
      position: fixed; inset: -50%; z-index: 60; pointer-events: none;
      width: 200%; height: 200%;
      opacity: 0.028;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E");
      animation: grainShift 0.4s steps(1) infinite;
    }

    /* ---- GLITCH TEXT ---- */
    @keyframes glitch1 {
      0%,100% { clip-path: inset(0 0 95% 0); transform: translateX(-3px); }
      20% { clip-path: inset(30% 0 50% 0); transform: translateX(3px); }
      40% { clip-path: inset(60% 0 20% 0); transform: translateX(-2px); }
      60% { clip-path: inset(80% 0 5% 0); transform: translateX(2px); }
      80% { clip-path: inset(10% 0 70% 0); transform: translateX(-3px); }
    }
    @keyframes glitch2 {
      0%,100% { clip-path: inset(80% 0 5% 0); transform: translateX(3px); }
      20% { clip-path: inset(5% 0 80% 0); transform: translateX(-3px); }
      50% { clip-path: inset(40% 0 40% 0); transform: translateX(2px); }
      70% { clip-path: inset(20% 0 60% 0); transform: translateX(-2px); }
    }
    .glitch { position: relative; }
    .glitch::before, .glitch::after {
      content: attr(data-text);
      position: absolute; inset: 0;
      color: inherit;
      background: inherit;
      -webkit-background-clip: text;
      background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    .glitch::before { animation: glitch1 5s infinite; color: #06b6d4; left: 2px; }
    .glitch::after  { animation: glitch2 5s infinite; color: #34d399; left: -2px; }

    /* ---- SCANLINES ---- */
    @keyframes scanlines {
      0% { background-position: 0 0; }
      100% { background-position: 0 100px; }
    }
    .crt-scan {
      background-image: repeating-linear-gradient(
        0deg,
        rgba(0,0,0,0) 0px,
        rgba(0,0,0,0) 3px,
        rgba(0,0,0,0.12) 3px,
        rgba(0,0,0,0.12) 4px
      );
      animation: scanlines 10s linear infinite;
    }

    /* ---- GRID SCROLL ---- */
    @keyframes gridScroll {
      from { background-position: 0 0; }
      to { background-position: 64px 64px; }
    }
    .grid-anim {
      animation: gridScroll 10s linear infinite;
    }

    /* ---- FLICKER ---- */
    @keyframes flicker {
      0%,100% { opacity:1; } 92% { opacity:1; }
      93% { opacity:0.6; } 94% { opacity:1; }
      96% { opacity:0.75; } 97% { opacity:1; }
    }
    .flicker { animation: flicker 8s infinite; }

    /* ---- BEAM SWEEP ---- */
    @keyframes beam {
      0% { transform: translateX(-100%) skewX(-15deg); }
      100% { transform: translateX(400%) skewX(-15deg); }
    }
    .beam { animation: beam 3.5s var(--ease-expo) infinite; }

    /* ---- FLOAT (refined) ---- */
    @keyframes float {
      0%,100% { transform: translateY(0px); }
      50% { transform: translateY(-10px); }
    }
    .float { animation: float 5s ease-in-out infinite; }

    /* ---- GLOW PULSE ---- */
    @keyframes glowPulse {
      0%,100% { box-shadow: 0 0 8px rgba(34,211,238,0.2), 0 0 20px rgba(34,211,238,0.05); }
      50% { box-shadow: 0 0 20px rgba(34,211,238,0.5), 0 0 60px rgba(34,211,238,0.15); }
    }
    .glow-pulse { animation: glowPulse 3s ease-in-out infinite; }

    /* ---- SECTION SCENE TRANSITIONS — expo.out easing, staggered ---- */
    .scene-enter {
      opacity: 0;
      transform: translateY(50px);
      filter: blur(2px);
      transition:
        opacity 1s var(--ease-expo),
        transform 1s var(--ease-expo),
        filter 0.8s var(--ease-expo);
    }
    .scene-visible {
      opacity: 1;
      transform: translateY(0);
      filter: blur(0px);
    }

    /* Stagger children on reveal */
    .scene-visible > * { animation: none; }

    /* ---- PROGRESS BAR ---- */
    #scroll-progress {
      position: fixed; top: 0; left: 0; z-index: 9999;
      height: 2px;
      background: linear-gradient(90deg, #22d3ee, #34d399);
      box-shadow: 0 0 10px #22d3ee, 0 0 20px rgba(34,211,238,0.4);
      transition: width 0.08s linear;
    }

    /* ---- STICKY CARD ---- */
    .sticky-scene { position: sticky; top: 0; }

    /* ---- HOVER GLOW ---- */
    .card-hover {
      transition:
        border-color 0.4s var(--ease-power3),
        box-shadow 0.4s var(--ease-power3),
        transform 0.4s var(--ease-expo);
    }
    .card-hover:hover {
      border-color: rgba(34,211,238,0.5);
      box-shadow: 0 0 40px rgba(34,211,238,0.08), inset 0 0 40px rgba(34,211,238,0.03);
      transform: translateY(-3px);
    }

    /* ---- CURSOR CROSSHAIR ---- */
    body { cursor: crosshair; }
    a, button { cursor: crosshair; }

    /* ---- NEON BUTTON ---- */
    .neon-btn {
      position: relative; overflow: hidden;
      transition: color 0.35s var(--ease-power3), box-shadow 0.35s var(--ease-power3);
    }
    .neon-btn::before {
      content: '';
      position: absolute; inset: 0;
      background: linear-gradient(90deg, transparent, rgba(34,211,238,0.18), transparent);
      transform: translateX(-100%);
      transition: transform 0.6s var(--ease-expo);
    }
    .neon-btn:hover::before { transform: translateX(100%); }
    .neon-btn:hover { box-shadow: 0 0 24px rgba(34,211,238,0.45); }

    /* ---- DEPTH BLUR LAYERS ---- */
    .depth-blur { backdrop-filter: blur(1px); }

    /* ---- HERO TEXT ENTRANCE ---- */
    @keyframes heroReveal {
      from { opacity: 0; transform: translateY(30px) skewY(1deg); filter: blur(4px); }
      to   { opacity: 1; transform: translateY(0)    skewY(0);     filter: blur(0);  }
    }
    .hero-reveal {
      animation: heroReveal 1.1s var(--ease-expo) both;
    }
    .hero-reveal-delay-1 { animation-delay: 0.15s; }
    .hero-reveal-delay-2 { animation-delay: 0.3s; }
    .hero-reveal-delay-3 { animation-delay: 0.5s; }
    .hero-reveal-delay-4 { animation-delay: 0.7s; }
    .hero-reveal-delay-5 { animation-delay: 0.9s; }
  `}</style>
);