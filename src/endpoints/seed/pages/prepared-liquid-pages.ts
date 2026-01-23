import type { RequiredDataFromCollectionSlug } from 'payload'
import { richText, paragraph, heading, simpleRichText, boldText, textNode, mixedParagraph } from './richtext-helpers'

// Prepared Liquid 產品頁面共用的 PageNav 配置
const preparedLiquidPageNav = (activeSlug: string) => ({
  blockType: 'pageNav' as const,
  blockName: 'Product Navigation',
  groupId: 'prepared-liquid',
  items: [
    { label: 'Egg Tart', navLink: { type: 'custom' as const, url: '/egg-tart-liquid', label: 'Egg Tart' }, isActive: activeSlug === 'egg-tart-liquid' },
    { label: 'Chawanmushi', navLink: { type: 'custom' as const, url: '/chawanmushi-liquid', label: 'Chawanmushi' }, isActive: activeSlug === 'chawanmushi-liquid' },
    { label: 'Pudding', navLink: { type: 'custom' as const, url: '/pudding-liquid', label: 'Pudding' }, isActive: activeSlug === 'pudding-liquid' },
    { label: 'Omelette', navLink: { type: 'custom' as const, url: '/omelette-liquid', label: 'Omelette' }, isActive: activeSlug === 'omelette-liquid' },
  ],
  style: 'tabs' as const,
  alignment: 'center' as const,
})

// 共用的系列介紹 - 返回區塊陣列
const seriesOverviewBlocks = (imageUrl: string, imageAlt: string) => [
  {
    blockType: 'content' as const,
    blockName: 'Series Overview',
    columns: [
      {
        size: 'full' as const,
        contentType: 'text' as const,
        richText: richText([
          heading('Customized Prepared Egg Liquid Series', 'h3'),
          paragraph('Our Customized Prepared Egg Liquid Series is developed to meet the specific needs of foodservice operators, dessert manufacturers, and OEM partners.'),
        ]),
      },
    ],
  },
  // Series Overview Image
  {
    blockType: 'mediaBlock' as const,
    blockName: 'Series Image',
    imageUrl: imageUrl,
    alt: imageAlt,
  },
  // Series Overview continuation
  {
    blockType: 'content' as const,
    blockName: 'Series Overview Continued',
    columns: [
      {
        size: 'full' as const,
        contentType: 'text' as const,
        richText: richText([
          paragraph('We provide tailor-made formulations, allowing customers to create consistent, high-quality egg-based products while improving production efficiency and reducing labor.'),
          paragraph('Through our advanced pasteurization process, strict quality control, and HACCP/ISO22000-certified facilities, each product offers safety, stability, and excellent performance for large-scale production.'),
        ]),
      },
    ],
  },
]

// 共用的 Key Features CheckList
const keyFeaturesChecklist = () => ({
  blockType: 'checkList' as const,
  blockName: 'Key Features',
  title: 'Key Features',
  icon: 'check' as const,
  columns: '1' as const,
  items: [
    { text: 'Customized formulation based on flavor, texture, sweetness, and viscosity requirements' },
    { text: 'Ready-to-use liquid base, simplifying preparation and ensuring consistent results' },
    { text: 'Pasteurized and food-safe, suitable for commercial kitchens and industrial production' },
    { text: 'Stable quality, ideal for frozen storage and long-distance distribution' },
    { text: 'Applicable for OEM/ODM development' },
  ],
})

// 共用的 Why Choose Us Feature Grid
const whyChooseUsGrid = () => ({
  blockType: 'featureGrid' as const,
  blockName: 'Why Choose Us',
  sectionLabel: 'Advantages',
  sectionTitle: 'Why Choose Chinyi Eggs?',
  columns: '4' as const,
  cardStyle: 'imageTop' as const,
  backgroundColor: 'shiro' as const,
  items: [
    {
      imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80',
      title: '46 Years of Expertise',
      description: 'Egg-processing expertise since 1981',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=400&q=80',
      title: 'Certified Manufacturing',
      description: 'HACCP & ISO 22000 certified',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=400&q=80',
      title: 'Advanced Equipment',
      description: 'Advanced pasteurization and automatic processing',
    },
    {
      imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&q=80',
      title: 'Strong R&D',
      description: 'Strong R&D capability for new product development',
    },
  ],
})

// 共用的 CTA
const productCta = () => ({
  blockType: 'cta' as const,
  blockName: 'CTA',
  richText: richText([
    heading('Interested in This Product?', 'h3'),
    paragraph('Contact us for samples, pricing, or custom formulation inquiries.'),
  ]),
  links: [{ link: { type: 'custom' as const, appearance: 'default' as const, label: 'Request Information →', url: '/contact' } }],
})

