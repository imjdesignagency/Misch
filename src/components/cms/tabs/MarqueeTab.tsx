import React, { useState } from 'react';
import { useCMS } from '../../../context/CMSContext';
import { RotateCcw, Plus, Trash2 } from 'lucide-react';
import { MarqueeItem } from '../../../types/cms';

export const MarqueeTab: React.FC = () => {
  const { content, updateSection, resetSection } = useCMS();
  const { marquee } = content;
  const [newText, setNewText] = useState('');
  const [newHighlight, setNewHighlight] = useState(false);

  const handleAddItem = () => {
    if (newText.trim()) {
      updateSection('marquee', {
        items: [...marquee.items, { text: newText.trim(), highlight: newHighlight }],
      });
      setNewText('');
      setNewHighlight(false);
    }
  };

  const handleRemove = (idx: number) => {
    updateSection('marquee', {
      items: marquee.items.filter((_, i) => i !== idx),
    });
  };

  const handleToggleHighlight = (idx: number) => {
    const updated = [...marquee.items];
    updated[idx] = { ...updated[idx], highlight: !updated[idx].highlight };
    updateSection('marquee', { items: updated });
  };

  const handleUpdateText = (idx: number, text: string) => {
    const updated = [...marquee.items];
    updated[idx] = { ...updated[idx], text };
    updateSection('marquee', { items: updated });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E8E2D8] pb-4">
        <h3 className="font-serif text-xl text-[#194A37]">Flowing Marquee Ribbon</h3>
        <p className="font-sans text-xs text-[#1F2E28]/70">
          The continuous horizontal ticker displaying resonant literary lines beneath the hero section.
        </p>
      </div>

      <div className="space-y-3">
        {marquee.items.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center gap-3 p-3 bg-white border border-[#E8E2D8] rounded-xl"
          >
            <input
              type="text"
              value={item.text}
              onChange={(e) => handleUpdateText(idx, e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
            />
            <button
              type="button"
              onClick={() => handleToggleHighlight(idx)}
              className={`px-2.5 py-1 text-[11px] rounded-md font-medium cursor-pointer transition-colors ${
                item.highlight
                  ? 'bg-[#B81617] text-white'
                  : 'bg-[#FAF8F5] text-[#1F2E28] border border-[#E8E2D8]'
              }`}
            >
              {item.highlight ? 'Red Italic' : 'White Text'}
            </button>
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="text-[#84937D] hover:text-[#B81617] p-1 cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Add New Line */}
      <div className="p-4 bg-[#FAF8F5] border border-dashed border-[#E8E2D8] rounded-xl space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37]">
          Add New Marquee Statement
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Type a resonant statement..."
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem())}
            className="flex-1 px-3 py-2 text-xs bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
          <label className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#E8E2D8] rounded-lg text-xs cursor-pointer text-[#1F2E28]">
            <input
              type="checkbox"
              checked={newHighlight}
              onChange={(e) => setNewHighlight(e.target.checked)}
              className="rounded text-[#B81617]"
            />
            <span>Highlight</span>
          </label>
          <button
            type="button"
            onClick={handleAddItem}
            className="px-4 py-2 bg-[#194A37] text-white text-xs font-medium rounded-lg hover:bg-[#0F2F23] flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add</span>
          </button>
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="button"
          onClick={() => resetSection('marquee')}
          className="flex items-center gap-1.5 text-xs text-[#84937D] hover:text-[#B81617] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Marquee Defaults</span>
        </button>
      </div>
    </div>
  );
};
