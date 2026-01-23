import type { RequiredDataFromCollectionSlug } from 'payload'
import { richText, paragraph, heading, simpleRichText } from './richtext-helpers'

// Biotech 產品頁面共用的 PageNav 配置
const biotechPageNav = (activeSlug: string) => ({
  blockType: 'pageNav' as const,
  blockName: 'Product Navigation',
  groupId: 'biotech',
  items: [
    { label: 'Hydrolyzed Membrane', navLink: { type: 'custom' as const, url: '/hydrolyzed-eggshell-membrane', label: 'Hydrolyzed Membrane' }, isActive: activeSlug === 'hydrolyzed-eggshell-membrane' },
    { label: 'Eggshell Membrane', navLink: { type: 'custom' as const, url: '/eggshell-membrane', label: 'Eggshell Membrane' }, isActive: activeSlug === 'eggshell-membrane' },
    { label: 'Calcium Powder', navLink: { type: 'custom' as const, url: '/eggshell-calcium-powder', label: 'Calcium Powder' }, isActive: activeSlug === 'eggshell-calcium-powder' },
    { label: 'Calcined Powder', navLink: { type: 'custom' as const, url: '/calcined-eggshell-powder', label: 'Calcined Powder' }, isActive: activeSlug === 'calcined-eggshell-powder' },
    { label: 'Egg Oil', navLink: { type: 'custom' as const, url: '/egg-oil', label: 'Egg Oil' }, isActive: activeSlug === 'egg-oil' },
  ],
  style: 'tabs' as const,
  alignment: 'center' as const,
})

// 共用的 CTA
const biotechCta = () => ({
  blockType: 'cta' as const,
  blockName: 'CTA',
  richText: richText([
    heading('Interested in This Product?', 'h3'),
    paragraph('Contact us for samples, specifications, or partnership inquiries.'),
  ]),
  links: [{ link: { type: 'custom' as const, appearance: 'default' as const, label: 'Request Information', url: '/contact' } }],
})

