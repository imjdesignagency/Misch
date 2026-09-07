import React from 'react';
import { useCMS } from '../../../context/CMSContext';
import { RotateCcw } from 'lucide-react';
import { BookFormat } from '../../../types';
import { CMSImageUploader } from '../CMSImageUploader';

export const PreOrderTab: React.FC = () => {
  const { content, updateSection, resetSection } = useCMS();
  const { preOrder } = content;

  const handleUpdateFormat = (idx: number, updates: Partial<BookFormat>) => {
    const updated = [...preOrder.formats];
    updated[idx] = { ...updated[idx], ...updates };
    updateSection('preOrder', { formats: updated });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E8E2D8] pb-4">
        <h3 className="font-serif text-xl text-[#194A37]">Final Act: Pre-Order Section</h3>
        <p className="font-sans text-xs text-[#1F2E28]/70">
          "Begin Laying the Weight Down" — pre-order reservation headlines, format pricing cards, and privacy note.
        </p>
      </div>

      {/* PreOrder Mockup Image */}
      <div className="bg-white p-4 rounded-xl border border-[#E8E2D8]">
        <CMSImageUploader
          label="Pre-Order Section Mockup Image"
          helperText="Upload custom mockup for the Final Act reservation section (falls back to master book cover if empty)."
          value={preOrder.mockupImageUrl || ''}
          onChange={(val) => updateSection('preOrder', { mockupImageUrl: val })}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Section Badge
          </label>
          <input
            type="text"
            value={preOrder.badge}
            onChange={(e) => updateSection('preOrder', { badge: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Headline
          </label>
          <input
            type="text"
            value={preOrder.headline}
            onChange={(e) => updateSection('preOrder', { headline: e.target.value })}
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
          value={preOrder.subtitle}
          onChange={(e) => updateSection('preOrder', { subtitle: e.target.value })}
          className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
        />
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
          Confidentiality & Privacy Assurance Note
        </label>
        <input
          type="text"
          value={preOrder.privacyNote}
          onChange={(e) => updateSection('preOrder', { privacyNote: e.target.value })}
          className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
        />
      </div>

      {/* Book Formats Cards */}
      <div className="space-y-4 pt-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37]">
          Book Formats Offered ({preOrder.formats.length})
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {preOrder.formats.map((fmt, idx) => (
            <div key={fmt.id || idx} className="p-4 bg-white border border-[#E8E2D8] rounded-xl space-y-2.5 shadow-2xs">
              <input
                type="text"
                value={fmt.name}
                onChange={(e) => handleUpdateFormat(idx, { name: e.target.value })}
                className="font-serif font-bold text-sm text-[#194A37] w-full border-b border-transparent focus:border-[#194A37] focus:outline-none"
              />
              <input
                type="text"
                placeholder="Badge (e.g. Hardcover)"
                value={fmt.badge || ''}
                onChange={(e) => handleUpdateFormat(idx, { badge: e.target.value })}
                className="w-full px-2 py-1 text-xs bg-[#FAF8F5] border border-[#E8E2D8] rounded focus:outline-none"
              />
              <textarea
                rows={2}
                placeholder="Description"
                value={fmt.description}
                onChange={(e) => handleUpdateFormat(idx, { description: e.target.value })}
                className="w-full px-2 py-1 text-xs bg-[#FAF8F5] border border-[#E8E2D8] rounded focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="button"
          onClick={() => resetSection('preOrder')}
          className="flex items-center gap-1.5 text-xs text-[#84937D] hover:text-[#B81617] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Pre-Order Defaults</span>
        </button>
      </div>
    </div>
  );
};
