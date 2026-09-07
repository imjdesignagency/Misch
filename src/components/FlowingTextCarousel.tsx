import React from 'react';
import { useCMS } from '../context/CMSContext';

export const FlowingTextCarousel: React.FC = () => {
  const { content } = useCMS();
  const brandLines = content.marquee.items;

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
        {[...brandLines, ...brandLines].map((item, idx) => (
          <div key={idx} className="flex items-center gap-6 sm:gap-8 px-4 sm:px-6 shrink-0">
            <span
              className={`font-serif text-base sm:text-lg lg:text-xl tracking-wide ${
                item.highlight ? 'italic text-[#FF8585]' : 'text-[#FAF8F5]'
              }`}
            >
              {item.text}
            </span>

            {/* Accent Divider Dot */}
            <span className="w-1.5 h-1.5 rounded-full bg-[#648C82] shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
