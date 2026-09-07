import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { FlowingTextCarousel } from './components/FlowingTextCarousel';
import { ContrastJourney } from './components/ContrastJourney';
import { ListeningStories } from './components/ListeningStories';
import { AudienceFeelings } from './components/AudienceFeelings';
import { AboutBook } from './components/AboutBook';
import { MockupShowcaseSection } from './components/MockupShowcaseSection';
import { WhoIsThisFor } from './components/WhoIsThisFor';
import { WhatMakesDifferent } from './components/WhatMakesDifferent';
import { WhyRead } from './components/WhyRead';
import { AboutAuthor } from './components/AboutAuthor';
import { PreOrderSection } from './components/PreOrderSection';
import { PreOrderModal } from './components/PreOrderModal';
import { ExcerptModal } from './components/ExcerptModal';
import { Footer } from './components/Footer';
import { ReadingProgressBar } from './components/animations/ReadingProgressBar';
import { CMSProvider, useCMS } from './context/CMSContext';
import { CMSStudio } from './components/cms/CMSStudio';

function LandingPage() {
  const [isPreOrderOpen, setIsPreOrderOpen] = useState(false);
  const [isExcerptOpen, setIsExcerptOpen] = useState(false);

  const handleOpenPreOrder = () => {
    setIsPreOrderOpen(true);
  };

  return (
    <div
      id="landing-page-container"
      className="min-h-screen bg-[#FAF8F5] text-[#1F2E28] flex flex-col selection:bg-[#B81617] selection:text-white font-sans relative"
    >
      {/* Scroll Progress Bar & Scroll-To-Top indicator */}
      <ReadingProgressBar />

      {/* Top Navbar */}
      <Navbar
        onOpenExcerpt={() => setIsExcerptOpen(true)}
        onOpenPreOrder={handleOpenPreOrder}
      />

      {/* Main Experiential Storytelling Journey */}
      <main className="flex-1">
        {/* Prologue: The Surface & 3D Interactive Book Presentation */}
        <Hero
          onOpenPreOrder={handleOpenPreOrder}
          onOpenExcerpt={() => setIsExcerptOpen(true)}
        />

        {/* Marquee: Flowing Emotional Brand Truths */}
        <FlowingTextCarousel />

        {/* Act I: The Core Brand Essence — Making The Invisible Visible (Interactive Contrast Lens) */}
        <ContrastJourney />

        {/* Act II: The Listening Journey — "Different women. Different circumstances. Similar feelings." */}
        <ListeningStories
          onOpenExcerpt={() => setIsExcerptOpen(true)}
        />

        {/* Act III: The Emotional Core — How We Want You To Feel (Seen, Recognized, Less Alone...) */}
        <AudienceFeelings
          onOpenPreOrder={handleOpenPreOrder}
        />

        {/* Act IV: About The Book — We Carry More Than People See */}
        <AboutBook
          onOpenExcerpt={() => setIsExcerptOpen(true)}
          onOpenPreOrder={handleOpenPreOrder}
        />

        {/* The Physical Artifact: Official Editions & Photographic Mockups Showcase */}
        <MockupShowcaseSection
          onOpenExcerpt={() => setIsExcerptOpen(true)}
          onOpenPreOrder={handleOpenPreOrder}
        />

        {/* Moments of Recognition: This Book Is For You If... */}
        <WhoIsThisFor
          onOpenPreOrder={handleOpenPreOrder}
        />

        {/* Act V: The Distinct Approach & Brand Positioning (Clear Boundaries, Honest Art) */}
        <WhatMakesDifferent />

        {/* Act VI: The Philosophy — Because Sometimes You Don't Need Advice. You Need Recognition. */}
        <WhyRead />

        {/* The Voice Behind The Work: Misheca O. Seymour */}
        <AboutAuthor />

        {/* Act VII: Priority Reservation & Community Connection */}
        <PreOrderSection />
      </main>

      {/* Footer */}
      <Footer />

      {/* Pre-Order Reservation Modal */}
      <PreOrderModal
        isOpen={isPreOrderOpen}
        onClose={() => setIsPreOrderOpen(false)}
      />

      {/* Literary Excerpt Reader Modal */}
      <ExcerptModal
        isOpen={isExcerptOpen}
        onClose={() => setIsExcerptOpen(false)}
        onOpenPreOrder={() => {
          setIsExcerptOpen(false);
          setIsPreOrderOpen(true);
        }}
      />

      {/* CMS Studio Drawer/Modal (only visible when opened via /cms, /#cms, etc.) */}
      <CMSStudio />
    </div>
  );
}

export default function App() {
  return (
    <CMSProvider>
      <LandingPage />
    </CMSProvider>
  );
}
