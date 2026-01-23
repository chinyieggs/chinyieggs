import type { RequiredDataFromCollectionSlug } from 'payload'
import { richText, paragraph, heading, simpleRichText } from './richtext-helpers'

// ===== Egg White Products Page =====
export const eggWhiteProductsPage = (): RequiredDataFromCollectionSlug<'pages'> => ({
  slug: 'egg-white-products',
  _status: 'published',
  title: 'Egg White Products',
  hero: { type: 'none' },
  layout: [
    // Hero
    {
      blockType: 'japaneseHero',
      blockName: 'Hero',
      label: 'High-Protein Foods',
      title: 'Egg White Products',
      subtitle: 'Premium protein from pure egg whites',
      titleFont: 'serif',
      backgroundImageUrl: 'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=1920&q=80',
      size: 'small',
      overlayOpacity: 40,
    },
    // Series Overview
    {
      blockType: 'content',
      blockName: 'Series Overview',
      columns: [
        {
          size: 'full',
          contentType: 'text',
          richText: richText([
            heading('High-Protein Food Series', 'h3'),
            paragraph('Our High-Protein Food Series delivers the exceptional nutritional value of egg whites in convenient, ready-to-eat formats.'),
            paragraph("Egg whites are nature's perfect protein source - high in protein, low in fat, and easily digestible. We transform this premium ingredient into accessible products for health-conscious consumers and fitness enthusiasts."),
            paragraph('All products are manufactured using our egg white expertise with strict quality standards.'),
          ]),
        },
      ],
    },
    // Egg White Bar
    {
      blockType: 'content',
      blockName: 'Egg White Protein Bar',
      columns: [
        {
          size: 'full',
          contentType: 'text',
          richText: richText([
            heading('Egg White Protein Bar', 'h3'),
            paragraph('A convenient high-protein snack made from pure egg whites.'),
            paragraph('Perfect for athletes, fitness enthusiasts, and anyone seeking a clean protein source on the go.'),
          ]),
        },
      ],
    },
    // Bar Features
    {
      blockType: 'checkList',
      blockName: 'Bar Features',
      title: 'Product Features',
      icon: 'check' as const,
      columns: '1',
      items: [
        { text: 'High protein content per serving' },
        { text: 'Low fat, low carbohydrate' },
        { text: 'No artificial preservatives' },
        { text: 'Convenient portable format' },
        { text: 'Clean ingredient list' },
      ],
    },
    // Egg White Cube
    {
      blockType: 'content',
      blockName: 'Egg White Protein Cube',
      columns: [
        {
          size: 'full',
          contentType: 'text',
          richText: richText([
            heading('Egg White Protein Cube', 'h3'),
            paragraph('Bite-sized egg white protein cubes for easy portion control.'),
            paragraph('A versatile high-protein snack that can be enjoyed anytime, anywhere.'),
          ]),
        },
      ],
    },
    // Cube Features
    {
      blockType: 'checkList',
      blockName: 'Cube Features',
      title: 'Product Features',
      icon: 'check' as const,
      columns: '1',
      items: [
        { text: 'Compact cube format' },
        { text: 'Easy portion control' },
        { text: 'Soft, pleasant texture' },
        { text: 'Multiple flavor options' },
        { text: 'Resealable packaging' },
      ],
    },
    // Why Egg White Protein
    {
      blockType: 'featureGrid',
      blockName: 'Why Egg White Protein',
      sectionLabel: 'Benefits',
      sectionTitle: 'Why Egg White Protein?',
      columns: '4',
      cardStyle: 'imageTop',
      backgroundColor: 'kinari',
      items: [
        {
          imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80',
          title: 'Complete Protein',
          description: 'Contains all essential amino acids for muscle building',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1518709414768-a88981a4515d?w=400&q=80',
          title: 'Low Fat',
          description: 'Virtually fat-free, ideal for lean diets',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=400&q=80',
          title: 'High Absorption',
          description: 'Excellent bioavailability for efficient nutrition',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&q=80',
          title: 'Natural Source',
          description: 'Clean, whole-food protein without additives',
        },
      ],
    },
    // Ideal For
    {
      blockType: 'featureGrid',
      blockName: 'Target Consumers',
      sectionLabel: 'Target Market',
      sectionTitle: 'Ideal For',
      columns: '4',
      cardStyle: 'imageTop',
      backgroundColor: 'shiro',
      items: [
        {
          imageUrl: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80',
          title: 'Fitness Enthusiasts',
          description: 'Post-workout recovery and muscle support',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80',
          title: 'Busy Professionals',
          description: 'Quick, nutritious snacks between meetings',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1447069387593-a5de0862481e?w=400&q=80',
          title: 'Active Seniors',
          description: 'Easy-to-digest protein for healthy aging',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&q=80',
          title: 'Students',
          description: 'Healthy energy for studying and activities',
        },
      ],
    },
    // CTA
    {
      blockType: 'cta',
      blockName: 'CTA',
      richText: richText([
        heading('Interested in Our Products?', 'h3'),
        paragraph('Contact us for product samples, distribution inquiries, or partnership opportunities.'),
      ]),
      links: [{ link: { type: 'custom', appearance: 'default', label: 'Request Information', url: '/contact' } }],
    },
  ],
  meta: {
    title: 'Egg White Products | Chinyi Eggs Technology',
    description: 'High-protein egg white products including protein bars and cubes. Convenient, high-quality protein from egg whites for fitness and health.',
  },
})
