import React, { useState } from 'react';
import { useCMS } from '../../../context/CMSContext';
import { RotateCcw, Plus, X } from 'lucide-react';
import { MockupCardCMS } from '../../../types/cms';
import { CMSImageUploader } from '../CMSImageUploader';

export const PhysicalEditionsTab: React.FC = () => {
  const { content, updateSection, resetSection } = useCMS();
  const { physicalEditions } = content;
  const [newSpec, setNewSpec] = useState('');

  const handleUpdateCard = (idx: number, updates: Partial<MockupCardCMS>) => {
    const updated = [...physicalEditions.cards];
    updated[idx] = { ...updated[idx], ...updates };
    updateSection('physicalEditions', { cards: updated });
  };

  const handleAddSpec = () => {
    if (newSpec.trim()) {
      updateSection('physicalEditions', {
        specifications: [...physicalEditions.specifications, newSpec.trim()],
      });
      setNewSpec('');
    }
  };

  const handleRemoveSpec = (idx: number) => {
    updateSection('physicalEditions', {
      specifications: physicalEditions.specifications.filter((_, i) => i !== idx),
    });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E8E2D8] pb-4">
        <h3 className="font-serif text-xl text-[#194A37]">Physical Editions & Mockup Showcase</h3>
        <p className="font-sans text-xs text-[#1F2E28]/70">
          The tactile artifact showcase, 3D interactive hardcover, in-hand perspective, and collector specifications.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Section Badge
          </label>
          <input
            type="text"
            value={physicalEditions.badge}
            onChange={(e) => updateSection('physicalEditions', { badge: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Headline
          </label>
          <input
            type="text"
            value={physicalEditions.headline}
            onChange={(e) => updateSection('physicalEditions', { headline: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
          Subtitle
        </label>
        <textarea
          rows={2}
          value={physicalEditions.subtitle}
          onChange={(e) => updateSection('physicalEditions', { subtitle: e.target.value })}
          className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
        />
      </div>

      {/* Specifications */}
      <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E8E2D8] space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37]">
          Craft & Production Specifications
        </label>
        <div className="flex flex-wrap gap-2">
          {physicalEditions.specifications.map((spec, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-white border border-[#E8E2D8] rounded-full text-xs text-[#194A37]"
            >
              <span>{spec}</span>
              <button
                type="button"
                onClick={() => handleRemoveSpec(idx)}
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
            placeholder="Add specification (e.g. Gold Foil Debossed Title)..."
            value={newSpec}
            onChange={(e) => setNewSpec(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSpec())}
            className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#E8E2D8] rounded-lg focus:outline-none"
          />
          <button
            type="button"
            onClick={handleAddSpec}
            className="px-3 py-1.5 bg-[#194A37] text-white text-xs rounded-lg flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>

      {/* The 3 Perspective Cards */}
      <div className="space-y-4">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37]">
          Perspective View Descriptions ({physicalEditions.cards.length})
        </label>
        {physicalEditions.cards.map((card, idx) => (
          <div key={card.id || idx} className="p-4 bg-white border border-[#E8E2D8] rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-serif font-bold text-sm text-[#194A37]">
                Perspective 0{idx + 1}: {card.title}
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#FAF8F5] border border-[#E8E2D8] text-[#84937D]">
                {card.id}
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-sans font-medium text-[#1F2E28]/80 mb-1">
                  Title
                </label>
                <input
                  type="text"
                  value={card.title}
                  onChange={(e) => handleUpdateCard(idx, { title: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] font-sans font-medium text-[#1F2E28]/80 mb-1">
                  Badge / Subtitle
                </label>
                <input
                  type="text"
                  value={card.subtitle}
                  onChange={(e) => handleUpdateCard(idx, { subtitle: e.target.value })}
                  className="w-full px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg focus:outline-none"
                />
              </div>
            </div>
            <div>
              <label className="block text-[11px] font-sans font-medium text-[#1F2E28]/80 mb-1">
                Description
              </label>
              <textarea
                rows={2}
                value={card.description}
                onChange={(e) => handleUpdateCard(idx, { description: e.target.value })}
                className="w-full px-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#E8E2D8] rounded-lg focus:outline-none"
              />
            </div>

            {/* Mockup Image Uploader for this Perspective */}
            <div className="pt-3 border-t border-[#E8E2D8]">
              <CMSImageUploader
                label={`${card.title} Mockup Image`}
                helperText={`Upload custom photo for '${card.title}' (${card.id}).`}
                value={card.imageUrl || physicalEditions.mockupImages?.[card.id] || ''}
                onChange={(val) => {
                  handleUpdateCard(idx, { imageUrl: val });
                  updateSection('physicalEditions', {
                    mockupImages: {
                      ...physicalEditions.mockupImages,
                      [card.id]: val,
                    },
                  });
                }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="button"
          onClick={() => resetSection('physicalEditions')}
          className="flex items-center gap-1.5 text-xs text-[#84937D] hover:text-[#B81617] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Physical Editions Defaults</span>
        </button>
      </div>
    </div>
  );
};
