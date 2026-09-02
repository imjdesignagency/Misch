import { BookTheme, ResonanceItem, BookFormat, RetailerOption } from '../types';

export const BRAND_COLORS = {
  forest: '#194A37',      // Primary Forest Green (#194A37)
  sage: '#648C82',        // Slate Teal / Sage (#648C82)
  herb: '#84937D',        // Muted Herb Green (#84937D)
  crimson: '#B81617',     // Crimson Red (#B81617)
  wine: '#7E0D09',        // Deep Burgundy / Wine (#7E0D09)
  forestDark: '#0F2F23',  // Dark Forest Shade
  cream: '#FAF8F5',       // Warm Paper Cream
  sand: '#F2EFE9',        // Sand Neutral
  linen: '#E8E2D8',       // Linen Border
  ink: '#1F2E28',         // Deep Forest Ink
};

export const BOOK_INFO = {
  title: 'THE WEIGHT WE CARRY',
  subtitle: 'Some of the heaviest things we carry are the things no one can see.',
  tagline: 'A candid collection of stories exploring the invisible pressures, expectations, fears, responsibilities, and thoughts that women carry while continuing to show up for everyone around them.',
  author: 'Misheca O. Seymour',
  authorShort: 'Misheca Seymour',
};

export const ABOUT_THE_BOOK = {
  headline: 'WE CARRY MORE THAN PEOPLE SEE.',
  openingQuestion: 'What happens when you are expected to be everything to everyone?',
  roles: [
    'The dependable friend.',
    'The loving mother.',
    'The supportive partner.',
    'The successful professional.',
    'The daughter who remembers.',
    'The woman who always seems to have it all together.'
  ],
  coreQuestion: 'Who notices what it costs to be all of these things?',
  descriptionParagraph1: 'The Weight We Carry is a collection of fictionalized stories rooted in the emotional truths of women’s lives. The stories look beyond what women manage each day to explore the private cost of managing it all: the doubts they keep to themselves, the disappointments they learn to live with, the responsibilities that go unnoticed, and the difficult choices no one else can make for them.',
  tryingLead: 'These are stories about women who are trying.',
  characteristics: [
    'Women who love deeply.',
    'Women who worry quietly.',
    'Women who make difficult choices.',
    'Women who keep showing up, even when being “strong” begins to feel like too much.'
  ],
  closingReflection: 'Their circumstances may differ from yours. Their questions may not.',
  finalPithy: 'And somewhere in these pages, you may recognise a weight you thought you carried alone.'
};

export const AUTHOR_INFO = {
  name: 'Misheca O. Seymour',
  title: 'Jamaican Attorney, Senior Compliance Executive & Writer',
  bioParagraph1: 'Misheca O. Seymour is a Jamaican attorney, senior compliance executive, and writer with more than two decades of experience in banking, law, and compliance.',
  bioParagraph2: 'She began writing stories in her mid-teens and has continued ever since, writing personal reflections and short fiction alongside her professional career.',
  bioParagraph3: 'Her debut book, The Weight We Carry, grew out of the stories women have entrusted to her over the years, as well as her own reflections on the expectations that shape women’s lives.',
  bioQuote: 'She hopes her readers will feel seen, understood, and less alone.',
};

export const RESONANCE_POINTS: ResonanceItem[] = [
  {
    id: 1,
    text: 'You’ve ever smiled and said “I’m fine” when you weren’t.'
  },
  {
    id: 2,
    text: 'You’ve ever felt responsible for everyone else’s wellbeing while wondering who was looking out for you.'
  },
  {
    id: 3,
    text: 'You’ve ever been overwhelmed by responsibilities that nobody else seemed to notice.'
  },
  {
    id: 4,
    text: 'You’ve ever been the strong one in your family, your workplace, your friendships, or your relationship.'
  },
  {
    id: 5,
    text: 'You’ve ever had thoughts you felt you couldn’t say out loud.'
  },
  {
    id: 6,
    text: 'You’ve ever looked at another woman and assumed she had everything together, without knowing what she was carrying privately.'
  },
  {
    id: 7,
    text: 'You’ve ever needed to know that someone else understands.'
  }
];

