// src/components/layout/BootScreen.jsx
import React from 'react';
import { useTypewriter } from '../../hooks/useCinematic'; 

const BOOT_LINES = [
  'BIOS v2.077 :: GHOST-CORE INITIALIZED',
  'LOADING KERNEL MODULES...',
  'MOUNTING /sys/profile/SYAHDAN_ALFAATIH...',
  'ESTABLISHING SECURE UPLINK...',
  'DECRYPTING IDENTITY MATRIX...',
  'ALL SYSTEMS NOMINAL. WELCOME, OPERATOR.',
];

export const BootScreen = () => {
  const output = useTypewriter(BOOT_LINES, 18, 250);
  
  return (
    <div className="bg-zinc-950 h-screen flex flex-col items-center justify-center font-mono p-10 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d40a_1px,transparent_1px),linear-gradient(to_bottom,#06b6d40a_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-40 grid-anim" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-cyan-500/5 rounded-full blur-[100px]" />
      <div className="w-full max-w-2xl z-10">
        <div className="flex items-center space-x-2 mb-6">
          <div className="w-3 h-3 rounded-full bg-red-500" />
          <div className="w-3 h-3 rounded-full bg-yellow-500" />
          <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-zinc-600 text-xs ml-2">GHOST-TERMINAL v2.0</span>
        </div>
        <div className="space-y-1">
          {output.map((line, i) => (
            <p key={i} className={`text-sm ${i === output.length - 1 ? 'text-cyan-400' : 'text-emerald-500/70'}`}>
              <span className="text-zinc-600 mr-2">[{String(i).padStart(2,'0')}]</span>
              {line}{i === output.length - 1 && <span className="animate-pulse">_</span>}
            </p>
          ))}
        </div>
        <div className="w-full h-px bg-zinc-800 mt-8 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400 to-transparent beam" />
        </div>
        <div className="mt-3 flex justify-between text-[10px] text-zinc-600">
          <span>BOOT_SEQ :: 0x8A92</span>
          <span className="text-emerald-500">SECURE_CHANNEL_OPEN</span>
        </div>
      </div>
    </div>
  );
};
