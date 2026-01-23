import type { RequiredDataFromCollectionSlug } from 'payload'
import { richText, paragraph, heading, simpleRichText, boldText, textNode, mixedParagraph, italicText } from './richtext-helpers'

// 公司頁面共用的 PageNav 配置
const companyPageNav = (activeSlug: string) => ({
  blockType: 'pageNav' as const,
  blockName: 'Company Navigation',
  groupId: 'company',
  items: [
    { label: 'About', navLink: { type: 'custom' as const, url: '/about', label: 'About' }, isActive: activeSlug === 'about' },
    { label: 'Milestones', navLink: { type: 'custom' as const, url: '/milestones', label: 'Milestones' }, isActive: activeSlug === 'milestones' },
    { label: 'Quality Control', navLink: { type: 'custom' as const, url: '/quality-control', label: 'Quality Control' }, isActive: activeSlug === 'quality-control' },
    { label: 'Factory Tour', navLink: { type: 'custom' as const, url: '/factory-tour', label: 'Factory Tour' }, isActive: activeSlug === 'factory-tour' },
  ],
  style: 'tabs' as const,
  alignment: 'center' as const,
})

// ===== About Page =====
export const aboutPage = (): RequiredDataFromCollectionSlug<'pages'> => ({
  slug: 'about',
  _status: 'published',
  title: 'About Chinyi',
  hero: { type: 'none' },
  layout: [
    // Hero - serif font (default)
    {
      blockType: 'japaneseHero',
      blockName: 'Hero',
      label: 'Company',
      title: 'About Chinyi',
      subtitle: "Taiwan's Most Trusted Leading Egg Products Brand",
      titleFont: 'serif',
      backgroundImageUrl: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1920&q=80',
      size: 'small',
      overlayOpacity: 40,
    },
    // Page Nav
    companyPageNav('about'),
    // Introduction Quote
    {
      blockType: 'highlightBox',
      blockName: 'Introduction Quote',
      variant: 'quote',
      content: richText([
        mixedParagraph([
          italicText("Chinyi's dedication comes from a belief in progressing with the times, and a promise to provide Taiwanese consumers with healthier, higher-quality egg products."),
        ]),
      ]),
    },
    // Content - Our Beginning (Part 1)
    {
      blockType: 'content',
      blockName: 'Our Beginning Part 1',
      columns: [
        {
          size: 'full',
          contentType: 'text',
          richText: richText([
            heading('Our Beginning', 'h3'),
            paragraph("In the 1980s, as Taiwan's economy took off and incomes rose, consumer industries blossomed—bakeries needed eggs, food processors needed eggs, the restaurant industry needed eggs—and the market demand for egg products surged. Chicken farms could be built one after another, but whether the level of egg processing could keep pace with the market was not a given."),
          ]),
        },
      ],
    },
    // Image - Fresh eggs
    {
      blockType: 'mediaBlock',
      blockName: 'Fresh Eggs Image',
      imageUrl: 'https://images.unsplash.com/photo-1569288052389-dac9b01c9c05?w=800&q=80',
      alt: 'Fresh eggs representing quality beginnings',
    },
    // Content - Our Beginning (Part 2)
    {
      blockType: 'content',
      blockName: 'Our Beginning Part 2',
      columns: [
        {
          size: 'full',
          contentType: 'text',
          richText: richText([
            mixedParagraph([
              textNode("To meet market demand and raise the standard of Taiwan's egg industry, Co-Founder & Chairman Ku Rong-Hai and Co-Founder Ku Hong-Lin established Chinyi Egg Products on "),
              boldText("October 25, 1981"),
              textNode(" as Taiwan's first specialized liquid egg company."),
            ]),
          ]),
        },
      ],
    },
    // Content - Remarkable Achievement (Part 1)
    {
      blockType: 'content',
      blockName: 'Remarkable Achievement Part 1',
      columns: [
        {
          size: 'full',
          contentType: 'text',
          richText: richText([
            heading('Remarkable Achievement', 'h3'),
            mixedParagraph([
              italicText("With the support of many customers and consumers, Chinyi has grown to be outstanding in its development."),
            ]),
            paragraph("Today, Chinyi is Taiwan's egg products company with the largest production capacity and the broadest service coverage. With over 80 company vehicles, delivery spans from Yilan in the north to Pingtung in the south. Our professional logistics capability leads the industry. We hold a high market share in Taiwan's liquid egg market. Many large-scale food manufacturers, bakery businesses, five-star hotels, airline catering services, chain restaurants, and institutional meal providers are among our clients."),
          ]),
        },
      ],
    },
    // Image - Production facility
    {
      blockType: 'mediaBlock',
      blockName: 'Production Facility Image',
      imageUrl: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80',
      alt: 'Modern food production facility',
    },
    // Content - Remarkable Achievement (Part 2)
    {
      blockType: 'content',
      blockName: 'Remarkable Achievement Part 2',
      columns: [
        {
          size: 'full',
          contentType: 'text',
          richText: richText([
            paragraph('Our production facilities are located in Chiayi, close to the main egg-producing regions (most egg farms in Taiwan are south of Changhua), enabling "local production, fresh delivery," ensuring high product quality.'),
          ]),
        },
      ],
    },
    // Stats
    {
      blockType: 'statsGrid',
      blockName: 'Company Stats',
      items: [
        { number: '46+', label: 'Years of Excellence' },
        { number: '80+', label: 'Delivery Vehicles' },
        { number: '#1', label: 'Market Share' },
      ],
      backgroundColor: 'kinari',
      columns: '3',
    },
    // Content - Dedication & Compassion (Part 1)
    {
      blockType: 'content',
      blockName: 'Dedication & Compassion Part 1',
      columns: [
        {
          size: 'full',
          contentType: 'text',
          richText: richText([
            heading('Dedication & Compassion', 'h3'),
            mixedParagraph([
              italicText("Enhancing the quality of Taiwan's egg industry and serving more consumers, Chinyi continues to move forward."),
            ]),
            paragraph("As Taiwan's leading egg products company, Chinyi feels the responsibility to elevate the country's egg industry standards, and thus continues to innovate. We upgraded from regular liquid eggs to pasteurized liquid egg products, committed to refrigerated transport and fresh preservation. Integrity and passion are at the core of everything we do, hoping to lead by example and uplift the industry."),
          ]),
        },
      ],
    },
    // Image - Chicken farm
    {
      blockType: 'mediaBlock',
      blockName: 'Chicken Farm Image',
      imageUrl: 'https://images.unsplash.com/photo-1548550023-2bdb3c5beed7?w=800&q=80',
      alt: 'Modern chicken farm',
    },
    // Content - Dedication & Compassion (Part 2)
    {
      blockType: 'content',
      blockName: 'Dedication & Compassion Part 2',
      columns: [
        {
          size: 'full',
          contentType: 'text',
          richText: richText([
            paragraph("Beyond egg processing and transportation, Chinyi has expanded into egg-laying chicken farming, based in the pristine Chiayi region. We have built several large modern chicken farms under high standards to produce premium Chinyi eggs."),
          ]),
        },
      ],
    },
    // Highlight Box - Vertical Integration
    {
      blockType: 'highlightBox',
      blockName: 'Vertical Integration',
      variant: 'info',
      content: richText([
        mixedParagraph([
          boldText("Chinyi has become a vertically integrated enterprise"),
          textNode('—from chicken farming, to egg product processing, to final logistics and delivery—adhering to our company belief '),
          boldText('"Cherishing Everyone. Treasuring Taiwan"'),
          textNode(' and following the development direction of '),
          boldText('"Most Natural. Most Technological"'),
          textNode(' to provide the people of Taiwan with even higher-quality egg products. We press on toward the future.'),
        ]),
      ]),
    },
    // CTA
    {
      blockType: 'cta',
      blockName: 'CTA',
      richText: richText([
        heading('Explore Our Journey', 'h3'),
        paragraph('See how we\'ve grown over the past four decades.'),
      ]),
      links: [{ link: { type: 'custom', appearance: 'default', label: 'View Milestones →', url: '/milestones' } }],
    },
  ],
  meta: {
    title: 'About Chinyi | Chinyi Eggs Technology',
    description: "Chinyi - Taiwan's Most Trusted Leading Egg Products Brand. Established in 1981, we are Taiwan's first specialized liquid egg company.",
  },
})