// ===== Hydrolyzed Eggshell Membrane Page =====
export const hydrolyzedEggshellMembranePage = (): RequiredDataFromCollectionSlug<'pages'> => ({
  slug: 'hydrolyzed-eggshell-membrane',
  _status: 'published',
  title: 'Hydrolyzed Eggshell Membrane',
  hero: { type: 'none' },
  layout: [
    // Hero
    {
      blockType: 'japaneseHero',
      blockName: 'Hero',
      label: 'Biotech Ingredients',
      title: 'Hydrolyzed Eggshell Membrane',
      subtitle: 'Water-soluble powder rich in collagen and elastin',
      titleFont: 'serif',
      backgroundImageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1920&q=80',
      size: 'small',
      overlayOpacity: 40,
    },
    // Page Nav
    biotechPageNav('hydrolyzed-eggshell-membrane'),
    // Series Overview
    {
      blockType: 'content',
      blockName: 'Series Overview',
      columns: [
        {
          size: 'full',
          contentType: 'text',
          richText: richText([
            heading('Biotech Ingredient Application Series', 'h3'),
            paragraph('Our Biotech Ingredient Application Series transforms egg by-products into high-value functional ingredients for use in health supplements, cosmetics, and food enrichment.'),
            paragraph('By applying advanced bioprocessing techniques, we extract and refine active components from eggshells and eggshell membranes, creating sustainable, naturally derived materials with strong market potential.'),
            paragraph('All biotech products are manufactured in certified facilities with full traceability and strict quality control.'),
          ]),
        },
      ],
    },
    // Product Details
    {
      blockType: 'content',
      blockName: 'Product Details',
      columns: [
        {
          size: 'full',
          contentType: 'text',
          richText: richText([
            heading('Hydrolyzed Eggshell Membrane', 'h3'),
            paragraph('A water-soluble eggshell membrane powder produced through enzymatic hydrolysis.'),
            paragraph('Rich in collagen, elastin, and glycosaminoglycans (including hyaluronic acid, chondroitin sulfate, and glucosamine).'),
            paragraph('Supports joint health, skin elasticity, and connective tissue.'),
          ]),
        },
      ],
    },
    // Key Components
    {
      blockType: 'checkList',
      blockName: 'Key Components',
      title: 'Key Components',
      icon: 'check' as const,
      columns: '2',
      items: [
        { text: 'Collagen (Type I, V, X)' },
        { text: 'Elastin' },
        { text: 'Hyaluronic Acid' },
        { text: 'Chondroitin Sulfate' },
        { text: 'Glucosamine' },
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
          imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80',
          title: 'Joint Health',
          description: 'Tablets, capsules, and powder formulations for joint support',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1596755389378-c31d21fd1273?w=400&q=80',
          title: 'Beauty Supplements',
          description: 'Skin elasticity and anti-aging formulations',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80',
          title: 'Cosmetics',
          description: 'Skincare products with collagen and elastin',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1544145945-f90425340c7e?w=400&q=80',
          title: 'Functional Beverages',
          description: 'Collagen drinks and health beverages',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80',
          title: 'Pet Nutrition',
          description: 'Joint support supplements for pets',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&q=80',
          title: 'OEM/ODM',
          description: 'Private-label development services',
        },
      ],
    },
    // Specifications
    {
      blockType: 'specTable',
      blockName: 'Specifications',
      title: 'Product Specifications',
      showHeaders: false,
      style: 'striped',
      rows: [
        { label: 'Form', value: 'Water-soluble powder' },
        { label: 'Color', value: 'Light yellow to off-white' },
        { label: 'Solubility', value: 'Highly soluble in water' },
        { label: 'Processing', value: 'Enzymatic hydrolysis' },
        { label: 'Storage', value: 'Cool, dry place away from light' },
      ],
    },
    // CTA
    biotechCta(),
  ],
  meta: {
    title: 'Hydrolyzed Eggshell Membrane | Chinyi Eggs Technology',
    description: 'Water-soluble eggshell membrane powder rich in collagen, elastin, and glycosaminoglycans. Supports joint health, skin elasticity, and connective tissue.',
  },
})

// ===== Eggshell Membrane Page =====
export const eggshellMembranePage = (): RequiredDataFromCollectionSlug<'pages'> => ({
  slug: 'eggshell-membrane',
  _status: 'published',
  title: 'Eggshell Membrane',
  hero: { type: 'none' },
  layout: [
    // Hero
    {
      blockType: 'japaneseHero',
      blockName: 'Hero',
      label: 'Biotech Ingredients',
      title: 'Eggshell Membrane',
      subtitle: 'Natural dried membrane with collagen and elastin',
      titleFont: 'serif',
      backgroundImageUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=1920&q=80',
      size: 'small',
      overlayOpacity: 40,
    },
    // Page Nav
    biotechPageNav('eggshell-membrane'),
    // Product Details
    {
      blockType: 'content',
      blockName: 'Product Details',
      columns: [
        {
          size: 'full',
          contentType: 'text',
          richText: richText([
            heading('Eggshell Membrane', 'h3'),
            paragraph('A natural dried eggshell membrane containing collagen, elastin, and glycosaminoglycans.'),
            paragraph('Suitable for supplements and cosmetic formulations.'),
          ]),
        },
      ],
    },
    // Content Image
    {
      blockType: 'mediaBlock',
      blockName: 'Product Image',
      imageUrl: 'https://images.unsplash.com/photo-1576086213369-97a306d36557?w=800&q=80',
      alt: 'Eggshell membrane structure',
    },
    // Key Characteristics
    {
      blockType: 'checkList',
      blockName: 'Key Characteristics',
      title: 'Key Characteristics',
      icon: 'check' as const,
      columns: '1',
      items: [
        { text: '100% natural eggshell membrane' },
        { text: 'Retains native protein structure' },
        { text: 'Rich in collagen and elastin' },
        { text: 'Contains glycosaminoglycans' },
        { text: 'Minimally processed' },
      ],
    },
    // Applications
    {
      blockType: 'featureGrid',
      blockName: 'Applications',
      sectionLabel: 'Applications',
      sectionTitle: 'Application Examples',
      columns: '4',
      cardStyle: 'imageTop',
      backgroundColor: 'kinari',
      items: [
        {
          imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80',
          title: 'Health Supplements',
          description: 'Joint and connective tissue support formulations',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&q=80',
          title: 'Cosmetics',
          description: 'Natural ingredient for skincare products',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&q=80',
          title: 'Research',
          description: 'Biomedical and material science research',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80',
          title: 'Pet Nutrition',
          description: 'Natural supplement for pet health',
        },
      ],
    },
    // Specifications
    {
      blockType: 'specTable',
      blockName: 'Specifications',
      title: 'Product Specifications',
      showHeaders: false,
      style: 'striped',
      rows: [
        { label: 'Form', value: 'Dried membrane flakes or powder' },
        { label: 'Color', value: 'Off-white to light tan' },
        { label: 'Processing', value: 'Mechanical separation, washing, drying' },
        { label: 'Storage', value: 'Cool, dry place away from light' },
      ],
    },
    // CTA
    biotechCta(),
  ],
  meta: {
    title: 'Eggshell Membrane | Chinyi Eggs Technology',
    description: 'Natural dried eggshell membrane containing collagen, elastin, and glycosaminoglycans. Suitable for supplements and cosmetic formulations.',
  },
})

