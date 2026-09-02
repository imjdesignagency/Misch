import React from 'react';
import { BookOpen, Check, ArrowRight, Sparkles } from 'lucide-react';
import { ABOUT_THE_BOOK, BOOK_INFO } from '../data/bookData';
import { BookCoverMockup } from './BookCoverMockup';

interface AboutBookProps {
  onOpenExcerpt: () => void;
  onOpenPreOrder: () => void;
}

export const AboutBook: React.FC<AboutBookProps> = ({
  onOpenExcerpt,
  onOpenPreOrder,
}) => {
  return (
    <section
      id="about-the-book"
      className="py-20 md:py-28 bg-[#FAF8F5] border-t border-[#E8E2D8] relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-block bg-[#194A37] text-white px-4 py-1.5 rounded-full text-xs font-sans font-bold uppercase tracking-widest shadow-xs">
            About The Book
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#194A37] font-normal tracking-tight">
            {ABOUT_THE_BOOK.headline}
          </h2>
          <div className="w-16 h-0.5 bg-[#B81617] mx-auto mt-3" />
        </div>

        {/* The Emotional Roles from PDF */}
        <div className="mb-16 bg-white rounded-3xl p-6 sm:p-10 border border-[#E8E2D8] shadow-sm">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <p className="font-sans text-xl sm:text-2xl text-[#194A37] font-medium">
              {ABOUT_THE_BOOK.openingQuestion}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 max-w-5xl mx-auto">
            {ABOUT_THE_BOOK.roles.map((role, idx) => (
              <div
                key={idx}
                className="bg-[#FAF8F5] p-4.5 rounded-2xl border border-[#E8E2D8] flex items-center gap-3.5 transition-all hover:bg-white hover:border-[#648C82] hover:shadow-xs group"
              >
                <div className="w-8 h-8 rounded-xl bg-[#194A37]/10 flex items-center justify-center shrink-0 group-hover:bg-[#194A37] transition-colors">
                  <Check className="w-4 h-4 text-[#194A37] group-hover:text-white transition-colors" />
                </div>
                <span className="font-display text-base sm:text-lg text-[#1F2E28] font-medium">
                  {role}
                </span>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center pt-2 border-t border-[#E8E2D8]/60">
            <p className="font-sans text-lg sm:text-xl text-[#B81617] font-semibold">
              {ABOUT_THE_BOOK.coreQuestion}
            </p>
          </div>
        </div>

        {/* Narrative In-Depth & 3D Book Presentation Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: 3D Book Preview using same book as Hero */}
          <div className="lg:col-span-6 flex flex-col items-center justify-center">
            <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-3xl border border-[#E8E2D8] shadow-md flex flex-col items-center relative group">
              <div className="absolute top-4 left-5 px-3 py-1 rounded-full bg-[#194A37] text-white text-[10px] font-sans uppercase tracking-widest font-bold shadow-xs">
                Official Book Edition
              </div>

              {/* 3D Book Mockup */}
              <div className="pt-6 pb-2 w-full flex justify-center">
                <BookCoverMockup
                  size="md"
                  interactive={true}
                />
              </div>

              {/* Book Metadata Footnote */}
              <div className="mt-4 pt-3 border-t border-[#E8E2D8] w-full flex items-center justify-between text-xs text-[#84937D] font-sans">
                <span className="font-medium text-[#194A37]">Hardcover • Paperback • Digital</span>
                <span>By {BOOK_INFO.author}</span>
              </div>
            </div>
          </div>

          {/* Right Column: In-Depth Passages from PDF */}
          <div className="lg:col-span-6 space-y-6 text-left">
            <div className="space-y-3">
              <p className="font-sans text-base sm:text-lg text-[#1F2E28] leading-relaxed font-light">
                {ABOUT_THE_BOOK.descriptionParagraph1}
              </p>
            </div>

            <div className="bg-white p-6 sm:p-7 rounded-2xl border-l-4 border-[#194A37] border-y border-r border-[#E8E2D8] shadow-xs space-y-3">
              <h4 className="font-display text-base sm:text-lg text-[#194A37] font-semibold">
                {ABOUT_THE_BOOK.tryingLead}
              </h4>
              <ul className="space-y-2.5 font-sans">
                {ABOUT_THE_BOOK.characteristics.map((char, index) => (
                  <li key={index} className="flex items-start gap-2.5 text-sm sm:text-base text-[#1F2E28] font-light">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B81617] mt-2 shrink-0" />
                    <span>{char}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2 pt-2">
              <p className="font-sans text-lg text-[#194A37] font-normal">
                {ABOUT_THE_BOOK.closingReflection}
              </p>
              <p className="font-sans text-lg sm:text-xl text-[#7E0D09] font-medium">
                {ABOUT_THE_BOOK.finalPithy}
              </p>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={onOpenPreOrder}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs uppercase font-sans tracking-widest font-bold text-white bg-[#B81617] hover:bg-[#9B1213] rounded-xl shadow-md transition-all cursor-pointer"
              >
                <span>Pre-Order The Book</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={onOpenExcerpt}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-xs font-sans font-semibold uppercase tracking-wider text-[#194A37] hover:text-[#B81617] bg-white rounded-xl border border-[#E8E2D8] hover:border-[#648C82] transition-colors shadow-2xs cursor-pointer"
              >
                <BookOpen className="w-4 h-4 text-[#648C82]" />
                <span>Read Overview</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

