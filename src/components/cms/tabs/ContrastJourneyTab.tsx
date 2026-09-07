import React, { useState } from 'react';
import { useCMS } from '../../../context/CMSContext';
import { RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import { ContrastItem } from '../../../types/cms';

export const ContrastJourneyTab: React.FC = () => {
  const { content, updateSection, resetSection } = useCMS();
  const { contrastJourney } = content;
  const [expandedIdx, setExpandedIdx] = useState<number>(0);

  const handleUpdateContrast = (idx: number, updates: Partial<ContrastItem>) => {
    const updated = [...contrastJourney.contrasts];
    updated[idx] = { ...updated[idx], ...updates };
    updateSection('contrastJourney', { contrasts: updated });
  };

  const handleUpdateVisible = (idx: number, field: string, val: string) => {
    const updated = [...contrastJourney.contrasts];
    updated[idx] = {
      ...updated[idx],
      visible: { ...updated[idx].visible, [field]: val },
    };
    updateSection('contrastJourney', { contrasts: updated });
  };

  const handleUpdateInvisible = (idx: number, field: string, val: string) => {
    const updated = [...contrastJourney.contrasts];
    updated[idx] = {
      ...updated[idx],
      invisible: { ...updated[idx].invisible, [field]: val },
    };
    updateSection('contrastJourney', { contrasts: updated });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E8E2D8] pb-4">
        <h3 className="font-serif text-xl text-[#194A37]">Act I: Contrast Journey</h3>
        <p className="font-sans text-xs text-[#1F2E28]/70">
          "Making the invisible visible" — the side-by-side console showing what the world sees vs. what she actually carries.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Act Badge Text
          </label>
          <input
            type="text"
            value={contrastJourney.badge}
            onChange={(e) => updateSection('contrastJourney', { badge: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Section Headline
          </label>
          <input
            type="text"
            value={contrastJourney.headline}
            onChange={(e) => updateSection('contrastJourney', { headline: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
          Lead Explanatory Paragraph
        </label>
        <textarea
          rows={2}
          value={contrastJourney.lead}
          onChange={(e) => updateSection('contrastJourney', { lead: e.target.value })}
          className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
        />
      </div>

      {/* Archetypes list */}
      <div className="space-y-4 pt-2">
        <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37]">
          The 3 Archetype Contrast Cases
        </label>

        {contrastJourney.contrasts.map((item, idx) => {
          const isExpanded = expandedIdx === idx;
          return (
            <div
              key={item.id || idx}
              className="bg-white border border-[#E8E2D8] rounded-xl overflow-hidden shadow-2xs"
            >
              <button
                type="button"
                onClick={() => setExpandedIdx(isExpanded ? -1 : idx)}
                className="w-full flex items-center justify-between p-4 bg-[#FAF8F5] text-left hover:bg-[#F2EFE9] transition-colors cursor-pointer"
              >
                <div>
                  <span className="text-xs font-mono font-bold text-[#84937D] mr-2">
                    Case 0{idx + 1}
                  </span>
                  <span className="font-serif font-medium text-base text-[#194A37]">
                    {item.archetype}
                  </span>
                </div>
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-[#194A37]" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-[#84937D]" />
                )}
              </button>

              {isExpanded && (
                <div className="p-5 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-sans font-medium text-[#1F2E28]/80 mb-1">
                        Archetype Name
                      </label>
                      <input
                        type="text"
                        value={item.archetype}
                        onChange={(e) => handleUpdateContrast(idx, { archetype: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-sans font-medium text-[#1F2E28]/80 mb-1">
                        Setting / Context
                      </label>
                      <input
                        type="text"
                        value={item.context}
                        onChange={(e) => handleUpdateContrast(idx, { context: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
                      />
                    </div>
                  </div>

                  {/* What World Sees */}
                  <div className="p-3.5 bg-[#FAF8F5] rounded-lg border border-[#E8E2D8] space-y-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#194A37]">
                      What The World Sees (Visible Side)
                    </span>
                    <input
                      type="text"
                      placeholder="Title"
                      value={item.visible.title}
                      onChange={(e) => handleUpdateVisible(idx, 'title', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
                    />
                    <textarea
                      rows={2}
                      placeholder="Description"
                      value={item.visible.description}
                      onChange={(e) => handleUpdateVisible(idx, 'description', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
                    />
                    <input
                      type="text"
                      placeholder="Quote"
                      value={item.visible.quote}
                      onChange={(e) => handleUpdateVisible(idx, 'quote', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
                    />
                  </div>

                  {/* What She Carries */}
                  <div className="p-3.5 bg-[#FFF8F8] rounded-lg border border-[#FFD6D6] space-y-2.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#B81617]">
                      What She Actually Carries (Invisible Weight)
                    </span>
                    <input
                      type="text"
                      placeholder="Title"
                      value={item.invisible.title}
                      onChange={(e) => handleUpdateInvisible(idx, 'title', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B81617]"
                    />
                    <textarea
                      rows={2}
                      placeholder="Description"
                      value={item.invisible.description}
                      onChange={(e) => handleUpdateInvisible(idx, 'description', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B81617]"
                    />
                    <input
                      type="text"
                      placeholder="Quote"
                      value={item.invisible.quote}
                      onChange={(e) => handleUpdateInvisible(idx, 'quote', e.target.value)}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#B81617]"
                    />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="pt-4 flex justify-end">
        <button
          type="button"
          onClick={() => resetSection('contrastJourney')}
          className="flex items-center gap-1.5 text-xs text-[#84937D] hover:text-[#B81617] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Contrast Defaults</span>
        </button>
      </div>
    </div>
  );
};
