import React from 'react';
import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import { AuthorSignatureLogo } from './AuthorSignatureLogo';
import { Reveal, TextReveal } from './animations/Reveal';
import { useCMS } from '../context/CMSContext';

export const AboutAuthor: React.FC = () => {
  const { content } = useCMS();
  const author = content.authorInfo;
  const { site } = content;

  const currentDisplayImage = author.imageUrl || '';

  return (
    <section
      id="about-author"
      className="py-24 md:py-36 bg-[#194A37] text-white relative overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#648C82]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#0F2F23]/80 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <Reveal direction="down">
            <div className="inline-block bg-white/10 text-[#FAF8F5] border border-white/20 px-4 py-1.5 rounded-full text-xs font-sans font-bold uppercase tracking-widest shadow-xs backdrop-blur-xs">
              {author.badge}
            </div>
          </Reveal>

          <Reveal direction="up" delay={0.1}>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-normal tracking-tight">
              <TextReveal text={author.name} />
            </h2>
          </Reveal>

          <Reveal direction="up" delay={0.2}>
            <p className="font-serif italic text-lg text-[#FF8585]">
              “{author.originQuote || site.tagline}”
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Column: Author Portrait Space */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <Reveal direction="right" delay={0.2}>
              <motion.div
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3 }}
                className="w-full max-w-md bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-3xl border border-white/20 shadow-2xl relative"
              >
                {/* Main Portrait Frame */}
                <div
                  className="relative aspect-3/4 w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#0F2F23] via-[#12392B] to-[#0F2F23] flex items-center justify-center border border-white/15 shadow-inner"
                >
                  {currentDisplayImage ? (
                    <img
                      src={currentDisplayImage}
                      alt={author.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top select-none"
                    />
                  ) : (
                    <div className="w-full h-full p-8 flex flex-col justify-between items-center text-center text-white relative bg-[#0F2F23]">
                      <div className="relative z-10 w-full flex justify-between items-center text-[10px] tracking-widest uppercase font-sans text-[#A3C2B6] font-bold">
                        <span>Author Portrait</span>
                        <span>{author.title}</span>
                      </div>

                      <div className="relative z-10 my-auto flex flex-col items-center">
                        <div className="w-20 h-20 rounded-full border border-white/20 flex items-center justify-center bg-white/10 mb-4 shadow-xl">
                          <AuthorSignatureLogo variant="light" height="2rem" />
                        </div>
                        <h4 className="font-serif text-2xl text-white font-medium">
                          {author.name}
                        </h4>
                        <p className="font-sans text-xs text-[#A3C2B6] mt-2 font-light max-w-[220px]">
                          {author.title}
                        </p>
                      </div>

                      <div className="relative z-10 text-[11px] text-white/80 font-sans border-t border-white/15 pt-2 w-full uppercase tracking-wider font-semibold">
                        The Weight We Carry
                      </div>
                    </div>
                  )}

                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#B81617] text-white text-[10px] font-sans uppercase font-bold tracking-wider shadow-xs pointer-events-none">
                    Author & Chronicler
                  </div>
                </div>

                {/* Portrait Caption */}
                <div className="mt-4 flex items-center justify-between text-xs text-white/80 font-sans pt-2 border-t border-white/15">
                  <span className="font-medium text-white">{author.name}</span>
                  <span className="text-[#A3C2B6]">{author.title}</span>
                </div>
              </motion.div>
            </Reveal>
          </div>

          {/* Right Column: Author Biography and Storyteller Origin */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <Reveal direction="left" delay={0.2}>
              <div>
                <h3 className="font-serif text-3xl sm:text-4xl text-white font-normal tracking-tight">
                  {author.name}
                </h3>
                <p className="text-sm font-sans uppercase tracking-widest text-[#A3C2B6] font-semibold mt-1">
                  {author.title}
                </p>
              </div>
            </Reveal>

            {/* Author Origin / Background narrative */}
            <Reveal direction="left" delay={0.3}>
              <div className="space-y-4 text-white/85 font-sans leading-relaxed text-sm sm:text-base font-light">
                <p>
                  {author.bioParagraph1 ||
                    `${author.name} is a writer, chronicler, and observer of the subtle emotional architecture that women navigate daily. Drawing from personal experiences and countless intimate conversations with women from diverse cultures and generations, she writes with an uncompromising honesty that refuses to look away from the quiet struggles of everyday existence.`}
                </p>
                <p>
                  {author.bioParagraph2 ||
                    `In "The Weight We Carry," she does not offer simplistic five-step solutions or generic self-help platitudes. Instead, she offers something far rarer: a clear, unflinching mirror that honors what you have endured, illuminates the invisible burdens society expects you to bear in silence, and gently gives you permission to begin setting them down.`}
                </p>
              </div>
            </Reveal>

            {/* Key Credentials / Themes from the Book */}
            <Reveal direction="left" delay={0.4}>
              <div className="pt-2">
                <span className="text-xs uppercase font-sans font-bold tracking-widest text-[#FAF8F5] block mb-3">
                  Core Themes Explored by {author.name.split(' ')[0]}:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {author.credentialsList.map((cred, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 text-xs text-white/90"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF8585] shrink-0" />
                      <span>{cred}</span>
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>

            {/* Pull Quote */}
            <Reveal direction="left" delay={0.5}>
              <div className="p-5 rounded-2xl bg-white/5 border-l-4 border-[#FF8585] border-y border-r border-white/10 relative mt-6">
                <Quote className="w-6 h-6 text-[#FF8585]/40 absolute top-4 right-4 pointer-events-none" />
                <p className="font-serif italic text-base sm:text-lg text-white/95 leading-relaxed">
                  “{author.bioQuote ||
                    'I wrote this book not because I had figured out all the answers, but because I was tired of pretending the weight didn’t exist.'}”
                </p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs uppercase tracking-widest font-sans text-[#A3C2B6] font-semibold">
                    — {author.name}
                  </span>
                  <AuthorSignatureLogo variant="light" height="1.4rem" className="opacity-80" />
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
