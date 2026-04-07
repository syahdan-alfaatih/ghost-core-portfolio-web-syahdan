// src/components/layout/CRTOverlay.jsx
import React from 'react';

export const CRTOverlay = () => {
  return (
    <>
      <div
        className="pointer-events-none fixed inset-0 z-50 opacity-15 crt-scan"
        style={{ backgroundSize: '100% 4px, 3px 100%' }}
      />
      <div
        className="pointer-events-none fixed inset-0 z-49"
        style={{ background: 'radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.6) 100%)' }}
      />
    </>
  );
};