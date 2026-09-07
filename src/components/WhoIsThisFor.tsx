import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Bookmark, CheckCircle2 } from 'lucide-react';
import { Reveal, StaggerContainer, StaggerItem, TextReveal } from './animations/Reveal';
import { useCMS } from '../context/CMSContext';

interface WhoIsThisForProps {
  onOpenPreOrder: () => void;
}

export const WhoIsThisFor: React.FC<WhoIsThisForProps> = ({ onOpenPreOrder }) => {
  const { content } = useCMS();
  const { whoIsThisFor, site } = content;
  const items = whoIsThisFor.items;

  const [checkedItems, setCheckedItems] = useState<number[]>([1, 4]);

  const toggleItem = (id: number) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section
      id="who-is-this-for"
      className="py-24 md:py-36 bg-[#194A37] text-white relative overflow-hidden"
    >

      {/* Background ambient lighting accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#648C82]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0F2F23]/50 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <Reveal direction="down">
            <div className="inline-block bg-white/10 text-[#FAF8F5] border border-white/20 px-4 py-1.5 rounded-full text-xs font-sans font-bold uppercase tracking-widest shadow-xs backdrop-blur-xs">
              {whoIsThisFor.badge}
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-normal tracking-tight">
              <TextReveal text={whoIsThisFor.headline} />
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <p className="font-sans text-xs sm:text-sm text-[#A3C2B6] pt-1">
              {whoIsThisFor.subtitle}
            </p>
          </Reveal>
        </div>

        {/* Interactive Statements List with Stagger Scroll Animations */}
        <StaggerContainer className="space-y-3.5" staggerChildren={0.1}>
          {items.map((item, idx) => {
            const itemId = item.id || idx + 1;
            const isChecked = checkedItems.includes(itemId);
            return (
              <StaggerItem key={itemId}>
                <motion.div
                  whileHover={{ scale: 1.015, x: 4 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => toggleItem(itemId)}
                  className={`w-full text-left p-5 sm:p-6 rounded-2xl border transition-all duration-300 cursor-pointer flex items-start gap-4 ${
                    isChecked
                      ? 'bg-white text-[#194A37] border-white shadow-xl'
                      : 'bg-white/10 backdrop-blur-md text-white border-white/15 hover:bg-white/15'
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      isChecked ? 'bg-[#194A37] text-white' : 'bg-white/20 text-white'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <p
                    className={`font-serif text-base sm:text-lg lg:text-xl leading-relaxed ${
                      isChecked ? 'font-medium text-[#194A37]' : 'font-light text-white'
                    }`}
                  >
                    {item.text}
                  </p>
                </motion.div>
              </StaggerItem>
            );
          })}
        </StaggerContainer>

        {/* Cathartic Summary & Pre-Order Button */}
        <Reveal direction="up" delay={0.3} distance={30}>
          <div className="mt-12 text-center space-y-4">
            <p className="font-serif italic text-lg sm:text-xl text-[#D4DFDA]">
              “{site.coreEmotionalMessage || 'You don’t have to carry it all alone.'}”
            </p>
            <div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={onOpenPreOrder}
                className="inline-flex items-center gap-2.5 px-8 py-4 text-xs font-sans uppercase tracking-widest font-bold text-white bg-[#B81617] hover:bg-[#9B1213] rounded-xl shadow-lg hover:shadow-xl transition-all cursor-pointer border border-[#FF7A7A]/30"
              >
                <Bookmark className="w-4 h-4 text-white" />
                <span>Pre-Order The Book</span>
              </motion.button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
