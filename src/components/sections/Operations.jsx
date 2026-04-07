// src/components/sections/Operations.jsx
import React from 'react';
import { ShieldAlert, Briefcase } from 'lucide-react';
import { useScrollReveal } from '../../hooks/useCinematic';
import { SectionHeader } from '../ui/SectionHeader';

const Operations = () => {
  const [ref, isVisible] = useScrollReveal();

  return (
    <section ref={ref} className={`py-32 border-b border-cyan-900/30 scene-enter ${isVisible ? 'scene-visible' : ''}`}>
      <SectionHeader title="SYSTEM OPERATIONS" subtitle="FIELD_DEPLOYMENTS" icon={<ShieldAlert />} />

      <div className="mt-12 space-y-8">
        <div className="border border-cyan-900/50 bg-gradient-to-r from-cyan-950/20 to-transparent p-6 relative group card-hover overflow-hidden">
          <div className="absolute -left-0 top-0 bottom-0 w-0.5 bg-cyan-500 shadow-[0_0_15px_#22d3ee] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/0 via-cyan-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
            <div>
              <h3 className="text-xl font-bold text-cyan-100">Desktop Support Engineer</h3>
              <p className="text-cyan-500 font-semibold flex items-center mt-1">
                <Briefcase size={14} className="mr-2" /> PT. Berca Hardayaperkasa
              </p>
            </div>
            <div className="text-emerald-400/80 text-sm mt-2 md:mt-0 font-mono bg-emerald-950/30 px-3 py-1 border border-emerald-900/50">
              Jan 2026 – Feb 2026
            </div>
          </div>
          <ul className="space-y-2 text-zinc-400 text-sm ml-4 list-none">
            {[
              'Executed critical hardware migration: replaced switches and routers across 20+ Bank Mandiri branches with zero unresolved downtime.',
              'Established real-time secure uplinks with Central Network Engineers via console configuration, IP/MAC validation, and LAN troubleshooting.',
              'Compiled comprehensive technical documentation (BAST, before-after analytics, hardware inventory logs).',
            ].map((item, i) => (
              <li key={i} className="relative before:content-['>'] before:absolute before:-left-4 before:text-cyan-600 group-hover:before:text-cyan-400 transition-colors">
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="border border-cyan-900/50 bg-gradient-to-r from-cyan-950/20 to-transparent p-6 relative group card-hover overflow-hidden">
          <div className="absolute -left-0 top-0 bottom-0 w-0.5 bg-emerald-500 shadow-[0_0_15px_#10b981] scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-500" />
          <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/0 via-emerald-500/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

          <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
            <div>
              <h3 className="text-xl font-bold text-cyan-100">IT Staff Internship</h3>
              <p className="text-emerald-500 font-semibold flex items-center mt-1">
                <Briefcase size={14} className="mr-2" /> Euromedica Group
              </p>
            </div>
            <div className="text-emerald-400/80 text-sm mt-2 md:mt-0 font-mono bg-emerald-950/30 px-3 py-1 border border-emerald-900/50">
              July 2025 – Jan 2026
            </div>
          </div>
          <ul className="space-y-2 text-zinc-400 text-sm ml-4 list-none">
            {[
              'Engineered robust LAN/WLAN & Active Directory infrastructure, supporting continuous operations for 1000+ employees nationwide.',
              'Administered cloud and communication systems (Microsoft 365, Nextcloud) and executed secure user data migration.',
              'Managed Tier 1 & 2 support via centralized Ticketing System, reducing resolution time for enterprise hardware issues.',
              'Audited nationwide IT assets and optimized CCTV storage retention protocols.',
            ].map((item, i) => (
              <li key={i} className="relative before:content-['>'] before:absolute before:-left-4 before:text-emerald-600 group-hover:before:text-emerald-400 transition-colors">
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Operations;