import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { BOOK_INFO } from '../data/bookData';

interface BookCoverMockupProps {
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
}

export const BookCoverMockup: React.FC<BookCoverMockupProps> = ({
  size = 'lg',
  interactive = true,
}) => {
  const [is3DMode, setIs3DMode] = useState<boolean>(true);
  const [coverStyle, setCoverStyle] = useState<'forest' | 'crimson' | 'editorial'>('forest');

  const sizeClasses = {
    sm: 'w-44 h-64',
    md: 'w-60 h-88',
    lg: 'w-72 sm:w-80 md:w-88 h-[440px] sm:h-[480px] md:h-[520px]',
  };

  return (
    <div className="flex flex-col items-center select-none" id="book-mockup-wrapper">
      {/* 3D Book Container */}
      <div
        className={`relative ${sizeClasses[size]} transition-all duration-500 ease-out`}
        style={{
          perspective: '1200px',
        }}
      >
        {/* Soft Ambient Depth Shadow Beneath */}
        <div
          className="absolute -bottom-8 left-6 right-6 h-12 rounded-full blur-2xl opacity-60 pointer-events-none transition-all"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(25,74,55,0.7) 0%, rgba(184,22,23,0.3) 50%, transparent 80%)',
          }}
        />

        {/* The 3D Book Object */}
        <div
          id="book-3d-model"
          className={`w-full h-full relative rounded-r-2xl rounded-l-md overflow-hidden transition-transform duration-700 book-shadow border-l-4 border-white/20 ${
            is3DMode
              ? 'transform rotate-y-[-8deg] rotate-x-[4deg] hover:rotate-y-[0deg] hover:rotate-x-[0deg]'
              : ''
          }`}
          style={{
            transformStyle: 'preserve-3d',
            backgroundColor: '#194A37',
          }}
        >
          {/* Crafted Editorial Cover Design */}
          <div
            className={`w-full h-full flex flex-col justify-between p-7 sm:p-8 text-white relative overflow-hidden ${
              coverStyle === 'forest'
                ? 'bg-gradient-to-br from-[#194A37] via-[#0F2F23] to-[#194A37]'
                : coverStyle === 'crimson'
                ? 'bg-gradient-to-br from-[#B81617] via-[#7E0D09] to-[#194A37]'
                : 'bg-gradient-to-b from-[#194A37] via-[#648C82] to-[#0F2F23]'
            }`}
          >
            {/* Subtle Textured Background Elements */}
            <div className="absolute inset-0 opacity-15 pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#648C82] rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#B81617] rounded-full blur-3xl" />
            </div>

            {/* Book Spine Texture Line on Left */}
            <div className="absolute left-0 top-0 bottom-0 w-5 book-spine-effect z-10 border-r border-white/10" />

            {/* Top Section: Crimson Accent Bar & Author Tag */}
            <div className="relative z-10 pl-2">
              {/* Crimson Accent Line */}
              <div className="h-1 w-12 bg-[#B81617] rounded-full mb-3 shadow-xs" />
              
              <h1 className="font-display text-3xl sm:text-4xl font-bold text-white leading-tight tracking-tight mb-2 uppercase">
                THE WEIGHT <br />
                <span className="text-[#FF7A7A] font-light">WE CARRY</span>
              </h1>
              
              <p className="text-[#A3C2B6] text-xs sm:text-sm font-semibold tracking-wider uppercase font-sans">
                A WORK BY {BOOK_INFO.author}
              </p>
            </div>

            {/* Center Abstract / Literary Motif with Ceramic Accent */}
            <div className="relative z-10 my-auto pl-2 py-2 text-left space-y-2">
              <div className="w-8 h-1 bg-[#648C82] rounded-full opacity-60" />
              <p className="text-white/90 font-sans text-xs sm:text-sm leading-relaxed max-w-[200px] font-light">
                "{BOOK_INFO.subtitle}"
              </p>
            </div>

            {/* Bottom Section: Frosted Badge */}
            <div className="relative z-10 w-full bg-white/10 backdrop-blur-md rounded-xl p-3 flex flex-col items-center justify-center text-center border border-white/15 shadow-inner">
              <span className="text-white text-[10px] sm:text-xs font-bold uppercase tracking-[0.2em] font-sans">
                The Weight We Carry
              </span>
              <span className="text-[#A3C2B6] text-[9px] font-sans uppercase font-bold tracking-widest mt-0.5">
                Misheca O. Seymour
              </span>
            </div>

            {/* Surface Sheen & Texture Overlay */}
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10 pointer-events-none" />
            <div className="absolute right-0 top-0 bottom-0 w-1.5 bg-gradient-to-l from-black/40 to-transparent pointer-events-none" />
          </div>

          {/* Book Spine Emboss simulation on Left */}
          <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/40 via-transparent to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Interactive Controls (3D angle toggle & color styles) */}
      {interactive && (
        <div className="mt-6 flex items-center justify-center gap-2 p-1.5 bg-white rounded-2xl border border-[#E8E2D8] shadow-xs">
          <button
            id="toggle-3d-btn"
            onClick={() => setIs3DMode(!is3DMode)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors cursor-pointer ${
              is3DMode
                ? 'bg-[#194A37] text-white shadow-2xs'
                : 'bg-[#FAF8F5] text-[#194A37] hover:bg-[#F2EFE9]'
            }`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>{is3DMode ? '3D Angle' : 'Flat View'}</span>
          </button>

          <div className="flex items-center gap-1.5 pl-2 border-l border-[#E8E2D8]">
            <button
              onClick={() => setCoverStyle('forest')}
              className={`w-4 h-4 rounded-full border transition-all ${
                coverStyle === 'forest' ? 'ring-2 ring-[#B81617] scale-110' : ''
              } bg-[#194A37] cursor-pointer`}
              title="Forest Green Style (#194A37)"
            />
            <button
              onClick={() => setCoverStyle('crimson')}
              className={`w-4 h-4 rounded-full border transition-all ${
                coverStyle === 'crimson' ? 'ring-2 ring-[#194A37] scale-110' : ''
              } bg-[#B81617] cursor-pointer`}
              title="Crimson Red Style (#B81617)"
            />
            <button
              onClick={() => setCoverStyle('editorial')}
              className={`w-4 h-4 rounded-full border transition-all ${
                coverStyle === 'editorial' ? 'ring-2 ring-[#B81617] scale-110' : ''
              } bg-[#648C82] cursor-pointer`}
              title="Sage Teal Style (#648C82)"
            />
          </div>
        </div>
      )}
    </div>
  );
};
