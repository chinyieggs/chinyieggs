import type { RequiredDataFromCollectionSlug } from 'payload'
import { richText, paragraph, heading, simpleRichText } from './richtext-helpers'

// ===== Contact Page =====
// formId parameter is optional - if provided, the form block will reference it
export const contactPage = (formId?: number | string): RequiredDataFromCollectionSlug<'pages'> => ({
  slug: 'contact',
  _status: 'published',
  title: 'Contact Us',
  hero: { type: 'none' },
  layout: [
    // Hero
    {
      blockType: 'japaneseHero',
      blockName: 'Hero',
      label: 'Get in Touch',
      title: 'Contact Us',
      subtitle: 'We look forward to hearing from you',
      titleFont: 'serif',
      backgroundImageUrl: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&q=80',
      size: 'small',
      overlayOpacity: 40,
    },
    // Contact Introduction
    {
      blockType: 'content',
      blockName: 'Contact Introduction',
      columns: [
        {
          size: 'full',
          contentType: 'text',
          richText: richText([
            heading('Send Us a Message', 'h3'),
            paragraph("Whether you're interested in our products, seeking samples, or exploring partnership opportunities, please fill out the form below and our team will respond promptly."),
          ]),
        },
      ],
    },
    // Contact Form Block
    ...(formId ? [{
      blockType: 'formBlock' as const,
      blockName: 'Contact Form',
      enableIntro: false,
      form: typeof formId === 'string' ? parseInt(formId, 10) : formId,
    }] : [{
      blockType: 'highlightBox' as const,
      blockName: 'Contact Form Notice',
      variant: 'info' as const,
      content: simpleRichText([
        'To submit an inquiry, please send an email to our sales team or call us directly. We typically respond within 1-2 business days.',
      ]),
    }]),
    // Company Information
    {
      blockType: 'content',
      blockName: 'Company Information',
      columns: [
        {
          size: 'full',
          contentType: 'text',
          richText: richText([
            heading('Company Information', 'h3'),
          ]),
        },
      ],
    },
    // Contact Details
    {
      blockType: 'highlightBox',
      blockName: 'Contact Details',
      variant: 'info',
      content: simpleRichText([
        'Chinyi Eggs Technology Co., Ltd.',
        'No. 37, Xinmin Road, Chiayi City 600, Taiwan',
        'Tel: +886-5-235-4049',
        'Fax: +886-5-235-4050',
      ]),
    },
  ],
  meta: {
    title: 'Contact | Chinyi Eggs Technology',
    description: 'Contact Chinyi Eggs Technology for product inquiries, samples, and partnership opportunities.',
  },
})
