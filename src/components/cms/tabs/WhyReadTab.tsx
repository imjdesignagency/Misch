import React, { useState } from 'react';
import { useCMS } from '../../../context/CMSContext';
import { RotateCcw, Plus, X } from 'lucide-react';

export const WhyReadTab: React.FC = () => {
  const { content, updateSection, resetSection } = useCMS();
  const { whyRead } = content;
  const [newQuote, setNewQuote] = useState('');

  const handleAddQuote = () => {
    if (newQuote.trim()) {
      updateSection('whyRead', { quotes: [...whyRead.quotes, newQuote.trim()] });
      setNewQuote('');
    }
  };

  const handleRemoveQuote = (idx: number) => {
    updateSection('whyRead', {
      quotes: whyRead.quotes.filter((_, i) => i !== idx),
    });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E8E2D8] pb-4">
        <h3 className="font-serif text-xl text-[#194A37]">Act VII: Why Read</h3>
        <p className="font-sans text-xs text-[#1F2E28]/70">
          "Sometimes You Don't Need Advice. You Need Recognition." — the internal reflections and invitation.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Section Badge
          </label>
          <input
            type="text"
            value={whyRead.badge}
            onChange={(e) => updateSection('whyRead', { badge: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Headline
          </label>
          <input
            type="text"
            value={whyRead.headline}
            onChange={(e) => updateSection('whyRead', { headline: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
      </div>

      <div className="space-y-3">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Paragraph 1 (The Distinction)
          </label>
          <textarea
            rows={2}
            value={whyRead.paragraph1}
            onChange={(e) => updateSection('whyRead', { paragraph1: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
              Paragraph 2 (Pithy Pause)
            </label>
            <input
              type="text"
              value={whyRead.paragraph2}
              onChange={(e) => updateSection('whyRead', { paragraph2: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
            />
          </div>
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
              Paragraph 3 (The Language)
            </label>
            <input
              type="text"
              value={whyRead.paragraph3}
              onChange={(e) => updateSection('whyRead', { paragraph3: e.target.value })}
              className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
          Transition Lead Line
        </label>
        <input
          type="text"
          value={whyRead.transition}
          onChange={(e) => updateSection('whyRead', { transition: e.target.value })}
          className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
        />
      </div>

      {/* Quote Cards */}
      <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E8E2D8] space-y-3">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37]">
          Reader Recognition Quotes
        </label>
        <div className="space-y-2">
          {whyRead.quotes.map((quote, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input
                type="text"
                value={quote}
                onChange={(e) => {
                  const updated = [...whyRead.quotes];
                  updated[idx] = e.target.value;
                  updateSection('whyRead', { quotes: updated });
                }}
                className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#E8E2D8] rounded-lg focus:outline-none"
              />
              <button
                type="button"
                onClick={() => handleRemoveQuote(idx)}
                className="text-[#84937D] hover:text-[#B81617] p-1 cursor-pointer"
              >
                <X className="w-3 h-3" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Add new quote (e.g. 'I didn't know someone else felt this')..."
            value={newQuote}
            onChange={(e) => setNewQuote(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddQuote())}
            className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#E8E2D8] rounded-lg focus:outline-none"
          />
          <button
            type="button"
            onClick={handleAddQuote}
            className="px-3 py-1.5 bg-[#194A37] text-white text-xs rounded-lg flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Author Invitation
          </label>
          <textarea
            rows={2}
            value={whyRead.invitation}
            onChange={(e) => updateSection('whyRead', { invitation: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Final Pithy Conclusion
          </label>
          <textarea
            rows={2}
            value={whyRead.pithy}
            onChange={(e) => updateSection('whyRead', { pithy: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="button"
          onClick={() => resetSection('whyRead')}
          className="flex items-center gap-1.5 text-xs text-[#84937D] hover:text-[#B81617] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Why Read Defaults</span>
        </button>
      </div>
    </div>
  );
};