// ===== Egg Tart Liquid Page =====
export const eggTartLiquidPage = (): RequiredDataFromCollectionSlug<'pages'> => ({
  slug: 'egg-tart-liquid',
  _status: 'published',
  title: 'Egg Tart Filling Liquid Base',
  hero: { type: 'none' },
  layout: [
    // Hero
    {
      blockType: 'japaneseHero',
      blockName: 'Hero',
      label: 'Prepared Egg Liquid',
      title: 'Egg Tart Filling Liquid Base',
      subtitle: 'Ready-to-use custard liquid for professional egg tart production',
      titleFont: 'serif',
      backgroundImageUrl: 'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=1920&q=80',
      size: 'small',
      overlayOpacity: 40,
    },
    // Page Nav
    preparedLiquidPageNav('egg-tart-liquid'),
    // Series Overview with image
    ...seriesOverviewBlocks('https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80', 'Egg tart desserts'),
    // Key Features
    keyFeaturesChecklist(),
    // Product Details
    {
      blockType: 'content',
      blockName: 'Product Details',
      columns: [
        {
          size: 'full',
          contentType: 'text',
          richText: richText([
            heading('Egg Tart Filling Liquid Base', 'h3'),
            paragraph('A ready-to-use custard liquid designed for egg tart production.'),
            paragraph('Provides smooth texture, stable baking performance, and consistent color.'),
            mixedParagraph([
              boldText('Ideal for:'),
              textNode(' Bakeries, cafés, and frozen dessert manufacturers.'),
            ]),
          ]),
        },
      ],
    },
    // Applications
    {
      blockType: 'featureGrid',
      blockName: 'Applications',
      sectionLabel: 'Applications',
      sectionTitle: 'Application Examples',
      columns: '3',
      cardStyle: 'imageTop',
      backgroundColor: 'kinari',
      items: [
        {
          imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
          title: 'Egg Tart Desserts',
          description: 'Portuguese-style and Hong Kong-style egg tarts',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&q=80',
          title: 'Ready-to-eat Meals',
          description: 'Pre-packaged and frozen meal applications',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80',
          title: 'OEM/ODM',
          description: 'Private-label production partnerships',
        },
      ],
    },
    // Why Choose Us
    whyChooseUsGrid(),
    // CTA
    productCta(),
  ],
  meta: {
    title: 'Egg Tart Filling Liquid Base | Chinyi Eggs Technology',
    description: 'Ready-to-use custard liquid designed for egg tart production. Provides smooth texture, stable baking performance, and consistent color.',
  },
})

// ===== Chawanmushi Liquid Page =====
export const chawanmushiLiquidPage = (): RequiredDataFromCollectionSlug<'pages'> => ({
  slug: 'chawanmushi-liquid',
  _status: 'published',
  title: 'Chawanmushi Seasoned Liquid Base',
  hero: { type: 'none' },
  layout: [
    // Hero
    {
      blockType: 'japaneseHero',
      blockName: 'Hero',
      label: 'Prepared Egg Liquid',
      title: 'Chawanmushi Seasoned Liquid Base',
      subtitle: 'Japanese-style seasoned egg mixture for authentic chawanmushi',
      titleFont: 'serif',
      backgroundImageUrl: 'https://images.unsplash.com/photo-1540648639573-8c848de23f0a?w=1920&q=80',
      size: 'small',
      overlayOpacity: 40,
    },
    // Page Nav
    preparedLiquidPageNav('chawanmushi-liquid'),
    // Series Overview with image
    ...seriesOverviewBlocks('https://images.unsplash.com/photo-1547592180-85f173990554?w=800&q=80', 'Chawanmushi steamed egg custard'),
    // Key Features
    keyFeaturesChecklist(),
    // Product Details
    {
      blockType: 'content',
      blockName: 'Product Details',
      columns: [
        {
          size: 'full',
          contentType: 'text',
          richText: richText([
            heading('Chawanmushi Seasoned Liquid Base', 'h3'),
            paragraph('A Japanese-style seasoned egg mixture for chawanmushi.'),
            paragraph('Delivers a delicate, silky texture and authentic umami flavor.'),
            paragraph('Ideal for: Japanese restaurants, catering services, and ready-meal producers.'),
          ]),
        },
      ],
    },
    // Applications
    {
      blockType: 'featureGrid',
      blockName: 'Applications',
      sectionLabel: 'Applications',
      sectionTitle: 'Application Examples',
      columns: '3',
      cardStyle: 'imageTop',
      backgroundColor: 'kinari',
      items: [
        {
          imageUrl: 'https://images.unsplash.com/photo-1547592180-85f173990554?w=400&q=80',
          title: 'Chawanmushi',
          description: 'Traditional Japanese steamed egg custard',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=400&q=80',
          title: 'Bento Meals',
          description: 'Pre-packaged Japanese-style lunch boxes',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80',
          title: 'OEM/ODM',
          description: 'Private-label production partnerships',
        },
      ],
    },
    // Why Choose Us
    whyChooseUsGrid(),
    // CTA
    productCta(),
  ],
  meta: {
    title: 'Chawanmushi Seasoned Liquid Base | Chinyi Eggs Technology',
    description: 'Japanese-style seasoned egg mixture for chawanmushi. Delivers a delicate, silky texture and authentic umami flavor.',
  },
})

