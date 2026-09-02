import React from 'react';
import { Bookmark, CheckCircle2, Sparkles } from 'lucide-react';
import { RESONANCE_POINTS } from '../data/bookData';

interface WhoIsThisForProps {
  onOpenPreOrder: () => void;
}

export const WhoIsThisFor: React.FC<WhoIsThisForProps> = ({ onOpenPreOrder }) => {
  return (
    <section
      id="who-is-this-for"
      className="py-20 md:py-32 bg-[#194A37] text-white relative overflow-hidden"
    >
      {/* Background ambient lighting accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#648C82]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0F2F23]/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <div className="inline-block bg-white/10 text-[#FAF8F5] border border-white/20 px-4 py-1.5 rounded-full text-xs font-sans font-bold uppercase tracking-widest shadow-xs backdrop-blur-xs">
            Who This Book Is For
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-bold tracking-tight">
            This Book Is For You If…
          </h2>
          <div className="w-16 h-0.5 bg-[#FF7A7A] mx-auto mt-3" />
        </div>

        {/* Statements List Grid from PDF */}
        <div className="space-y-4">
          {RESONANCE_POINTS.map((item) => (
            <div
              key={item.id}
              className="w-full text-left p-5 sm:p-6 rounded-2xl border bg-white/10 backdrop-blur-md border-white/15 shadow-sm hover:bg-white/15 hover:border-white/30 transition-all duration-200 group"
            >
              <div className="flex items-start gap-4">
                <div className="w-7 h-7 rounded-full bg-white/20 text-[#FAF8F5] flex items-center justify-center shrink-0 mt-1 group-hover:bg-[#B81617] transition-colors">
                  <CheckCircle2 className="w-4 h-4 text-[#FAF8F5]" />
                </div>
                <p className="font-sans text-lg sm:text-xl text-white leading-relaxed font-medium">
                  {item.text}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Pre-Order Prompt */}
        <div className="mt-12 text-center">
          <button
            onClick={onOpenPreOrder}
            className="inline-flex items-center gap-2.5 px-8 py-4 text-xs font-sans uppercase tracking-widest font-bold text-white bg-[#B81617] hover:bg-[#9B1213] active:scale-[0.98] rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer border border-[#FF7A7A]/30"
          >
            <Bookmark className="w-4 h-4 text-white" />
            <span>Pre-Order The Book</span>
          </button>
        </div>
      </div>
    </section>
  );
};
