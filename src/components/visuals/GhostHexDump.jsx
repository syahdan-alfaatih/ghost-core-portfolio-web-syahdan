// src/components/visuals/GhostHexDump.jsx
import React, { useState, useEffect, useRef } from 'react';
import { ShieldAlert } from 'lucide-react';
import { usePageVisibility } from '../../hooks/useCinematic';

const INITIAL_OFFSET = 0x00400000;
const INITIAL_LINE_COUNT = 10;

const generateHexLine = (baseOffset) => {
  const offset = '0x' + baseOffset.toString(16).padStart(8, '0').toUpperCase();
  let hexStr = '';
  let asciiStr = '';
  for (let i = 0; i < 8; i++) {
    const byte = Math.floor(Math.random() * 256);
    hexStr += byte.toString(16).padStart(2, '0').toUpperCase() + ' ';
    if (i === 3) hexStr += ' ';
    asciiStr += (byte > 32 && byte < 127) ? String.fromCharCode(byte) : '.';
  }
  const isHighlight = Math.random() > 0.90;
  return { offset, hexStr, asciiStr, isHighlight };
};

const initialHexLines = Array.from(
  { length: INITIAL_LINE_COUNT },
  (_, index) => generateHexLine(INITIAL_OFFSET + index * 8),
);

export const GhostHexDump = () => {
  const [hexLines, setHexLines] = useState(initialHexLines);
  const containerRef = useRef(null);
  const intervalRef = useRef(null);
  const offsetRef = useRef(INITIAL_OFFSET + INITIAL_LINE_COUNT * 8);
  const isPageVisible = usePageVisibility();

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const startInterval = () => {
      if (intervalRef.current) return;
      intervalRef.current = setInterval(() => {
        setHexLines(prev => {
          const next = [...prev.slice(1)];
          next.push(generateHexLine(offsetRef.current));
          offsetRef.current += 8;
          return next;
        });
      }, 120);
    };

    const stopInterval = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && isPageVisible) {
          startInterval();
        } else {
          stopInterval();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    if (!isPageVisible) stopInterval();

    return () => {
      observer.disconnect();
      stopInterval();
    };
  }, [isPageVisible]);

  return (
    <div ref={containerRef} className="absolute inset-0 z-10 bg-zinc-950 p-5 font-mono text-[10px] sm:text-[11px] overflow-hidden flex flex-col justify-end text-left select-none">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none">
        <ShieldAlert size={200} className="text-red-500" />
      </div>
      
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-zinc-950 to-transparent z-10 pointer-events-none" />
      
      <div className="relative z-20 space-y-1">
        <div className="text-cyan-500/70 mb-3 border-b border-cyan-900/40 pb-1 flex justify-between tracking-widest text-[9px]">
          <span>[MEM_DUMP] PROC: ghost2077.exe</span>
          <span>BASE: 0x00400000</span>
        </div>
        
        {hexLines.map((line, i) => (
          <div key={i} className={`flex w-full tracking-[0.15em] ${line.isHighlight ? 'text-red-400 font-bold drop-shadow-[0_0_8px_#ef4444]' : 'text-emerald-500/50'}`}>
            <span className="text-cyan-600/70 w-24 shrink-0">{line.offset}</span>
            <span className="w-48 shrink-0">{line.hexStr}</span>
            <span className="text-zinc-500 flex-1 whitespace-pre">{line.asciiStr}</span>
          </div>
        ))}
      </div>
      
      <p className="absolute bottom-4 right-4 text-[9px] text-red-500 font-mono tracking-widest z-20 border border-red-900/50 bg-red-950/80 px-2 py-1 animate-pulse">
        [ SIG_MATCH_FOUND ]
      </p>
    </div>
  );
};
