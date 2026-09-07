import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, Check } from 'lucide-react';
import { Reveal, StaggerContainer, StaggerItem, TextReveal } from './animations/Reveal';
import { useCMS } from '../context/CMSContext';

interface AudienceFeelingsProps {
  onOpenPreOrder: () => void;
}

export const AudienceFeelings: React.FC<AudienceFeelingsProps> = ({ onOpenPreOrder }) => {
  const { content } = useCMS();
  const { audienceFeelings } = content;
  const feelings = audienceFeelings.feelings;

  const [resonatedIds, setResonatedIds] = useState<string[]>(['Seen', 'Less alone']);

  const toggleResonated = (feeling: string) => {
    setResonatedIds((prev) =>
      prev.includes(feeling) ? prev.filter((item) => item !== feeling) : [...prev, feeling]
    );
  };

  return (
    <section
      id="audience-feelings"
      className="py-24 md:py-36 bg-[#194A37] text-white relative overflow-hidden"
    >

      {/* Ambient background glows */}
      <div className="absolute -top-20 right-0 w-[500px] h-[500px] bg-[#648C82]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-20 left-0 w-[500px] h-[500px] bg-[#B81617]/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Reveal direction="down">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-xs">
              <span className="w-2 h-2 rounded-full bg-[#FF7A7A] animate-pulse" />
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-[#FAF8F5]">
                {audienceFeelings.badge}
              </span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.1]">
              <TextReveal
                text={audienceFeelings.headline}
                highlightWords={['feel', 'feel.']}
                highlightClassName="italic font-serif text-[#FF8585]"
              />
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <p className="font-sans text-base sm:text-lg text-[#D4DFDA] max-w-2xl mx-auto leading-relaxed font-light">
              {audienceFeelings.subtitle}
            </p>
          </Reveal>
        </div>

        {/* Resonated Counter Bar with Reveal */}
        <Reveal direction="up" delay={0.25}>
          <div className="max-w-xl mx-auto mb-12 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/15 flex items-center justify-between text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <Heart className="w-4 h-4 text-[#FF7A7A] fill-[#FF7A7A]" />
              <span className="text-[#FAF8F5] font-sans">
                Tap any feeling that resonates with you:
              </span>
            </div>
            <span className="px-3 py-1 rounded-full bg-white/15 text-white font-mono text-xs font-bold">
              {resonatedIds.length} of {feelings.length} Resonated
            </span>
          </div>
        </Reveal>

        {/* 7 Emotional Feelings Grid with Staggered Scroll Animations */}
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" staggerChildren={0.1}>
          {feelings.map((item, idx) => {
            const isSelected = resonatedIds.includes(item.feeling);
            return (
              <StaggerItem key={item.feeling || idx}>
                <motion.div
                  whileHover={{ y: -6, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => toggleResonated(item.feeling)}
                  className={`p-6 sm:p-7 rounded-3xl border transition-all duration-300 text-left cursor-pointer relative overflow-hidden flex flex-col justify-between h-full ${
                    isSelected
                      ? 'bg-white text-[#194A37] border-white shadow-2xl scale-[1.02]'
                      : 'bg-white/10 backdrop-blur-md text-white border-white/15 hover:bg-white/15'
                  }`}
                >
                  {/* Active Indicator Stamp */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`font-serif italic text-2xl font-bold ${
                        isSelected ? 'text-[#B81617]' : 'text-[#FAF8F5]'
                      }`}
                    >
                      {item.feeling}
                    </span>

                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center transition-colors ${
                        isSelected
                          ? 'bg-[#194A37] text-white'
                          : 'bg-white/15 text-transparent'
                      }`}
                    >
                      <Check className={`w-4 h-4 ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
                    </div>
                  </div>

                  {/* Internal Voice */}
                  <div className="mb-4">
                    <p
                      className={`font-serif text-lg font-semibold leading-snug ${
                        isSelected ? 'text-[#194A37]' : 'text-[#FFB3B3]'
                      }`}
                    >
                      {item.internalVoice}
                    </p>
                  </div>

                  {/* Literary Description */}
                  <p
                    className={`font-sans text-xs sm:text-sm leading-relaxed ${
                      isSelected ? 'text-[#1F2E28]/80' : 'text-[#D4DFDA]'
                    }`}
                  >
                    {item.description}
                  </p>

                  {/* Bottom interactive hint */}
                  <div className="mt-6 pt-4 border-t border-current/10 flex items-center justify-between text-[11px] uppercase tracking-wider font-sans font-semibold">
                    <span>{isSelected ? 'Acknowledged' : 'Tap to acknowledge'}</span>
                    <span className="opacity-60">0{idx + 1}</span>
                  </div>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Emotional Climax Banner with Scroll Entrance */}
        <Reveal direction="up" delay={0.3} distance={30}>
          <div className="mt-16 bg-gradient-to-r from-[#B81617] via-[#9B1213] to-[#7E0D09] rounded-3xl p-8 sm:p-12 border border-[#FF7A7A]/30 shadow-2xl text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#FAF8F5_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />

            <div className="max-w-2xl mx-auto space-y-4 relative z-10">
              <span className="text-xs uppercase font-sans font-bold tracking-widest text-[#FAF8F5]/80 block">
                {audienceFeelings.badge}
              </span>

              <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-white font-bold leading-tight">
                “{audienceFeelings.climaxQuote}”
              </h3>

              <p className="font-sans text-sm sm:text-base text-white/90 leading-relaxed max-w-xl mx-auto">
                {audienceFeelings.climaxSub}
              </p>

              <div className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={onOpenPreOrder}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white text-[#194A37] hover:bg-[#FAF8F5] text-xs font-sans font-bold uppercase tracking-widest shadow-lg hover:shadow-xl transition-all cursor-pointer"
                >
                  <span>Reserve Your Copy</span>
                </motion.button>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