// ===== Milestones Page =====
export const milestonesPage = (): RequiredDataFromCollectionSlug<'pages'> => ({
  slug: 'milestones',
  _status: 'published',
  title: 'Corporate Milestones',
  hero: { type: 'none' },
  layout: [
    // Hero - serif font
    {
      blockType: 'japaneseHero',
      blockName: 'Hero',
      label: 'Company',
      title: 'Corporate Milestones',
      subtitle: 'Step by step, through hardships and perseverance',
      titleFont: 'serif',
      backgroundImageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1920&q=80',
      size: 'small',
      overlayOpacity: 40,
    },
    // Page Nav
    companyPageNav('milestones'),
    // Timeline
    {
      blockType: 'timeline',
      blockName: 'Company Timeline',
      sectionLabel: 'History',
      sectionTitle: 'Our Journey',
      layout: 'alternating',
      items: [
        { year: '1981', title: 'October — Company Founded', description: simpleRichText(['Chinyi Egg Products Co., Ltd. officially established.']) },
        { year: '1990', title: 'New Factory Completed', description: simpleRichText(['Modern production facility in Chiayi goes operational.']) },
        { year: '1995', title: 'Danish Equipment Introduced', description: simpleRichText(["Imported Taiwan's first continuous pasteurization system from Denmark."]) },
        { year: '2000', title: 'HACCP Certified', description: simpleRichText(['Received HACCP certification for food safety management.']) },
        { year: '2003', title: 'CAS Certification', description: simpleRichText(['Achieved CAS (Certified Agricultural Standards) certification.']) },
        { year: '2005', title: 'ISO 22000 Certified', description: simpleRichText(['Received ISO 22000 international food safety management certification.']) },
        { year: '2008', title: 'Biotech Division Launched', description: simpleRichText(['Started R&D and production of eggshell membrane and biotech ingredients.']) },
        { year: '2010', title: 'Vertical Integration', description: simpleRichText(['Established own chicken farms for complete supply chain control.']) },
        { year: '2012', title: 'HALAL Certification', description: simpleRichText(['Achieved HALAL certification for international market expansion.']) },
        { year: '2015', title: '100,000-Class Cleanroom', description: simpleRichText(['Upgraded core production area to cleanroom specifications.']) },
        { year: '2018', title: 'Egg White Products Launch', description: simpleRichText(['Introduced high-protein egg white bar and cube products.']) },
        { year: '2020', title: 'Capacity Expansion', description: simpleRichText(['Major expansion of production capacity and fleet to 80+ vehicles.']) },
        { year: '2023', title: 'Brand Renewal', description: simpleRichText(['Renamed to Chinyi Eggs Technology Co., Ltd. reflecting expanded capabilities.']) },
        { year: '2025', title: 'September — International Expansion', description: simpleRichText(['Launched new English website for global market outreach.']) },
      ],
    },
    // CTA
    {
      blockType: 'cta',
      blockName: 'CTA',
      richText: richText([
        heading('See Our Facilities', 'h3'),
        paragraph('Take a virtual tour of our state-of-the-art factory.'),
      ]),
      links: [{ link: { type: 'custom', appearance: 'default', label: 'Factory Tour →', url: '/factory-tour' } }],
    },
  ],
  meta: {
    title: 'Corporate Milestones | Chinyi Eggs Technology',
    description: "Step by step, through hardships and perseverance. Explore Chinyi's corporate milestones from 1981 to present.",
  },
})

