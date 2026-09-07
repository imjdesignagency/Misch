import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { SiteCMSContent, CMSSectionKey } from '../types/cms';
import { DEFAULT_CMS_CONTENT } from '../data/defaultCMSContent';

interface CMSContextType {
  content: SiteCMSContent;
  updateSection: <K extends CMSSectionKey>(section: K, updates: Partial<SiteCMSContent[K]>) => void;
  updateField: <K extends CMSSectionKey, F extends keyof SiteCMSContent[K]>(
    section: K,
    field: F,
    value: SiteCMSContent[K][F]
  ) => void;
  resetSection: (section: CMSSectionKey) => void;
  resetAll: () => void;
  exportJSON: () => void;
  importJSON: (jsonString: string) => { success: boolean; error?: string };
  isCMSOpen: boolean;
  setIsCMSOpen: (open: boolean) => void;
  activeTab: CMSSectionKey | 'overview';
  setActiveTab: (tab: CMSSectionKey | 'overview') => void;
  openSectionEditor: (section: CMSSectionKey) => void;
  isQuickEditVisible: boolean;
  setIsQuickEditVisible: (visible: boolean) => void;
  lastSavedAt: Date | null;
}

const STORAGE_KEY = 'misheca_book_cms_content_v2';

const CMSContext = createContext<CMSContextType | undefined>(undefined);

const checkIsCmsUrl = (): boolean => {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.toLowerCase().replace(/\/+$/, '');
  const hash = window.location.hash.toLowerCase();
  const search = window.location.search.toLowerCase();
  return (
    path === '/cms' ||
    path.startsWith('/cms/') ||
    path === '/admin' ||
    path.startsWith('/admin/') ||
    hash === '#cms' ||
    hash.startsWith('#cms/') ||
    hash === '#admin' ||
    hash.startsWith('#admin/') ||
    search.includes('cms=') ||
    search === '?cms' ||
    search.includes('admin=') ||
    search === '?admin'
  );
};

