import React from 'react';
import { motion } from 'motion/react';
import { XCircle, CheckCircle2 } from 'lucide-react';
import { Reveal, StaggerContainer, StaggerItem, TextReveal } from './animations/Reveal';
import { useCMS } from '../context/CMSContext';

export const WhatMakesDifferent: React.FC = () => {
  const { content } = useCMS();
  const { whatMakesDifferent } = content;

  return (
    <section
      id="what-makes-different"
      className="py-24 md:py-36 bg-[#FAF8F5] relative overflow-hidden border-b border-[#E8E2D8]"
    >

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Reveal direction="down">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#194A37]/5 border border-[#194A37]/15">
              <span className="w-2 h-2 rounded-full bg-[#B81617]" />
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-[#194A37]">
                {whatMakesDifferent.badge}
              </span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#194A37] tracking-tight leading-[1.1]">
              <TextReveal
                text={whatMakesDifferent.headline}
                highlightWords={['Don’t', 'Usually', 'Talk', 'About.']}
                highlightClassName="italic font-serif text-[#B81617]"
              />
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <p className="font-sans text-base sm:text-lg text-[#1F2E28]/80 max-w-2xl mx-auto leading-relaxed">
              {whatMakesDifferent.contrast}
            </p>
          </Reveal>
        </div>

        {/* The Core Contrast Box */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16 items-stretch">
          {/* Side 1: The Prescriptive Approach */}
          <Reveal direction="right" delay={0.2} className="h-full">
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E2D8] shadow-sm flex flex-col justify-between text-left h-full"
            >
              <div className="space-y-4">
                <span className="text-xs uppercase tracking-widest font-sans font-bold text-[#84937D] block">
                  The Conventional Narrative
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-[#1F2E28] font-semibold leading-snug">
                  “How to Be Stronger, Better, and More Productive”
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#1F2E28]/75 leading-relaxed">
                  {whatMakesDifferent.contrast}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-[#E8E2D8] flex items-center gap-2 text-xs text-[#84937D]">
                <XCircle className="w-4 h-4 text-[#B81617]" />
                <span>Demands you do more, carry more, endure more.</span>
              </div>
            </motion.div>
          </Reveal>

          {/* Side 2: The Literary Sanctuary */}
          <Reveal direction="left" delay={0.3} className="h-full">
            <motion.div
              whileHover={{ y: -4 }}
              className="bg-gradient-to-br from-[#194A37] to-[#0F2F23] text-white rounded-3xl p-8 sm:p-10 border border-[#2D6650]/50 shadow-xl flex flex-col justify-between text-left relative overflow-hidden h-full"
            >
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#B81617]/15 rounded-full blur-2xl pointer-events-none" />

              <div className="space-y-4 relative z-10">
                <span className="text-xs uppercase tracking-widest font-sans font-bold text-[#A3C2B6] block">
                  The Weight We Carry Approach
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-semibold leading-snug">
                  “{whatMakesDifferent.approachLead}”
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#D4DFDA] leading-relaxed font-light">
                  {whatMakesDifferent.coreMessage}
                </p>
              </div>

              <div className="mt-8 pt-6 border-t border-white/15 flex items-center gap-2 text-xs text-[#A3C2B6] relative z-10">
                <CheckCircle2 className="w-4 h-4 text-[#FF7A7A]" />
                <span>Recognition, honesty, and permission to exhale.</span>
              </div>
            </motion.div>
          </Reveal>
        </div>

        {/* Slide 5: What This Brand Is NOT Grid */}
        <Reveal direction="up" delay={0.3} distance={40}>
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#E8E2D8] shadow-sm">
            <div className="max-w-2xl mb-10 text-left">
              <span className="text-xs uppercase tracking-widest font-sans font-bold text-[#B81617] block mb-2">
                Brand Positioning
              </span>
              <h3 className="font-serif text-2xl sm:text-3xl text-[#194A37] font-semibold">
                Clear Boundaries, Honest Art
              </h3>
              <p className="font-sans text-sm sm:text-base text-[#1F2E28]/70 mt-2">
                To remain authentic to women’s lived experiences, this brand is deliberately defined by what it refuses to become:
              </p>
            </div>

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-left" staggerChildren={0.08}>
              {whatMakesDifferent.whatItIsNot.map((item, idx) => (
                <StaggerItem key={idx}>
                  <motion.div
                    whileHover={{ y: -3, borderColor: '#194A37' }}
                    className="p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8] space-y-2 transition-all h-full shadow-2xs"
                  >
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#B81617]" />
                      <h4 className="font-serif text-base text-[#194A37] font-semibold">
                        {item.title}
                      </h4>
                    </div>
                    <p className="font-sans text-xs sm:text-sm text-[#1F2E28]/75 leading-relaxed">
                      {item.description}
                    </p>
                  </motion.div>
                </StaggerItem>
              ))}
            </StaggerContainer>

            {/* Central quote banner */}
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="mt-10 p-6 rounded-2xl bg-[#194A37]/5 border border-[#194A37]/15 text-center"
            >
              <p className="font-serif italic text-lg sm:text-xl text-[#194A37]">
                “{whatMakesDifferent.thePrivateRealities}”
              </p>
            </motion.div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