// ===== Quality Control Page =====
export const qualityControlPage = (): RequiredDataFromCollectionSlug<'pages'> => ({
  slug: 'quality-control',
  _status: 'published',
  title: 'Technology & Quality Control',
  hero: { type: 'none' },
  layout: [
    // Hero - serif font
    {
      blockType: 'japaneseHero',
      blockName: 'Hero',
      label: 'Company',
      title: 'Technology & Quality Control',
      subtitle: 'Industrialized Quality Assurance — We Do It First',
      titleFont: 'serif',
      backgroundImageUrl: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1920&q=80',
      size: 'small',
      overlayOpacity: 40,
    },
    // Page Nav
    companyPageNav('quality-control'),
    // Introduction
    {
      blockType: 'content',
      blockName: 'Introduction',
      columns: [
        {
          size: 'full',
          contentType: 'text',
          richText: richText([
            paragraph('Eggs are complex organic products, prone to contamination by pathogens like Salmonella or E. coli, which can cause quality degradation. In addition, drug residues in eggs are a serious concern for consumers. Because many poultry farms lack the technology or capacity to enforce strict controls at the source, the responsibility of quality control naturally falls to the egg-product companies.'),
          ]),
        },
      ],
    },
    // Highlight - Quality Philosophy
    {
      blockType: 'highlightBox',
      blockName: 'Quality Philosophy',
      variant: 'info',
      content: richText([
        mixedParagraph([
          textNode('Chinyi upholds the corporate belief of '),
          boldText('"Cherishing Everyone. Treasuring Taiwan."'),
          textNode(' We are always mindful of consumer safety and health. We lead the industry with a state-of-the-art quality assurance laboratory in our factory. Using operating standards in line with international requirements, we strictly oversee the production of every batch of egg products.'),
        ]),
      ]),
    },
    // Testing Process
    {
      blockType: 'content',
      blockName: 'Testing Process',
      columns: [
        {
          size: 'full',
          contentType: 'text',
          richText: richText([
            heading('Testing Before and After', 'h3'),
            mixedParagraph([
              italicText('Professional QA staff and high-tech testing equipment ensure perfect quality control.'),
            ]),
          ]),
        },
      ],
    },
    // Image - Quality control laboratory
    {
      blockType: 'mediaBlock',
      blockName: 'QC Lab Image',
      imageUrl: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?w=800&q=80',
      alt: 'Quality control laboratory',
    },
    // Testing Process continued
    {
      blockType: 'content',
      blockName: 'Testing Process Continued',
      columns: [
        {
          size: 'full',
          contentType: 'text',
          richText: richText([
            paragraph("Because egg products are closely linked to consumers' daily health, Chinyi attaches special importance to and demands rigor in quality assurance — implemented through daily routines:"),
          ]),
        },
      ],
    },
    // Check List - Testing Steps
    {
      blockType: 'checkList',
      blockName: 'Testing Steps',
      icon: 'check' as const,
      columns: '1',
      items: [
        { text: 'When fresh eggs arrive at the factory, we immediately take random samples and discard any substandard raw eggs.' },
        { text: 'Throughout processing, high-technology equipment ensures safety and stability of quality.' },
        { text: 'After production is complete, we again sample the finished products.' },
      ],
    },
    // Multiple Checkpoints Note
    {
      blockType: 'content',
      blockName: 'Multiple Checkpoints',
      columns: [
        {
          size: 'full',
          contentType: 'text',
          richText: richText([
            paragraph("Through multiple checkpoints, we build strong confidence among customers and the public in Chinyi's egg products."),
          ]),
        },
      ],
    },
    // Fresh Egg Quality Inspection
    {
      blockType: 'content',
      blockName: 'Fresh Egg Quality Inspection',
      columns: [
        {
          size: 'full',
          contentType: 'text',
          richText: richText([
            heading('Fresh Egg Quality Inspection', 'h3'),
            paragraph("Keeping pace with technology and saying goodbye to traditional visual inspections, Chinyi owns one of Taiwan's rare Fresh Egg Quality Measuring Devices that rapidly determines weight, white vs. yolk height, yolk color, etc., to automatically assess freshness. We use the internationally recognized Haugh unit method to distinguish good eggs from poor ones."),
          ]),
        },
      ],
    },
    // Image - Egg quality inspection
    {
      blockType: 'mediaBlock',
      blockName: 'Egg Quality Inspection Image',
      imageUrl: 'https://images.unsplash.com/photo-1498654077810-12c21d4d6dc3?w=800&q=80',
      alt: 'Egg quality inspection',
    },
    // Freshness Table
    {
      blockType: 'specTable',
      blockName: 'Freshness Grading',
      columnHeaders: {
        labelHeader: 'Freshness Grade',
        valueHeader: 'Haugh Unit Value',
      },
      style: 'striped',
      rows: [
        { label: 'AA Grade', value: '72 and above' },
        { label: 'A Grade', value: '60–72' },
        { label: 'B Grade', value: '31–60' },
        { label: 'C Grade', value: 'Below 31' },
      ],
    },
    // Physical Property Testing Intro
    {
      blockType: 'content',
      blockName: 'Physical Property Testing Intro',
      columns: [
        {
          size: 'full',
          contentType: 'text',
          richText: richText([
            heading('Physical Property Testing', 'h3'),
            paragraph("Besides ensuring quality, we also focus on the product's functional use. Through repeated product-property tests and continuous improvements, Chinyi's products deliver greater utility to you."),
          ]),
        },
      ],
    },
    // Physical Testing Features
    {
      blockType: 'featureGrid',
      blockName: 'Physical Property Testing Features',
      columns: '3',
      cardStyle: 'imageTop',
      backgroundColor: 'shiro',
      items: [
        {
          imageUrl: 'https://images.unsplash.com/photo-1582169296194-e4d644c48063?w=400&q=80',
          title: 'Egg White Foaming',
          description: 'Our pasteurized egg whites can be whipped quickly and completely. Compared to ordinary untreated whites, using pasteurized egg white in pastries yields a texture that is silkier, more elastic, and tastier.',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=400&q=80',
          title: 'Baking Color',
          description: 'Our pasteurized egg yolk liquid can be used without filtration; it can be brushed on surfaces for baking with excellent adhesion and a beautiful golden color.',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1466637574441-749b8f19452f?w=400&q=80',
          title: 'Cooking Test',
          description: 'Our pasteurized whole-egg liquid is suitable for simple cooking like scrambled eggs, steamed eggs, baked eggs, etc. We lead the industry in technology.',
        },
      ],
    },
    // Comprehensive Testing Section - Heading
    {
      blockType: 'content',
      blockName: 'Comprehensive Testing Heading',
      columns: [
        {
          size: 'full',
          contentType: 'text',
          richText: richText([
            heading('Comprehensive Testing', 'h3'),
          ]),
        },
      ],
    },
    // Image - Laboratory testing equipment
    {
      blockType: 'mediaBlock',
      blockName: 'Lab Testing Equipment Image',
      imageUrl: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&q=80',
      alt: 'Laboratory testing equipment',
    },
    // Comprehensive Testing Content
    {
      blockType: 'content',
      blockName: 'Comprehensive Testing Content',
      columns: [
        {
          size: 'full',
          contentType: 'text',
          richText: richText([
            mixedParagraph([
              boldText('Solid Content and pH Measurement'),
            ]),
            paragraph('Using infrared moisture analyzers and electronic pH meters, we measure solid content and pH levels to assess freshness and detect any quality deterioration in liquid egg products.'),
            mixedParagraph([
              boldText('Microbiological and Drug Residue Testing'),
            ]),
            paragraph('We test for microbial loads including total plate count, Salmonella, E. coli, coliform bacteria, molds, and also check for residues of drugs or antibiotics. We ensure all indicators meet food safety and hygiene standards. In addition to internal testing, Chinyi commissions external professional labs for further verification, and publishes inspection reports online.'),
          ]),
        },
      ],
    },
    // CTA
    {
      blockType: 'cta',
      blockName: 'CTA',
      richText: richText([
        heading('See It For Yourself', 'h3'),
        paragraph('Take a virtual tour of our production facilities.'),
      ]),
      links: [{ link: { type: 'custom', appearance: 'default', label: 'Factory Tour →', url: '/factory-tour' } }],
    },
  ],
  meta: {
    title: 'Technology & Quality Control | Chinyi Eggs Technology',
    description: "Industrialized Quality Assurance - We Do It First. Learn about Chinyi's state-of-the-art quality control laboratory and testing procedures.",
  },
})

