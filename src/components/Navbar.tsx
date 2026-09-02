import React, { useState, useEffect } from 'react';
import { BookOpen, Menu, X, Bookmark } from 'lucide-react';
import { BOOK_INFO } from '../data/bookData';
import { AuthorSignatureLogo } from './AuthorSignatureLogo';

interface NavbarProps {
  onOpenExcerpt: () => void;
  onOpenPreOrder: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenExcerpt, onOpenPreOrder }) => {
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
    { name: 'About The Book', href: '#about-the-book' },
    { name: 'Who It’s For', href: '#who-is-this-for' },
    { name: 'Why Read', href: '#why-read' },
    { name: 'What Makes It Different', href: '#what-makes-different' },
    { name: 'Themes & Stories', href: '#whats-inside' },
    { name: 'Author', href: '#about-author' },
  ];

  return (
    <header
      id="main-navigation-header"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D8] py-2 sm:py-2.5 shadow-xs'
          : 'bg-transparent py-2.5 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-3 sm:gap-6">
          {/* Brand Logo */}
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

          {/* Desktop Navigation Links (Visible on xl screens and above to prevent collisions) */}
          <nav className="hidden xl:flex items-center space-x-5 2xl:space-x-7 shrink-0">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-sans font-semibold uppercase tracking-wider text-[#1F2E28]/80 hover:text-[#194A37] whitespace-nowrap transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              id="nav-excerpt-btn"
              onClick={onOpenExcerpt}
              className="hidden md:inline-flex items-center gap-1.5 px-3 sm:px-4 py-2 text-xs font-sans font-semibold uppercase tracking-wider text-[#194A37] hover:text-[#B81617] bg-white/90 hover:bg-white rounded-xl transition-all border border-[#E8E2D8] shadow-2xs cursor-pointer whitespace-nowrap"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#648C82]" />
              <span>Book Overview</span>
            </button>

            <button
              id="nav-preorder-btn"
              onClick={onOpenPreOrder}
              className="inline-flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-5 py-2 sm:py-2.5 text-xs font-sans uppercase tracking-widest font-bold text-white bg-[#B81617] hover:bg-[#9B1213] active:scale-[0.98] rounded-xl shadow-md transition-all duration-200 cursor-pointer border border-[#FF7A7A]/30 whitespace-nowrap"
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>Pre-Order</span>
            </button>

            {/* Menu Toggle for Tablet / Mobile (< xl screens) */}
            <button
              id="mobile-menu-toggle-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 text-[#194A37] hover:bg-[#F2EFE9] rounded-xl transition-colors cursor-pointer"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Drawer Menu for screens below xl */}
      {mobileMenuOpen && (
        <div
          id="mobile-nav-drawer"
          className="xl:hidden bg-[#FAF8F5] border-b border-[#E8E2D8] px-4 pt-3 pb-6 space-y-4 shadow-xl animate-in slide-in-from-top-2 duration-200"
        >
          <div className="flex flex-col space-y-2 pt-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-xs font-sans font-semibold uppercase tracking-wider text-[#1F2E28] hover:text-[#B81617] px-3 py-2 rounded-xl hover:bg-[#F2EFE9] transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="pt-3 border-t border-[#E8E2D8] flex flex-col gap-2.5">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenExcerpt();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 text-xs font-sans uppercase font-bold tracking-wider text-[#194A37] bg-white rounded-xl border border-[#E8E2D8] shadow-2xs"
            >
              <BookOpen className="w-4 h-4 text-[#648C82]" />
              <span>Book Overview</span>
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenPreOrder();
              }}
              className="w-full flex items-center justify-center gap-2 py-3.5 text-xs font-sans uppercase tracking-widest font-bold text-white bg-[#B81617] rounded-xl shadow-md"
            >
              <Bookmark className="w-4 h-4" />
              <span>Pre-Order The Book</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
