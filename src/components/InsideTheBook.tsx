import React, { useState } from 'react';
import { Feather, HeartHandshake, Briefcase, Sparkles, ShieldCheck, ChevronRight, BookOpen } from 'lucide-react';
import { BOOK_THEMES } from '../data/bookData';

interface InsideTheBookProps {
  onOpenExcerpt: () => void;
}

export const InsideTheBook: React.FC<InsideTheBookProps> = ({ onOpenExcerpt }) => {
  const [activeThemeId, setActiveThemeId] = useState<string>(BOOK_THEMES[0].id);

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Feather':
        return <Feather className="w-5 h-5 text-[#B81617]" />;
      case 'HeartHandshake':
        return <HeartHandshake className="w-5 h-5 text-[#B81617]" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-[#B81617]" />;
      case 'Sparkles':
        return <Sparkles className="w-5 h-5 text-[#B81617]" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-5 h-5 text-[#B81617]" />;
      default:
        return <BookOpen className="w-5 h-5 text-[#B81617]" />;
    }
  };

  const selectedTheme = BOOK_THEMES.find((t) => t.id === activeThemeId) || BOOK_THEMES[0];

  return (
    <section
      id="whats-inside"
      className="py-20 md:py-32 bg-[#FAF8F5] border-t border-[#E8E2D8] relative"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-block bg-[#194A37] text-white px-4 py-1.5 rounded-full text-xs font-sans font-bold uppercase tracking-widest shadow-xs">
            Inside The Book
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#194A37] font-bold tracking-tight">
            Stories & Themes
          </h2>
          <div className="w-16 h-0.5 bg-[#B81617] mx-auto mt-3" />
        </div>

        {/* 5 Themes Grid from PDF */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Theme Selectors */}
          <div className="lg:col-span-6 space-y-3">
            {BOOK_THEMES.map((theme, index) => {
              const isActive = theme.id === activeThemeId;
              return (
                <div
                  key={theme.id}
                  onClick={() => setActiveThemeId(theme.id)}
                  className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer select-none ${
                    isActive
                      ? 'bg-[#194A37] text-white border-[#194A37] shadow-md'
                      : 'bg-white hover:bg-[#F2EFE9] border-[#E8E2D8] text-[#1F2E28]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-[#FAF8F5] text-[#194A37]'
                        }`}
                      >
                        {getIcon(theme.iconName)}
                      </div>
                      <div>
                        <span
                          className={`text-[10px] font-sans uppercase tracking-widest font-bold ${
                            isActive ? 'text-[#FAF8F5]/80' : 'text-[#84937D]'
                          }`}
                        >
                          Theme 0{index + 1}
                        </span>
                        <h3
                          className={`font-display text-lg sm:text-xl font-bold mt-0.5 ${
                            isActive ? 'text-white' : 'text-[#194A37]'
                          }`}
                        >
                          {theme.title}
                        </h3>
                      </div>
                    </div>

                    <ChevronRight
                      className={`w-5 h-5 shrink-0 mt-2 transition-transform ${
                        isActive ? 'text-[#FAF8F5] translate-x-1' : 'text-[#84937D]/40'
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Theme Description from PDF */}
          <div className="lg:col-span-6 bg-white p-8 sm:p-10 rounded-3xl border border-[#E8E2D8] shadow-sm relative sticky top-28 space-y-5">
            <span className="text-xs uppercase font-sans font-bold tracking-widest text-[#B81617]">
              Theme Narrative
            </span>
            <h3 className="font-display text-3xl sm:text-4xl text-[#194A37] font-bold tracking-tight">
              {selectedTheme.title}
            </h3>

            <div className="border-l-2 border-[#B81617] pl-4 py-1">
              <p className="font-sans text-lg sm:text-xl text-[#1F2E28] leading-relaxed font-light">
                {selectedTheme.description}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