// ===== Factory Tour Page =====
export const factoryTourPage = (): RequiredDataFromCollectionSlug<'pages'> => ({
  slug: 'factory-tour',
  _status: 'published',
  title: 'Factory Tour',
  hero: { type: 'none' },
  layout: [
    // Hero - serif font
    {
      blockType: 'japaneseHero',
      blockName: 'Hero',
      label: 'Company',
      title: 'Factory Tour',
      subtitle: "First-Hand Experience — See Chinyi's Expertise With Your Own Eyes",
      titleFont: 'serif',
      backgroundImageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1920&q=80',
      size: 'small',
      overlayOpacity: 40,
    },
    // Page Nav
    companyPageNav('factory-tour'),
    // Taiwan Reality
    {
      blockType: 'content',
      blockName: 'Taiwan Reality',
      columns: [
        {
          size: 'full',
          contentType: 'text',
          richText: richText([
            heading("Taiwan's Egg Industry Reality", 'h3'),
            paragraph("For many people in Taiwan, knowledge about egg products is generally limited—so one often sees ungraded eggs with chicken droppings, or egg carts without refrigeration driving around under the sun. Enter an ordinary egg factory, and you'll find low automation: much of the work is still done by hand, including separating yolk from white, and hygienic standards tend to be poor."),
          ]),
        },
      ],
    },
    // Image - Traditional egg production
    {
      blockType: 'mediaBlock',
      blockName: 'Traditional Production Image',
      imageUrl: 'https://images.unsplash.com/photo-1569288052389-dac9b01c9c05?w=800&q=80',
      alt: 'Traditional egg production',
    },
    // Chinyi Difference
    {
      blockType: 'content',
      blockName: 'Chinyi Difference',
      columns: [
        {
          size: 'full',
          contentType: 'text',
          richText: richText([
            heading('The Chinyi Difference', 'h3'),
            paragraph("Chinyi has specialized in Taiwan's egg industry for over 40 years. We insist on moving forward with the times, learning from advanced countries in Europe and the U.S., and continuously advancing Taiwan's egg-product standards."),
          ]),
        },
      ],
    },
    // Highlight - Cleanroom
    {
      blockType: 'highlightBox',
      blockName: 'Cleanroom',
      variant: 'info',
      content: richText([
        mixedParagraph([
          textNode('Our factory is highly automated. The core manufacturing area is a cleanroom meeting '),
          boldText('100,000-class specifications'),
          textNode(". Entrances and exits for personnel are separated. Air is independently circulated. Pipelines are elevated overhead. Visitors entering Chinyi's factory for the first time often feel as though they've stepped into a wafer fab in a science park."),
        ]),
      ]),
    },
    // Open doors paragraph
    {
      blockType: 'content',
      blockName: 'Open Doors',
      columns: [
        {
          size: 'full',
          contentType: 'text',
          richText: richText([
            paragraph("Built on integrity, Chinyi opens its doors wide: all production lines are visible to the public. From home, you can feel like you're on a guided tour—witness Chinyi's professionalism firsthand."),
          ]),
        },
      ],
    },
    // Pasteurized Liquid Egg Production
    {
      blockType: 'content',
      blockName: 'Pasteurized Production',
      columns: [
        {
          size: 'full',
          contentType: 'text',
          richText: richText([
            heading('Pasteurized Liquid Egg Production', 'h3'),
            paragraph("We've introduced Taiwan's newest and largest continuous sterilization equipment from Denmark, combining \"Fresh House\" packaging and automatic pouch filling technologies. From washing, cracking eggs, sterilization, to packaging, the entire process is automated—bringing Taiwanese liquid egg standards into the league of the world's most advanced nations."),
          ]),
        },
      ],
    },
    // Image - Modern food production line
    {
      blockType: 'mediaBlock',
      blockName: 'Production Line Image',
      imageUrl: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=800&q=80',
      alt: 'Modern food production line',
    },
    // Highlight - Pasteurization process
    {
      blockType: 'highlightBox',
      blockName: 'Pasteurization Process',
      variant: 'info',
      content: simpleRichText([
        "Using internationally recognized Pasteur low-temperature sterilization. Through a plate heat exchanger (preheat → heating for sterilization → cooling → chilling), we eliminate Salmonella, E. coli, and various harmful microbes and spoilage bacteria. The entire sterilization process is conducted through elevated, sealed piping systems—thoroughly isolating the process from external contamination.",
      ]),
    },
    // Factory Features
    {
      blockType: 'featureGrid',
      blockName: 'Factory Highlights',
      sectionLabel: 'Features',
      sectionTitle: 'Factory Highlights',
      columns: '3',
      cardStyle: 'imageTop',
      backgroundColor: 'kinari',
      items: [
        {
          imageUrl: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&q=80',
          title: '100K Class Cleanroom',
          description: 'Core production area meets international cleanroom standards comparable to semiconductor facilities.',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=400&q=80',
          title: 'Full Automation',
          description: 'From washing to packaging, the entire process is automated with minimal human contact.',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1565793298595-6a879b1d9492?w=400&q=80',
          title: 'Danish Equipment',
          description: "Taiwan's largest continuous sterilization equipment imported from Denmark.",
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=400&q=80',
          title: 'Sealed Systems',
          description: 'Elevated piping systems completely isolate the process from external contamination.',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1579003593419-98f949b9398f?w=400&q=80',
          title: 'Pasteurization',
          description: 'Internationally recognized low-temperature pasteurization eliminates harmful pathogens.',
        },
        {
          imageUrl: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=400&q=80',
          title: 'Transparent',
          description: 'All production lines are visible to the public, demonstrating our commitment to quality.',
        },
      ],
    },
    // CTA
    {
      blockType: 'cta',
      blockName: 'CTA',
      richText: richText([
        heading('Visit Our Facility', 'h3'),
        paragraph('Interested in visiting our factory or learning more about our production capabilities?'),
      ]),
      links: [{ link: { type: 'custom', appearance: 'default', label: 'Contact Us →', url: '/contact' } }],
    },
  ],
  meta: {
    title: 'Factory Tour | Chinyi Eggs Technology',
    description: "First-Hand Experience - See Chinyi's Expertise With Your Own Eyes. Tour our highly automated factory with 100,000-class cleanroom specifications.",
  },
})
