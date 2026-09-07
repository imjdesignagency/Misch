import React, { useState } from 'react';
import { useCMS } from '../../../context/CMSContext';
import { RotateCcw, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { StoryCMSItem } from '../../../types/cms';

export const ListeningStoriesTab: React.FC = () => {
  const { content, updateSection, resetSection } = useCMS();
  const { listeningStories } = content;
  const [expandedIdx, setExpandedIdx] = useState<number>(0);

  const handleUpdateStory = (idx: number, updates: Partial<StoryCMSItem>) => {
    const updated = [...listeningStories.stories];
    updated[idx] = { ...updated[idx], ...updates };
    updateSection('listeningStories', { stories: updated });
  };

  const handleAddStory = () => {
    const newCount = listeningStories.stories.length + 1;
    const newStory: StoryCMSItem = {
      id: `story-${Date.now()}`,
      chapterNumber: `Story ${newCount}`,
      title: 'A New Story of Quiet Strength',
      voice: 'A Mother & Professional',
      setting: 'In the Quiet Hours',
      excerpt: '“She looked at the reflection in the mirror, wondering when being strong became an expectation rather than a choice...”',
      reflection: 'Strength is not the absence of fatigue; it is the courage to admit when you are tired.',
      emotionalTag: 'Seen: “Someone understands this.”',
    };
    updateSection('listeningStories', {
      stories: [...listeningStories.stories, newStory],
    });
    setExpandedIdx(listeningStories.stories.length);
  };

  const handleDeleteStory = (idx: number) => {
    if (listeningStories.stories.length <= 1) {
      alert('You must keep at least one story in the collection.');
      return;
    }
    updateSection('listeningStories', {
      stories: listeningStories.stories.filter((_, i) => i !== idx),
    });
  };

  return (
    <div className="space-y-6">
      <div className="border-b border-[#E8E2D8] pb-4">
        <h3 className="font-serif text-xl text-[#194A37]">Act II: Listening Stories</h3>
        <p className="font-sans text-xs text-[#1F2E28]/70">
          The curated stories and monologues exploring perfection, duty, and quiet heartbreak.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Section Badge
          </label>
          <input
            type="text"
            value={listeningStories.badge}
            onChange={(e) => updateSection('listeningStories', { badge: e.target.value })}
            className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37] mb-1">
            Section Headline
          </label>
          <input
            type="text"
            value={listeningStories.headline}
            onChange={(e) => updateSection('listeningStories', { headline: e.target.value })}
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
          value={listeningStories.subtitle}
          onChange={(e) => updateSection('listeningStories', { subtitle: e.target.value })}
          className="w-full px-3 py-2 text-sm bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
        />
      </div>

      {/* Story Items */}
      <div className="space-y-4 pt-2">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#194A37]">
            Stories ({listeningStories.stories.length})
          </label>
          <button
            type="button"
            onClick={handleAddStory}
            className="flex items-center gap-1 px-3 py-1 bg-[#194A37] text-white text-xs font-medium rounded-lg hover:bg-[#0F2F23] cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Story</span>
          </button>
        </div>

        {listeningStories.stories.map((story, idx) => {
          const isExpanded = expandedIdx === idx;
          return (
            <div
              key={story.id || idx}
              className="bg-white border border-[#E8E2D8] rounded-xl overflow-hidden shadow-2xs"
            >
              <div className="flex items-center justify-between p-4 bg-[#FAF8F5] border-b border-[#E8E2D8]">
                <button
                  type="button"
                  onClick={() => setExpandedIdx(isExpanded ? -1 : idx)}
                  className="flex-1 flex items-center justify-between text-left cursor-pointer pr-4"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-[#84937D]">
                      {story.chapterNumber}
                    </span>
                    <span className="font-serif font-medium text-[#194A37] text-sm sm:text-base">
                      {story.title}
                    </span>
                  </div>
                  {isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-[#194A37]" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-[#84937D]" />
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteStory(idx)}
                  className="text-[#84937D] hover:text-[#B81617] p-1 cursor-pointer"
                  title="Delete story"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

              {isExpanded && (
                <div className="p-5 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-sans font-medium text-[#1F2E28]/80 mb-1">
                        Chapter Tag (e.g. Story I)
                      </label>
                      <input
                        type="text"
                        value={story.chapterNumber}
                        onChange={(e) => handleUpdateStory(idx, { chapterNumber: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-sans font-medium text-[#1F2E28]/80 mb-1">
                        Story Title
                      </label>
                      <input
                        type="text"
                        value={story.title}
                        onChange={(e) => handleUpdateStory(idx, { title: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-sans font-medium text-[#1F2E28]/80 mb-1">
                        Character Voice / Identity
                      </label>
                      <input
                        type="text"
                        value={story.voice}
                        onChange={(e) => handleUpdateStory(idx, { voice: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-sans font-medium text-[#1F2E28]/80 mb-1">
                        Setting / Environment
                      </label>
                      <input
                        type="text"
                        value={story.setting}
                        onChange={(e) => handleUpdateStory(idx, { setting: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-sans font-medium text-[#1F2E28]/80 mb-1">
                        Emotional Tag Badge
                      </label>
                      <input
                        type="text"
                        value={story.emotionalTag}
                        onChange={(e) => handleUpdateStory(idx, { emotionalTag: e.target.value })}
                        className="w-full px-3 py-1.5 text-xs bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans font-medium text-[#1F2E28]/80 mb-1">
                      Story Excerpt
                    </label>
                    <textarea
                      rows={4}
                      value={story.excerpt}
                      onChange={(e) => handleUpdateStory(idx, { excerpt: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-sans font-medium text-[#1F2E28]/80 mb-1">
                      Author's Philosophical Reflection
                    </label>
                    <input
                      type="text"
                      value={story.reflection}
                      onChange={(e) => handleUpdateStory(idx, { reflection: e.target.value })}
                      className="w-full px-3 py-1.5 text-xs bg-white border border-[#E8E2D8] rounded-lg focus:outline-none focus:ring-1 focus:ring-[#194A37]"
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
          onClick={() => resetSection('listeningStories')}
          className="flex items-center gap-1.5 text-xs text-[#84937D] hover:text-[#B81617] transition-colors cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Stories Defaults</span>
        </button>
      </div>
    </div>
  );
};
