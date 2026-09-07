import React, { useState, useEffect } from 'react';
import { BookOpen, Menu, X, Bookmark, Sparkles } from 'lucide-react';
import { AuthorSignatureLogo } from './AuthorSignatureLogo';
import { useCMS } from '../context/CMSContext';

interface NavbarProps {
  onOpenExcerpt: () => void;
  onOpenPreOrder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenExcerpt, onOpenPreOrder }) => {
  const { content, setIsCMSOpen } = useCMS();
  const { site } = content;
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Brand Essence', href: '#brand-essence' },
    { name: 'Story Archives', href: '#stories-journey' },
    { name: 'Emotional Core', href: '#audience-feelings' },
    { name: 'About The Book', href: '#about-the-book' },
    { name: 'Physical Editions', href: '#book-mockups' },
    { name: 'The Distinct Approach', href: '#what-makes-different' },
    { name: 'Author', href: '#about-author' },
  ];

  return (
    <header
      id="main-navigation-header"
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      {/* Dynamic Top Announcement Ribbon from CMS */}
      {site.announcement.enabled && (
        <div className="bg-[#12382A] text-white py-1.5 px-4 text-xs font-sans border-b border-white/10 text-center relative z-20">
          <div className="max-w-7xl mx-auto flex items-center justify-center gap-2.5">
            <span className="font-bold text-[10px] uppercase tracking-wider bg-[#FF8585] text-[#0F2F23] px-2 py-0.5 rounded font-mono">
              {site.announcement.badge}
            </span>
            <span className="truncate text-white/90 text-[11px] sm:text-xs">
              {site.announcement.text}
            </span>
            {site.announcement.linkText && (
              <a
                href={site.announcement.linkHref || '#pre-order'}
                className="text-[#FF8585] underline font-medium hover:text-white transition-colors shrink-0 text-xs"
              >
                {site.announcement.linkText} →
              </a>
            )}
          </div>
        </div>
      )}

      <div
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D8] py-2 sm:py-2.5 shadow-xs'
            : 'bg-[#FAF8F5]/60 backdrop-blur-xs py-3 sm:py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-3 sm:gap-6">
            {/* Brand Logo with Misheca Seymour signature */}
            <a
              href="#"
              className="flex items-center shrink-0 group text-left py-1 focus:outline-none"
              id="nav-logo"
              title="Misheca Seymour"
            >
              <AuthorSignatureLogo
                variant="dark"
                className="h-6 sm:h-7 lg:h-8 w-auto text-[#194A37] group-hover:text-[#B81617] transition-colors"
              />
            </a>

            {/* Desktop Navigation Links */}
            <nav className="hidden xl:flex items-center space-x-5 2xl:space-x-6 shrink-0">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-xs uppercase tracking-wider font-sans font-medium text-[#1F2E28]/80 hover:text-[#B81617] transition-colors whitespace-nowrap cursor-pointer"
                >
                  {link.name}
                </a>
              ))}
            </nav>

            {/* Right CTAs */}
            <div className="hidden sm:flex items-center gap-2 lg:gap-2.5 shrink-0">
              <button
                onClick={onOpenExcerpt}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-sans font-semibold uppercase tracking-wider text-[#194A37] hover:text-[#B81617] hover:bg-black/5 transition-all cursor-pointer whitespace-nowrap"
              >
                <BookOpen className="w-3.5 h-3.5 text-[#648C82]" />
                <span>Overview</span>
              </button>

              <button
                onClick={onOpenPreOrder}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs uppercase font-sans tracking-wider font-bold text-white bg-[#B81617] hover:bg-[#9B1213] active:scale-95 transition-all shadow-sm cursor-pointer whitespace-nowrap border border-[#FF7A7A]/30"
              >
                <Bookmark className="w-3.5 h-3.5" />
                <span>Pre-Order</span>
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <div className="xl:hidden flex items-center gap-2">
              <button
                onClick={onOpenPreOrder}
                className="sm:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs uppercase font-sans font-bold text-white bg-[#B81617] shadow-xs"
              >
                <span>Pre-Order</span>
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-[#194A37] hover:bg-black/5 transition-colors cursor-pointer"
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-[#FAF8F5] border-b border-[#E8E2D8] px-4 pt-3 pb-6 space-y-3 shadow-xl">
            <div className="space-y-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-3 py-2 rounded-lg text-sm font-sans font-medium text-[#1F2E28] hover:bg-black/5 hover:text-[#B81617] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>

            <div className="pt-4 border-t border-[#E8E2D8] flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenExcerpt();
                }}
                className="w-full py-2.5 px-4 rounded-xl text-xs font-sans font-bold uppercase tracking-wider text-[#194A37] bg-white border border-[#E8E2D8] flex items-center justify-center gap-2"
              >
                <BookOpen className="w-4 h-4 text-[#648C82]" />
                <span>Read Excerpt Overview</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenPreOrder();
                }}
                className="w-full py-3 px-4 rounded-xl text-xs font-sans font-bold uppercase tracking-wider text-white bg-[#B81617] flex items-center justify-center gap-2 shadow-md"
              >
                <Bookmark className="w-4 h-4" />
                <span>Pre-Order The Weight We Carry</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsCMSOpen(true);
                }}
                className="w-full py-2 px-4 rounded-xl text-[11px] font-sans font-medium text-[#648C82] hover:text-[#194A37] hover:bg-black/5 flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <span>✦ Open CMS Content Studio</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
