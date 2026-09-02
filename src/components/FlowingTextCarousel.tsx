import React from 'react';
import { BOOK_INFO } from '../data/bookData';

export const FlowingTextCarousel: React.FC = () => {
  const tickerItems = [
    { title: BOOK_INFO.title, author: BOOK_INFO.author },
    { title: BOOK_INFO.title, author: BOOK_INFO.author },
    { title: BOOK_INFO.title, author: BOOK_INFO.author },
    { title: BOOK_INFO.title, author: BOOK_INFO.author },
  ];

  return (
    <div
      id="flowing-text-carousel"
      className="relative w-full bg-[#0F2F23] border-y border-white/15 py-4 overflow-hidden select-none z-20 shadow-md"
    >
      {/* Subtle Gradient Overlays on Edges for Smooth Fade In/Out */}
      <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-r from-[#0F2F23] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-28 bg-gradient-to-l from-[#0F2F23] to-transparent z-10 pointer-events-none" />

      {/* Infinite Seamless Scrolling Track */}
      <div className="flex w-max animate-marquee hover:[animation-play-state:paused] cursor-default">
        {/* Repeating Item Sets for Continuous Seamless Marquee */}
        {[...tickerItems, ...tickerItems, ...tickerItems, ...tickerItems].map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 sm:gap-10 px-4 sm:px-6 shrink-0">
            {/* Book Title in Bold Display Caps */}
            <span className="font-display font-bold text-lg sm:text-xl lg:text-2xl text-white uppercase tracking-wider">
              {item.title}
            </span>

            {/* Accent Divider Dot / Diamond */}
            <span className="w-2 h-2 rounded-full bg-[#FF7A7A] shrink-0 shadow-xs" />

            {/* Author Name */}
            <span className="font-sans font-light text-base sm:text-lg lg:text-xl text-[#A3C2B6] uppercase tracking-widest">
              By <strong className="font-semibold text-white">{item.author}</strong>
            </span>

            {/* Accent Diamond */}
            <span className="text-[#FF7A7A] text-xs font-serif shrink-0">✦</span>

            {/* Short Book Subtitle / Motto */}
            <span className="hidden md:inline font-sans text-xs sm:text-sm text-white/80 font-light tracking-wide italic">
              “{BOOK_INFO.subtitle}”
            </span>

            {/* Separator Line */}
            <span className="h-4 w-px bg-white/20 shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
