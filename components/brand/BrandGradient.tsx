import React from 'react';
import { motion } from 'framer-motion';

type Props = { className?: string };

export default function BrandGradient({ className = '' }: Props) {
  return (
    <div className={className} aria-hidden="true">
      {/* Radial core */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(1200px circle at 20% 20%, rgba(194,24,91,0.55), transparent 60%),' +
            'radial-gradient(1000px circle at 80% 30%, rgba(64,196,180,0.45), transparent 60%),' +
            'radial-gradient(900px circle at 50% 80%, rgba(212,175,55,0.30), transparent 60%),' +
            'linear-gradient(180deg, rgba(12,18,32,0.10), rgba(12,18,32,0.10))',
        }}
      />
      {/* Conic shimmer */}
      <motion.div
        className="absolute inset-0 mix-blend-screen"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
        style={{
          background:
            'conic-gradient(from 180deg at 50% 50%, rgba(255,255,255,0.18), rgba(255,255,255,0) 25%, rgba(255,255,255,0.14) 50%, rgba(255,255,255,0) 75%, rgba(255,255,255,0.18))',
        }}
      />
      {/* Fine diagonal lines */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, rgba(255,255,255,0.35) 0px, rgba(255,255,255,0.35) 1px, transparent 1px, transparent 10px)',
        }}
      />
    </div>
  );
}
