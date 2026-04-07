// src/components/sections/Capabilities.jsx
import React from 'react';
import { Terminal, Network, Code, Server } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useCinematic';
import { SectionHeader } from '../ui/SectionHeader';

const Capabilities = () => {
  const [ref, isVisible] = useScrollReveal();

  const skills = [
    {
      category: 'INFRASTRUCTURE & OPS',
      icon: <Network size={20} />,
      items: ['LAN/WLAN Routing', 'MikroTik Admin', 'Active Directory', 'VPN Config', 'Hardware Lifecycle'],
      accent: 'cyan',
    },
    {
      category: 'SOFTWARE DEVELOPMENT',
      icon: <Code size={20} />,
      items: ['React.js (v18)', 'Node.js/Express', 'Python (OpenCV)', 'PostgreSQL/SQL', 'Scripting (JS/Python)'],
      accent: 'blue',
    },
    {
      category: 'SYSTEM MANAGEMENT',
      icon: <Server size={20} />,
      items: ['Ticketing Systems', 'Microsoft 365', 'Nextcloud', 'CCTV/NVR Systems', 'IT Asset Auditing'],
      accent: 'emerald',
    },
  ];

  return (
    <section ref={ref} className={`py-32 border-b border-cyan-900/30 scene-enter ${isVisible ? 'scene-visible' : ''}`}>
      <SectionHeader title="SYSTEM CAPABILITIES" subtitle="TECHNICAL_VECTORS" icon={<Terminal />} />

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        {skills.map((sg, idx) => (
          <div key={idx} className="border border-cyan-900/40 bg-zinc-950/60 p-6 relative overflow-hidden group card-hover depth-blur" style={{ transitionDelay: `${idx * 80}ms` }}>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className={`absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 opacity-30 group-hover:opacity-80 transition-opacity
              ${sg.accent === 'emerald' ? 'border-emerald-400' : sg.accent === 'blue' ? 'border-blue-400' : 'border-cyan-400'}`} />

            <div className={`mb-4 ${sg.accent === 'emerald' ? 'text-emerald-400' : sg.accent === 'blue' ? 'text-blue-400' : 'text-cyan-400'}`}>
              {sg.icon}
            </div>
            <h3 className="text-xs font-bold text-cyan-200 tracking-[0.15em] mb-4 border-b border-cyan-900/50 pb-2">{sg.category}</h3>
            <ul className="space-y-3">
              {sg.items.map((item, i) => (
                <li key={i} className="flex items-center text-sm text-zinc-300 group/item">
                  <span className={`w-1.5 h-1.5 mr-3 shadow-lg transition-all duration-200 group-hover/item:scale-125
                    ${sg.accent === 'emerald' ? 'bg-emerald-500 shadow-emerald-500/50' : sg.accent === 'blue' ? 'bg-blue-500 shadow-blue-500/50' : 'bg-cyan-500 shadow-cyan-500/50'}`}
                  />
                  {item}
                </li>
              ))}
            </ul>

            <div className="absolute bottom-3 right-3 text-[40px] font-black text-cyan-950/30 leading-none select-none">
              {String(idx + 1).padStart(2, '0')}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Capabilities;