import React from 'react';
import { Bookmark, BookOpen, ArrowRight, Sparkles, Feather, ShieldCheck, HeartHandshake, Compass } from 'lucide-react';
import { BOOK_INFO } from '../data/bookData';
import { BookCoverMockup } from './BookCoverMockup';
import { AuthorSignatureLogo } from './AuthorSignatureLogo';

interface HeroProps {
  onOpenPreOrder: () => void;
  onOpenExcerpt: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenPreOrder,
  onOpenExcerpt,
}) => {
  return (
    <section
      id="hero-section"
      className="relative pt-24 pb-20 md:pt-32 md:pb-28 lg:pt-36 lg:pb-32 overflow-hidden bg-[#FAF8F5] border-b border-[#E8E2D8]"
    >
      {/* Dynamic Ambient Background Elements */}
      <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#194A37]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-0 w-[450px] h-[450px] bg-[#B81617]/6 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/3 w-[400px] h-[400px] bg-[#648C82]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Architectural Texture Watermark */}
      <div 
        className="absolute inset-0 opacity-[0.035] pointer-events-none bg-[radial-gradient(#194A37_1.2px,transparent_1.2px)] [background-size:28px_28px]"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          
          {/* Left Column: Dedicated Rich Forest Green Hero Enclosure Card */}
          <div className="lg:col-span-7 flex flex-col justify-between text-left relative rounded-3xl p-6 sm:p-10 lg:p-12 bg-gradient-to-br from-[#12382A] via-[#194A37] to-[#0F2F23] text-white shadow-2xl border border-[#2D6650]/40 overflow-hidden group">
            
            {/* Ambient Inner Highlights & Lighting inside the Left Card */}
            <div className="absolute -top-24 -right-24 w-80 h-80 bg-[#648C82]/25 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-[#B81617]/25 rounded-full blur-2xl pointer-events-none" />
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#FAF8F5_1px,transparent_1px)] [background-size:20px_20px]" />

            <div className="relative z-10 space-y-6">
              {/* Top Eyebrow Tag with Pulsing Light */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-[#FAF8F5] border border-white/20 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-xs">
                <span className="w-2 h-2 rounded-full bg-[#E5484D] animate-pulse" />
                <span className="font-sans">The Weight We Carry • Priority List</span>
              </div>

              {/* Main Book Title in Sans-Serif Display Typography */}
              <div className="space-y-3">
                <h1
                  id="hero-book-title"
                  className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-bold leading-[1.02] text-[#FAF8F5] tracking-tight uppercase"
                >
                  THE WEIGHT <br />
                  <span className="text-[#FF7A7A] font-light">
                    WE CARRY
                  </span>
                </h1>
                
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 pt-1 text-sm sm:text-base text-[#D4DFDA]">
                  <span className="font-sans uppercase text-xs tracking-wider text-[#A3C2B6] font-semibold">Written by</span>
                  <div className="flex items-center gap-2">
                    <span className="font-display font-bold text-white text-base sm:text-lg">{BOOK_INFO.author}</span>
                    <AuthorSignatureLogo variant="light" height="1.35rem" className="opacity-90 inline-flex" />
                  </div>
                  <span className="hidden sm:inline text-[#648C82]">•</span>
                  <span className="text-xs sm:text-sm text-[#A3C2B6] font-sans font-light">Jamaican Attorney, Senior Compliance Executive & Writer</span>
                </div>
              </div>

              {/* Core Lead Tagline from PDF - Illuminated Glass Quote Card */}
              <div className="w-full bg-white/10 backdrop-blur-md p-5 sm:p-6 rounded-2xl border-l-4 border-[#FF7A7A] border-y border-r border-white/15 shadow-inner">
                <p
                  id="hero-book-lead-quote"
                  className="font-sans text-xl sm:text-2xl lg:text-[23px] text-[#FAF8F5] leading-snug font-normal"
                >
                  “{BOOK_INFO.subtitle}”
                </p>
              </div>

              {/* Synopsis from PDF */}
              <p
                id="hero-book-synopsis"
                className="font-sans text-base sm:text-lg text-[#E1ECE7] leading-relaxed font-light"
              >
                {BOOK_INFO.tagline}
              </p>
              
              {/* Thematic Pillars Preview Chips */}
              <div className="pt-2 border-t border-white/15 flex flex-wrap gap-2 text-xs font-sans font-medium text-[#FAF8F5]">
                <span className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-xs border border-white/15 hover:bg-white/20 transition-colors">
                  The Invisible Load
                </span>
                <span className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-xs border border-white/15 hover:bg-white/20 transition-colors">
                  Relationships & Family
                </span>
                <span className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-xs border border-white/15 hover:bg-white/20 transition-colors">
                  Career & Ambition
                </span>
                <span className="px-3 py-1 rounded-lg bg-white/10 backdrop-blur-xs border border-white/15 hover:bg-white/20 transition-colors">
                  Thoughts Kept Inside
                </span>
              </div>
            </div>

            {/* Action Buttons in Hero Container */}
            <div className="relative z-10 pt-6 mt-4 border-t border-white/15 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <a
                href="#pre-order"
                className="inline-flex items-center justify-center gap-2.5 px-8 py-4 text-xs uppercase font-sans tracking-widest font-bold text-white bg-[#B81617] hover:bg-[#9B1213] active:scale-[0.98] rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer border border-[#FF7A7A]/30"
              >
                <Bookmark className="w-4 h-4 text-white" />
                <span>Join Pre-Order List</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                id="hero-read-excerpt-btn"
                onClick={onOpenExcerpt}
                className="inline-flex items-center justify-center gap-2 px-6 py-4 text-xs uppercase font-sans font-bold tracking-widest text-[#FAF8F5] bg-white/10 hover:bg-white/20 active:scale-[0.98] rounded-xl border border-white/25 transition-all duration-200 cursor-pointer shadow-xs backdrop-blur-xs"
              >
                <BookOpen className="w-4 h-4 text-[#A3C2B6]" />
                <span>Explore Overview</span>
              </button>
            </div>
          </div>

          {/* Right Column: 3D Book Visual Stage on Warm Cream Canvas */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative p-6 sm:p-8 rounded-3xl bg-white/80 backdrop-blur-xs border border-[#E8E2D8] shadow-sm">
            {/* Stage Backlight Glow */}
            <div className="absolute inset-0 bg-radial from-[#194A37]/15 via-transparent to-transparent rounded-full blur-3xl pointer-events-none scale-125" />

            {/* Book Display Podium */}
            <div className="relative z-10 w-full flex flex-col items-center">
              <div className="relative my-2">
                <BookCoverMockup
                  size="lg"
                  interactive={true}
                />
              </div>

              {/* Interactive Cue & Debut Tag */}
              <div className="mt-8 flex flex-col items-center gap-2">
                <div className="flex items-center gap-2 text-xs text-[#194A37] font-sans font-semibold bg-[#FAF8F5] px-4 py-2 rounded-full border border-[#E8E2D8] shadow-2xs">
                  <Sparkles className="w-3.5 h-3.5 text-[#B81617]" />
                  <span>Interactive 3D Book Preview • Hover to inspect</span>
                </div>
                <p className="font-sans text-xs text-[#84937D] font-light">
                  Available in Hardcover, Paperback, and Digital formats
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
