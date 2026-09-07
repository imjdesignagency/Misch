import { SiteCMSContent } from '../types/cms';
import {
  BOOK_INFO,
  BRAND_ESSENCE_DATA,
  VISIBLE_INVISIBLE_CONTRASTS,
  AUDIENCE_FEELINGS,
  ABOUT_THE_BOOK,
  AUTHOR_INFO,
  RESONANCE_POINTS,
  WHAT_MAKES_DIFFERENT,
  WHY_READ,
  BOOK_FORMATS,
  RETAILER_OPTIONS,
} from './bookData';

export const DEFAULT_CMS_CONTENT: SiteCMSContent = {
  site: {
    bookTitle: BOOK_INFO.title,
    bookTitleLine1: 'THE WEIGHT',
    bookTitleLine2: 'WE CARRY',
    subtitle: BOOK_INFO.subtitle,
    tagline: BOOK_INFO.tagline,
    author: BOOK_INFO.author,
    authorShort: BOOK_INFO.authorShort,
    authorTitle: 'Jamaican Attorney & Storyteller',
    brandEssence: BOOK_INFO.brandEssence,
    coreEmotionalMessage: BOOK_INFO.coreEmotionalMessage,
    masterBookCoverUrl: '',
    announcement: {
      enabled: true,
      badge: 'Official Launch',
      text: 'First edition pre-orders are now officially open with exclusive author notes.',
      linkText: 'Reserve Copy',
      linkHref: '#pre-order',
    },
  },

  hero: {
    eyebrowLabel: 'brand feel:',
    eyebrowBadge: 'The Literary Debut',
    headlineLine1: 'THE WEIGHT',
    headlineLine2: 'WE CARRY',
    authorPrefix: 'Stories by',
    quote: BOOK_INFO.subtitle,
    contrastQuote: BRAND_ESSENCE_DATA.contrastQuote,
    primaryCta: 'Pre-Order Now',
    secondaryCta: 'Read First Excerpt',
    pills: ['Emotional Depth', 'True-to-Life Resonance', 'The Silent Load', 'Grace & Release'],
    mockupImageUrl: '',
  },

  marquee: {
    items: [
      { text: 'Making the invisible visible', highlight: true },
      { text: 'You don’t have to carry it all alone', highlight: false },
      { text: 'Some of the heaviest things we carry are the things no one can see', highlight: false },
      { text: 'There is more behind the smile than people realize', highlight: true },
      { text: 'Different women • Different circumstances • Similar feelings', highlight: false },
      { text: 'Strength doesn’t mean doing everything alone', highlight: true },
      { text: 'Sometimes, being seen is the beginning of feeling lighter', highlight: false },
    ],
  },

  contrastJourney: {
    badge: 'Act I • The Core Brand Essence',
    headline: 'Making the invisible visible.',
    highlightWord: 'invisible',
    lead: BRAND_ESSENCE_DATA.lead,
    contrasts: VISIBLE_INVISIBLE_CONTRASTS,
  },

  listeningStories: {
    badge: 'Act II • Voices from the Sanctuary',
    headline: 'Different Women. Different Circumstances. Similar Feelings.',
    subtitle:
      'Listen to the inner monologues of women navigating the unspoken thresholds of perfection, duty, and quiet heartbreak.',
    stories: [
      {
        id: 'story-1',
        chapterNumber: 'Story I',
        title: 'The Architecture of "I’m Fine"',
        voice: 'A Senior Executive & Mother of Two',
        setting: 'Corporate Towers & The Commute Home',
        excerpt:
          '“She walked out of the conference room where she had just navigated a hostile audit with calm, laser-focused precision. Her colleagues congratulated her on her composure. But in the quiet elevator down to the garage, her hands began to tremble. It was not that she couldn’t do the work—it was that she couldn’t remember the last time she was allowed to be fragile without paying an insurmountable price.”',
        reflection:
          'When composure is your armor, laying it down feels like stepping unarmed into battle.',
        emotionalTag: 'Seen: “Someone understands this.”',
      },
      {
        id: 'story-2',
        chapterNumber: 'Story II',
        title: 'The Silent Ledger of Love',
        voice: 'An Eldest Daughter & Caregiver',
        setting: 'The Kitchen Table at 1:00 AM',
        excerpt:
          '“There is an unwritten ledger in families, and somehow she had inherited the pen. She remembered the medication schedules, the anniversaries of grief, the tension between siblings before words were even exchanged. She took pride in being the glue—until the evening she realized that if she dissolved, the whole table would crack.”',
        reflection:
          'Being the foundation of everyone else’s home often leaves you without a roof over your own heart.',
        emotionalTag: 'Recognized: “I’ve felt this.”',
      },
      {
        id: 'story-3',
        chapterNumber: 'Story III',
        title: 'The Weight of Becoming First',
        voice: 'A Trailblazing Young Professional',
        setting: 'Between Two Worlds',
        excerpt:
          '“Her family celebrated her degrees and appointments as collective victories. And they were. But with each rung climbed, the air grew thinner. She felt the silent, terrifying obligation to make every sacrifice of her parents worth it. To stumble was not just a personal failure; it was betraying the sacrifices of generations.”',
        reflection:
          'Carrying a lineage’s dreams is an honor that can quietly bend the spine.',
        emotionalTag: 'Reflective: “I need to think about this.”',
      },
      {
        id: 'story-4',
        chapterNumber: 'Story IV',
        title: 'The Unspoken Grief Behind the Smile',
        voice: 'A Devoted Partner & Friend',
        setting: 'Brunch on a Sunday Morning',
        excerpt:
          '“Everyone laughed at the funny anecdote about her week. She joined in, right on cue. Nobody noticed that her eyes didn’t reach the smile. How do you explain that you are grieving a version of your life that nobody else even knew was slipping away?”',
        reflection:
          'Some of the deepest losses have no funeral, no flowers, and no space on the calendar.',
        emotionalTag: 'Less Alone: “Maybe it’s not just me.”',
      },
    ],
  },

  audienceFeelings: {
    badge: 'Act III • The Resonance Spectrum',
    headline: 'How It Should Feel to Read This Book',
    subtitle:
      'This is not a book that lectures or prescribes. It is a mirror and an exhale.',
    climaxQuote:
      '“You are not broken. You are simply holding what was never meant to be carried alone.”',
    climaxSub:
      'The silent work of holding it all together is real. But somewhere in these pages, you are allowed to rest.',
    feelings: AUDIENCE_FEELINGS,
  },

  aboutBook: {
    badge: 'Act IV • The Work & The Vision',
    headline: ABOUT_THE_BOOK.headline,
    openingQuestion: ABOUT_THE_BOOK.openingQuestion,
    roles: ABOUT_THE_BOOK.roles,
    coreQuestion: ABOUT_THE_BOOK.coreQuestion,
    descriptionParagraph1: ABOUT_THE_BOOK.descriptionParagraph1,
    tryingLead: ABOUT_THE_BOOK.tryingLead,
    characteristics: ABOUT_THE_BOOK.characteristics,
    closingReflection: ABOUT_THE_BOOK.closingReflection,
    finalPithy: ABOUT_THE_BOOK.finalPithy,
    mockupImageUrl: '',
  },

  physicalEditions: {
    badge: 'The Official Mockups & Physical Editions',
    headline: 'Crafted as an Object of Healing',
    subtitle:
      'Explore the physical editions of The Weight We Carry. Every detail—from the weight of the paper to the painted cover—was chosen to offer you rest.',
    specifications: [
      'Sewn Lay-Flat Binding',
      'Woven Satin Bookmark',
      '80gsm Acid-Free Cream Paper',
      'Debossed Spine Lettering',
    ],
    mockupImages: {
      floating: '',
    },
    cards: [
      {
        id: 'floating',
        title: '3D Studio Hardcover',
        subtitle: 'Exquisite Painted Cover Artwork',
        description:
          'Features the original oil-painted portraits of women in solidarity against deep forest teal, paired with crisp crimson typography and tactile matte binding.',
        badge: 'Official Cover',
        imageUrl: '',
      },
      {
        id: 'in-hand',
        title: 'In Your Hands',
        subtitle: 'The Personal Reading Sanctuary',
        description:
          'Designed to be held intimately. Complete with a signature woven black satin bookmark ribbon, sewn lay-flat binding, and premium warm cream reading pages.',
        badge: 'Tactile Experience',
      },
      {
        id: 'stacked',
        title: 'Collector’s Release',
        subtitle: 'Forest Ground & Spine Lettering',
        description:
          'Solid archival spine carrying the gilded title and author inscription, resting proudly on your bookshelf or bedside table for years of return visits.',
        badge: 'First Printing',
      },
    ],
  },

  whoIsThisFor: {
    badge: 'Act V • Moments of Recognition',
    headline: 'This Book Was Written for You If...',
    subtitle: 'Tick the silent weights you recognize in your own journey.',
    items: RESONANCE_POINTS,
  },

  whatMakesDifferent: {
    badge: 'Act VI • The Distinct Approach',
    headline: WHAT_MAKES_DIFFERENT.headline,
    contrast: WHAT_MAKES_DIFFERENT.contrast,
    approachLead: WHAT_MAKES_DIFFERENT.approachLead,
    coreMessage: WHAT_MAKES_DIFFERENT.coreMessage,
    thePrivateRealities: WHAT_MAKES_DIFFERENT.thePrivateRealities,
    summary: WHAT_MAKES_DIFFERENT.summary,
    conclusion: WHAT_MAKES_DIFFERENT.conclusion,
    whatItIsNot: [
      { id: '1', title: 'Not generic empowerment', description: 'No empty slogans or corporate cheerleading.' },
      { id: '2', title: 'Not a motivational quote account', description: 'No superficial soundbites that ignore complex realities.' },
      { id: '3', title: 'Not a self-help brand', description: 'No 5-step checklists promising to fix your life overnight.' },
      { id: '4', title: 'Not a therapy platform', description: 'A literary space of storytelling, reflection, and mutual witness.' },
      { id: '5', title: 'Not an influencer persona', description: 'A recognizable writer and storyteller whose work resonates with women.' },
      { id: '6', title: 'Not a corporate personal-brand page', description: 'An authentic artistic sanctuary grounded in lived human truth.' },
    ],
  },

  whyRead: {
    badge: 'Act VII • Intention & Grace',
    headline: WHY_READ.headline,
    paragraph1: WHY_READ.paragraph1,
    paragraph2: WHY_READ.paragraph2,
    paragraph3: WHY_READ.paragraph3,
    transition: WHY_READ.transition,
    quotes: WHY_READ.quotes,
    invitation: WHY_READ.invitation,
    pithy: WHY_READ.pithy,
  },

  authorInfo: {
    badge: 'Act VIII • The Author & Advocate',
    name: AUTHOR_INFO.name,
    title: AUTHOR_INFO.title,
    originQuote: 'Different women. Different circumstances. Similar feelings.',
    bioParagraph1: AUTHOR_INFO.bioParagraph1,
    bioParagraph2: AUTHOR_INFO.bioParagraph2,
    bioParagraph3: AUTHOR_INFO.bioParagraph3,
    bioQuote: AUTHOR_INFO.bioQuote,
    credentialsList: [
      'Over two decades in banking, law, and corporate governance',
      'Writer of fiction and personal essays since her mid-teens',
      'Lifelong listener and advocate for women’s private truths',
      'Deeply rooted in Caribbean heritage and global legal leadership',
    ],
    imageUrl: '',
  },

  preOrder: {
    badge: 'Final Act • Step Into The Sanctuary',
    headline: 'Begin Laying the Weight Down.',
    subtitle:
      'Reserve your first-edition copy of The Weight We Carry today. Receive early digital excerpts, an invitation to the author’s private reading salon, and priority dispatch.',
    privacyNote:
      'Your email will only be used to send official launch updates and dispatch details. We treat your information as confidential.',
    formats: BOOK_FORMATS,
    retailers: RETAILER_OPTIONS,
    mockupImageUrl: '',
  },

  footer: {
    quote: '“You don’t have to carry it all alone.”',
    author: BOOK_INFO.author,
    tagline: BOOK_INFO.tagline,
    newsletterHeadline: 'Enter The Reading Sanctuary',
    newsletterSub:
      'Receive private author reflections, chapter previews, and invitations to intimate virtual readings.',
    copyright: `© ${new Date().getFullYear()} Misheca O. Seymour. All rights reserved.`,
    disclaimer:
      'A work of literary fiction rooted in collective human truth. All characters, names, and dialogues are protected.',
    contactEmail: 'contact@mishecaseymour.com',
  },
};
