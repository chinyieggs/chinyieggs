import type { RequiredDataFromCollectionSlug } from 'payload'
import { richText, paragraph, heading, boldText, textNode, mixedParagraph } from './richtext-helpers'

type Direction = 'ltr' | 'rtl' | null
type Format = '' | 'left' | 'start' | 'center' | 'right' | 'end' | 'justify'

export const homePage = (): RequiredDataFromCollectionSlug<'pages'> => {
  return {
    slug: 'home',
    _status: 'published',
    title: 'Home',
    hero: {
      type: 'none',
    },
    layout: [
      // Japanese Hero - homepage uses 'sans' font for title, hero-small = 50vh
      {
        blockType: 'japaneseHero',
        blockName: 'Hero Section',
        label: '',
        title: '',
        subtitle: '',
        titleFont: 'sans',
        backgroundImageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=1920&q=80',
        size: 'origin',
        overlayOpacity: 0,
        showDivider: false,
      },
      // About Section - SectionIntro Block
      {
        blockType: 'sectionIntro',
        blockName: 'About Section',
        label: 'About',
        title: 'A Legacy of Excellence',
        showDivider: true,
        textAlign: 'center',
        content: richText([
          paragraph("In the 1980s, as Taiwan's economy took off and incomes rose, consumer industries blossomed—bakeries needed eggs, food processors needed eggs, the restaurant industry needed eggs—and the market demand for egg products surged."),
          mixedParagraph([
            textNode('To meet market demand and raise the standard of Taiwan\'s egg industry, Co-Founder & Chairman Ku Rong-Hai and Co-Founder Ku Hong-Lin established Chinyi Egg Products on '),
            boldText('October 25, 1981'),
            textNode(' as Taiwan\'s first specialized liquid egg company.'),
          ]),
        ]),
        ctaLabel: 'Learn More →',
        ctaLink: '/about',
      },
      // Stats Grid
      {
        blockType: 'statsGrid',
        blockName: 'Company Stats',
        items: [
          { number: '46+', label: 'Years' },
          { number: '80+', label: 'Vehicles' },
          { number: '#1', label: 'Market Share' },
          { number: '100K', label: 'Class Cleanroom' },
        ],
        backgroundColor: 'kinari',
        columns: '4',
      },
      // Product Grid
      {
        blockType: 'productGrid',
        blockName: 'Product Lines',
        sectionLabel: 'Products',
        sectionTitle: 'Our Product Lines',
        items: [
          {
            imageUrl: '',
            title: 'Prepared Egg Liquid',
            subtitle: '',
            description: 'Customized ready-to-use liquid bases for egg tarts, chawanmushi, pudding, and omelettes.',
            productLink: {
              type: 'custom',
              url: '/egg-tart-liquid',
              label: 'View Products →',
            },
          },
          {
            imageUrl: '',
            title: 'Biotech Ingredients',
            subtitle: '',
            description: 'High-value functional ingredients from eggshells and membranes for supplements and cosmetics.',
            productLink: {
              type: 'custom',
              url: '/hydrolyzed-eggshell-membrane',
              label: 'View Products →',
            },
          },
          {
            imageUrl: '',
            title: 'High-Protein Foods',
            subtitle: '',
            description: 'Convenient egg white bars and cubes for fitness enthusiasts and foodservice operations.',
            productLink: {
              type: 'custom',
              url: '/egg-white-products',
              label: 'View Products →',
            },
          },
        ],
        columns: '3',
      },
      // Certification Grid
      {
        blockType: 'certificationGrid',
        blockName: 'Quality Certifications',
        sectionLabel: 'Quality',
        sectionTitle: 'Certified Excellence',
        description: 'Our production facilities are HACCP and ISO 22000 certified, featuring a 100,000-class cleanroom and advanced pasteurization equipment imported from Denmark.',
        items: [
          { name: 'HACCP' },
          { name: 'ISO 22000' },
          { name: 'CAS' },
          { name: 'HALAL' },
        ],
        backgroundColor: 'kinari',
      },
      // CTA
      {
        blockType: 'cta',
        blockName: 'Contact CTA',
        richText: richText([
          heading('Interested in Our Products?', 'h3'),
          paragraph('Contact us for samples, pricing, or partnership opportunities.'),
        ]),
        links: [
          {
            link: {
              type: 'custom',
              appearance: 'default',
              label: 'Get in Touch →',
              url: '/contact',
            },
          },
        ],
      },
    ],
    meta: {
      title: "Chinyi Eggs Technology | Taiwan's Leading Egg Products Brand",
      description: "Chinyi Eggs - Taiwan's most trusted egg products company since 1981. Specializing in pasteurized liquid eggs, biotech ingredients, and high-protein foods.",
    },
  }
}
