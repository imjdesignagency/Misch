import React, { useState, useRef } from 'react';
import { Quote, Camera } from 'lucide-react';
import { AUTHOR_INFO } from '../data/bookData';
import { AuthorSignatureLogo } from './AuthorSignatureLogo';

const LOCAL_STORAGE_KEY = 'author_portrait_image_data';

export const AboutAuthor: React.FC = () => {
  const [authorImageSrc, setAuthorImageSrc] = useState<string | null>(() => {
    try {
      return localStorage.getItem(LOCAL_STORAGE_KEY);
    } catch {
      return null;
    }
  });
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const dataUrl = e.target?.result as string;
        setAuthorImageSrc(dataUrl);
        try {
          localStorage.setItem(LOCAL_STORAGE_KEY, dataUrl);
        } catch {
          // ignore quota
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <section
      id="about-author"
      className="py-20 md:py-32 bg-[#194A37] text-white relative overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#648C82]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#0F2F23]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-block bg-white/10 text-[#FAF8F5] border border-white/20 px-4 py-1.5 rounded-full text-xs font-sans font-bold uppercase tracking-widest shadow-xs backdrop-blur-xs">
            About The Author
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-white font-normal tracking-tight">
            {AUTHOR_INFO.name}
          </h2>
          <div className="w-16 h-0.5 bg-[#FF7A7A] mx-auto mt-3" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center max-w-6xl mx-auto">
          {/* Left Column: Author Portrait Space */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <input
              type="file"
              ref={fileInputRef}
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  handleFile(e.target.files[0]);
                }
              }}
            />

            <div className="w-full max-w-md bg-white/10 backdrop-blur-md p-4 sm:p-6 rounded-3xl border border-white/20 shadow-2xl relative">
              {/* Main Portrait Frame with Click / Drag & Drop support */}
              <div
                onClick={() => fileInputRef.current?.click()}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragging(true);
                }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={handleDrop}
                className={`relative aspect-3/4 w-full rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 ${
                  isDragging ? 'ring-4 ring-[#FF7A7A] scale-[1.02]' : 'hover:border-white/40'
                } bg-gradient-to-b from-[#0F2F23] via-[#12392B] to-[#0F2F23] flex items-center justify-center border border-white/15 shadow-inner group`}
              >
                {authorImageSrc ? (
                  <>
                    <img
                      src={authorImageSrc}
                      alt={AUTHOR_INFO.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover object-top"
                    />
                    {/* Subtle Hover Overlay to change photo if desired */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-white p-4 text-center">
                      <Camera className="w-8 h-8 text-[#FF7A7A] mb-2" />
                      <span className="font-sans text-xs font-semibold uppercase tracking-wider">
                        Click to change photo
                      </span>
                    </div>
                  </>
                ) : (
                  /* Interactive Portrait Drop & Editorial Card */
                  <div className="w-full h-full p-8 flex flex-col justify-between items-center text-center text-white relative bg-[#0F2F23]/90 hover:bg-[#0F2F23] transition-colors">
                    <div className="relative z-10 w-full flex justify-between items-center text-[10px] tracking-widest uppercase font-sans text-[#A3C2B6] font-bold">
                      <span>Author Portrait</span>
                      <span>Jamaica</span>
                    </div>

                    {/* Stylized Author Prompt */}
                    <div className="relative z-10 my-auto flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full border-2 border-dashed border-[#FF7A7A] flex items-center justify-center bg-white/10 group-hover:bg-white/20 transition-all mb-4 shadow-xl group-hover:scale-105">
                        <Camera className="w-8 h-8 text-[#FF7A7A]" />
                      </div>
                      <h4 className="font-display text-xl text-white font-bold tracking-tight">
                        {AUTHOR_INFO.name}
                      </h4>
                      <p className="font-sans text-xs text-[#A3C2B6] mt-2 font-light max-w-[220px]">
                        Click or drag & drop <strong className="text-white font-medium">IMG_1754.jpeg</strong> here to display portrait
                      </p>
                    </div>

                    {/* Bottom Attribution */}
                    <div className="relative z-10 text-[11px] text-white/80 font-sans border-t border-white/15 pt-2 w-full uppercase tracking-wider font-semibold">
                      The Weight We Carry
                    </div>
                  </div>
                )}

                {/* Badge Overlay */}
                <div className="absolute top-3 right-3 px-3 py-1 rounded-full bg-[#B81617] text-white text-[10px] font-sans uppercase font-bold tracking-wider shadow-xs pointer-events-none">
                  Author
                </div>
              </div>

              {/* Portrait Caption */}
              <div className="mt-4 flex items-center justify-between text-xs text-white/80 font-sans pt-2 border-t border-white/15">
                <span className="font-medium text-white">{AUTHOR_INFO.name}</span>
                <span className="text-[#A3C2B6]">Attorney & Author</span>
              </div>
            </div>
          </div>

          {/* Right Column: Author Biography from PDF */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <div>
              <h3 className="font-display text-3xl sm:text-4xl text-white font-normal tracking-tight">
                {AUTHOR_INFO.name}
              </h3>
              <p className="font-sans text-xs text-[#A3C2B6] uppercase tracking-wider font-semibold mt-1">
                {AUTHOR_INFO.title}
              </p>
            </div>

            {/* Paragraph 1 from PDF */}
            <p className="font-sans text-base sm:text-lg text-white/90 leading-relaxed font-light">
              {AUTHOR_INFO.bioParagraph1}
            </p>

            {/* Paragraph 2 from PDF */}
            <p className="font-sans text-base sm:text-lg text-white/90 leading-relaxed font-light">
              {AUTHOR_INFO.bioParagraph2}
            </p>

            {/* Paragraph 3 from PDF */}
            <p className="font-sans text-base sm:text-lg text-white/90 leading-relaxed font-light">
              {AUTHOR_INFO.bioParagraph3}
            </p>

            {/* Author's Hope Quote from PDF */}
            <div className="bg-white/10 backdrop-blur-md p-6 sm:p-8 rounded-3xl border-l-4 border-[#FF7A7A] border-y border-r border-white/15 shadow-sm space-y-3">
              <Quote className="w-5 h-5 text-[#FF7A7A]" />
              <p className="font-sans text-xl sm:text-2xl text-white font-normal leading-snug">
                “{AUTHOR_INFO.bioQuote}”
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <span className="text-xs font-sans font-bold tracking-wider uppercase text-[#A3C2B6] block">
                  — Misheca O. Seymour
                </span>
                <AuthorSignatureLogo variant="light" height="1.4rem" className="opacity-90" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
