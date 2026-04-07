// src/components/sections/SystemLogs.jsx
import React from 'react';
import { Server, Network, Code, Cpu } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useCinematic';
import { SectionHeader } from '../ui/SectionHeader';

const SystemLogs = () => {
  const [ref, isVisible] = useScrollReveal();

  const phases = [
    {
      id: '01',
      label: '[PHASE 01]: INFRASTRUCTURE',
      icon: <Network size={18} />,
      title: 'Network Stability Mastery',
      desc: 'Established foundational knowledge in enterprise environments. Managing LAN/WLAN, Active Directory, and MikroTik routers to ensure secure connectivity.',
      color: 'cyan',
    },
    {
      id: '02',
      label: '[PHASE 02]: SOFTWARE ARCHITECTURE',
      icon: <Code size={18} />,
      title: 'Full-Stack Engineering',
      desc: 'Expanded capabilities into development. Building scalable monorepo architectures, backend APIs with Express/PostgreSQL, and interactive React frontends.',
      color: 'cyan',
    },
    {
      id: '03',
      label: '[PHASE 03]: SYSTEM ADMINISTRATION',
      icon: <Cpu size={18} />,
      title: 'IT Support & Hardware Management',
      desc: 'Maintaining critical enterprise hardware (CCTV, Printers), managing Active Directory, and providing comprehensive end-to-end IT support.',
      color: 'emerald',
    },
  ];

  return (
    <section ref={ref} className={`py-32 border-b border-cyan-900/30 scene-enter ${isVisible ? 'scene-visible' : ''}`}>
      <SectionHeader title="SYSTEM LOGS" subtitle="JOURNEY_RECORDS" icon={<Server />} />

      <div className="mt-12 space-y-8 relative">
        <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-900/80 to-transparent">
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-400/40 to-transparent beam" />
        </div>

        {phases.map((p, idx) => (
          <div key={idx} className={`relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group`} style={{ transitionDelay: `${idx * 120}ms` }}>
            <div className={`flex items-center justify-center w-10 h-10 border shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 bg-zinc-950 transition-all duration-300 group-hover:scale-110
              ${p.color === 'emerald' ? 'border-emerald-500 text-emerald-400 shadow-[0_0_15px_rgba(52,211,153,0.5)] group-hover:shadow-[0_0_25px_rgba(52,211,153,0.8)]' : 'border-cyan-500 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.5)] group-hover:shadow-[0_0_25px_rgba(34,211,238,0.8)]'}`}
            >
              {p.icon}
            </div>

            <div className={`w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-5 border bg-zinc-950/70 backdrop-blur-sm card-hover relative overflow-hidden
              ${p.color === 'emerald' ? 'border-emerald-900/50' : 'border-cyan-900/50'}`}
            >
              <div className={`absolute top-0 left-0 right-0 h-px opacity-0 group-hover:opacity-100 transition-opacity
                ${p.color === 'emerald' ? 'bg-gradient-to-r from-transparent via-emerald-500 to-transparent' : 'bg-gradient-to-r from-transparent via-cyan-500 to-transparent'}`}
              />
              <div className={`text-xs font-bold tracking-widest mb-1 ${p.color === 'emerald' ? 'text-emerald-400' : 'text-cyan-400'}`}>{p.label}</div>
              <h3 className="font-bold text-lg text-white mb-2">{p.title}</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">{p.desc}</p>
              <div className="mt-3 text-[10px] font-mono text-zinc-600">[NODE_{p.id}] STATUS: ACTIVE</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SystemLogs;