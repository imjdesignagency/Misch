import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Download,
  Upload,
  RotateCcw,
  Sparkles,
  BookOpen,
  Feather,
  Layers,
  Heart,
  HelpCircle,
  Shield,
  Coffee,
  User,
  ShoppingBag,
  Globe,
  Sliders,
  Check,
  ChevronRight,
  Maximize2,
  Minimize2,
  FileJson,
  Eye,
  Cloud,
} from 'lucide-react';
import { useCMS } from '../../context/CMSContext';
import { CMSSectionKey } from '../../types/cms';

import { GlobalBrandTab } from './tabs/GlobalBrandTab';
import { HeroTab } from './tabs/HeroTab';
import { MarqueeTab } from './tabs/MarqueeTab';
import { ContrastJourneyTab } from './tabs/ContrastJourneyTab';
import { ListeningStoriesTab } from './tabs/ListeningStoriesTab';
import { AudienceFeelingsTab } from './tabs/AudienceFeelingsTab';
import { AboutBookTab } from './tabs/AboutBookTab';
import { PhysicalEditionsTab } from './tabs/PhysicalEditionsTab';
import { WhoIsThisForTab } from './tabs/WhoIsThisForTab';
import { WhatMakesDifferentTab } from './tabs/WhatMakesDifferentTab';
import { WhyReadTab } from './tabs/WhyReadTab';
import { AuthorInfoTab } from './tabs/AuthorInfoTab';
import { PreOrderTab } from './tabs/PreOrderTab';
import { FooterTab } from './tabs/FooterTab';

interface NavItem {
  id: CMSSectionKey | 'overview';
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  tag?: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: 'overview', label: 'Studio Overview', icon: Sliders, tag: 'Hub' },
  { id: 'site', label: 'Site & Brand', icon: Globe },
  { id: 'hero', label: 'Hero Header', icon: Sparkles },
  { id: 'marquee', label: 'Flowing Marquee', icon: Feather },
  { id: 'contrastJourney', label: 'Act I: Contrast', icon: Layers },
  { id: 'listeningStories', label: 'Act II: Stories', icon: BookOpen, tag: '4' },
  { id: 'audienceFeelings', label: 'Act III: Feelings', icon: Heart, tag: '7' },
  { id: 'aboutBook', label: 'Act IV: About Book', icon: BookOpen },
  { id: 'physicalEditions', label: 'Physical Editions', icon: Layers, tag: '3D' },
  { id: 'whoIsThisFor', label: 'Act V: Who Is This For', icon: HelpCircle },
  { id: 'whatMakesDifferent', label: 'Act VI: Distinct Approach', icon: Shield },
  { id: 'whyRead', label: 'Act VII: Why Read', icon: Coffee },
  { id: 'authorInfo', label: 'Act VIII: Author Bio', icon: User },
  { id: 'preOrder', label: 'Pre-Order Formats', icon: ShoppingBag },
  { id: 'footer', label: 'Footer & Legal', icon: Globe },
];

