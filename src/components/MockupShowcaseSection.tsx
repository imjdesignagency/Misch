import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Bookmark, Layers, Hand, Eye, ShieldCheck, Check } from 'lucide-react';
import { BookCoverMockup, MockupViewType } from './BookCoverMockup';
import { Reveal } from './animations/Reveal';
import { useCMS } from '../context/CMSContext';

interface MockupShowcaseSectionProps {
  onOpenPreOrder: () => void;
  onOpenExcerpt: () => void;
}

export const MockupShowcaseSection: React.FC<MockupShowcaseSectionProps> = ({
  onOpenPreOrder,
  onOpenExcerpt,
}) => {
  const { content } = useCMS();
  const { physicalEditions } = content;

  const [selectedMockup, setSelectedMockup] = useState<MockupViewType>('floating');

  const iconMap: Record<string, typeof Eye> = {
    floating: Eye,
    'in-hand': Hand,
    stacked: Layers,
  };

  const mockupCards = (physicalEditions.cards || []).map((card) => ({
    ...card,
    icon: iconMap[card.id] || Eye,
  }));

  return (
    <section
      id="book-mockups"
      className="py-20 md:py-28 bg-[#FAF8F5] relative overflow-hidden border-b border-[#E8E2D8]"
    >

      {/* Soft Ambient Background Aura */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] bg-[#194A37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[450px] h-[450px] bg-[#B81617]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-4">
          <Reveal direction="down">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#194A37]/10 text-[#194A37] text-xs font-sans font-semibold tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5 text-[#B81617]" />
              <span>{physicalEditions.badge}</span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#194A37] font-normal tracking-tight">
              {physicalEditions.headline}
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <p className="font-sans text-base sm:text-lg text-[#5A6D64] leading-relaxed font-light">
              {physicalEditions.subtitle}
            </p>
          </Reveal>
        </div>

        {/* Interactive Showcase Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Mockup Perspective Selector Cards */}
          <div className="lg:col-span-5 space-y-3.5 order-2 lg:order-1">
            {mockupCards.map((card, idx) => {
              const Icon = card.icon;
              const isSelected = selectedMockup === card.id;

              return (
                <Reveal key={card.id} direction="right" delay={0.15 + idx * 0.1}>
                  <motion.div
                    whileHover={{ scale: 1.015 }}
                    whileTap={{ scale: 0.985 }}
                    onClick={() => setSelectedMockup(card.id as MockupViewType)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer text-left relative overflow-hidden ${
                      isSelected
                        ? 'bg-white border-[#194A37] shadow-md ring-1 ring-[#194A37]/20'
                        : 'bg-white/60 hover:bg-white border-[#E8E2D8] shadow-2xs'
                    }`}
                  >
                    {isSelected && (
                      <div className="absolute top-0 left-0 bottom-0 w-1.5 bg-[#194A37]" />
                    )}

                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-colors ${
                            isSelected
                              ? 'bg-[#194A37] text-white'
                              : 'bg-[#FAF8F5] text-[#194A37] border border-[#E8E2D8]'
                          }`}
                        >
                          <Icon className="w-4.5 h-4.5" />
                        </div>
                        <div>
                          <h4 className="font-serif text-lg font-medium text-[#194A37]">
                            {card.title}
                          </h4>
                          <p className="text-xs text-[#84937D] font-sans">
                            {card.subtitle}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-sans uppercase tracking-wider px-2 py-0.5 rounded-full font-bold ${
                          isSelected
                            ? 'bg-[#B81617] text-white'
                            : 'bg-[#FAF8F5] text-[#5A6D64] border border-[#E8E2D8]'
                        }`}
                      >
                        {card.badge}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-[#4A5E54] font-light leading-relaxed pl-11">
                      {card.description}
                    </p>
                  </motion.div>
                </Reveal>
              );
            })}

            {/* Edition Specs Highlight Box */}
            <Reveal direction="up" delay={0.45}>
              <div className="p-4 rounded-2xl bg-[#F4F1EA] border border-[#E2DDD2] space-y-2.5 text-xs text-[#4A5E54] font-sans">
                <div className="flex items-center gap-2 text-[#194A37] font-semibold">
                  <ShieldCheck className="w-4 h-4 text-[#B81617]" />
                  <span>Physical Edition Specifications</span>
                </div>
                <div className="grid grid-cols-2 gap-2 pt-1 border-t border-[#E8E2D8]">
                  {physicalEditions.specifications.map((spec, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <Check className="w-3.5 h-3.5 text-[#194A37]" />
                      <span>{spec}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* Right Column: Active Mockup Spotlight Stage */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center order-1 lg:order-2">
            <Reveal direction="left" delay={0.2}>
              <div className="w-full max-w-lg bg-white p-6 sm:p-10 rounded-3xl border border-[#E8E2D8] shadow-lg flex flex-col items-center relative">
                {/* Active Mockup rendered in full interactive suite */}
                <BookCoverMockup
                  size="lg"
                  interactive={true}
                  defaultView={selectedMockup}
                  sectionKey="physicalEditions"
                />

                {/* Direct Action Buttons under Mockup */}
                <div className="mt-6 pt-6 border-t border-[#E8E2D8] w-full flex flex-col sm:flex-row items-center justify-between gap-3">
                  <button
                    onClick={onOpenExcerpt}
                    className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[#194A37] text-[#194A37] hover:bg-[#194A37]/5 text-xs font-sans font-semibold uppercase tracking-wider transition-colors cursor-pointer"
                  >
                    Read Chapter Excerpt
                  </button>

                  <button
                    onClick={onOpenPreOrder}
                    className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-[#B81617] hover:bg-[#9B1213] text-white text-xs font-sans font-bold uppercase tracking-wider transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2"
                  >
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>Reserve Your Copy</span>
                  </button>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
