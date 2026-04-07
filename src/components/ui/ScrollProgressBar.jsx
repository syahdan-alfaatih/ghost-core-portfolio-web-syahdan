// src/components/ui/ScrollProgressBar.jsx
import React, { useState, useCallback } from 'react';
import { useUnifiedScroll } from '../../hooks/useCinematic';

export const ScrollProgressBar = () => {
  const [width, setWidth] = useState(0);
  
  useUnifiedScroll(useCallback(() => {
    const el = document.documentElement;
    const pct = (window.scrollY / (el.scrollHeight - el.clientHeight)) * 100;
    setWidth(Math.min(100, pct));
  }, []));
  
  return <div id="scroll-progress" style={{ width: `${width}%` }} />;
};