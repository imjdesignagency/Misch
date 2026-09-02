import React, { useState } from 'react';
import { X, BookOpen, Bookmark, Type } from 'lucide-react';
import { ABOUT_THE_BOOK, BOOK_INFO } from '../data/bookData';

interface ExcerptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenPreOrder: () => void;
}

export const ExcerptModal: React.FC<ExcerptModalProps> = ({
  isOpen,
  onClose,
  onOpenPreOrder,
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large'>('normal');

  if (!isOpen) return null;

  return (
    <div
      id="excerpt-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0F2F23]/70 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200"
    >
      <div
        id="excerpt-modal-card"
        className="bg-[#FAF8F5] rounded-3xl border border-[#E8E2D8] shadow-2xl max-w-2xl w-full p-6 sm:p-10 relative text-[#1F2E28] my-8 max-h-[90vh] flex flex-col justify-between"
      >
        {/* Top Control Bar */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D8]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#194A37]/10 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-[#194A37]" />
            </div>
            <div>
              <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#648C82]">
                Book Overview
              </span>
              <h4 className="font-display font-medium text-sm text-[#194A37]">
                {BOOK_INFO.title}
              </h4>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Font Size Adjuster */}
            <button
              onClick={() => setFontSize(fontSize === 'normal' ? 'large' : 'normal')}
              className="p-2 text-xs rounded-xl text-[#194A37] hover:bg-[#F2EFE9] border border-[#E8E2D8] transition-colors flex items-center gap-1 font-medium cursor-pointer"
              title="Toggle Font Size"
            >
              <Type className="w-3.5 h-3.5" />
              <span className="text-[10px] font-sans font-bold">{fontSize === 'normal' ? 'A+' : 'A-'}</span>
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#84937D] hover:text-[#B81617] hover:bg-[#F2EFE9] transition-colors cursor-pointer"
              aria-label="Close Overview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Reading Content strictly from PDF */}
        <div className="py-6 overflow-y-auto pr-2 space-y-6 text-left my-2 scrollbar-thin">
          <div className="text-center pb-2">
            <h3 className="font-display text-2xl sm:text-3xl text-[#194A37] font-normal tracking-tight">
              {ABOUT_THE_BOOK.headline}
            </h3>
            <p className="font-sans text-xs text-[#648C82] font-bold uppercase tracking-wider mt-1">
              By {BOOK_INFO.author}
            </p>
            <div className="w-12 h-0.5 bg-[#B81617] rounded-full mx-auto mt-3" />
          </div>

          <div
            className={`space-y-4 font-sans leading-relaxed text-[#1F2E28] font-light ${
              fontSize === 'large' ? 'text-lg sm:text-xl' : 'text-base sm:text-lg'
            }`}
          >
            <p className="text-[#194A37] font-medium">
              {ABOUT_THE_BOOK.openingQuestion}
            </p>

            <ul className="space-y-1.5 pl-4 list-disc list-inside text-sm sm:text-base font-light">
              {ABOUT_THE_BOOK.roles.map((role, idx) => (
                <li key={idx}>{role}</li>
              ))}
            </ul>

            <p className="text-[#B81617] font-semibold pt-2">
              {ABOUT_THE_BOOK.coreQuestion}
            </p>

            <p className="pt-2 font-light">
              {ABOUT_THE_BOOK.descriptionParagraph1}
            </p>

            <div className="pt-2">
              <p className="font-sans font-medium text-[#194A37]">
                {ABOUT_THE_BOOK.tryingLead}
              </p>
              <ul className="space-y-1.5 pl-4 list-disc list-inside text-sm sm:text-base mt-2 font-light">
                {ABOUT_THE_BOOK.characteristics.map((char, idx) => (
                  <li key={idx}>{char}</li>
                ))}
              </ul>
            </div>

            <p className="text-[#194A37] pt-2 font-normal">
              {ABOUT_THE_BOOK.closingReflection}
            </p>

            <p className="text-[#7E0D09] font-medium">
              {ABOUT_THE_BOOK.finalPithy}
            </p>
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-4 border-t border-[#E8E2D8] flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-sans text-xs text-[#648C82] font-bold uppercase tracking-wider">
            The Weight We Carry
          </span>
          <button
            onClick={() => {
              onClose();
              onOpenPreOrder();
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#B81617] hover:bg-[#9B1213] text-white text-xs font-sans uppercase tracking-widest font-bold shadow-md transition-all cursor-pointer border border-[#FF7A7A]/30"
          >
            <Bookmark className="w-3.5 h-3.5" />
            <span>Pre-Order The Book</span>
          </button>
        </div>
      </div>
    </div>
  );
};
