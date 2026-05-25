import React, { useState, useEffect } from 'react';

import { GlobalStyle } from './styles/GlobalStyle';
import { useScrollY } from './hooks/useCinematic';

import { ScrollProgressBar } from './components/ui/ScrollProgressBar';
import { BootScreen } from './components/layout/BootScreen';
import { CyberBackground } from './components/layout/CyberBackground';
import { CRTOverlay } from './components/layout/CRTOverlay';
import { HUD } from './components/layout/HUD';

import Hero from './components/sections/Hero';
import SystemLogs from './components/sections/SystemLogs';
import Capabilities from './components/sections/Capabilities';
import Operations from './components/sections/Operations';
import Modules from './components/sections/Modules';
import EducationStatus from './components/sections/EducationStatus';
import Connection from './components/sections/Connection';

export default function App() {
  const [systemTime, setSystemTime] = useState('');
  
  const [bootSequence, setBootSequence] = useState(() => {
    try {
      return !sessionStorage.getItem('ghost_booted');
    } catch {
      return true;
    }
  });
  
  const scrollY = useScrollY();

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      setSystemTime(now.toISOString().replace('T', ' // ').substring(0, 23) + 'Z');
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (!bootSequence) return;
    const timer = setTimeout(() => {
      setBootSequence(false);
      try { sessionStorage.setItem('ghost_booted', '1'); } catch {
        // Storage may be blocked by browser privacy settings.
      }
    }, 3200);
    return () => clearTimeout(timer);
  }, [bootSequence]);

  if (bootSequence) return <BootScreen />;

  return (
    <>
      <GlobalStyle />
      
      <div className="relative bg-zinc-950 min-h-screen text-cyan-400 font-mono overflow-x-hidden selection:bg-cyan-900 selection:text-cyan-50">

        <div className="grain-overlay" />
        <ScrollProgressBar />
        <CyberBackground scrollY={scrollY} />
        <CRTOverlay />
        <HUD time={systemTime} />

        <main className="relative z-10 max-w-6xl mx-auto px-6">
          <Hero scrollY={scrollY} />
          <SystemLogs />
          <Capabilities />
          <Operations />
          <Modules />
          <EducationStatus />
          <Connection />
        </main>

        <div className="relative z-10 border-t border-cyan-900/30 py-6 text-center text-[10px] text-zinc-700 font-mono">
          <span>GHOST-CORE v2.0.77 // SYAHDAN_ALFAATIH // WEST_JAKARTA_ID</span>
        </div>
      </div>
    </>
  );
}
