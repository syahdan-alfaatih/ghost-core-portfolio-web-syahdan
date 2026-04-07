// src/components/visuals/DigikuArchitecture.jsx
import React from 'react';
import { MonitorPlay, Server, Database } from 'lucide-react';

export const DigikuArchitecture = () => {
  return (
    <div className="absolute inset-0 z-10 bg-zinc-950 overflow-hidden flex flex-col items-center justify-center font-mono select-none">
      <style>{`
        @keyframes packetTravel {
          0%   { left: 15%; opacity: 0; transform: scale(0.5); }
          5%   { opacity: 1; transform: scale(1); }
          25%  { left: 50%; }
          50%  { left: 85%; transform: scale(1); background-color: #22d3ee; box-shadow: 0 0 10px #22d3ee; }
          55%  { transform: scale(1.5); background-color: #34d399; box-shadow: 0 0 15px #34d399; }
          60%  { transform: scale(1); background-color: #22d3ee; box-shadow: 0 0 10px #22d3ee; }
          75%  { left: 50%; }
          95%  { opacity: 1; transform: scale(1); }
          100% { left: 15%; opacity: 0; transform: scale(0.5); }
        }
        .data-packet {
          animation: packetTravel 4s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes pulseGlow {
          0%, 100% { box-shadow: 0 0 0px transparent; }
          50% { box-shadow: 0 0 20px rgba(34, 211, 238, 0.3); }
        }
        .node-pulse { animation: pulseGlow 2s infinite; }
      `}</style>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#22d3ee05_1px,transparent_1px),linear-gradient(to_bottom,#22d3ee05_1px,transparent_1px)] bg-[size:1.5rem_1.5rem]" />
      
      <h4 className="absolute top-6 text-cyan-400 text-[9px] tracking-[0.2em] border border-cyan-900/50 bg-cyan-950/40 px-4 py-1.5 backdrop-blur-sm shadow-[0_0_15px_rgba(34,211,238,0.1)]">
        [ SYSTEM_ARCHITECTURE_MAP ]
      </h4>

      <div className="relative w-4/5 max-w-sm h-32 flex items-center justify-between mt-4 z-20">
        
        <div className="absolute left-[10%] right-[10%] h-[2px] bg-zinc-800 z-0">
           <div className="w-full h-full bg-gradient-to-r from-cyan-900/30 via-emerald-900/30 to-cyan-900/30" />
        </div>

        <div className="data-packet absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_#22d3ee] z-10" />

        <div className="relative z-20 flex flex-col items-center group">
          <div className="w-12 h-12 rounded-full bg-zinc-950 border-2 border-cyan-500/60 flex items-center justify-center mb-2 node-pulse group-hover:scale-110 group-hover:border-cyan-400 transition-all duration-300">
            <MonitorPlay size={20} className="text-cyan-400" />
          </div>
          <span className="text-[10px] text-zinc-300 font-bold tracking-wider">CLIENT</span>
          <span className="text-[8px] text-cyan-600 font-mono mt-0.5">React.js</span>
        </div>

        <div className="relative z-20 flex flex-col items-center group">
          <div className="w-14 h-14 rounded-md bg-zinc-950 border-2 border-cyan-400 flex items-center justify-center mb-2 shadow-[0_0_15px_rgba(34,211,238,0.2)] transform rotate-45 group-hover:scale-110 transition-transform duration-300">
            <Server size={22} className="text-cyan-200 -rotate-45" />
          </div>
          <span className="text-[10px] text-cyan-100 font-bold tracking-wider mt-1">API_GATEWAY</span>
          <span className="text-[8px] text-cyan-500 font-mono mt-0.5">Node.js</span>
        </div>

        <div className="relative z-20 flex flex-col items-center group">
          <div className="w-12 h-12 rounded-lg border-2 border-emerald-500/60 bg-zinc-950 flex items-center justify-center mb-2 node-pulse group-hover:scale-110 group-hover:border-emerald-400 transition-all duration-300">
            <Database size={20} className="text-emerald-400" />
          </div>
          <span className="text-[10px] text-zinc-300 font-bold tracking-wider">DATABASE</span>
          <span className="text-[8px] text-emerald-600 font-mono mt-0.5">PostgreSQL</span>
        </div>
      </div>

      <div className="absolute bottom-5 flex justify-between w-[85%] text-[8px] text-zinc-500 font-mono tracking-widest border-t border-zinc-800/50 pt-2">
        <span className="flex items-center"><span className="w-1 h-1 bg-emerald-500 rounded-full mr-2 animate-pulse" /> STATUS: 200 OK</span>
        <span>LATENCY: 14ms</span>
      </div>
    </div>
  );
}