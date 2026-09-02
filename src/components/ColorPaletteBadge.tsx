import React, { useState } from 'react';
import { Palette, Check, Info } from 'lucide-react';

export const ColorPaletteBadge: React.FC = () => {
  const [copiedColor, setCopiedColor] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const colors = [
    { name: 'Forest Green', hex: '#194A37', label: 'Primary Brand' },
    { name: 'Slate Teal / Sage', hex: '#648C82', label: 'Secondary Accent' },
    { name: 'Muted Herb Green', hex: '#84937D', label: 'Muted Accent' },
    { name: 'Crimson Red', hex: '#B81617', label: 'Action & Energy' },
    { name: 'Deep Burgundy Wine', hex: '#7E0D09', label: 'Deep Contrast' },
    { name: 'Warm Cream Paper', hex: '#FAF8F5', label: 'Background Tint' },
  ];

  const handleCopy = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedColor(hex);
    setTimeout(() => setCopiedColor(null), 2000);
  };

  return (
    <div id="brand-palette-container" className="fixed bottom-6 right-6 z-40">
      <div className="relative">
        <button
          id="toggle-palette-btn"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#194A37] text-white shadow-xl hover:bg-[#0F2F23] transition-all duration-300 border border-white/20 text-xs font-bold tracking-wide group cursor-pointer"
          title="View Official Book Color Palette"
        >
          <div className="flex -space-x-1.5 items-center">
            {colors.slice(0, 5).map((c) => (
              <span
                key={c.hex}
                className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-2xs"
                style={{ backgroundColor: c.hex }}
              />
            ))}
          </div>
          <span className="hidden sm:inline font-sans text-xs uppercase font-medium tracking-wider">Book Palette</span>
          <Palette className="w-3.5 h-3.5 text-[#FAF8F5] group-hover:text-white transition-colors" />
        </button>

        {isOpen && (
          <div
            id="palette-dropdown-card"
            className="absolute bottom-12 right-0 w-80 bg-white p-4 rounded-3xl shadow-2xl border border-[#E8E2D8] text-[#1F2E28] animate-in fade-in slide-in-from-bottom-2 duration-200"
          >
            <div className="flex items-center justify-between pb-2 mb-3 border-b border-[#E8E2D8]">
              <div className="flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-[#B81617]" />
                <h4 className="font-sans font-bold text-sm tracking-wide text-[#194A37]">
                  Book Brand Palette
                </h4>
              </div>
              <span className="text-[10px] uppercase font-bold text-white bg-[#194A37] px-2 py-0.5 rounded-full">
                Click to copy
              </span>
            </div>

            <div className="space-y-1.5">
              {colors.map((c) => (
                <button
                  key={c.hex}
                  onClick={() => handleCopy(c.hex)}
                  className="w-full flex items-center justify-between p-2 rounded-xl hover:bg-[#FAF8F5] transition-colors group text-left cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-6 h-6 rounded-lg shadow-2xs border border-black/10 shrink-0"
                      style={{ backgroundColor: c.hex }}
                    />
                    <div>
                      <div className="font-sans text-xs font-bold text-[#194A37]">
                        {c.name}
                      </div>
                      <div className="text-[10px] text-[#84937D] font-medium">{c.label}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="font-mono text-[11px] font-bold text-[#648C82]">
                      {c.hex}
                    </span>
                    {copiedColor === c.hex ? (
                      <Check className="w-3.5 h-3.5 text-[#B81617]" />
                    ) : null}
                  </div>
                </button>
              ))}
            </div>

            <p className="mt-3 pt-2 text-[10px] text-[#84937D] font-sans border-t border-[#E8E2D8] flex items-center gap-1">
              <Info className="w-3 h-3 text-[#B81617] shrink-0" />
              Harmonized across all print, digital, and visual assets.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