export const CMSProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteCMSContent>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Deep merge with default to ensure any new keys exist
        return {
          ...DEFAULT_CMS_CONTENT,
          ...parsed,
          site: { ...DEFAULT_CMS_CONTENT.site, ...(parsed.site || {}) },
          hero: {
            ...DEFAULT_CMS_CONTENT.hero,
            ...(parsed.hero || {}),
            mockupImageUrl: parsed.hero?.mockupImageUrl ?? DEFAULT_CMS_CONTENT.hero.mockupImageUrl,
          },
          marquee: { ...DEFAULT_CMS_CONTENT.marquee, ...(parsed.marquee || {}) },
          contrastJourney: { ...DEFAULT_CMS_CONTENT.contrastJourney, ...(parsed.contrastJourney || {}) },
          listeningStories: { ...DEFAULT_CMS_CONTENT.listeningStories, ...(parsed.listeningStories || {}) },
          audienceFeelings: { ...DEFAULT_CMS_CONTENT.audienceFeelings, ...(parsed.audienceFeelings || {}) },
          aboutBook: {
            ...DEFAULT_CMS_CONTENT.aboutBook,
            ...(parsed.aboutBook || {}),
            mockupImageUrl: parsed.aboutBook?.mockupImageUrl ?? DEFAULT_CMS_CONTENT.aboutBook.mockupImageUrl,
          },
          physicalEditions: {
            ...DEFAULT_CMS_CONTENT.physicalEditions,
            ...(parsed.physicalEditions || {}),
            mockupImages: {
              ...DEFAULT_CMS_CONTENT.physicalEditions.mockupImages,
              ...(parsed.physicalEditions?.mockupImages || {}),
            },
            cards: (parsed.physicalEditions?.cards || DEFAULT_CMS_CONTENT.physicalEditions.cards).map(
              (card: any, idx: number) => ({
                ...(DEFAULT_CMS_CONTENT.physicalEditions.cards[idx] || {}),
                ...card,
              })
            ),
          },
          whoIsThisFor: { ...DEFAULT_CMS_CONTENT.whoIsThisFor, ...(parsed.whoIsThisFor || {}) },
          whatMakesDifferent: { ...DEFAULT_CMS_CONTENT.whatMakesDifferent, ...(parsed.whatMakesDifferent || {}) },
          whyRead: { ...DEFAULT_CMS_CONTENT.whyRead, ...(parsed.whyRead || {}) },
          authorInfo: {
            ...DEFAULT_CMS_CONTENT.authorInfo,
            ...(parsed.authorInfo || {}),
            imageUrl: parsed.authorInfo?.imageUrl ?? DEFAULT_CMS_CONTENT.authorInfo.imageUrl,
          },
          preOrder: {
            ...DEFAULT_CMS_CONTENT.preOrder,
            ...(parsed.preOrder || {}),
            mockupImageUrl: parsed.preOrder?.mockupImageUrl ?? DEFAULT_CMS_CONTENT.preOrder.mockupImageUrl,
          },
          footer: { ...DEFAULT_CMS_CONTENT.footer, ...(parsed.footer || {}) },
        };
      }
    } catch (e) {
      console.warn('Failed to parse CMS content from localStorage', e);
    }
    return DEFAULT_CMS_CONTENT;
  });

  const [isCMSOpen, setIsCMSOpenState] = useState<boolean>(() => checkIsCmsUrl());
  const [activeTab, setActiveTab] = useState<CMSSectionKey | 'overview'>('overview');
  const [isQuickEditVisible, setIsQuickEditVisible] = useState<boolean>(false);
  const [lastSavedAt, setLastSavedAt] = useState<Date | null>(null);

  // Sync state with browser URL navigation
  useEffect(() => {
    const handleUrlChange = () => {
      setIsCMSOpenState(checkIsCmsUrl());
    };
    window.addEventListener('popstate', handleUrlChange);
    window.addEventListener('hashchange', handleUrlChange);
    return () => {
      window.removeEventListener('popstate', handleUrlChange);
      window.removeEventListener('hashchange', handleUrlChange);
    };
  }, []);

  const setIsCMSOpen = useCallback((open: boolean) => {
    setIsCMSOpenState(open);
    if (typeof window === 'undefined') return;
    if (open) {
      if (!checkIsCmsUrl()) {
        window.history.pushState({}, '', '/cms');
      }
    } else {
      if (
        window.location.pathname.toLowerCase().startsWith('/cms') ||
        window.location.pathname.toLowerCase().startsWith('/admin')
      ) {
        window.history.pushState({}, '', '/');
      } else if (
        window.location.hash.toLowerCase().includes('cms') ||
        window.location.hash.toLowerCase().includes('admin')
      ) {
        window.history.pushState({}, '', window.location.pathname + window.location.search);
      } else if (
        window.location.search.toLowerCase().includes('cms') ||
        window.location.search.toLowerCase().includes('admin')
      ) {
        const url = new URL(window.location.href);
        url.searchParams.delete('cms');
        url.searchParams.delete('admin');
        window.history.pushState({}, '', url.pathname);
      }
    }
  }, []);

  // Auto-save to localStorage whenever content changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
      setLastSavedAt(new Date());
    } catch (e) {
      console.error('Failed to save CMS state to localStorage', e);
    }
  }, [content]);

  const updateSection = useCallback(
    <K extends CMSSectionKey>(section: K, updates: Partial<SiteCMSContent[K]>) => {
      setContent((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          ...updates,
        },
      }));
    },
    []
  );

  const updateField = useCallback(
    <K extends CMSSectionKey, F extends keyof SiteCMSContent[K]>(
      section: K,
      field: F,
      value: SiteCMSContent[K][F]
    ) => {
      setContent((prev) => ({
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value,
        },
      }));
    },
    []
  );

  const resetSection = useCallback((section: CMSSectionKey) => {
    setContent((prev) => ({
      ...prev,
      [section]: JSON.parse(JSON.stringify(DEFAULT_CMS_CONTENT[section])),
    }));
  }, []);

  const resetAll = useCallback(() => {
    if (window.confirm('Are you sure you want to reset all content back to defaults? Any unsaved edits will be cleared.')) {
      setContent(JSON.parse(JSON.stringify(DEFAULT_CMS_CONTENT)));
      localStorage.removeItem(STORAGE_KEY);
    }
  }, []);

  const exportJSON = useCallback(() => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(content, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `the-weight-we-carry-content-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  }, [content]);

  const importJSON = useCallback((jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (!parsed || typeof parsed !== 'object') {
        return { success: false, error: 'Invalid JSON format.' };
      }
      setContent((prev) => ({
        ...prev,
        ...parsed,
      }));
      return { success: true };
    } catch (err: any) {
      return { success: false, error: err?.message || 'Failed to parse JSON string.' };
    }
  }, []);

  const openSectionEditor = useCallback((section: CMSSectionKey) => {
    setActiveTab(section);
    setIsCMSOpen(true);
  }, []);

  return (
    <CMSContext.Provider
      value={{
        content,
        updateSection,
        updateField,
        resetSection,
        resetAll,
        exportJSON,
        importJSON,
        isCMSOpen,
        setIsCMSOpen,
        activeTab,
        setActiveTab,
        openSectionEditor,
        isQuickEditVisible,
        setIsQuickEditVisible,
        lastSavedAt,
      }}
    >
      {children}
    </CMSContext.Provider>
  );
};

export const useCMS = (): CMSContextType => {
  const context = useContext(CMSContext);
  if (!context) {
    throw new Error('useCMS must be used within a CMSProvider');
  }
  return context;
};
