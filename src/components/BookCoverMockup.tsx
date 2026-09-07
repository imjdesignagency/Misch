import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Hand, ZoomIn, X, Image as ImageIcon, Upload, RotateCcw } from 'lucide-react';
import { BOOK_INFO } from '../data/bookData';
import { useCMS } from '../context/CMSContext';
import { optimizeImageFile } from '../utils/imageOptimizer';

export type MockupViewType = 'floating' | 'in-hand' | 'stacked';

const DEFAULT_MOCKUP_IMAGES: Record<MockupViewType, string | null> = {
  floating: null,
  'in-hand': null,
  stacked: null,
};

interface BookCoverMockupProps {
  size?: 'sm' | 'md' | 'lg';
  interactive?: boolean;
  defaultView?: MockupViewType;
  showSelector?: boolean;
  sectionKey?: 'hero' | 'aboutBook' | 'physicalEditions' | 'preOrder' | string;
  customImage?: string | null;
}

export const BookCoverMockup: React.FC<BookCoverMockupProps> = ({
  size = 'lg',
  interactive = true,
  defaultView = 'floating',
  showSelector = true,
  sectionKey,
  customImage,
}) => {
  const { content, updateSection } = useCMS();
  const [activeView, setActiveView] = useState<MockupViewType>(defaultView);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isZoomModalOpen, setIsZoomModalOpen] = useState<boolean>(false);

  // Synchronize when defaultView prop changes (e.g. from parent tab selection)
  useEffect(() => {
    setActiveView(defaultView);
  }, [defaultView]);

  // Custom user-provided image overrides (stored locally if user uploads)
  const [customImages, setCustomImages] = useState<Record<MockupViewType, string | null>>({
    floating: null,
    'in-hand': null,
    stacked: null,
  });

  useEffect(() => {
    try {
      const saved = localStorage.getItem('misheca_book_mockup_images');
      if (saved) {
        setCustomImages(JSON.parse(saved));
      }
    } catch {
      // ignore storage access errors
    }
  }, []);

  // Compute active image based on props, CMS section, and local storage overrides
  const getImageForView = (view: MockupViewType): string | null => {
    if (customImage) return customImage;

    if (sectionKey === 'hero') {
      return content.hero.mockupImageUrl || content.site.masterBookCoverUrl || customImages['floating'] || null;
    }

    if (sectionKey === 'aboutBook') {
      return (
        content.aboutBook.mockupImageUrl ||
        content.hero.mockupImageUrl ||
        content.site.masterBookCoverUrl ||
        customImages['floating'] ||
        null
      );
    }

    if (sectionKey === 'preOrder') {
      return (
        content.preOrder.mockupImageUrl ||
        content.hero.mockupImageUrl ||
        customImages['floating'] ||
        null
      );
    }

    if (view === 'floating') {
      return (
        content.physicalEditions.mockupImages?.['floating'] ||
        content.physicalEditions.cards?.find((c) => c.id === 'floating')?.imageUrl ||
        content.hero.mockupImageUrl ||
        content.site.masterBookCoverUrl ||
        customImages['floating'] ||
        null
      );
    }

    if (view === 'in-hand') {
      return (
        content.physicalEditions.mockupImages?.['in-hand'] ||
        content.physicalEditions.cards?.find((c) => c.id === 'in-hand')?.imageUrl ||
        customImages['in-hand'] ||
        null
      );
    }

    if (view === 'stacked') {
      return (
        content.physicalEditions.mockupImages?.['stacked'] ||
        content.physicalEditions.cards?.find((c) => c.id === 'stacked')?.imageUrl ||
        customImages['stacked'] ||
        null
      );
    }

    return customImages[view] || DEFAULT_MOCKUP_IMAGES[view];
  };

  const currentViewImage = getImageForView(activeView);

  const handleImageUpload = async (view: MockupViewType, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const result = await optimizeImageFile(file);
        if (!result) return;
        const updated = { ...customImages, [view]: result };
        setCustomImages(updated);
        try {
          localStorage.setItem('misheca_book_mockup_images', JSON.stringify(updated));
        } catch {
          // ignore
        }

        // Sync with CMS content
        if (sectionKey === 'hero') {
          updateSection('hero', { mockupImageUrl: result });
        } else if (sectionKey === 'aboutBook') {
          updateSection('aboutBook', { mockupImageUrl: result });
        } else if (sectionKey === 'preOrder') {
          updateSection('preOrder', { mockupImageUrl: result });
        } else {
          // Update physical editions
          const updatedCards = content.physicalEditions.cards.map((c) =>
            c.id === view ? { ...c, imageUrl: result } : c
          );
          updateSection('physicalEditions', {
            cards: updatedCards,
            mockupImages: {
              ...content.physicalEditions.mockupImages,
              [view]: result,
            },
          });
        }
      } catch (err) {
        console.error('Failed to optimize uploaded mockup:', err);
      } finally {
        if (e.target) e.target.value = '';
      }
    }
  };

  const handleResetCustomImage = (view: MockupViewType) => {
    const updated = { ...customImages, [view]: null };
    setCustomImages(updated);
    try {
      localStorage.setItem('misheca_book_mockup_images', JSON.stringify(updated));
    } catch {
      // ignore
    }

    if (sectionKey === 'hero') {
      updateSection('hero', { mockupImageUrl: '' });
    } else if (sectionKey === 'aboutBook') {
      updateSection('aboutBook', { mockupImageUrl: '' });
    } else if (sectionKey === 'preOrder') {
      updateSection('preOrder', { mockupImageUrl: '' });
    } else {
      const updatedCards = content.physicalEditions.cards.map((c) =>
        c.id === view ? { ...c, imageUrl: '' } : c
      );
      updateSection('physicalEditions', {
        cards: updatedCards,
        mockupImages: {
          ...content.physicalEditions.mockupImages,
          [view]: '',
        },
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!interactive) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2; // -1 to 1
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2; // -1 to 1
    setMousePos({ x, y });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  // Dimensions
  const dimensions = {
    sm: {
      width: 'w-64 sm:w-72',
      height: 'h-[340px] sm:h-[380px]',
      bookWidth: 200,
      bookHeight: 280,
    },
    md: {
      width: 'w-72 sm:w-80',
      height: 'h-[400px] sm:h-[450px]',
      bookWidth: 240,
      bookHeight: 340,
    },
    lg: {
      width: 'w-80 sm:w-96 md:w-[440px]',
      height: 'h-[460px] sm:h-[520px] md:h-[560px]',
      bookWidth: 290,
      bookHeight: 410,
    },
  }[size];

  return (
    <div className="relative flex flex-col items-center select-none">
      {/* Main Mockup Stage Area */}
      <div
        className={`relative ${dimensions.width} ${dimensions.height} flex items-center justify-center`}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
      >
        <AnimatePresence mode="wait">
          {/* ========================================================================= */}
          {/* MOCKUP 1: 3D FLOATING HARDCOVER                                           */}
          {/* ========================================================================= */}
          {activeView === 'floating' && (
            <motion.div
              key="floating"
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -15 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-full flex items-center justify-center"
              style={{ perspective: '1200px' }}
            >
              {/* Soft studio floor shadow beneath floating book */}
              <div
                className="absolute bottom-4 w-[78%] h-12 rounded-full blur-xl opacity-60 pointer-events-none transition-all duration-300"
                style={{
                  background:
                    'radial-gradient(ellipse at center, rgba(16,45,38,0.55) 0%, rgba(18,55,46,0.2) 50%, transparent 80%)',
                  transform: isHovered
                    ? `translateX(${mousePos.x * 14}px) scale(${1 - mousePos.y * 0.05})`
                    : 'none',
                }}
              />

              {/* Render User Uploaded Image or Clean Book Silhouette Frame */}
              {getImageForView('floating') ? (
                <motion.div
                  className="relative cursor-grab active:cursor-grabbing transition-transform duration-200 ease-out flex items-center justify-center max-w-full max-h-full"
                  style={{
                    transform: isHovered
                      ? `rotateY(${mousePos.x * 12}deg) rotateX(${-mousePos.y * 10}deg) scale(1.03)`
                      : 'rotateY(0deg) rotateX(0deg) scale(1)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <img
                    src={getImageForView('floating')!}
                    alt="The Weight We Carry - 3D Book Mockup"
                    className="max-h-[380px] sm:max-h-[440px] md:max-h-[480px] w-auto max-w-full object-contain drop-shadow-2xl select-none"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              ) : (
                /* Clean Hardcover Placeholder Frame */
                <div
                  className="relative cursor-grab active:cursor-grabbing transition-transform duration-200 ease-out"
                  style={{
                    transform: isHovered
                      ? `rotateY(${-18 + mousePos.x * 10}deg) rotateX(${8 - mousePos.y * 8}deg) rotateZ(-10deg)`
                      : 'rotateY(-18deg) rotateX(8deg) rotateZ(-10deg)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div
                    className="relative rounded-r-xl rounded-l-xs overflow-hidden shadow-2xl border-l border-white/20 p-6 flex flex-col justify-between text-center"
                    style={{
                      width: `${dimensions.bookWidth}px`,
                      height: `${dimensions.bookHeight}px`,
                      backgroundColor: '#12372E',
                    }}
                  >
                    {/* Left Spine Crease */}
                    <div className="absolute left-0 top-0 bottom-0 w-3 bg-gradient-to-r from-black/40 to-transparent border-r border-white/10 pointer-events-none" />

                    <div className="relative z-10 w-full flex justify-between items-center text-[9px] tracking-[0.2em] uppercase font-sans text-[#A3C2B6] font-semibold">
                      <span>Hardcover Edition</span>
                      <span>Debut Novel</span>
                    </div>

                    <div className="relative z-10 my-auto space-y-2.5">
                      <div className="w-12 h-12 mx-auto rounded-full bg-white/10 flex items-center justify-center text-[#FF8585] border border-white/15 shadow-sm">
                        <ImageIcon className="w-6 h-6" />
                      </div>
                      <h3 className="font-serif text-2xl sm:text-3xl font-medium tracking-wide text-[#FAF8F5] leading-tight">
                        THE WEIGHT<br />
                        <span className="text-[#FF8585]">WE CARRY</span>
                      </h3>
                      <p className="font-serif italic text-xs text-[#E0D8CB] max-w-[190px] mx-auto pt-1">
                        Stories of women and the silent work of holding it all together
                      </p>
                    </div>

                    <div className="relative z-10 text-[10px] font-sans text-white/70 uppercase tracking-widest border-t border-white/10 pt-2 w-full font-medium">
                      By {BOOK_INFO.author}
                    </div>

                    {/* Specular sheen overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.05] to-white/[0.12] pointer-events-none" />
                  </div>

                  {/* Right Edge: Paper Block */}
                  <div
                    className="absolute top-1 bottom-1 right-0 w-8 bg-[#F4F1EA] origin-right pointer-events-none rounded-r-xs overflow-hidden"
                    style={{
                      transform: 'rotateY(90deg) translateZ(0px)',
                      boxShadow: 'inset 0 0 10px rgba(0,0,0,0.15)',
                      backgroundImage:
                        'repeating-linear-gradient(to bottom, #ECE7DC 0px, #F4F1EA 1px, #FAF8F5 2px)',
                    }}
                  />
                </div>
              )}
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* MOCKUP 2: IN-HAND LIFESTYLE                                               */}
          {/* ========================================================================= */}
          {activeView === 'in-hand' && (
            <motion.div
              key="in-hand"
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -15 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {getImageForView('in-hand') ? (
                <motion.div
                  className="relative cursor-grab active:cursor-grabbing transition-transform duration-200 ease-out flex items-center justify-center max-w-full max-h-full"
                  style={{
                    transform: isHovered
                      ? `rotate(${mousePos.x * 3}deg) scale(1.02)`
                      : 'rotate(0deg)',
                  }}
                >
                  <img
                    src={getImageForView('in-hand')!}
                    alt="The Weight We Carry Book In Hand"
                    className="max-h-[380px] sm:max-h-[440px] md:max-h-[480px] w-auto max-w-full object-contain drop-shadow-2xl rounded-2xl select-none"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              ) : (
                /* Clean In-Hand Placeholder Frame */
                <div
                  className="relative z-10 flex flex-col items-center justify-between p-6 text-center rounded-3xl border border-[#D9D3C5] bg-gradient-to-b from-[#FAF8F5] via-[#F3EFE9] to-[#EAE6DF] shadow-xl text-[#194A37]"
                  style={{
                    width: `${dimensions.bookWidth}px`,
                    height: `${dimensions.bookHeight}px`,
                  }}
                >
                  <div className="w-full flex justify-between items-center text-[9px] tracking-[0.2em] uppercase font-sans text-[#84937D] font-semibold">
                    <span>Lifestyle Perspective</span>
                    <span>In-Hand View</span>
                  </div>

                  <div className="my-auto flex flex-col items-center space-y-3">
                    <div className="w-14 h-14 rounded-full bg-[#194A37]/10 flex items-center justify-center text-[#194A37] border border-[#194A37]/15">
                      <Hand className="w-7 h-7" />
                    </div>
                    <h4 className="font-serif text-xl font-medium text-[#194A37]">
                      In-Hand Lifestyle Mockup
                    </h4>
                    <p className="font-sans text-xs text-[#4A5E54] max-w-[210px] leading-relaxed">
                      Upload your in-hand lifestyle photo in the CMS Studio under Physical Editions.
                    </p>
                  </div>

                  <div className="w-full pt-2 border-t border-[#D9D3C5]/60 text-[10px] font-sans font-semibold uppercase tracking-wider text-[#84937D]">
                    Awaiting In-Hand Photo Upload
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* ========================================================================= */}
          {/* MOCKUP 3: COLLECTOR'S STACK                                               */}
          {/* ========================================================================= */}
          {activeView === 'stacked' && (
            <motion.div
              key="stacked"
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: -15 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative w-full h-full flex items-center justify-center"
            >
              {getImageForView('stacked') ? (
                <motion.div
                  className="relative cursor-grab active:cursor-grabbing transition-transform duration-200 ease-out flex items-center justify-center max-w-full max-h-full"
                  style={{
                    transform: isHovered
                      ? `translateY(-4px) scale(1.02)`
                      : 'translateY(0px)',
                  }}
                >
                  <img
                    src={getImageForView('stacked')!}
                    alt="The Weight We Carry Book Standing Collector Stack"
                    className="max-h-[380px] sm:max-h-[440px] md:max-h-[480px] w-auto max-w-full object-contain drop-shadow-2xl rounded-2xl select-none"
                    referrerPolicy="no-referrer"
                  />
                </motion.div>
              ) : (
                /* Clean Stack Placeholder Frame */
                <div
                  className="relative z-10 flex flex-col items-center justify-between p-6 text-center rounded-3xl border border-[#526349] bg-gradient-to-b from-[#2B3824] via-[#232F1D] to-[#1B2416] shadow-2xl text-white"
                  style={{
                    width: `${dimensions.bookWidth}px`,
                    height: `${dimensions.bookHeight}px`,
                  }}
                >
                  <div className="w-full flex justify-between items-center text-[9px] tracking-[0.2em] uppercase font-sans text-[#A3C2B6] font-semibold">
                    <span>Collector Stack</span>
                    <span>Multi-Volume</span>
                  </div>

                  <div className="my-auto flex flex-col items-center space-y-3">
                    <div className="w-14 h-14 rounded-full bg-white/10 flex items-center justify-center text-[#E8C574] border border-white/15">
                      <Layers className="w-7 h-7" />
                    </div>
                    <h4 className="font-serif text-xl font-medium text-white">
                      Collector Edition Stack
                    </h4>
                    <p className="font-sans text-xs text-[#D4DFDA] max-w-[210px] leading-relaxed">
                      Upload your stacked collector books photo in the CMS Studio under Physical Editions.
                    </p>
                  </div>

                  <div className="w-full pt-2 border-t border-white/15 text-[10px] font-sans font-semibold uppercase tracking-wider text-[#E8C574]">
                    Awaiting Stack Photo Upload
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Inspect Tool on Mockup */}
        <div className="absolute top-3 right-3 z-30 flex items-center bg-white/85 backdrop-blur-md p-1 rounded-xl border border-white/40 shadow-xs">
          <button
            onClick={() => setIsZoomModalOpen(true)}
            className="p-1.5 text-[#194A37] hover:text-[#0F2F23] hover:bg-white/60 rounded-lg transition-colors cursor-pointer"
            title="Inspect large view"
            aria-label="Inspect large view"
          >
            <ZoomIn className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Full-Screen Zoom Inspection Modal */}
      <AnimatePresence>
        {isZoomModalOpen && (
          <div
            className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md"
            onClick={() => setIsZoomModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="relative max-w-xl w-full bg-[#12372E] border border-white/20 rounded-3xl p-6 sm:p-8 flex flex-col items-center shadow-2xl text-white"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setIsZoomModalOpen(false)}
                className="absolute top-4 right-4 p-2 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-center mb-4 pt-2">
                <span className="text-[11px] font-sans uppercase tracking-[0.2em] text-[#FF8585] font-semibold">
                  Book Mockup Inspection • {activeView.toUpperCase()}
                </span>
                <h3 className="font-serif text-2xl text-[#FAF8F5]">
                  The Weight We Carry
                </h3>
              </div>

              {/* Large Cover Display */}
              <div className="w-72 sm:w-80 h-[460px] sm:h-[500px] rounded-2xl overflow-hidden shadow-2xl border border-white/20 relative flex items-center justify-center bg-black/20">
                {getImageForView(activeView) ? (
                  <img
                    src={getImageForView(activeView)!}
                    alt="Cover Large View"
                    className="w-full h-full object-contain select-none"
                    referrerPolicy="no-referrer"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center text-center p-6 text-white/80 space-y-3">
                    <ImageIcon className="w-12 h-12 text-[#FF8585] opacity-80" />
                    <h4 className="font-serif text-xl text-white">The Weight We Carry</h4>
                    <p className="text-xs text-[#A3C2B6] max-w-[210px] leading-relaxed">
                      Upload your book mockup in the CMS Studio or using the upload icon to preview here.
                    </p>
                  </div>
                )}
              </div>

              {/* Cover Details */}
              <div className="mt-5 w-full bg-white/10 rounded-2xl p-4 text-xs font-sans text-[#D4DFDA] space-y-2 text-center">
                <p className="font-serif italic text-sm text-[#FAF8F5]">
                  “Stories of women and the silent work of holding it all together”
                </p>
                <p>
                  Official Hardcover & Paperback Edition by{' '}
                  <span className="text-white font-medium">{BOOK_INFO.author}</span>
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
