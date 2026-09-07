import { BookFormat, RetailerOption } from '../types';

export interface MarqueeItem {
  text: string;
  highlight: boolean;
}

export interface ContrastItem {
  id: string;
  archetype: string;
  context: string;
  visible: {
    tag: string;
    title: string;
    description: string;
    quote: string;
  };
  invisible: {
    tag: string;
    title: string;
    description: string;
    quote: string;
  };
}

export interface StoryCMSItem {
  id: string;
  chapterNumber: string;
  title: string;
  voice: string;
  setting: string;
  excerpt: string;
  reflection: string;
  emotionalTag: string;
}

export interface FeelingCMSItem {
  feeling: string;
  internalVoice: string;
  description: string;
  color: string;
}

export interface NotItem {
  id: string;
  title: string;
  description: string;
}

export interface MockupCardCMS {
  id: 'floating' | 'in-hand' | 'stacked';
  title: string;
  subtitle: string;
  description: string;
  badge: string;
  imageUrl?: string;
}

export interface SiteCMSContent {
  site: {
    bookTitle: string;
    bookTitleLine1: string;
    bookTitleLine2: string;
    subtitle: string;
    tagline: string;
    author: string;
    authorShort: string;
    authorTitle: string;
    brandEssence: string;
    coreEmotionalMessage: string;
    masterBookCoverUrl?: string;
    announcement: {
      enabled: boolean;
      badge: string;
      text: string;
      linkText: string;
      linkHref: string;
    };
  };

  hero: {
    eyebrowLabel: string;
    eyebrowBadge: string;
    headlineLine1: string;
    headlineLine2: string;
    authorPrefix: string;
    quote: string;
    contrastQuote: string;
    primaryCta: string;
    secondaryCta: string;
    pills: string[];
    mockupImageUrl?: string;
  };

  marquee: {
    items: MarqueeItem[];
  };

  contrastJourney: {
    badge: string;
    headline: string;
    highlightWord: string;
    lead: string;
    contrasts: ContrastItem[];
  };

  listeningStories: {
    badge: string;
    headline: string;
    subtitle: string;
    stories: StoryCMSItem[];
  };

  audienceFeelings: {
    badge: string;
    headline: string;
    subtitle: string;
    climaxQuote: string;
    climaxSub: string;
    feelings: FeelingCMSItem[];
  };

  aboutBook: {
    badge: string;
    headline: string;
    openingQuestion: string;
    roles: string[];
    coreQuestion: string;
    descriptionParagraph1: string;
    tryingLead: string;
    characteristics: string[];
    closingReflection: string;
    finalPithy: string;
    mockupImageUrl?: string;
  };

  physicalEditions: {
    badge: string;
    headline: string;
    subtitle: string;
    specifications: string[];
    cards: MockupCardCMS[];
    mockupImages?: {
      floating?: string;
      'in-hand'?: string;
      stacked?: string;
    };
  };

  whoIsThisFor: {
    badge: string;
    headline: string;
    subtitle: string;
    items: { id: number; text: string }[];
  };

  whatMakesDifferent: {
    badge: string;
    headline: string;
    contrast: string;
    approachLead: string;
    coreMessage: string;
    thePrivateRealities: string;
    summary: string;
    conclusion: string;
    whatItIsNot: NotItem[];
  };

  whyRead: {
    badge: string;
    headline: string;
    paragraph1: string;
    paragraph2: string;
    paragraph3: string;
    transition: string;
    quotes: string[];
    invitation: string;
    pithy: string;
  };

  authorInfo: {
    badge: string;
    name: string;
    title: string;
    originQuote: string;
    bioParagraph1: string;
    bioParagraph2: string;
    bioParagraph3: string;
    bioQuote: string;
    credentialsList: string[];
    imageUrl?: string;
  };

  preOrder: {
    badge: string;
    headline: string;
    subtitle: string;
    privacyNote: string;
    formats: BookFormat[];
    retailers: RetailerOption[];
    mockupImageUrl?: string;
  };

  footer: {
    quote: string;
    author: string;
    tagline: string;
    newsletterHeadline: string;
    newsletterSub: string;
    copyright: string;
    disclaimer: string;
    contactEmail: string;
  };
}

export type CMSSectionKey = keyof SiteCMSContent;
