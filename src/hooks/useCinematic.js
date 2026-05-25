// src/hooks/useCinematic.js
import { useState, useEffect, useRef, useCallback } from 'react';

const _scrollSubs = new Set();
let _scrollTicking = false;
if (typeof window !== 'undefined') {
  window.addEventListener('scroll', () => {
    if (!_scrollTicking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        _scrollSubs.forEach(fn => fn(y));
        _scrollTicking = false;
      });
      _scrollTicking = true;
    }
  }, { passive: true });
}

export const useUnifiedScroll = (callback) => {
  const cb = useRef(callback);
  useEffect(() => {
    cb.current = callback;
  }, [callback]);
  useEffect(() => {
    const fn = (y) => cb.current(y);
    _scrollSubs.add(fn);
    return () => _scrollSubs.delete(fn);
  }, []);
};

export const useScrollY = () => {
  const [scrollY, setScrollY] = useState(0);
  useUnifiedScroll(useCallback((y) => setScrollY(y), []));
  return scrollY;
};

export const useScrollProgress = () => {
  const ref = useRef(null);
  const [progress, setProgress] = useState(0);
  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const wh = window.innerHeight;
    const total = rect.height + wh;
    const traveled = wh - rect.top;
    setProgress(Math.min(1, Math.max(0, traveled / total)));
  }, []);
  useUnifiedScroll(update);
  useEffect(() => { update(); }, [update]);
  return [ref, progress];
};

export const useScrollReveal = (threshold = 0.15) => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setIsVisible(true); }),
      { threshold }
    );
    const el = domRef.current;
    if (el) observer.observe(el);
    return () => { if (el) observer.unobserve(el); };
  }, [threshold]);
  return [domRef, isVisible];
};

export const useTypewriter = (lines, speed = 28, delayBetween = 400) => {
  const [output, setOutput] = useState([]);
  useEffect(() => {
    let currentLine = 0;
    let currentChar = 0;
    let timer;
    const tick = () => {
      if (currentLine >= lines.length) return;
      const line = lines[currentLine];
      if (currentChar < line.length) {
        setOutput(prev => {
          const next = [...prev];
          next[currentLine] = (next[currentLine] || '') + line[currentChar];
          return next;
        });
        currentChar++;
        timer = setTimeout(tick, speed);
      } else {
        currentLine++;
        currentChar = 0;
        timer = setTimeout(tick, delayBetween);
      }
    };
    timer = setTimeout(tick, 300);
    return () => clearTimeout(timer);
  }, [lines, speed, delayBetween]);
  return output;
};

export const useMouseParallax = () => {
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  useEffect(() => {
    let ticking = false;
    const handler = e => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setMouse({
            x: (e.clientX / window.innerWidth - 0.5) * 2,
            y: (e.clientY / window.innerHeight - 0.5) * 2,
          });
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, []);
  return mouse;
};

export const usePageVisibility = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsVisible(!document.hidden);
    };

    window.addEventListener("visibilitychange", handleVisibilityChange);
    return () => window.removeEventListener("visibilitychange", handleVisibilityChange);
  }, []);

  return isVisible;
};