export const WHY_READ = {
  headline: 'Because Sometimes You Don’t Need Advice. You Need Recognition.',
  paragraph1: 'The Weight We Carry isn’t a guide telling women how to live their lives or a book promising to solve every problem.',
  paragraph2: 'It does something different.',
  paragraph3: 'It gives language to experiences that are often difficult to explain.',
  transition: 'As you move through the stories, you may find yourself thinking:',
  quotes: [
    '“I’ve felt this.”',
    '“I’ve thought this.”',
    '“I thought I was the only one.”'
  ],
  invitation: 'The book invites women to pause, reflect, empathize, and see themselves, and the women around them, with greater understanding.',
  pithy: 'Because sometimes, realizing that you’re not alone can make the weight feel a little lighter.'
};

export const WHAT_MAKES_DIFFERENT = {
  headline: 'The Things We Don’t Usually Talk About.',
  contrast: 'There are countless books telling women how to become stronger, more productive, more successful, or better versions of themselves.',
  approachLead: 'The Weight We Carry takes a different approach.',
  coreMessage: 'It doesn’t ask women to become more. It asks us to acknowledge what we’re already carrying.',
  thePrivateRealities: 'The stories explore the private realities behind the public image, the things that happen after the meeting, after the children are asleep, after the smile, after the “I’m okay.”',
  summary: 'It is honest, relatable, and deeply human.',
  conclusion: 'Most importantly, it creates room for women to recognize themselves in the experiences of others.'
};

export const BOOK_THEMES: BookTheme[] = [
  {
    id: 'invisible-load',
    title: 'The Invisible Load',
    description: 'The countless responsibilities women manage that rarely receive recognition.',
    iconName: 'Feather'
  },
  {
    id: 'relationships-family',
    title: 'Relationships & Family',
    description: 'The complexities of love, marriage, family, friendship, expectations, and disappointment.',
    iconName: 'HeartHandshake'
  },
  {
    id: 'career-ambition',
    title: 'Career & Ambition',
    description: 'The pressure to continue performing and showing up, even when life outside work feels overwhelming.',
    iconName: 'Briefcase'
  },
  {
    id: 'thoughts-we-keep',
    title: 'The Thoughts We Keep to Ourselves',
    description: 'The uncomfortable, complicated, and sometimes contradictory thoughts we don’t always feel safe saying aloud.',
    iconName: 'Sparkles'
  },
  {
    id: 'strength-vulnerability',
    title: 'Strength & Vulnerability',
    description: 'The realization that being strong doesn’t mean refusing help.',
    iconName: 'ShieldCheck'
  }
];

export const BOOK_FORMATS: BookFormat[] = [
  {
    id: 'hardcover',
    name: 'Hardcover Edition',
    badge: 'Hardcover',
    description: 'The complete collection of stories by Misheca O. Seymour in hardcover print.',
    features: [
      'Hardcover print edition',
      'The complete collection of stories',
      'Author notes included'
    ]
  },
  {
    id: 'paperback',
    name: 'Paperback Edition',
    badge: 'Paperback',
    description: 'The complete collection in softcover paperback edition.',
    features: [
      'Paperback print edition',
      'The complete collection of stories',
      'Convenient reading format'
    ]
  },
  {
    id: 'digital',
    name: 'Digital Edition',
    badge: 'Digital',
    description: 'Digital edition for e-readers, tablets, and mobile devices.',
    features: [
      'Instant digital delivery upon launch',
      'Compatible with Kindle, Apple Books, and ePub readers',
      'Complete story collection'
    ]
  }
];

export const RETAILER_OPTIONS: RetailerOption[] = [
  {
    name: 'Direct Pre-Order',
    type: 'Direct Order',
    badge: 'Official',
    url: '#pre-order',
    logoText: 'Direct Order'
  },
  {
    name: 'Amazon',
    type: 'Online Retailer',
    badge: 'Retailer',
    url: 'https://amazon.com',
    logoText: 'Amazon'
  },
  {
    name: 'Barnes & Noble',
    type: 'Bookstore',
    badge: 'Retailer',
    url: 'https://barnesandnoble.com',
    logoText: 'Barnes & Noble'
  },
  {
    name: 'Bookshop.org',
    type: 'Independent Bookstores',
    badge: 'Retailer',
    url: 'https://bookshop.org',
    logoText: 'Bookshop.org'
  }
];
