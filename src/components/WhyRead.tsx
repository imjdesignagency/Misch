import React from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { Reveal, StaggerContainer, StaggerItem, TextReveal } from './animations/Reveal';
import { useCMS } from '../context/CMSContext';

export const WhyRead: React.FC = () => {
  const { content } = useCMS();
  const { whyRead } = content;

  return (
    <section
      id="why-read"
      className="py-24 md:py-36 bg-[#FAF8F5] relative overflow-hidden border-b border-[#E8E2D8]"
    >

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <Reveal direction="down">
            <div className="inline-block bg-[#194A37] text-white px-4 py-1.5 rounded-full text-xs font-sans font-bold uppercase tracking-widest shadow-xs">
              {whyRead.badge}
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#194A37] font-normal tracking-tight leading-[1.15]">
              <TextReveal
                text={whyRead.headline}
                highlightWords={['Recognition.', 'Recognition']}
                highlightClassName="italic font-serif text-[#B81617]"
              />
            </h2>
          </Reveal>
        </div>

        {/* Narrative Box */}
        <div className="max-w-3xl mx-auto mb-14 text-center space-y-6">
          <Reveal direction="up" delay={0.2}>
            <p className="font-serif text-xl sm:text-2xl text-[#1F2E28] leading-relaxed font-light">
              {whyRead.paragraph1}
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.3}>
            <p className="font-sans text-base sm:text-lg text-[#648C82] font-normal">
              {whyRead.paragraph2}
            </p>
          </Reveal>

          <Reveal direction="up" delay={0.4} distance={20}>
            <motion.div
              whileHover={{ scale: 1.01 }}
              className="p-6 sm:p-8 bg-white rounded-3xl border border-[#E8E2D8] shadow-sm"
            >
              <p className="font-serif italic text-2xl sm:text-3xl text-[#B81617] font-normal leading-snug">
                “{whyRead.paragraph3}”
              </p>
            </motion.div>
          </Reveal>
        </div>

        {/* Three Quotes from PDF */}
        <div className="max-w-4xl mx-auto mb-14">
          <Reveal direction="down" delay={0.2}>
            <div className="text-center mb-8">
              <span className="text-xs uppercase font-sans font-bold tracking-widest text-[#84937D]">
                {whyRead.transition}
              </span>
            </div>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6" staggerChildren={0.12}>
            {whyRead.quotes.map((quote, idx) => (
              <StaggerItem key={idx}>
                <motion.div
                  whileHover={{ y: -6, borderColor: '#194A37' }}
                  className="bg-white p-8 rounded-3xl border border-[#E8E2D8] shadow-xs relative flex flex-col items-center justify-center text-center group transition-all duration-300 h-full"
                >
                  <Quote className="w-6 h-6 text-[#B81617] mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-serif text-xl sm:text-2xl text-[#194A37] font-semibold leading-tight">
                    {quote}
                  </h3>
                </motion.div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <Reveal direction="up" delay={0.3}>
            <div className="mt-12 text-center max-w-2xl mx-auto space-y-3">
              <p className="font-sans text-base text-[#1F2E28]/85 leading-relaxed">
                {whyRead.invitation}
              </p>
              <p className="font-serif italic text-lg sm:text-xl text-[#194A37]">
                {whyRead.pithy}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};
