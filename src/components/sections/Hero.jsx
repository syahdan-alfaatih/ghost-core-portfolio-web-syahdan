import React, { useRef, useEffect } from 'react';
import { Terminal, Code, Activity } from 'lucide-react';
import { useTypewriter, useMouseParallax, usePageVisibility } from '../../hooks/useCinematic';
import heroVideoWebm from '../../assets/scene1_videos/video4_bg.optimized.webm';
import heroVideoMp4 from '../../assets/scene1_videos/video4_bg.optimized.mp4';
import heroPoster from '../../assets/scene1_videos/video4_bg.poster.jpg';

const HERO_LINES = [
  '> SYSTEM KERNEL v2.077 LOADED',
  '> IDENTITY MATRIX DECRYPTED',
  '> OPERATOR: SYAHDAN ALFAATIH',
  '> CLEARANCE: HYBRID TECH SPECIALIST',
];

const Hero = ({ scrollY }) => {
  const mouse = useMouseParallax();
  const isVisible = usePageVisibility();
  const videoRef = useRef(null);

  useEffect(() => {
    if (!videoRef.current) return;
    if (isVisible) {
      videoRef.current.play().catch(() => {});
    } else {
      videoRef.current.pause();
    }
  }, [isVisible]);

  const output = useTypewriter(HERO_LINES, 22, 300);

  const bgY = scrollY * 0.3;
  const midY = scrollY * 0.6;
  const textY = scrollY * 0.15;

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="min-h-screen flex flex-col justify-center relative pt-24 pb-32 overflow-hidden">
      <div
        className="absolute inset-0 -z-10 overflow-hidden"
        style={{ transform: `translateY(${bgY}px) scale(1.08)` }}
      >
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover opacity-12"
          autoPlay muted loop playsInline
          preload="metadata"
          poster={heroPoster}
        >
          <source src={heroVideoWebm} type="video/webm" />
          <source src={heroVideoMp4} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#09090b_0%,transparent_50%,transparent_75%,#09090b_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,#09090b_0%,transparent_30%,transparent_75%,#09090b_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#06b6d408_1px,transparent_1px),linear-gradient(to_bottom,#06b6d408_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      </div>

      <div
        className="absolute inset-0 -z-5 pointer-events-none"
        style={{ transform: `translateY(${midY * -0.2}px) translate(${mouse.x * 12}px, ${mouse.y * 8}px)` }}
      >
        <div className="absolute top-24 right-8 lg:right-16 border border-cyan-500/20 bg-cyan-950/10 backdrop-blur-sm p-3 text-[10px] font-mono text-cyan-600/60 w-40 float">
          <p className="text-emerald-400/60 mb-1">SIGNAL_LOCK</p>
          <div className="w-full h-px bg-cyan-900/50 mb-2" />
          <p>NODE: 192.168.1.1</p>
          <p>PING: 2ms</p>
          <p className="text-emerald-400/60 animate-pulse mt-1">● CONNECTED</p>
        </div>
        <div className="absolute bottom-40 left-4 lg:left-8 border border-emerald-500/20 bg-zinc-950/20 p-2 text-[9px] font-mono text-zinc-600 w-32">
          <p>CPU: 12%</p>
          <p>RAM: 4.2GB</p>
          <p>UPTIME: 99.9%</p>
        </div>
      </div>

      <div
        className="space-y-6 max-w-4xl relative z-10"
        style={{ transform: `translateY(${textY * -1}px)` }}
      >
        <div className="mb-8 font-mono text-xs space-y-1 hero-reveal hero-reveal-delay-1">
          {output.map((line, i) => (
            <p key={i} className={`${i === output.length - 1 ? 'text-cyan-400' : 'text-emerald-500/50'}`}>
              {line}
              {i === output.length - 1 && <span className="animate-pulse">_</span>}
            </p>
          ))}
        </div>

        <div className="hero-reveal hero-reveal-delay-2 inline-flex items-center space-x-2 px-3 py-1 border border-cyan-500/40 bg-cyan-950/30 text-sm text-cyan-300 backdrop-blur-sm">
          <Activity size={14} className="animate-pulse text-emerald-400" />
          <span className="tracking-widest">HYBRID TECH SPECIALIST</span>
        </div>

        <div className="hero-reveal hero-reveal-delay-3 relative">
          <h1
            className="glitch text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-cyan-300 to-emerald-400"
            data-text="SYAHDAN"
            style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}
          >
            SYAHDAN
          </h1>
          <h1
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-cyan-400/60 to-emerald-400/60"
            style={{ WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', lineHeight: 1 }}
          >
            ALFAATIH
          </h1>
          <div className="mt-2 h-0.5 w-64 bg-gradient-to-r from-cyan-400 to-transparent shadow-[0_0_20px_#22d3ee]" />
          <div className="absolute -inset-8 bg-cyan-500/5 blur-[60px] rounded-full -z-10 pointer-events-none" />
        </div>

        <h2 className="hero-reveal hero-reveal-delay-4 text-xl md:text-2xl text-cyan-100 max-w-2xl leading-relaxed">
          Bridging the gap between{' '}
          <span className="text-cyan-400 font-semibold relative">
            enterprise infrastructure
            <span className="absolute bottom-0 left-0 right-0 h-px bg-cyan-400/50" />
          </span>{' '}
          and{' '}
          <span className="text-emerald-400 font-semibold relative">
            software development
            <span className="absolute bottom-0 left-0 right-0 h-px bg-emerald-400/50" />
          </span>
          .
        </h2>

        <p className="hero-reveal hero-reveal-delay-4 text-zinc-400 max-w-xl text-sm md:text-base leading-relaxed">
          I understand systems from the ground up. From ensuring seamless network operations
          for 1000+ nodes to building full-stack applications and real-time computer vision systems.
        </p>

        <div className="pt-8 flex flex-wrap gap-4 relative z-10">
            <button 
            onClick={() => scrollToSection('contact')}
            className="neon-btn px-6 py-3 bg-cyan-950/50 border border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-zinc-950 transition-all duration-300 flex items-center group shadow-[0_0_10px_rgba(34,211,238,0.2)]"
            >
            <Terminal size={16} className="mr-2" />
            INITIALIZE_CONTACT
            </button>
            
            <button 
            onClick={() => scrollToSection('modules')}
            className="neon-btn px-6 py-3 border border-zinc-700 text-zinc-300 hover:border-cyan-500/50 hover:text-cyan-300 transition-colors flex items-center"
            >
            <Code size={16} className="mr-2" />
            VIEW_MODULES
            </button>
        </div>
      </div>

      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 flex flex-col items-center text-cyan-600/60">
        <span className="text-[10px] tracking-widest mb-3 font-mono">SCROLL_TO_PROCEED</span>
        <div className="w-px h-12 bg-gradient-to-b from-cyan-500/60 to-transparent relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-4 bg-cyan-400 beam" />
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-900/60 to-transparent">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-400/30 to-transparent beam" />
      </div>
    </section>
  );
};

export default Hero;
