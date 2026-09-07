import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { BookOpen, ChevronLeft, ChevronRight, Sparkles, Heart } from 'lucide-react';
import { Reveal, TextReveal } from './animations/Reveal';
import { useCMS } from '../context/CMSContext';

interface ListeningStoriesProps {
  onOpenExcerpt: () => void;
}

export const ListeningStories: React.FC<ListeningStoriesProps> = ({ onOpenExcerpt }) => {
  const { content } = useCMS();
  const { listeningStories } = content;
  const stories = listeningStories.stories;

  const [currentIdx, setCurrentIdx] = useState(0);

  const safeIdx = currentIdx < stories.length ? currentIdx : 0;
  const activeStory = stories[safeIdx] || stories[0];

  const handleNext = () => {
    setCurrentIdx((prev) => (prev + 1) % stories.length);
  };

  const handlePrev = () => {
    setCurrentIdx((prev) => (prev - 1 + stories.length) % stories.length);
  };

  return (
    <section
      id="stories-journey"
      className="py-24 md:py-36 bg-[#FAF8F5] relative overflow-hidden border-b border-[#E8E2D8]"
    >

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Act Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Reveal direction="down">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#194A37]/5 border border-[#194A37]/15">
              <Sparkles className="w-3.5 h-3.5 text-[#B81617]" />
              <span className="font-sans text-xs font-semibold uppercase tracking-widest text-[#194A37]">
                {listeningStories.badge}
              </span>
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#194A37] tracking-tight leading-[1.15]">
              <TextReveal
                text={listeningStories.headline}
                highlightWords={['Similar', 'Feelings.', 'Feelings']}
                highlightClassName="italic font-serif text-[#B81617]"
              />
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <p className="font-sans text-base sm:text-lg text-[#1F2E28]/80 max-w-2xl mx-auto leading-relaxed">
              {listeningStories.subtitle}
            </p>
          </Reveal>
        </div>

        {/* Cinematic Story Stage with Reveal */}
        <Reveal direction="up" delay={0.25} distance={40}>
          <div className="bg-white rounded-3xl border border-[#E8E2D8] shadow-xl overflow-hidden relative">
            <div className="grid grid-cols-1 lg:grid-cols-12 min-h-[460px]">
              {/* Left Nav / Chapter Selector (Desktop) */}
              <div className="lg:col-span-4 bg-[#FAF8F5] p-6 sm:p-8 border-b lg:border-b-0 lg:border-r border-[#E8E2D8] flex flex-col justify-between">
                <div className="space-y-4">
                  <span className="text-xs uppercase font-sans font-bold tracking-widest text-[#84937D] block">
                    Stories from the Book:
                  </span>
                  <div className="space-y-2">
                    {stories.map((story, idx) => (
                      <motion.button
                        key={story.id || idx}
                        whileHover={{ x: 4 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setCurrentIdx(idx)}
                        className={`w-full text-left p-3.5 rounded-xl transition-all duration-200 cursor-pointer flex items-center justify-between ${
                          safeIdx === idx
                            ? 'bg-[#194A37] text-white shadow-md'
                            : 'bg-white text-[#1F2E28]/70 hover:bg-[#F2EFE9] border border-[#E8E2D8]'
                        }`}
                      >
                        <div className="space-y-0.5">
                          <span className="text-[10px] uppercase font-sans tracking-widest font-semibold opacity-70 block">
                            {story.chapterNumber}
                          </span>
                          <h4 className="font-serif font-medium text-sm sm:text-base leading-snug">
                            {story.title}
                          </h4>
                        </div>
                        <span className={`text-xs font-mono font-bold ${safeIdx === idx ? 'text-[#FF7A7A]' : 'text-[#84937D]'}`}>
                          0{idx + 1}
                        </span>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Progress and controls */}
                <div className="pt-6 mt-6 border-t border-[#E8E2D8] flex items-center justify-between">
                  <span className="font-sans text-xs text-[#84937D]">
                    Story {safeIdx + 1} of {stories.length}
                  </span>
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handlePrev}
                      aria-label="Previous story"
                      className="w-9 h-9 rounded-full bg-white border border-[#E8E2D8] flex items-center justify-center text-[#194A37] hover:bg-[#194A37] hover:text-white transition-colors cursor-pointer"
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleNext}
                      aria-label="Next story"
                      className="w-9 h-9 rounded-full bg-white border border-[#E8E2D8] flex items-center justify-center text-[#194A37] hover:bg-[#194A37] hover:text-white transition-colors cursor-pointer"
                    >
                      <ChevronRight className="w-4 h-4" />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Right Stage: The Reading Experience */}
              <div className="lg:col-span-8 p-8 sm:p-12 lg:p-14 flex flex-col justify-between relative bg-radial from-white via-white to-[#FAF8F5]">
                {activeStory && (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={activeStory.id || safeIdx}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24 }}
                      transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                      className="space-y-6 text-left"
                    >
                      {/* Top Meta */}
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#B81617]" />
                          <span className="font-sans text-xs uppercase tracking-widest font-bold text-[#194A37]">
                            {activeStory.voice}
                          </span>
                        </div>
                        <span className="text-xs font-sans text-[#84937D] italic">
                          {activeStory.setting}
                        </span>
                      </div>

                      {/* Chapter Heading */}
                      <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#194A37] font-semibold leading-tight">
                        {activeStory.title}
                      </h3>

                      {/* Excerpt Body with Text Reveal style */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.5 }}
                        className="relative pl-6 border-l-2 border-[#B81617]/50 py-1"
                      >
                        <p className="font-serif text-lg sm:text-xl text-[#1F2E28]/90 leading-relaxed font-normal">
                          {activeStory.excerpt}
                        </p>
                      </motion.div>

                      {/* Reflection Card */}
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                        className="p-4 sm:p-5 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D8]"
                      >
                        <span className="text-[11px] uppercase tracking-widest font-sans font-bold text-[#648C82] block mb-1">
                          The Lived Truth:
                        </span>
                        <p className="font-sans text-sm sm:text-base text-[#194A37] font-medium leading-normal">
                          {activeStory.reflection}
                        </p>
                      </motion.div>

                      {/* Emotional Tagging */}
                      <div className="pt-4 flex flex-wrap items-center justify-between gap-4">
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#B81617]/10 text-[#B81617] text-xs font-sans font-semibold">
                          <Heart className="w-3.5 h-3.5" />
                          <span>{activeStory.emotionalTag}</span>
                        </div>

                        <motion.button
                          whileHover={{ x: 4 }}
                          onClick={onOpenExcerpt}
                          className="inline-flex items-center gap-2 text-xs font-sans font-bold uppercase tracking-wider text-[#194A37] hover:text-[#B81617] transition-colors cursor-pointer"
                        >
                          <BookOpen className="w-4 h-4 text-[#648C82]" />
                          <span>Read Full Book Overview</span>
                        </motion.button>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                )}
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};