// ===== Pudding Liquid Page =====
export const puddingLiquidPage = (): RequiredDataFromCollectionSlug<'pages'> => ({
  slug: 'pudding-liquid',
  _status: 'published',
  title: 'Pudding Preparation Liquid Base',
  hero: { type: 'none' },
  layout: [
    // Hero
    {
      blockType: 'japaneseHero',
      blockName: 'Hero',
      label: 'Prepared Egg Liquid',
      title: 'Pudding Preparation Liquid Base',
      subtitle: 'Creamy pudding base with excellent setting stability',
      titleFont: 'serif',
      backgroundImageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=1920&q=80',
      size: 'small',
      overlayOpacity: 40,
    },
    // Page Nav
    preparedLiquidPageNav('pudding-liquid'),
    // Series Overview with image
    ...seriesOverviewBlocks('https://images.unsplash.com/photo-1488477181946-6428a0291777?w=800&q=80', 'Pudding dessert'),
    // Key Features
    keyFeaturesChecklist(),
    // Product Details
    {
      blockType: 'content',
      blockName: 'Product Details',
      columns: [
        {
          size: 'full',
          contentType: 'text',
          richText: richText([
            heading('Pudding Preparation Liquid Base', 'h3'),
            paragraph('A convenient pudding base offering a creamy, soft texture and excellent setting stability.'),
            paragraph('Ideal for: Dessert shops, convenience store suppliers, and frozen dessert manufacturers.'),
          ]),
        },
      ],
    },
    // Applications
    {
      blockType: 'featureGrid',
      blockName: 'Applications',
      sectionLabel: 'Applications',
      sectionTitle: 'Application Examples',
      columns: '3',
      cardStyle: 'imageTop',
      backgroundColor: 'kinari',
      items: [
        {
          imageUrl: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=400&q=80',
          title: 'Classic Pudding',
          description: 'Traditional caramel custard pudding',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?w=400&q=80',
          title: 'Convenience Store',
          description: 'Ready-to-eat packaged desserts',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80',
          title: 'OEM/ODM',
          description: 'Private-label production partnerships',
        },
      ],
    },
    // Why Choose Us
    whyChooseUsGrid(),
    // CTA
    productCta(),
  ],
  meta: {
    title: 'Pudding Preparation Liquid Base | Chinyi Eggs Technology',
    description: 'Convenient pudding base offering a creamy, soft texture and excellent setting stability for commercial production.',
  },
})

// ===== Omelette Liquid Page =====
export const omeletteLiquidPage = (): RequiredDataFromCollectionSlug<'pages'> => ({
  slug: 'omelette-liquid',
  _status: 'published',
  title: 'Omelette Preparation Liquid Base',
  hero: { type: 'none' },
  layout: [
    // Hero
    {
      blockType: 'japaneseHero',
      blockName: 'Hero',
      label: 'Prepared Egg Liquid',
      title: 'Omelette Preparation Liquid Base',
      subtitle: 'Optimized liquid egg for efficient omelette cooking',
      titleFont: 'serif',
      backgroundImageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=1920&q=80',
      size: 'small',
      overlayOpacity: 40,
    },
    // Page Nav
    preparedLiquidPageNav('omelette-liquid'),
    // Series Overview with image
    ...seriesOverviewBlocks('https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80', 'Omelette dish'),
    // Key Features
    keyFeaturesChecklist(),
    // Product Details
    {
      blockType: 'content',
      blockName: 'Product Details',
      columns: [
        {
          size: 'full',
          contentType: 'text',
          richText: richText([
            heading('Omelette Preparation Liquid Base', 'h3'),
            paragraph('A liquid egg formulation optimized for omelette preparation.'),
            paragraph('Provides rich flavor, soft texture, and efficient cooking results.'),
            paragraph('Ideal for: Breakfast chains, hotels, and institutional kitchens.'),
          ]),
        },
      ],
    },
    // Applications
    {
      blockType: 'featureGrid',
      blockName: 'Applications',
      sectionLabel: 'Applications',
      sectionTitle: 'Application Examples',
      columns: '3',
      cardStyle: 'imageTop',
      backgroundColor: 'kinari',
      items: [
        {
          imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?w=400&q=80',
          title: 'Omelettes',
          description: 'Western-style and Japanese-style omelettes',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400&q=80',
          title: 'Hotel Breakfast',
          description: 'High-volume breakfast buffet operations',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80',
          title: 'OEM/ODM',
          description: 'Private-label production partnerships',
        },
      ],
    },
    // Why Choose Us
    whyChooseUsGrid(),
    // CTA
    productCta(),
  ],
  meta: {
    title: 'Omelette Preparation Liquid Base | Chinyi Eggs Technology',
    description: 'Liquid egg formulation optimized for omelette preparation. Provides rich flavor, soft texture, and efficient cooking results.',
  },
})