// ===== Eggshell Calcium Powder Page =====
export const eggshellCalciumPowderPage = (): RequiredDataFromCollectionSlug<'pages'> => ({
  slug: 'eggshell-calcium-powder',
  _status: 'published',
  title: 'Eggshell Calcium Powder',
  hero: { type: 'none' },
  layout: [
    // Hero
    {
      blockType: 'japaneseHero',
      blockName: 'Hero',
      label: 'Biotech Ingredients',
      title: 'Eggshell Calcium Powder',
      subtitle: 'Natural calcium carbonate from eggshells',
      titleFont: 'serif',
      backgroundImageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1920&q=80',
      size: 'small',
      overlayOpacity: 40,
    },
    // Page Nav
    biotechPageNav('eggshell-calcium-powder'),
    // Product Details
    {
      blockType: 'content',
      blockName: 'Product Details',
      columns: [
        {
          size: 'full',
          contentType: 'text',
          richText: richText([
            heading('Eggshell Calcium Powder', 'h3'),
            paragraph('A natural calcium carbonate powder derived from eggshells.'),
            paragraph('Highly bioavailable calcium source for food fortification and dietary supplements.'),
          ]),
        },
      ],
    },
    // Content Image
    {
      blockType: 'mediaBlock',
      blockName: 'Product Image',
      imageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=800&q=80',
      alt: 'Natural calcium powder',
    },
    // Key Benefits
    {
      blockType: 'checkList',
      blockName: 'Key Benefits',
      title: 'Key Benefits',
      icon: 'check' as const,
      columns: '1',
      items: [
        { text: 'Natural calcium carbonate (CaCO₃)' },
        { text: 'High bioavailability' },
        { text: 'Contains trace minerals (Mg, Sr, etc.)' },
        { text: 'Fine particle size for easy mixing' },
        { text: 'Sustainable upcycled ingredient' },
      ],
    },
    // Applications
    {
      blockType: 'featureGrid',
      blockName: 'Applications',
      sectionLabel: 'Applications',
      sectionTitle: 'Application Examples',
      columns: '4',
      cardStyle: 'imageTop',
      backgroundColor: 'kinari',
      items: [
        {
          imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80',
          title: 'Calcium Supplements',
          description: 'Tablets and capsules for bone health',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
          title: 'Food Fortification',
          description: 'Calcium enrichment for baked goods and beverages',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80',
          title: 'Pet Food',
          description: 'Calcium source for pet nutrition',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&q=80',
          title: 'Agriculture',
          description: 'Soil amendment and fertilizer additive',
        },
      ],
    },
    // Specifications
    {
      blockType: 'specTable',
      blockName: 'Specifications',
      title: 'Product Specifications',
      showHeaders: false,
      style: 'striped',
      rows: [
        { label: 'Form', value: 'Fine powder' },
        { label: 'Color', value: 'White to off-white' },
        { label: 'Calcium Content', value: '~38% elemental calcium' },
        { label: 'Processing', value: 'Cleaned, dried, and milled' },
        { label: 'Storage', value: 'Cool, dry place' },
      ],
    },
    // CTA
    biotechCta(),
  ],
  meta: {
    title: 'Eggshell Calcium Powder | Chinyi Eggs Technology',
    description: 'Natural calcium carbonate powder derived from eggshells. Highly bioavailable calcium source for food fortification and dietary supplements.',
  },
})

