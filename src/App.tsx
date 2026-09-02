import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FlowingTextCarousel } from './components/FlowingTextCarousel';
import { AboutBook } from './components/AboutBook';
import { WhoIsThisFor } from './components/WhoIsThisFor';
import { WhyRead } from './components/WhyRead';
import { WhatMakesDifferent } from './components/WhatMakesDifferent';
import { InsideTheBook } from './components/InsideTheBook';
import { AboutAuthor } from './components/AboutAuthor';
import { PreOrderSection } from './components/PreOrderSection';
import { PreOrderModal } from './components/PreOrderModal';
import { ExcerptModal } from './components/ExcerptModal';
import { Footer } from './components/Footer';

export default function App() {
  const [isPreOrderOpen, setIsPreOrderOpen] = useState(false);
  const [isExcerptOpen, setIsExcerptOpen] = useState(false);

  const handleOpenPreOrder = () => {
    setIsPreOrderOpen(true);
  };

  return (
    <div
      id="landing-page-container"
      className="min-h-screen bg-[#FAF8F5] text-[#1F2E28] flex flex-col selection:bg-[#B81617] selection:text-white font-sans"
    >
      {/* Top Navbar */}
      <Navbar
        onOpenExcerpt={() => setIsExcerptOpen(true)}
        onOpenPreOrder={handleOpenPreOrder}
      />

      {/* Main Landing Page Content */}
      <main className="flex-1">
        {/* 1. Dynamic Hero Section with Left-hand Background Canvas & 3D Book Presentation */}
        <Hero
          onOpenPreOrder={handleOpenPreOrder}
          onOpenExcerpt={() => setIsExcerptOpen(true)}
        />

        {/* Flowing Text Carousel Marquee Right Underneath Hero */}
        <FlowingTextCarousel />

        {/* 2. About The Book with 3D Book Presentation using Hero Book Design */}
        <AboutBook
          onOpenExcerpt={() => setIsExcerptOpen(true)}
          onOpenPreOrder={handleOpenPreOrder}
        />

        {/* 3. Who Is This Book For? (Interactive Reflection) */}
        <WhoIsThisFor
          onOpenPreOrder={handleOpenPreOrder}
        />

        {/* 4. Why Read The Weight We Carry? (Core Philosophy & Quotes) */}
        <WhyRead />

        {/* 5. What Makes This Book Different? (The Things We Don’t Usually Talk About) */}
        <WhatMakesDifferent />

        {/* 6. What You'll Find Inside (5 Core Thematic Pillars) */}
        <InsideTheBook
          onOpenExcerpt={() => setIsExcerptOpen(true)}
        />

        {/* 7. About The Author (Misheca O. Seymour with Attached Portrait Image) */}
        <AboutAuthor />

        {/* 8. Pre-Order & Priority Information Collection Form */}
        <PreOrderSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Pre-Order Reservation Modal */}
      <PreOrderModal
        isOpen={isPreOrderOpen}
        onClose={() => setIsPreOrderOpen(false)}
      />

      {/* Sample Excerpt Reader Modal */}
      <ExcerptModal
        isOpen={isExcerptOpen}
        onClose={() => setIsExcerptOpen(false)}
        onOpenPreOrder={() => {
          setIsExcerptOpen(false);
          setIsPreOrderOpen(true);
        }}
      />
    </div>
  );
}


