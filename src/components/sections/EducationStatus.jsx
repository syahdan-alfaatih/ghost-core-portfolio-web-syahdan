// src/components/sections/EducationStatus.jsx
import React from 'react';
import { Wifi } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useCinematic';
import { SectionHeader } from '../ui/SectionHeader';

const EducationStatus = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section ref={ref} className={`py-32 border-b border-cyan-900/30 scene-enter ${isVisible ? 'scene-visible' : ''}`}>
      <SectionHeader title="SYSTEM STATUS" subtitle="EDUCATION_NODE" icon={<Wifi />} />

      <div className="mt-12 flex flex-col md:flex-row gap-6">
        <div className="flex-1 p-6 border-l-2 border-cyan-500 bg-gradient-to-r from-cyan-950/30 to-transparent relative overflow-hidden group card-hover">
          <div className="absolute top-0 right-0 bottom-0 w-0.5 bg-gradient-to-b from-transparent via-cyan-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="text-xs text-cyan-500/70 font-mono mb-3 tracking-widest">ACTIVE_NODE</div>
          <h3 className="text-xl font-bold text-cyan-100">Universitas Pamulang</h3>
          <p className="text-cyan-400 text-sm mt-1">Bachelor of Computer Science</p>
          <p className="text-zinc-500 text-sm mt-2 font-mono">2024 — Present | Weekend Classes</p>
          <div className="mt-4 flex items-center space-x-2">
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs text-emerald-400/70 font-mono">IN_PROGRESS</span>
          </div>
        </div>

        <div className="flex-1 p-6 border-l-2 border-zinc-700 bg-gradient-to-r from-zinc-900/30 to-transparent opacity-70 hover:opacity-100 transition-all group card-hover">
          <div className="text-xs text-zinc-600 font-mono mb-3 tracking-widest">COMPLETED_NODE</div>
          <h3 className="text-xl font-bold text-zinc-100">MA Al-Islamiyah</h3>
          <p className="text-zinc-400 text-sm mt-1">Social Sciences Major</p>
          <p className="text-zinc-500 text-sm mt-2 font-mono">2021 — 2024</p>
          <div className="mt-4 flex items-center space-x-2">
            <div className="w-2 h-2 bg-zinc-500 rounded-full" />
            <span className="text-xs text-zinc-600 font-mono">ARCHIVED</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationStatus;