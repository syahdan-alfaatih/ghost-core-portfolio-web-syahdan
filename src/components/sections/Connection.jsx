// src/components/sections/Connection.jsx
import React from 'react';
import { Activity, Send, User, MapPin } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useCinematic';

const Connection = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section id="contact" ref={ref} className={`py-32 scene-enter ${isVisible ? 'scene-visible' : ''}`}>
      <div className="max-w-2xl mx-auto text-center border border-cyan-500/30 bg-cyan-950/10 p-10 relative overflow-hidden">
        {['tl','tr','bl','br'].map(pos => (
          <div key={pos} className={`absolute w-8 h-8
            ${pos === 'tl' ? 'top-0 left-0 border-t-2 border-l-2' : ''}
            ${pos === 'tr' ? 'top-0 right-0 border-t-2 border-r-2' : ''}
            ${pos === 'bl' ? 'bottom-0 left-0 border-b-2 border-l-2' : ''}
            ${pos === 'br' ? 'bottom-0 right-0 border-b-2 border-r-2' : ''}
            border-cyan-500/60`}
          />
        ))}

        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-cyan-500/8 blur-[100px] -z-10" />
        <div className="absolute top-0 left-0 right-0 h-px overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/60 to-transparent beam" />
        </div>

        <Activity size={36} className="mx-auto text-cyan-400 mb-6 animate-pulse" />
        <p className="text-xs text-cyan-500/60 font-mono tracking-widest mb-3">// SECURE_CHANNEL</p>
        <h2 className="text-3xl font-bold text-white mb-2 tracking-wider">OPEN SECURE CHANNEL</h2>
        <p className="text-zinc-400 mb-8 text-sm leading-relaxed">
          System is online and ready for new objectives.<br />
          Establish a connection to initiate collaboration.
        </p>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4">
          <a
            href="mailto:afaatih6@gmail.com"
            className="neon-btn w-full md:w-auto px-8 py-3 bg-cyan-500 text-zinc-950 font-bold hover:bg-cyan-400 transition-colors flex items-center justify-center shadow-[0_0_20px_rgba(34,211,238,0.4)]"
          >
            <Send size={16} className="mr-2" /> INITIATE_EMAIL
          </a>
          <a
            href="https://www.linkedin.com/in/syahdan-alfaatih"
            target="_blank" rel="noreferrer"
            className="neon-btn w-full md:w-auto px-8 py-3 border border-cyan-500/50 text-cyan-400 hover:bg-cyan-950 transition-colors flex items-center justify-center"
          >
            LINKEDIN_UPLINK
          </a>
          <a
            href="https://github.com/syahdan-alfaatih"
            target="_blank" rel="noreferrer"
            className="neon-btn w-full md:w-auto px-8 py-3 border border-zinc-700 text-zinc-300 hover:border-cyan-500/50 hover:text-cyan-400 transition-colors flex items-center justify-center"
          >
            GITHUB_REPO
          </a>
        </div>

        <div className="mt-12 pt-6 border-t border-cyan-900/50 flex flex-col items-center justify-center text-xs text-zinc-500 space-y-2 font-mono">
          <div className="flex items-center"><User size={11} className="mr-2 text-zinc-600" /> +62 895412746099</div>
          <div className="flex items-center"><MapPin size={11} className="mr-2 text-zinc-600" /> West Jakarta, ID</div>
        </div>
      </div>
    </section>
  );
};

export default Connection;