// ===== Calcined Eggshell Powder Page =====
export const calcinedEggshellPowderPage = (): RequiredDataFromCollectionSlug<'pages'> => ({
  slug: 'calcined-eggshell-powder',
  _status: 'published',
  title: 'Calcined Eggshell Powder',
  hero: { type: 'none' },
  layout: [
    // Hero
    {
      blockType: 'japaneseHero',
      blockName: 'Hero',
      label: 'Biotech Ingredients',
      title: 'Calcined Eggshell Powder',
      subtitle: 'High-temperature treated calcium oxide powder',
      titleFont: 'serif',
      backgroundImageUrl: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=1920&q=80',
      size: 'small',
      overlayOpacity: 40,
    },
    // Page Nav
    biotechPageNav('calcined-eggshell-powder'),
    // Product Details
    {
      blockType: 'content',
      blockName: 'Product Details',
      columns: [
        {
          size: 'full',
          contentType: 'text',
          richText: richText([
            heading('Calcined Eggshell Powder', 'h3'),
            paragraph('A high-temperature treated eggshell powder converted to calcium oxide (CaO).'),
            paragraph('Used in industrial and agricultural applications requiring high reactivity.'),
          ]),
        },
      ],
    },
    // Content Image
    {
      blockType: 'mediaBlock',
      blockName: 'Product Image',
      imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&q=80',
      alt: 'Agricultural application',
    },
    // Key Characteristics
    {
      blockType: 'checkList',
      blockName: 'Key Characteristics',
      title: 'Key Characteristics',
      icon: 'check' as const,
      columns: '1',
      items: [
        { text: 'High-purity calcium oxide (CaO)' },
        { text: 'High reactivity' },
        { text: 'Alkaline pH properties' },
        { text: 'Fine particle size' },
        { text: 'Sustainable source material' },
      ],
    },
    // Applications
    {
      blockType: 'featureGrid',
      blockName: 'Applications',
      sectionLabel: 'Applications',
      sectionTitle: 'Application Examples',
      columns: '4',
      cardStyle: 'imageTop',
      backgroundColor: 'kinari',
      items: [
        {
          imageUrl: 'https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=400&q=80',
          title: 'Soil Amendment',
          description: 'pH adjustment and calcium supplementation for agriculture',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80',
          title: 'Industrial',
          description: 'Water treatment and chemical processing',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=400&q=80',
          title: 'Poultry Feed',
          description: 'Calcium source for layer hen diets',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&q=80',
          title: 'Chemical Industry',
          description: 'Reactant and neutralizing agent',
        },
      ],
    },
    // Specifications
    {
      blockType: 'specTable',
      blockName: 'Specifications',
      title: 'Product Specifications',
      showHeaders: false,
      style: 'striped',
      rows: [
        { label: 'Form', value: 'Fine powder' },
        { label: 'Color', value: 'White' },
        { label: 'Main Component', value: 'Calcium oxide (CaO)' },
        { label: 'Processing', value: 'High-temperature calcination' },
        { label: 'Storage', value: 'Sealed container, dry conditions' },
      ],
    },
    // CTA
    biotechCta(),
  ],
  meta: {
    title: 'Calcined Eggshell Powder | Chinyi Eggs Technology',
    description: 'High-temperature treated eggshell powder converted to calcium oxide. Used in industrial and agricultural applications.',
  },
})

// ===== Egg Oil Page =====
export const eggOilPage = (): RequiredDataFromCollectionSlug<'pages'> => ({
  slug: 'egg-oil',
  _status: 'published',
  title: 'Egg Oil',
  hero: { type: 'none' },
  layout: [
    // Hero
    {
      blockType: 'japaneseHero',
      blockName: 'Hero',
      label: 'Biotech Ingredients',
      title: 'Egg Oil',
      subtitle: 'Lipid-rich oil extracted from egg yolks',
      titleFont: 'serif',
      backgroundImageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=1920&q=80',
      size: 'small',
      overlayOpacity: 40,
    },
    // Page Nav
    biotechPageNav('egg-oil'),
    // Product Details
    {
      blockType: 'content',
      blockName: 'Product Details',
      columns: [
        {
          size: 'full',
          contentType: 'text',
          richText: richText([
            heading('Egg Oil', 'h3'),
            paragraph('A lipid-rich oil extracted from egg yolks.'),
            paragraph('Contains phospholipids, cholesterol, and fat-soluble vitamins (A, D, E).'),
            paragraph('Used in cosmetics and nutraceuticals for skin nourishment and health benefits.'),
          ]),
        },
      ],
    },
    // Content Image
    {
      blockType: 'mediaBlock',
      blockName: 'Product Image',
      imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
      alt: 'Skincare and cosmetics',
    },
    // Key Components
    {
      blockType: 'checkList',
      blockName: 'Key Components',
      title: 'Key Components',
      icon: 'check' as const,
      columns: '2',
      items: [
        { text: 'Phospholipids (Lecithin)' },
        { text: 'Vitamin A' },
        { text: 'Vitamin D' },
        { text: 'Vitamin E' },
        { text: 'Essential Fatty Acids' },
        { text: 'Cholesterol' },
      ],
    },
    // Applications
    {
      blockType: 'featureGrid',
      blockName: 'Applications',
      sectionLabel: 'Applications',
      sectionTitle: 'Application Examples',
      columns: '4',
      cardStyle: 'imageTop',
      backgroundColor: 'kinari',
      items: [
        {
          imageUrl: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=400&q=80',
          title: 'Skincare',
          description: 'Moisturizers, serums, and anti-aging products',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&q=80',
          title: 'Hair Care',
          description: 'Hair oils and conditioning treatments',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=400&q=80',
          title: 'Nutraceuticals',
          description: 'Soft gel capsules and supplements',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80',
          title: 'Pet Care',
          description: 'Skin and coat health supplements',
        },
      ],
    },
    // Specifications
    {
      blockType: 'specTable',
      blockName: 'Specifications',
      title: 'Product Specifications',
      showHeaders: false,
      style: 'striped',
      rows: [
        { label: 'Form', value: 'Clear to golden liquid oil' },
        { label: 'Color', value: 'Golden yellow' },
        { label: 'Extraction', value: 'Solvent-free mechanical extraction' },
        { label: 'Storage', value: 'Cool, dark place; refrigeration recommended' },
      ],
    },
    // CTA
    biotechCta(),
  ],
  meta: {
    title: 'Egg Oil | Chinyi Eggs Technology',
    description: 'A lipid-rich oil extracted from egg yolks. Contains phospholipids, cholesterol, and fat-soluble vitamins. Used in cosmetics and nutraceuticals.',
  },
})
