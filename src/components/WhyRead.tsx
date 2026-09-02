import React from 'react';
import { Quote, Sparkles } from 'lucide-react';
import { WHY_READ } from '../data/bookData';

export const WhyRead: React.FC = () => {
  return (
    <section
      id="why-read"
      className="py-20 md:py-32 bg-[#FAF8F5] relative overflow-hidden"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-block bg-[#194A37] text-white px-4 py-1.5 rounded-full text-xs font-sans font-bold uppercase tracking-widest shadow-xs">
            Why Read This Book?
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#194A37] font-bold tracking-tight leading-tight">
            {WHY_READ.headline}
          </h2>
          <div className="w-16 h-0.5 bg-[#B81617] mx-auto mt-3" />
        </div>

        {/* Narrative Box */}
        <div className="max-w-4xl mx-auto mb-14 text-center space-y-6">
          <p className="font-sans text-xl sm:text-2xl text-[#1F2E28] leading-relaxed font-light">
            {WHY_READ.paragraph1}
          </p>

          <p className="font-sans text-lg sm:text-xl text-[#648C82] font-normal">
            {WHY_READ.paragraph2}
          </p>

          <div className="p-6 sm:p-8 bg-white rounded-3xl border border-[#E8E2D8] shadow-xs">
            <p className="font-display text-2xl sm:text-3xl text-[#B81617] font-semibold leading-snug">
              “{WHY_READ.paragraph3}”
            </p>
          </div>
        </div>

        {/* Three Quotes from PDF */}
        <div className="max-w-4xl mx-auto mb-14">
          <div className="text-center mb-8">
            <span className="text-xs uppercase font-sans font-bold tracking-widest text-[#84937D]">
              {WHY_READ.transition}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {WHY_READ.quotes.map((quote, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-3xl border border-[#E8E2D8] shadow-xs relative flex flex-col items-center justify-center text-center group hover:border-[#194A37] hover:shadow-md transition-all duration-300"
              >
                <Quote className="w-6 h-6 text-[#B81617] mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="font-display text-xl sm:text-2xl text-[#194A37] font-bold leading-tight">
                  {quote}
                </h3>
              </div>
            ))}
          </div>
        </div>

        {/* Invitation & Closing Reflection from PDF */}
        <div className="max-w-3xl mx-auto bg-gradient-to-br from-white to-[#FAF8F5] p-8 sm:p-12 rounded-3xl border border-[#E8E2D8] shadow-sm text-center space-y-4">
          <p className="font-sans text-lg sm:text-xl text-[#1F2E28] leading-relaxed font-light">
            {WHY_READ.invitation}
          </p>
          <div className="pt-3 border-t border-[#E8E2D8]">
            <p className="font-display text-xl sm:text-2xl text-[#194A37] font-semibold">
              “{WHY_READ.pithy}”
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
