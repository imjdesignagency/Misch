import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { AuthorSignatureLogo } from './AuthorSignatureLogo';
import { useCMS } from '../context/CMSContext';

export const Footer: React.FC = () => {
  const { content, setIsCMSOpen } = useCMS();
  const { footer, site } = content;

  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer
      id="site-footer"
      className="bg-[#0F2F23] text-white border-t border-[#194A37] pt-16 pb-12 relative overflow-hidden"
    >

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-white/10">
          {/* Col 1: Brand & Synopsis from PDF */}
          <div className="md:col-span-5 space-y-4 text-left">
            <div className="space-y-2">
              <h3 className="font-display text-2xl sm:text-3xl text-white font-normal tracking-tight uppercase">
                {site.bookTitle}
              </h3>
              <div className="flex items-center gap-3 pt-1">
                <AuthorSignatureLogo variant="light" height="1.6rem" className="opacity-95" />
              </div>
            </div>
            <p className="text-xs uppercase tracking-widest font-sans font-semibold text-[#A3C2B6]">
              By {site.author}
            </p>
            <p className="font-sans text-sm text-white/80 leading-relaxed max-w-sm font-light">
              {site.tagline}
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-3 space-y-3 text-left">
            <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-[#A3C2B6]">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-white/80 font-sans">
              <li>
                <a href="#about-the-book" className="hover:text-white transition-colors">
                  About The Book
                </a>
              </li>
              <li>
                <a href="#who-is-this-for" className="hover:text-white transition-colors">
                  Who This Book Is For
                </a>
              </li>
              <li>
                <a href="#why-read" className="hover:text-white transition-colors">
                  Why Read The Weight We Carry
                </a>
              </li>
              <li>
                <a href="#what-makes-different" className="hover:text-white transition-colors">
                  What Makes This Book Different
                </a>
              </li>
              <li>
                <a href="#whats-inside" className="hover:text-white transition-colors">
                  Stories & Themes
                </a>
              </li>
              <li>
                <a href="#about-author" className="hover:text-white transition-colors">
                  About The Author
                </a>
              </li>
              <li>
                <a href="#pre-order" className="hover:text-[#FF7A7A] transition-colors font-bold text-[#FAF8F5]">
                  Pre-Order
                </a>
              </li>
              <li className="pt-2 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsCMSOpen(true)}
                  className="flex items-center gap-1.5 text-xs text-[#A3C2B6] hover:text-white transition-colors cursor-pointer"
                >
                  <span>✦ CMS Studio (Edit Content)</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Updates */}
          <div className="md:col-span-4 space-y-4 text-left">
            <h4 className="text-xs font-sans font-bold uppercase tracking-wider text-[#A3C2B6]">
              {footer.newsletterHeadline || 'Updates'}
            </h4>
            <p className="font-quote text-sm text-white/80 leading-relaxed">
              {footer.newsletterSub || 'Sign up to receive release updates and news.'}
            </p>

            {subscribed ? (
              <div className="p-3.5 rounded-xl bg-white/10 border border-[#648C82]/30 text-xs text-white flex items-center gap-2">
                <Check className="w-4 h-4 text-[#A3C2B6]" />
                <span className="font-sans font-medium">Thank you for subscribing for updates.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletter} className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-white/10 border border-white/20 text-white placeholder:text-white/50 text-xs flex-1 focus:outline-hidden focus:ring-1 focus:ring-[#A3C2B6]"
                />
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-[#B81617] hover:bg-[#9B1213] text-white text-xs font-sans font-bold uppercase tracking-wider transition-all shrink-0 cursor-pointer shadow-sm border border-[#FF7A7A]/30"
                >
                  Join
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom Attribution */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-white/60">
          <p>{footer.copyright || `© ${new Date().getFullYear()} ${site.author}. All rights reserved.`}</p>
          <div className="flex items-center gap-4 sm:gap-6">
            <span>{site.bookTitle}</span>
            <span>•</span>
            <span>{site.author}</span>
            <span>•</span>
            <button
              type="button"
              onClick={() => setIsCMSOpen(true)}
              className="text-[#A3C2B6] hover:text-white underline underline-offset-2 transition-colors cursor-pointer"
            >
              CMS Studio
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
