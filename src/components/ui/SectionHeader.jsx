// src/components/ui/SectionHeader.jsx
import React from 'react';

export const SectionHeader = ({ title, subtitle, icon }) => {
  return (
    <div className="flex items-center space-x-4 mb-8">
      <div className="p-3 bg-cyan-950/50 border border-cyan-500/40 text-cyan-400 relative glow-pulse">
        {icon}
        <div className="absolute inset-0 bg-cyan-500/5 animate-pulse" />
      </div>
      <div>
        <h2 className="text-2xl font-bold text-white tracking-[0.15em] drop-shadow-[0_0_12px_rgba(34,211,238,0.6)]">
          {title}
        </h2>
        <p className="text-xs text-cyan-500/70 font-mono mt-1">// {subtitle}</p>
      </div>
      <div className="flex-1 h-px bg-gradient-to-r from-cyan-900/60 to-transparent ml-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/40 to-transparent beam" />
      </div>
    </div>
  );
};