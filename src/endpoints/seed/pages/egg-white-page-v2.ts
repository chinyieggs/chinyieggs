import type { RequiredDataFromCollectionSlug } from 'payload'
import { richText, paragraph, heading } from './richtext-helpers'

// ===== Egg White Products Page (v2 — ProductCatalog block) =====
export const eggWhiteProductsPageV2 = (): RequiredDataFromCollectionSlug<'pages'> => ({
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
      backgroundImageUrl: '',
      size: 'small',
      overlayOpacity: 70,
      showDivider: true,
    },
    // Series Overview
    {
      blockType: 'sectionIntro',
      blockName: 'Series Overview',
      label: 'About',
      title: 'High-Protein Food Series',
      content: richText([
        paragraph(
          'Our High-Protein Food Series delivers the exceptional nutritional value of egg whites in convenient, ready-to-eat formats.',
        ),
        paragraph(
          "Egg whites are nature\u2019s perfect protein source \u2014 high in protein, low in fat, and easily digestible. We transform this premium ingredient into accessible products for health-conscious consumers and fitness enthusiasts.",
        ),
        paragraph(
          'All products are manufactured using our egg white expertise with strict quality standards.',
        ),
      ]),
      showDivider: true,
      textAlign: 'center',
    },
    // Product Catalog (card grid + modal)
    {
      blockType: 'productCatalog',
      blockName: 'Product Catalog',
      sectionLabel: 'Products',
      sectionTitle: 'Our Product Range',
      columns: '2',
      backgroundColor: 'shiro',
      items: [
        {
          title: 'Egg White Protein Bar',
          subtitle: 'Convenient High-Protein Snack',
          imageUrl:
            'https://images.unsplash.com/photo-1622484212850-eb596d769edc?w=800&q=80',
          description: richText([
            paragraph(
              'A convenient high-protein snack made from pure egg whites. Perfect for athletes, fitness enthusiasts, and anyone seeking a clean protein source on the go.',
            ),
            paragraph(
              'Our protein bars deliver exceptional nutritional value in a portable format, manufactured with strict quality standards.',
            ),
          ]),
          features: [
            { text: 'High protein content per serving' },
            { text: 'Low fat, low carbohydrate' },
            { text: 'No artificial preservatives' },
            { text: 'Convenient portable format' },
            { text: 'Clean ingredient list' },
          ],
          specs: [
            { label: 'Protein', value: '15g per bar' },
            { label: 'Fat', value: '<2g per bar' },
            { label: 'Format', value: 'Individually wrapped bar' },
            { label: 'Shelf Life', value: '12 months' },
            { label: 'Storage', value: 'Room temperature' },
          ],
          applicationImages: [
            {
              imageUrl:
                'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80',
              caption: 'Post-workout recovery',
            },
            {
              imageUrl:
                'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=400&q=80',
              caption: 'On-the-go nutrition',
            },
            {
              imageUrl:
                'https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?w=400&q=80',
              caption: 'Active lifestyle fuel',
            },
          ],
        },
        {
          title: 'Egg White Protein Cube',
          subtitle: 'Bite-Sized Protein Snack',
          imageUrl:
            'https://images.unsplash.com/photo-1558961363-fa8fdf82db35?w=800&q=80',
          description: richText([
            paragraph(
              'Bite-sized egg white protein cubes for easy portion control. A versatile high-protein snack that can be enjoyed anytime, anywhere.',
            ),
            paragraph(
              'Available in multiple flavors, our protein cubes offer a soft, pleasant texture that makes healthy snacking enjoyable.',
            ),
          ]),
          features: [
            { text: 'Compact cube format' },
            { text: 'Easy portion control' },
            { text: 'Soft, pleasant texture' },
            { text: 'Multiple flavor options' },
            { text: 'Resealable packaging' },
          ],
          specs: [
            { label: 'Protein', value: '10g per serving' },
            { label: 'Fat', value: '<1.5g per serving' },
            { label: 'Format', value: 'Resealable pouch' },
            { label: 'Shelf Life', value: '12 months' },
            { label: 'Storage', value: 'Room temperature' },
          ],
          applicationImages: [
            {
              imageUrl:
                'https://images.unsplash.com/photo-1447069387593-a5de0862481e?w=400&q=80',
              caption: 'Healthy aging support',
            },
            {
              imageUrl:
                'https://images.unsplash.com/photo-1518709414768-a88981a4515d?w=400&q=80',
              caption: 'Balanced nutrition',
            },
            {
              imageUrl:
                'https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?w=400&q=80',
              caption: 'Natural ingredients',
            },
          ],
        },
      ],
    },
    // CTA
    {
      blockType: 'cta',
      blockName: 'CTA',
      richText: richText([
        heading('Interested in Our Products?', 'h3'),
        paragraph(
          'Contact us for product samples, distribution inquiries, or partnership opportunities.',
        ),
      ]),
      links: [
        {
          link: {
            type: 'custom',
            appearance: 'default',
            label: 'Request Information',
            url: '/contact',
          },
        },
      ],
    },
  ],
  meta: {
    title: 'Egg White Products | Chinyi Eggs Technology',
    description:
      'High-protein egg white products including protein bars and cubes. Convenient, high-quality protein from egg whites for fitness and health.',
  },
})
