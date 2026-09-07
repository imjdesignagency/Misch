import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Reveal, StaggerContainer, StaggerItem, TextReveal } from './animations/Reveal';
import { useCMS } from '../context/CMSContext';

export const ContrastJourney: React.FC = () => {
  const { content } = useCMS();
  const { contrastJourney } = content;
  const contrasts = contrastJourney.contrasts;

  const [selectedIdx, setSelectedIdx] = useState(0);
  const [showInvisible, setShowInvisible] = useState(false);

  const safeIdx = selectedIdx < contrasts.length ? selectedIdx : 0;
  const activeItem = contrasts[safeIdx] || contrasts[0];

  return (
    <section
      id="brand-essence"
      className="py-24 md:py-36 bg-[#F5EFEB] relative overflow-hidden border-b border-[#E8E2D8]"
    >

      {/* Soft atmospheric gradient background */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[600px] bg-gradient-to-b from-[#FAF8F5] via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/3 -left-32 w-96 h-96 bg-[#194A37]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 -right-32 w-96 h-96 bg-[#B81617]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Act Header: Literary Branding */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Reveal direction="down">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/80 border border-[#E8E2D8] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#B81617]" />
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-[#194A37]">
                {contrastJourney.badge}
              </span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#194A37] tracking-tight leading-[1.1]">
              <TextReveal text={contrastJourney.headline} highlightWords={['invisible', 'invisible.']} highlightClassName="italic font-serif text-[#B81617]" />
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <p className="font-sans text-base sm:text-xl text-[#1F2E28]/80 max-w-2xl mx-auto leading-relaxed">
              {contrastJourney.lead}
            </p>
          </Reveal>
        </div>

        {/* Interactive Contrast Console with Scroll Reveal */}
        <Reveal direction="up" delay={0.25} distance={40}>
          <div className="bg-white rounded-3xl p-6 sm:p-10 lg:p-12 shadow-xl border border-[#E8E2D8] relative">
            {/* Top Archetype Selector Pills */}
            <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pb-8 border-b border-[#E8E2D8]">
              <span className="text-xs uppercase tracking-widest font-sans font-bold text-[#84937D] mr-2 hidden sm:inline">
                Explore A Reality:
              </span>
              {contrasts.map((item, idx) => {
                const isActive = safeIdx === idx;
                return (
                  <motion.button
                    key={item.id || idx}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    onClick={() => setSelectedIdx(idx)}
                    className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-sans font-medium transition-all duration-200 cursor-pointer ${
                      isActive
                        ? 'bg-[#194A37] text-white shadow-md'
                        : 'bg-[#FAF8F5] text-[#1F2E28]/70 hover:text-[#194A37] hover:bg-[#F2EFE9] border border-[#E8E2D8]'
                    }`}
                  >
                    {item.archetype}
                  </motion.button>
                );
              })}
            </div>

            {/* Context Tag */}
            <div className="py-6 text-center">
              <motion.span
                key={activeItem.context}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-xs uppercase font-sans tracking-widest text-[#84937D] bg-[#FAF8F5] px-4 py-1.5 rounded-full border border-[#E8E2D8]"
              >
                Setting: {activeItem.context}
              </motion.span>
            </div>

            {/* Interactive Lens Switcher Bar */}
            <div className="max-w-md mx-auto mb-10 bg-[#FAF8F5] p-1.5 rounded-2xl border border-[#E8E2D8] flex items-center shadow-inner">
              <button
                onClick={() => setShowInvisible(false)}
                className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-sans font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                  !showInvisible
                    ? 'bg-white text-[#194A37] shadow-sm border border-[#E8E2D8]'
                    : 'text-[#1F2E28]/60 hover:text-[#194A37]'
                }`}
              >
                <Eye className="w-4 h-4 text-[#194A37]" />
                <span>What People See</span>
              </button>

              <button
                onClick={() => setShowInvisible(true)}
                className={`flex-1 py-3 px-4 rounded-xl text-xs sm:text-sm font-sans font-semibold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-300 cursor-pointer ${
                  showInvisible
                    ? 'bg-[#B81617] text-white shadow-md'
                    : 'text-[#1F2E28]/60 hover:text-[#B81617]'
                }`}
              >
                <EyeOff className="w-4 h-4 text-white" />
                <span>What She Carries</span>
              </button>
            </div>

            {/* Contrast Card Stage with Motion Transition */}
            <div className="relative min-h-[320px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                {!showInvisible ? (
                  /* Visible Side (The Public Composure) */
                  <motion.div
                    key={`visible-${activeItem.id}`}
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -15, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="w-full bg-[#FAF8F5] rounded-2xl p-8 sm:p-12 border border-[#E8E2D8] text-left relative overflow-hidden"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-[#194A37]/5 rounded-bl-full pointer-events-none" />

                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#194A37]" />
                      <span className="font-sans text-xs uppercase tracking-widest font-bold text-[#194A37]">
                        {activeItem.visible.tag}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#194A37] font-semibold mb-4 leading-snug">
                      {activeItem.visible.title}
                    </h3>

                    <p className="font-sans text-base sm:text-lg text-[#1F2E28]/85 leading-relaxed mb-6 max-w-2xl">
                      {activeItem.visible.description}
                    </p>

                    <div className="p-4 sm:p-5 rounded-xl bg-white border border-[#E8E2D8] inline-block shadow-2xs">
                      <p className="font-serif italic text-lg sm:text-xl text-[#194A37]">
                        {activeItem.visible.quote}
                      </p>
                    </div>

                    {/* Gentle Invitation to Flip */}
                    <div className="mt-8 pt-6 border-t border-[#E8E2D8] flex items-center justify-between">
                      <span className="font-sans text-xs text-[#84937D]">
                        She may look composed, capable, or strong...
                      </span>
                      <motion.button
                        whileHover={{ x: 4 }}
                        onClick={() => setShowInvisible(true)}
                        className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-[#B81617] hover:underline cursor-pointer"
                      >
                        <span>Reveal The Invisible Weight</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </motion.button>
                    </div>
                  </motion.div>
                ) : (
                  /* Invisible Side (The Raw Inner Truth) */
                  <motion.div
                    key={`invisible-${activeItem.id}`}
                    initial={{ opacity: 0, y: 15, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -15, scale: 0.98 }}
                    transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                    className="w-full bg-gradient-to-br from-[#194A37] via-[#12382A] to-[#0F2F23] text-white rounded-2xl p-8 sm:p-12 border border-[#B81617]/40 text-left relative overflow-hidden shadow-2xl"
                  >
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#B81617]/15 rounded-full blur-3xl pointer-events-none" />

                    <div className="flex items-center gap-2 mb-4">
                      <span className="w-2.5 h-2.5 rounded-full bg-[#E5484D] animate-pulse" />
                      <span className="font-sans text-xs uppercase tracking-widest font-bold text-[#FF7A7A]">
                        {activeItem.invisible.tag}
                      </span>
                    </div>

                    <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-white font-semibold mb-4 leading-snug">
                      {activeItem.invisible.title}
                    </h3>

                    <p className="font-sans text-base sm:text-lg text-[#E1ECE7] leading-relaxed mb-6 max-w-2xl font-light">
                      {activeItem.invisible.description}
                    </p>

                    <div className="p-4 sm:p-5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15 inline-block shadow-inner">
                      <p className="font-serif italic text-lg sm:text-xl text-[#FFB3B3]">
                        {activeItem.invisible.quote}
                      </p>
                    </div>

                    {/* Cathartic Acknowledgment */}
                    <div className="mt-8 pt-6 border-t border-white/15 flex flex-wrap items-center justify-between gap-4">
                      <p className="font-sans text-xs sm:text-sm text-[#A3C2B6] italic">
                        “Sometimes, being seen is the beginning of feeling lighter.”
                      </p>
                      <button
                        onClick={() => setShowInvisible(false)}
                        className="inline-flex items-center gap-1.5 text-xs font-sans font-bold uppercase tracking-wider text-white hover:text-[#FF7A7A] transition-colors cursor-pointer"
                      >
                        <span>Return to the Surface</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        {/* Supporting Messages Ribbon with Stagger Animation */}
        <StaggerContainer className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 text-left" staggerChildren={0.15}>
          <StaggerItem>
            <motion.div
              whileHover={{ y: -4, borderColor: '#194A37' }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-2xl bg-white/80 border border-[#E8E2D8] space-y-2 h-full shadow-2xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#B81617] inline-block" />
              <h4 className="font-serif text-lg text-[#194A37] font-semibold">
                The Unspoken Load
              </h4>
              <p className="font-sans text-sm text-[#1F2E28]/80 leading-relaxed">
                “Some of the heaviest things we carry are the things no one can see.”
              </p>
            </motion.div>
          </StaggerItem>

          <StaggerItem>
            <motion.div
              whileHover={{ y: -4, borderColor: '#194A37' }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-2xl bg-white/80 border border-[#E8E2D8] space-y-2 h-full shadow-2xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#194A37] inline-block" />
              <h4 className="font-serif text-lg text-[#194A37] font-semibold">
                Beyond The Smile
              </h4>
              <p className="font-sans text-sm text-[#1F2E28]/80 leading-relaxed">
                “There is more behind the smile than people realize.”
              </p>
            </motion.div>
          </StaggerItem>

          <StaggerItem>
            <motion.div
              whileHover={{ y: -4, borderColor: '#194A37' }}
              transition={{ duration: 0.2 }}
              className="p-6 rounded-2xl bg-white/80 border border-[#E8E2D8] space-y-2 h-full shadow-2xs"
            >
              <span className="w-2 h-2 rounded-full bg-[#648C82] inline-block" />
              <h4 className="font-serif text-lg text-[#194A37] font-semibold">
                Redefining Strength
              </h4>
              <p className="font-sans text-sm text-[#1F2E28]/80 leading-relaxed">
                “Strength does not mean carrying everything alone.”
              </p>
            </motion.div>
          </StaggerItem>
        </StaggerContainer>
      </div>
    </section>
  );
};
