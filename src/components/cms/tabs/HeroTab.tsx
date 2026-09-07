import React, { useState } from 'react';
import { useCMS } from '../../../context/CMSContext';
import { RotateCcw, Plus, X } from 'lucide-react';
import { CMSImageUploader } from '../CMSImageUploader';

export const HeroTab: React.FC = () => {
  const { content, updateSection, resetSection } = useCMS();
  const { hero } = content;
  const [newPill, setNewPill] = useState('');

  const handleAddPill = () => {
    if (newPill.trim()) {
      updateSection('hero', { pills: [...hero.pills, newPill.trim()] });
      setNewPill('');
    }
  };

  const handleRemovePill = (idx: number) => {
    updateSection('hero', {
      pills: hero.pills.filter((_, i) => i !== idx),
    });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E8E2D8] pb-4">
        <h3 className="font-serif text-xl text-[#194A37]">Hero Section</h3>
        <p className="font-sans text-xs text-[#1F2E28]/70">
          The opening visual impression, bold dual-tone title typography, emotional quote box, and primary calls to action.
        </p>
      </div>

      {/* Hero Book Mockup Upload */}
      <div className="bg-white p-4 rounded-xl border border-[#E8E2D8]">
        <CMSImageUploader
          label="Hero 3D Book Mockup Image"
          helperText="Upload your custom book cover or 3D mockup photo (supports PNG, JPG, WebP). Optimized automatically for performance."
          value={hero.mockupImageUrl || ''}
          onChange={(val) => updateSection('hero', { mockupImageUrl: val })}
        />
      </div>

      {/* Eyebrows */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Eyebrow Prefix Label
          </label>
          <input
            type="text"
            value={hero.eyebrowLabel}
            onChange={(e) => updateSection('hero', { eyebrowLabel: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Eyebrow Badge Text
          </label>
          <input
            type="text"
            value={hero.eyebrowBadge}
            onChange={(e) => updateSection('hero', { eyebrowBadge: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
      </div>

      {/* Headlines */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Main Title (Top Line)
          </label>
          <input
            type="text"
            value={hero.headlineLine1}
            onChange={(e) => updateSection('hero', { headlineLine1: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Main Title (Bottom Line - Crimson Italic)
          </label>
          <input
            type="text"
            value={hero.headlineLine2}
            onChange={(e) => updateSection('hero', { headlineLine2: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
      </div>

      {/* Quote Block */}
      <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E8E2D8] space-y-3">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Featured Italic Quote
          </label>
          <input
            type="text"
            value={hero.quote}
            onChange={(e) => updateSection('hero', { quote: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Contrast Explanation
          </label>
          <textarea
            rows={2}
            value={hero.contrastQuote}
            onChange={(e) => updateSection('hero', { contrastQuote: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
      </div>

      {/* Call to Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Primary Button Text
          </label>
          <input
            type="text"
            value={hero.primaryCta}
            onChange={(e) => updateSection('hero', { primaryCta: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Secondary Button Text
          </label>
          <input
            type="text"
            value={hero.secondaryCta}
            onChange={(e) => updateSection('hero', { secondaryCta: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
      </div>

      {/* Feature Pills */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-2">
          Subtle Feature Badges
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {hero.pills.map((pill, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E8E2D8] rounded-full text-xs text-[#194A37]"
            >
              <span>{pill}</span>
              <button
                type="button"
                onClick={() => handleRemovePill(idx)}
                className="text-[#84937D] hover:text-[#B81617] cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add new badge..."
            value={newPill}
            onChange={(e) => setNewPill(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddPill())}
            className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
          <button
            type="button"
            onClick={handleAddPill}
            className="px-3 py-1.5 bg-[#194A37] text-white text-xs rounded-lg hover:bg-[#0F2F23] flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="button"
          onClick={() => resetSection('hero')}
          className="flex items-center gap-1.5 text-xs text-[#84937D] hover:text-[#B81617] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Hero Defaults</span>
        </button>
      </div>
    </div>
  );
};
