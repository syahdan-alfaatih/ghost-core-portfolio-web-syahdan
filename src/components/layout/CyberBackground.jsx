// src/components/layout/CyberBackground.jsx
import React from 'react';
import { useMouseParallax } from '../../hooks/useCinematic';

export const CyberBackground = ({ scrollY }) => {
  const mouse = useMouseParallax();
  
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-0"
        style={{
          transform: `translate(${mouse.x * -8}px, ${mouse.y * -8}px)`,
          transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <div className="absolute top-[-20%] left-[-10%] w-[60rem] h-[60rem] bg-cyan-900/15 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60rem] h-[60rem] bg-emerald-900/10 rounded-full blur-[140px]" />
        <div className="absolute top-1/3 right-1/4 w-[20rem] h-[20rem] bg-blue-900/8 rounded-full blur-[80px]" />
      </div>

      <div
        className="parallax-bg pointer-events-none fixed inset-0 z-0 grid-anim"
        style={{
          backgroundImage: 'linear-gradient(to_right,#06b6d40a 1px,transparent 1px),linear-gradient(to_bottom,#06b6d40a 1px,transparent 1px)',
          backgroundSize: '4rem 4rem',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 70%, transparent 100%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 0%, #000 70%, transparent 100%)',
          transform: `translateY(${scrollY * 0.2}px) translate(${mouse.x * -4}px, ${mouse.y * -4}px)`,
          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      />

      <div
        className="parallax-mid pointer-events-none fixed inset-0 z-0"
        style={{ transform: `translateY(${scrollY * 0.5}px)` }}
      >
        <div className="absolute top-8 left-8 w-16 h-16 border-t-2 border-l-2 border-cyan-500/20" />
        <div className="absolute top-8 right-8 w-16 h-16 border-t-2 border-r-2 border-cyan-500/20" />
        <div className="absolute bottom-8 left-8 w-16 h-16 border-b-2 border-l-2 border-cyan-500/20" />
        <div className="absolute bottom-8 right-8 w-16 h-16 border-b-2 border-r-2 border-cyan-500/20" />
        
        <div className="absolute top-1/4 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/10 to-transparent" />
        <div className="absolute top-2/3 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/10 to-transparent" />
      </div>
    </>
  );
};