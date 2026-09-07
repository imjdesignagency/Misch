import React from 'react';
import { motion } from 'motion/react';
import {
  Bookmark,
  ArrowRight,
  Sparkles,
  ArrowDown,
  BookOpen,
  Star,
  Award,
} from 'lucide-react';
import { BookCoverMockup } from './BookCoverMockup';
import { AuthorSignatureLogo } from './AuthorSignatureLogo';
import { Reveal, TextReveal } from './animations/Reveal';
import { useCMS } from '../context/CMSContext';

interface HeroProps {
  onOpenPreOrder: () => void;
  onOpenExcerpt: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenPreOrder,
  onOpenExcerpt,
}) => {
  const { content } = useCMS();
  const { hero, site } = content;

  return (
    <section
      id="hero-section"
      className="relative pt-28 pb-20 md:pt-36 md:pb-28 lg:pt-40 lg:pb-32 overflow-hidden bg-[#FAF8F5] animate-hero-canvas-gradient border-b border-[#E8E2D8]"
    >
      {/* Dynamic Animated Ambient Mesh Gradients */}
      <motion.div
        animate={{
          x: [0, 70, -35, 0],
          y: [0, -55, 45, 0],
          scale: [1, 1.25, 0.95, 1],
          rotate: [0, 90, 180, 360],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -top-24 -right-24 w-[650px] h-[650px] bg-gradient-to-br from-[#194A37]/22 via-[#648C82]/15 to-transparent rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, -60, 50, 0],
          y: [0, 60, -40, 0],
          scale: [1, 1.2, 0.9, 1],
          rotate: [360, 240, 120, 0],
        }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute top-1/3 -left-32 w-[580px] h-[580px] bg-gradient-to-tr from-[#B81617]/14 via-[#FF8585]/10 to-transparent rounded-full blur-3xl pointer-events-none"
      />
      <motion.div
        animate={{
          x: [0, 50, -50, 0],
          y: [0, -30, 50, 0],
          scale: [0.9, 1.15, 0.95, 0.9],
        }}
        transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute -bottom-24 left-1/3 w-[520px] h-[520px] bg-gradient-to-t from-[#648C82]/16 via-[#194A37]/12 to-transparent rounded-full blur-3xl pointer-events-none"
      />

      {/* Floating Starlight Particles */}
      <motion.div
        animate={{
          y: [0, -25, 0],
          opacity: [0.3, 0.8, 0.3],
          scale: [0.8, 1.2, 0.8],
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/4 right-1/3 w-2 h-2 rounded-full bg-[#E5B568] shadow-[0_0_12px_#E5B568] pointer-events-none"
      />
      <motion.div
        animate={{
          y: [0, -35, 0],
          opacity: [0.2, 0.7, 0.2],
          scale: [0.9, 1.3, 0.9],
        }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute bottom-1/3 left-1/4 w-2.5 h-2.5 rounded-full bg-[#FF8585] shadow-[0_0_15px_#FF8585] pointer-events-none"
      />
      <motion.div
        animate={{
          y: [0, -20, 0],
          opacity: [0.2, 0.6, 0.2],
          scale: [0.7, 1.1, 0.7],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
        className="absolute top-1/3 left-1/12 w-1.5 h-1.5 rounded-full bg-[#A3C2B6] shadow-[0_0_10px_#A3C2B6] pointer-events-none"
      />

      {/* Subtle Animated Ambient Sheen Overlay */}
      <motion.div
        animate={{
          opacity: [0.35, 0.6, 0.35],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute inset-0 bg-gradient-to-tr from-transparent via-[#FAF8F5]/40 to-transparent pointer-events-none"
      />

      {/* Subtle Texture Grain Grid */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#194A37_1px,transparent_1px)] [background-size:24px_24px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Dedicated Literary Brand Storytelling Box with Entry Motion & Flowing Animated Green Gradient */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-7 flex flex-col justify-between text-left relative rounded-3xl p-7 sm:p-10 lg:p-12 animate-hero-gradient text-white shadow-2xl border border-[#4A856E]/40 hover:border-[#6BAA91]/60 transition-all duration-500 overflow-hidden group"
          >
            {/* Archival Corner Folio Accents */}
            <div className="absolute top-3.5 left-3.5 w-4 h-4 border-t border-l border-[#A3C2B6]/40 pointer-events-none rounded-tl-xs" />
            <div className="absolute bottom-3.5 right-3.5 w-4 h-4 border-b border-r border-[#A3C2B6]/40 pointer-events-none rounded-br-xs" />

            {/* Ambient Inner Highlights with Organic Floating Motion */}
            <motion.div
              animate={{
                x: [0, 30, -20, 0],
                y: [0, -25, 20, 0],
                scale: [1, 1.18, 0.95, 1],
                opacity: [0.28, 0.48, 0.32, 0.28],
              }}
              transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-24 -right-24 w-88 h-88 bg-gradient-to-br from-[#648C82] via-[#2D6650] to-transparent rounded-full blur-2xl pointer-events-none"
            />
            <motion.div
              animate={{
                x: [0, -25, 25, 0],
                y: [0, 25, -15, 0],
                scale: [1, 1.15, 0.92, 1],
                opacity: [0.22, 0.42, 0.26, 0.22],
              }}
              transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-20 -left-20 w-80 h-80 bg-gradient-to-tr from-[#B81617] via-[#FF8585]/60 to-transparent rounded-full blur-2xl pointer-events-none"
            />
            <motion.div
              animate={{
                x: [0, 35, -30, 0],
                y: [0, 20, -25, 0],
                opacity: [0.12, 0.25, 0.15, 0.12],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              className="absolute top-1/2 right-1/4 w-60 h-60 bg-radial from-[#A3C2B6]/30 to-transparent rounded-full blur-xl pointer-events-none"
            />

            <div className="relative z-10 space-y-6">
              {/* Brand Feel Eyebrow in Red Serif Italic with Collector Badges */}
              <Reveal direction="down" delay={0.1}>
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-serif italic text-lg sm:text-xl text-[#FF8585] tracking-wide">
                    {hero.eyebrowLabel || 'brand feel:'}
                  </span>
                  <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-[#FAF8F5] border border-white/20 px-3 py-1 rounded-full text-xs font-sans font-medium shadow-xs">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#E5484D] animate-ping" />
                    <span>{hero.eyebrowBadge}</span>
                  </div>
                  <div className="hidden sm:inline-flex items-center gap-1.5 bg-[#FF8585]/15 text-[#FFB8B8] border border-[#FF8585]/30 px-3 py-1 rounded-full text-xs font-sans font-medium">
                    <Sparkles className="w-3 h-3 text-[#FF8585]" />
                    <span>Collector's Edition</span>
                  </div>
                </div>
              </Reveal>

              {/* Main Title: Staggered Word Reveal */}
              <div className="space-y-2">
                <h1
                  id="hero-book-title"
                  className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-[66px] font-normal leading-[1.05] text-[#FAF8F5] tracking-tight"
                >
                  <TextReveal text={hero.headlineLine1} delay={0.2} />
                  <br />
                  <TextReveal
                    text={hero.headlineLine2}
                    delay={0.4}
                    highlightWords={hero.headlineLine2.split(' ')}
                    highlightClassName="italic font-serif text-[#FF8585]"
                  />
                </h1>
                
                {/* Author attribution with signature */}
                <Reveal direction="up" delay={0.45}>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-2 text-sm text-[#D4DFDA]">
                    <span className="font-sans uppercase text-xs tracking-wider text-[#A3C2B6] font-medium">
                      {hero.authorPrefix || 'Stories by'}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="font-serif text-lg text-white font-medium">{site.author}</span>
                      <AuthorSignatureLogo variant="light" height="1.35rem" className="opacity-90 inline-flex" />
                    </div>
                    <span className="hidden sm:inline text-[#648C82]">•</span>
                    <span className="text-xs text-[#A3C2B6] font-sans">{site.authorTitle}</span>
                  </div>
                </Reveal>
              </div>

              {/* Central Emotional Anchor: Brand Essence */}
              <Reveal direction="up" delay={0.55}>
                <motion.div
                  whileHover={{ scale: 1.01 }}
                  transition={{ duration: 0.2 }}
                  className="w-full bg-white/10 backdrop-blur-md p-5 sm:p-6 rounded-2xl border-l-4 border-[#FF8585] border-y border-r border-white/15 shadow-inner space-y-2 relative overflow-hidden group/quote"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF8585]/10 rounded-full blur-xl pointer-events-none group-hover/quote:scale-125 transition-transform" />
                  <p className="font-serif italic text-xl sm:text-2xl text-[#FAF8F5] leading-snug">
                    “{hero.quote}”
                  </p>
                  <p className="font-sans text-xs sm:text-sm text-[#A3C2B6]">
                    {hero.contrastQuote}
                  </p>
                </motion.div>
              </Reveal>

              {/* Emotional Promise */}
              <Reveal direction="up" delay={0.65}>
                <p
                  id="hero-book-synopsis"
                  className="font-sans text-sm sm:text-base text-[#E1ECE7] leading-relaxed font-light max-w-xl"
                >
                  {site.tagline}
                </p>
              </Reveal>
              
              {/* Journey Anchors with Staggered Badges */}
              <Reveal direction="up" delay={0.72}>
                <div className="pt-2 border-t border-white/15 flex flex-wrap gap-2 text-xs font-sans font-medium text-[#FAF8F5]">
                  {(hero.pills || []).map((tag, idx) => (
                    <motion.span
                      key={tag}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.8 + idx * 0.1, duration: 0.4 }}
                      whileHover={{ scale: 1.05, backgroundColor: 'rgba(255,255,255,0.18)' }}
                      className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-xs border border-white/15 transition-colors cursor-default"
                    >
                      {tag}
                    </motion.span>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Action Buttons with Interactive Pulsing & Social Proof Footer */}
            <Reveal direction="up" delay={0.85}>
              <div className="relative z-10 pt-6 mt-6 border-t border-white/15 space-y-3.5">
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onOpenPreOrder}
                    className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs uppercase font-sans tracking-widest font-bold text-white bg-[#B81617] hover:bg-[#9B1213] rounded-xl shadow-[0_12px_28px_-6px_rgba(184,22,23,0.55)] hover:shadow-[0_16px_36px_-6px_rgba(184,22,23,0.7)] transition-all duration-300 group cursor-pointer border border-[#FF8585]/40"
                  >
                    <Bookmark className="w-4 h-4 text-white" />
                    <span>{hero.primaryCta}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={onOpenExcerpt}
                    className="inline-flex items-center justify-center gap-2 px-6 py-4 text-xs uppercase font-sans font-semibold tracking-wider text-[#FAF8F5] bg-white/10 hover:bg-white/20 rounded-xl border border-white/25 transition-all duration-200 cursor-pointer shadow-xs backdrop-blur-xs"
                  >
                    <ArrowDown className="w-4 h-4 text-[#FF8585]" />
                    <span>{hero.secondaryCta}</span>
                  </motion.button>
                </div>

                {/* Sub-CTA Collector Assurance */}
                <div className="flex items-center gap-2 text-xs text-[#A3C2B6] font-sans pt-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#FF8585]" />
                  <span>Free Instant Digital Sampler with Pre-Order • Ships in Archival Slipcase</span>
                </div>
              </div>
            </Reveal>
          </motion.div>

          {/* Right Column: 3D Book Stage with Warm Lighting & Gentle Floating Animation */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="lg:col-span-5 flex flex-col items-center justify-center relative p-6 sm:p-10 rounded-3xl bg-white/85 backdrop-blur-md border border-[#E8E2D8] shadow-xl overflow-visible"
          >
            {/* Stage Backlight Glow */}
            <div className="absolute inset-0 bg-radial from-[#194A37]/20 via-[#648C82]/10 to-transparent rounded-full blur-3xl pointer-events-none scale-125" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-[#FF8585]/10 rounded-full blur-2xl pointer-events-none" />

            {/* Floating Luxury Stamp Badge (Top Right) */}
            <motion.div
              animate={{
                y: [0, -6, 0],
                rotate: [-1, 1, -1],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-3 sm:-right-4 z-20 flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#194A37] text-white border border-[#A3C2B6]/40 shadow-xl text-[11px] font-sans font-semibold tracking-wide"
            >
              <Award className="w-3.5 h-3.5 text-[#E5B568]" />
              <span>Official 1st Edition</span>
            </motion.div>

            {/* Floating Review Metric Chip (Bottom Left) */}
            <motion.div
              animate={{
                y: [0, 5, 0],
                rotate: [1, -1, 1],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              className="absolute -bottom-3 -left-3 sm:-left-4 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white text-[#194A37] border border-[#E8E2D8] shadow-lg text-[11px] font-sans font-semibold"
            >
              <div className="flex items-center text-[#E5B568]">
                <Star className="w-3 h-3 fill-[#E5B568]" />
                <Star className="w-3 h-3 fill-[#E5B568]" />
                <Star className="w-3 h-3 fill-[#E5B568]" />
                <Star className="w-3 h-3 fill-[#E5B568]" />
                <Star className="w-3 h-3 fill-[#E5B568]" />
              </div>
              <span className="font-bold text-[#194A37]">4.9</span>
              <span className="text-[#84937D] font-normal">• 180+ Readers</span>
            </motion.div>

            {/* Book Display Podium with Gentle Float */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="relative z-10 w-full flex flex-col items-center"
            >
              <div className="relative my-2">
                <BookCoverMockup
                  size="lg"
                  interactive={true}
                  sectionKey="hero"
                />
              </div>

              {/* Interactive Cue & Look Inside Button */}
              <div className="mt-8 flex flex-col items-center gap-2.5 text-center w-full">
                <div className="flex flex-wrap items-center justify-center gap-2">
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    className="flex items-center gap-2 text-xs text-[#194A37] font-sans font-semibold bg-[#FAF8F5] px-3.5 py-1.5 rounded-full border border-[#E8E2D8] shadow-2xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#B81617] animate-spin" style={{ animationDuration: '6s' }} />
                    <span>Interactive 3D Cover • Drag to rotate</span>
                  </motion.div>

                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    onClick={onOpenExcerpt}
                    className="flex items-center gap-1.5 text-xs text-[#B81617] font-sans font-bold bg-[#FF8585]/15 hover:bg-[#FF8585]/25 px-3.5 py-1.5 rounded-full border border-[#FF8585]/30 shadow-2xs transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#B81617]" />
                    <span>Look Inside Excerpt</span>
                  </motion.button>
                </div>

                <p className="font-serif italic text-sm text-[#84937D] mt-1 max-w-xs">
                  “{hero.quote}”
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

