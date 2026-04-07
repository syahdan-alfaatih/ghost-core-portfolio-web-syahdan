// src/components/visuals/SmartVisionScanner.jsx
import React, { useState, useEffect } from 'react';
import { usePageVisibility } from '../../hooks/useCinematic';

export const SmartVisionScanner = () => {
  const [isLocked, setIsLocked] = useState(false);
  const isPageVisible = usePageVisibility();

  useEffect(() => {
    if (!isPageVisible) return;
    const interval = setInterval(() => {
      setIsLocked(prev => !prev);
    }, 2500);
    return () => clearInterval(interval);
  }, [isPageVisible]);

  return (
    <div className="absolute inset-0 z-10 bg-zinc-950 overflow-hidden flex items-center justify-center font-mono select-none">
      <style>{`
        @keyframes radarScan { 0% { top: 0%; opacity: 0; } 10% { opacity: 1; } 50% { top: 100%; opacity: 1; } 90% { opacity: 1; } 100% { top: 0%; opacity: 0; } }
        .radar-scan { animation: radarScan 2s ease-in-out infinite; }
      `}</style>

      <div className="absolute inset-0 bg-[linear-gradient(to_right,#3b82f615_1px,transparent_1px),linear-gradient(to_bottom,#3b82f615_1px,transparent_1px)] bg-[size:2rem_2rem]" />
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <div className="w-full h-px bg-blue-500 absolute" />
        <div className="h-full w-px bg-blue-500 absolute" />
        <div className="w-48 h-48 border border-blue-500 rounded-full" />
      </div>

      {!isLocked && (
        <div className="absolute left-0 right-0 h-[2px] bg-blue-400 shadow-[0_0_15px_#60a5fa] radar-scan z-20" />
      )}

      <div className={`relative flex items-center justify-center transition-all duration-500 ease-out z-30
        ${isLocked ? 'w-32 h-32 scale-100' : 'w-48 h-48 scale-110'}`}>
        
        {['tl','tr','bl','br'].map(pos => (
          <div key={pos} className={`absolute w-8 h-8 transition-colors duration-500
            ${pos === 'tl' ? 'top-0 left-0 border-t-2 border-l-2' : ''} 
            ${pos === 'tr' ? 'top-0 right-0 border-t-2 border-r-2' : ''}
            ${pos === 'bl' ? 'bottom-0 left-0 border-b-2 border-l-2' : ''} 
            ${pos === 'br' ? 'bottom-0 right-0 border-b-2 border-r-2' : ''}
            ${isLocked ? 'border-emerald-400 drop-shadow-[0_0_8px_#34d399]' : 'border-blue-500/70'}`} 
          />
        ))}

        <div className={`w-1.5 h-1.5 rounded-full transition-all duration-500 
          ${isLocked ? 'bg-emerald-400 animate-ping' : 'bg-transparent'}`} />
      </div>

      <div className="absolute bottom-6 w-full text-center z-30 transition-all duration-300">
        {isLocked ? (
          <span className="inline-block text-[10px] sm:text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-4 py-1.5 border border-emerald-900 shadow-[0_0_15px_rgba(52,211,153,0.3)] tracking-widest">
            [ FACE_DETECTED // LOCK_ON : 99.8% ]
          </span>
        ) : (
          <span className="inline-block text-[10px] sm:text-[11px] font-bold text-blue-400/80 bg-blue-950/50 px-4 py-1.5 border border-blue-900/50 tracking-widest">
            [ SCANNING_ENVIRONMENT... ]
          </span>
        )}
      </div>

      <div className={`absolute top-4 left-4 text-[8px] sm:text-[9px] text-emerald-500/70 font-mono text-left transition-opacity duration-300 ${isLocked ? 'opacity-100' : 'opacity-0'}`}>
        <p>{'>'} DLIB_MODEL : ACTIVE</p>
        <p>{'>'} POINTS : 68/68 MATCH</p>
        <p>{'>'} YAW_PITCH : 12°, 4°</p>
      </div>
    </div>
  );
};