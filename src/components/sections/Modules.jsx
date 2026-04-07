// src/components/sections/Modules.jsx
import React from 'react';
import { Database, Code, MonitorPlay } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useCinematic';
import { SectionHeader } from '../ui/SectionHeader';

// Import komponen visual
import { DigikuArchitecture } from '../visuals/DigikuArchitecture';
import { GhostHexDump } from '../visuals/GhostHexDump';
import { SmartVisionScanner } from '../visuals/SmartVisionScanner';

const Modules = () => {
  const [ref, isVisible] = useScrollReveal();

  const projects = [
    { 
      title: 'DIGIKU: MARKETPLACE', 
      type: 'Full-Stack Architecture', 
      desc: 'A scalable digital product marketplace engineered with a strict frontend/backend separation (Monorepo). Designed to handle complex user authentications and product management.', 
      tech: ['React.js', 'Node.js', 'PostgreSQL', 'Prisma'], 
      accent: 'cyan',
      repoLink: 'https://github.com/syahdan-alfaatih/Digiku---Digital-Product-Marketplace'
    },
    { 
      title: 'Ghost-2077', 
      type: 'Advanced Endpoint Threat & Malware Analysis', 
      desc: 'Ghost-2077 is a custom-built Proof of Concept for a Remote Access Trojan and endpoint enumeration tool, developed purely for academic research and cybersecurity education.', 
      tech: ['C++17', 'Win32 API', 'Offensive Security', 'Malware Analysis', 'PoC'], 
      accent: 'emerald',
      repoLink: 'https://github.com/syahdan-alfaatih/Ghost-2077-PoC'
    },
    { 
      title: 'SMART VISION DESKTOP', 
      type: 'Intelligent Application', 
      desc: 'Standalone face recognition system optimized for stability. Features an intuitive modern UI built with CustomTkinter, leveraging powerful dlib models for high-accuracy detection.', 
      tech: ['Python', 'CustomTkinter', 'OpenCV', 'Dlib'], 
      accent: 'blue',
      repoLink: 'https://github.com/syahdan-alfaatih/smart-vision-desktop'
    },
  ];

  return (
    <section id="modules" ref={ref} className={`py-32 border-b border-cyan-900/30 scene-enter ${isVisible ? 'scene-visible' : ''}`}>
      <SectionHeader title="DEPLOYED MODULES" subtitle="PROJECT_REPOSITORY" icon={<Database />} />

      <div className="mt-16 space-y-24">
        {projects.map((project, idx) => (
          <div key={idx} className={`flex flex-col ${idx % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-10 items-center group`} style={{ transitionDelay: `${idx * 150}ms` }}>
            
            <div className="w-full lg:w-1/2">
              <div className="relative aspect-video border border-zinc-800 bg-zinc-950/80 overflow-hidden card-hover group-hover:border-cyan-500/50 shadow-2xl backdrop-blur-sm rounded-sm">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f18_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f18_1px,transparent_1px)] bg-[size:16px_16px] grid-anim opacity-50" />
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-cyan-400/80 to-transparent opacity-0 group-hover:opacity-100 beam" />

                {['tl','tr','bl','br'].map(pos => (
                  <div key={pos} className={`absolute w-6 h-6 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100 opacity-40 z-30 pointer-events-none
                    ${pos === 'tl' ? 'top-4 left-4 border-t-2 border-l-2' : ''} ${pos === 'tr' ? 'top-4 right-4 border-t-2 border-r-2' : ''}
                    ${pos === 'bl' ? 'bottom-4 left-4 border-b-2 border-l-2' : ''} ${pos === 'br' ? 'bottom-4 right-4 border-b-2 border-r-2' : ''}
                    ${project.accent === 'emerald' ? 'border-emerald-400' : project.accent === 'blue' ? 'border-blue-400' : 'border-cyan-400'}`} />
                ))}

                {project.title === 'DIGIKU: MARKETPLACE' && <DigikuArchitecture />}
                {project.title === 'Ghost-2077' && <GhostHexDump />}
                {project.title === 'SMART VISION DESKTOP' && <SmartVisionScanner />}

                <div className="absolute top-3 left-3 w-2 h-2 bg-red-500 rounded-full animate-pulse shadow-[0_0_8px_#ef4444] z-30" />
                <div className="absolute bottom-3 right-3 text-[10px] text-zinc-600 font-mono tracking-widest z-30">RES: 1920×1080</div>
              </div>
            </div>

            <div className="w-full lg:w-1/2 space-y-5">
              <div className={`text-[10px] font-bold tracking-[0.25em] ${project.accent === 'emerald' ? 'text-emerald-400' : project.accent === 'blue' ? 'text-blue-400' : 'text-cyan-400'}`}>
                [{project.type.toUpperCase()}]
              </div>
              <h3 className="text-3xl lg:text-4xl font-black text-zinc-50 group-hover:text-cyan-200 transition-colors tracking-tight leading-tight">
                {project.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed text-sm md:text-base">{project.desc}</p>

              <div className="pt-2 flex flex-wrap gap-2.5">
                {project.tech.map((t, i) => (
                  <span key={i} className="text-xs px-2.5 py-1.5 border border-zinc-700/80 bg-zinc-900/60 text-cyan-100 font-mono transition-all duration-300 hover:border-cyan-400/60 hover:text-cyan-300 hover:bg-cyan-950/30 cursor-default">
                    {t}
                  </span>
                ))}
              </div>

              <div className="pt-6">
                <a 
                  href={project.repoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="neon-btn text-sm inline-flex items-center border border-zinc-600 bg-zinc-950/50 px-5 py-2.5 text-cyan-400 hover:text-cyan-200 hover:border-cyan-400 transition-all shadow-sm w-fit"
                >
                  <Code size={16} className="mr-2" /> EXECUTE_PREVIEW
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Modules;