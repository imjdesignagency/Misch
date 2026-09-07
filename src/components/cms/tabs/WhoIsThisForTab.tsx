import React, { useState } from 'react';
import { useCMS } from '../../../context/CMSContext';
import { RotateCcw, Plus, Trash2 } from 'lucide-react';

export const WhoIsThisForTab: React.FC = () => {
  const { content, updateSection, resetSection } = useCMS();
  const { whoIsThisFor } = content;
  const [newItemText, setNewItemText] = useState('');

  const handleUpdateItem = (idx: number, text: string) => {
    const updated = [...whoIsThisFor.items];
    updated[idx] = { ...updated[idx], text };
    updateSection('whoIsThisFor', { items: updated });
  };

  const handleAddItem = () => {
    if (newItemText.trim()) {
      const newItem = {
        id: Date.now(),
        text: newItemText.trim(),
      };
      updateSection('whoIsThisFor', {
        items: [...whoIsThisFor.items, newItem],
      });
      setNewItemText('');
    }
  };

  const handleDeleteItem = (idx: number) => {
    if (whoIsThisFor.items.length <= 1) return;
    updateSection('whoIsThisFor', {
      items: whoIsThisFor.items.filter((_, i) => i !== idx),
    });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E8E2D8] pb-4">
        <h3 className="font-serif text-xl text-[#194A37]">Act V: Who Is This For</h3>
        <p className="font-sans text-xs text-[#1F2E28]/70">
          "This Book Was Written For You If..." — interactive checklist statements of lived experience.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Section Badge
          </label>
          <input
            type="text"
            value={whoIsThisFor.badge}
            onChange={(e) => updateSection('whoIsThisFor', { badge: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Headline
          </label>
          <input
            type="text"
            value={whoIsThisFor.headline}
            onChange={(e) => updateSection('whoIsThisFor', { headline: e.target.value })}
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
          value={whoIsThisFor.subtitle}
          onChange={(e) => updateSection('whoIsThisFor', { subtitle: e.target.value })}
          className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
        />
      </div>

      {/* Checklist items */}
      <div className="space-y-3 pt-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37]">
          Resonance Checkpoints ({whoIsThisFor.items.length})
        </label>
        <div className="space-y-2">
          {whoIsThisFor.items.map((item, idx) => (
            <div
              key={item.id || idx}
              className="flex items-center gap-3 p-3 bg-white border border-[#E8E2D8] rounded-xl shadow-2xs"
            >
              <span className="text-xs font-mono font-bold text-[#84937D] w-6 shrink-0">
                {idx + 1}.
              </span>
              <input
                type="text"
                value={item.text}
                onChange={(e) => handleUpdateItem(idx, e.target.value)}
                className="flex-1 px-2 py-1 text-xs border border-transparent focus:border-[#194A37] focus:bg-[#FAF8F5] rounded focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleDeleteItem(idx)}
                className="text-[#84937D] hover:text-[#B81617] p-1 cursor-pointer"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Add new item */}
        <div className="flex gap-2 pt-2">
          <input
            type="text"
            placeholder="Add new resonance condition (e.g. You've ever felt like your strength was taken for granted)..."
            value={newItemText}
            onChange={(e) => setNewItemText(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddItem())}
            className="flex-1 px-3 py-2 text-xs bg-white border border-[#E8E2D8] rounded-lg focus:outline-none"
          />
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
          onClick={() => resetSection('whoIsThisFor')}
          className="flex items-center gap-1.5 text-xs text-[#84937D] hover:text-[#B81617] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Who Is This For Defaults</span>
        </button>
      </div>
    </div>
  );
};
