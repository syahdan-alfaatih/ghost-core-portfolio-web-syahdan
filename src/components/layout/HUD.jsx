// src/components/layout/HUD.jsx
import React from 'react';

export const HUD = ({ time }) => {
  return (
    <div className="pointer-events-none fixed inset-0 z-40 p-4 flex flex-col justify-between text-xs font-mono flicker">
      <div className="flex justify-between items-start">
        <div className="bg-zinc-950/60 border border-cyan-900/40 px-3 py-2 backdrop-blur-sm">
          <p className="text-cyan-400/70 animate-pulse">SYS.ID: SYAHDAN_ALFAATIH</p>
          <p className="text-zinc-600">LOC: WEST_JAKARTA_ID</p>
        </div>
        <div className="text-right bg-zinc-950/60 border border-cyan-900/40 px-3 py-2 backdrop-blur-sm">
          <p>STATUS: <span className="text-emerald-400">● ONLINE</span></p>
          <p className="text-zinc-500">{time}</p>
        </div>
      </div>
      <div className="flex justify-between items-end border-t border-cyan-900/30 pt-2">
        <p className="text-zinc-700">SYS_VER_2.0.77 // GHOST-CORE</p>
        <p className="text-cyan-600/60 animate-pulse">AWAITING_INPUT_</p>
      </div>
    </div>
  );
};