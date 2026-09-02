import React from 'react';
import { WHAT_MAKES_DIFFERENT } from '../data/bookData';

export const WhatMakesDifferent: React.FC = () => {
  return (
    <section
      id="what-makes-different"
      className="py-20 md:py-32 bg-[#194A37] text-white relative overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-[#648C82]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#0F2F23]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-block bg-white/10 text-[#FAF8F5] border border-white/20 px-4 py-1.5 rounded-full text-xs font-sans font-bold uppercase tracking-widest shadow-xs backdrop-blur-xs">
            What Makes This Book Different?
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold tracking-tight">
            {WHAT_MAKES_DIFFERENT.headline}
          </h2>
          <div className="w-16 h-0.5 bg-[#FF7A7A] mx-auto mt-3" />
        </div>

        {/* Contrast Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-14 max-w-4xl mx-auto">
          {/* Contrast 1: Other Books */}
          <div className="bg-white/10 backdrop-blur-md p-8 sm:p-10 rounded-3xl border border-white/15 space-y-4 shadow-sm text-left">
            <span className="text-xs uppercase font-sans font-bold tracking-widest text-[#A3C2B6] block">
              The Common Narrative
            </span>
            <p className="font-sans text-white/90 text-base sm:text-lg leading-relaxed font-light">
              {WHAT_MAKES_DIFFERENT.contrast}
            </p>
          </div>

          {/* Contrast 2: The Weight We Carry */}
          <div className="bg-white text-[#194A37] p-8 sm:p-10 rounded-3xl shadow-xl space-y-4 border border-white text-left">
            <span className="text-xs uppercase font-sans font-bold tracking-widest text-[#B81617] block">
              {WHAT_MAKES_DIFFERENT.approachLead}
            </span>
            <p className="font-display text-[#194A37] text-lg sm:text-xl leading-relaxed font-bold">
              {WHAT_MAKES_DIFFERENT.coreMessage}
            </p>
          </div>
        </div>

        {/* Private Realities Highlight Box from PDF */}
        <div className="bg-white/10 backdrop-blur-md p-8 sm:p-12 rounded-3xl border border-white/20 shadow-md max-w-4xl mx-auto space-y-6">
          <p className="font-sans text-xl sm:text-2xl lg:text-3xl text-white font-medium leading-relaxed text-center">
            “{WHAT_MAKES_DIFFERENT.thePrivateRealities}”
          </p>

          <div className="pt-6 border-t border-white/15 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-center">
            <span className="px-5 py-2 rounded-xl bg-white/15 border border-white/20 font-sans font-bold text-xs uppercase text-white tracking-widest">
              Honest
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A7A]" />
            <span className="px-5 py-2 rounded-xl bg-white/15 border border-white/20 font-sans font-bold text-xs uppercase text-white tracking-widest">
              Relatable
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF7A7A]" />
            <span className="px-5 py-2 rounded-xl bg-white/15 border border-white/20 font-sans font-bold text-xs uppercase text-white tracking-widest">
              Deeply Human
            </span>
          </div>

          <div className="text-center pt-2">
            <p className="text-base sm:text-lg text-white/90 font-sans font-light">
              {WHAT_MAKES_DIFFERENT.conclusion}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