export const CMSStudio: React.FC = () => {
  const {
    isCMSOpen,
    setIsCMSOpen,
    activeTab,
    setActiveTab,
    exportJSON,
    importJSON,
    resetAll,
    content,
    lastSavedAt,
    isCloudSynced,
    syncToCloudNow,
  } = useCMS();

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isSyncing, setIsSyncing] = useState(false);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importText, setImportText] = useState('');
  const [importStatus, setImportStatus] = useState<{ success?: boolean; msg?: string } | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleManualSync = async () => {
    setIsSyncing(true);
    await syncToCloudNow();
    setTimeout(() => setIsSyncing(false), 600);
  };

  if (!isCMSOpen) return null;

  const handleImportSubmit = () => {
    if (!importText.trim()) return;
    const res = importJSON(importText);
    if (res.success) {
      setImportStatus({ success: true, msg: 'Content imported successfully!' });
      setTimeout(() => {
        setShowImportModal(false);
        setImportStatus(null);
        setImportText('');
      }, 1000);
    } else {
      setImportStatus({ success: false, msg: res.error || 'Failed to import JSON.' });
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        const text = event.target?.result as string;
        setImportText(text);
      };
      reader.readAsText(file);
    }
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-2 sm:p-4 md:p-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className={`bg-[#FAF8F5] text-[#1F2E28] rounded-2xl sm:rounded-3xl shadow-2xl border border-[#E8E2D8] flex flex-col overflow-hidden transition-all duration-300 ${
            isFullscreen
              ? 'w-full h-full rounded-none'
              : 'w-full max-w-6xl h-[92vh]'
          }`}
        >
          {/* Top Control Bar */}
          <div className="px-5 py-3.5 bg-[#0F2F23] text-white border-b border-white/10 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF8585] animate-pulse" />
              <div>
                <h2 className="font-serif text-base sm:text-lg text-white font-medium flex items-center gap-2">
                  <span>The Weight We Carry</span>
                  <span className="font-sans text-[10px] uppercase font-bold tracking-widest px-2 py-0.5 rounded bg-white/10 text-[#FAF8F5]">
                    CMS Studio
                  </span>
                </h2>
                <p className="text-[11px] font-sans text-[#A3C2B6] hidden sm:block">
                  Live in-browser content editor • Edits synchronize automatically
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {/* Cloud Sync Status Badge */}
              <button
                type="button"
                onClick={handleManualSync}
                title={isCloudSynced ? "Synchronized with Firestore Cloud Database across all devices" : "Click to force sync to Cloud"}
                className={`hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-sans font-medium transition-all cursor-pointer border ${
                  isCloudSynced
                    ? 'bg-[#194A37]/60 text-[#A3C2B6] border-[#A3C2B6]/30 hover:bg-[#194A37]'
                    : 'bg-[#B81617]/40 text-[#FFC2C2] border-[#FF8585]/30 hover:bg-[#B81617]/60'
                }`}
              >
                <Cloud className={`w-3.5 h-3.5 ${isSyncing ? 'animate-bounce text-white' : isCloudSynced ? 'text-[#52BA82]' : 'text-[#FF8585]'}`} />
                <span>{isSyncing ? 'Syncing...' : isCloudSynced ? 'Cloud Synced' : 'Sync to Cloud'}</span>
              </button>

              {/* View Live Site button */}
              <button
                type="button"
                onClick={() => setIsCMSOpen(false)}
                title="View the live public website"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-[#FAF8F5] hover:bg-white text-[#194A37] text-xs font-sans font-semibold rounded-lg shadow-sm border border-white/20 transition-all cursor-pointer mr-1"
              >
                <Eye className="w-3.5 h-3.5 text-[#194A37]" />
                <span>View Live Site</span>
              </button>

              {/* Export JSON Button */}
              <button
                type="button"
                onClick={exportJSON}
                title="Export all content as a JSON file"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs font-sans rounded-lg border border-white/10 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#A3C2B6]" />
                <span className="hidden md:inline">Export JSON</span>
              </button>

              {/* Import JSON Button */}
              <button
                type="button"
                onClick={() => setShowImportModal(true)}
                title="Import content from JSON"
                className="flex items-center gap-1.5 px-3 py-1.5 bg-white/10 hover:bg-white/20 text-xs font-sans rounded-lg border border-white/10 transition-colors cursor-pointer"
              >
                <Upload className="w-3.5 h-3.5 text-[#A3C2B6]" />
                <span className="hidden md:inline">Import JSON</span>
              </button>

              {/* Reset All */}
              <button
                type="button"
                onClick={resetAll}
                title="Reset all content to original defaults"
                className="p-2 text-white/70 hover:text-[#FF8585] hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              {/* Fullscreen Toggle */}
              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer hidden sm:block"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>

              {/* Close Studio */}
              <button
                type="button"
                onClick={() => setIsCMSOpen(false)}
                className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer ml-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body: Sidebar + Main Tab View */}
          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar Navigation */}
            <div className="w-56 sm:w-64 bg-[#F5EFEB] border-r border-[#E8E2D8] flex flex-col shrink-0 overflow-y-auto p-3 space-y-1">
              <span className="text-[10px] uppercase tracking-widest font-sans font-bold text-[#84937D] px-3 py-2">
                Landing Page Sections
              </span>
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-left text-xs font-sans font-medium transition-all cursor-pointer ${
                      isActive
                        ? 'bg-[#194A37] text-white shadow-md'
                        : 'text-[#1F2E28] hover:bg-[#EAE4DC]'
                    }`}
                  >
                    <div className="flex items-center gap-2.5 truncate">
                      <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-[#FF8585]' : 'text-[#648C82]'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>
                    {item.tag && (
                      <span
                        className={`text-[10px] px-1.5 py-0.2 rounded font-mono ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-[#E8E2D8] text-[#1F2E28]/70'
                        }`}
                      >
                        {item.tag}
                      </span>
                    )}
                  </button>
                );
              })}

              <div className="mt-auto pt-6 px-3">
                <div className="p-3 bg-white/80 rounded-xl border border-[#E8E2D8] text-[11px] text-[#1F2E28]/70 space-y-1">
                  <div className="flex items-center gap-1 text-[#194A37] font-semibold">
                    <Check className="w-3.5 h-3.5 text-[#194A37]" />
                    <span>Auto-Saving Active</span>
                  </div>
                  <p className="text-[10px] text-[#84937D]">
                    {lastSavedAt
                      ? `Saved at ${lastSavedAt.toLocaleTimeString()}`
                      : 'Saved to local storage'}
                  </p>
                </div>
              </div>
            </div>

            {/* Main Content Pane */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-8 bg-white/70">
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="border-b border-[#E8E2D8] pb-4">
                    <h3 className="font-serif text-2xl text-[#194A37]">CMS Studio Overview</h3>
                    <p className="font-sans text-xs text-[#1F2E28]/70 mt-1">
                      Welcome to the full-site content manager. You can edit every title, story, reflection, and badge across all 14 sections. Select any card below to edit that section.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {NAV_ITEMS.filter((i) => i.id !== 'overview').map((item) => {
                      const Icon = item.icon;
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => setActiveTab(item.id)}
                          className="p-4 bg-white hover:bg-[#FAF8F5] border border-[#E8E2D8] hover:border-[#194A37] rounded-2xl text-left shadow-2xs hover:shadow-md transition-all group cursor-pointer flex flex-col justify-between h-32"
                        >
                          <div className="flex items-center justify-between w-full">
                            <div className="w-8 h-8 rounded-xl bg-[#194A37]/10 flex items-center justify-center text-[#194A37] group-hover:bg-[#194A37] group-hover:text-white transition-colors">
                              <Icon className="w-4 h-4" />
                            </div>
                            <ChevronRight className="w-4 h-4 text-[#84937D] group-hover:translate-x-1 transition-transform" />
                          </div>
                          <div>
                            <h4 className="font-serif text-sm font-semibold text-[#194A37]">
                              {item.label}
                            </h4>
                            <p className="text-[11px] text-[#84937D] mt-0.5">Click to customize text & copy</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {activeTab === 'site' && <GlobalBrandTab />}
              {activeTab === 'hero' && <HeroTab />}
              {activeTab === 'marquee' && <MarqueeTab />}
              {activeTab === 'contrastJourney' && <ContrastJourneyTab />}
              {activeTab === 'listeningStories' && <ListeningStoriesTab />}
              {activeTab === 'audienceFeelings' && <AudienceFeelingsTab />}
              {activeTab === 'aboutBook' && <AboutBookTab />}
              {activeTab === 'physicalEditions' && <PhysicalEditionsTab />}
              {activeTab === 'whoIsThisFor' && <WhoIsThisForTab />}
              {activeTab === 'whatMakesDifferent' && <WhatMakesDifferentTab />}
              {activeTab === 'whyRead' && <WhyReadTab />}
              {activeTab === 'authorInfo' && <AuthorInfoTab />}
              {activeTab === 'preOrder' && <PreOrderTab />}
              {activeTab === 'footer' && <FooterTab />}
            </div>
          </div>
        </motion.div>

        {/* Import JSON Modal */}
        {showImportModal && (
          <div className="fixed inset-0 z-60 flex items-center justify-center bg-black/70 backdrop-blur-md p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 border border-[#E8E2D8] shadow-2xl">
              <div className="flex items-center justify-between border-b border-[#E8E2D8] pb-3">
                <div className="flex items-center gap-2">
                  <FileJson className="w-5 h-5 text-[#194A37]" />
                  <h3 className="font-serif text-lg text-[#194A37]">Import Content JSON</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setShowImportModal(false)}
                  className="p-1 text-[#84937D] hover:text-[#1F2E28]"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <p className="text-xs text-[#1F2E28]/80 leading-relaxed">
                Paste your exported JSON configuration below or upload a JSON file to update all site copy instantly.
              </p>

              <div>
                <input
                  type="file"
                  accept=".json"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full py-2 bg-[#FAF8F5] border border-dashed border-[#84937D] rounded-xl text-xs text-[#194A37] font-medium hover:bg-[#F2EFE9] flex items-center justify-center gap-2 cursor-pointer mb-3"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose JSON File From Computer</span>
                </button>

                <textarea
                  rows={6}
                  placeholder="Or paste JSON string here..."
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  className="w-full p-3 font-mono text-xs bg-[#FAF8F5] border border-[#E8E2D8] rounded-xl focus:outline-none focus:ring-1 focus:ring-[#194A37]"
                />
              </div>

              {importStatus && (
                <div
                  className={`p-2.5 rounded-lg text-xs font-sans ${
                    importStatus.success
                      ? 'bg-green-50 text-green-800 border border-green-200'
                      : 'bg-red-50 text-red-800 border border-red-200'
                  }`}
                >
                  {importStatus.msg}
                </div>
              )}

              <div className="flex justify-end gap-2 pt-2 border-t border-[#E8E2D8]">
                <button
                  type="button"
                  onClick={() => setShowImportModal(false)}
                  className="px-4 py-2 text-xs font-medium text-[#84937D] hover:text-[#1F2E28] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleImportSubmit}
                  className="px-4 py-2 bg-[#194A37] hover:bg-[#0F2F23] text-white text-xs font-medium rounded-lg shadow-sm cursor-pointer"
                >
                  Apply JSON
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AnimatePresence>
  );
};
