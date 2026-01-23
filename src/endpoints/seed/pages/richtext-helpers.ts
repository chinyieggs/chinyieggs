/**
 * Helper functions for creating Lexical richText content
 */

type Direction = 'ltr' | 'rtl' | null
type Format = '' | 'left' | 'start' | 'center' | 'right' | 'end' | 'justify'

// Create a simple text node
export const textNode = (text: string, format: number = 0) => ({
  type: 'text' as const,
  detail: 0,
  format,
  mode: 'normal' as const,
  style: '',
  text,
  version: 1,
})

// Create a paragraph with text
export const paragraph = (text: string, format: Format = '') => ({
  type: 'paragraph' as const,
  children: [textNode(text)],
  direction: 'ltr' as Direction,
  format,
  indent: 0,
  textFormat: 0,
  version: 1,
})

// Create a heading
export const heading = (text: string, tag: 'h1' | 'h2' | 'h3' | 'h4' = 'h2', format: Format = '') => ({
  type: 'heading' as const,
  children: [textNode(text)],
  direction: 'ltr' as Direction,
  format,
  indent: 0,
  tag,
  version: 1,
})

// Create a link
export const link = (text: string, url: string, newTab: boolean = false) => ({
  type: 'link' as const,
  children: [textNode(text)],
  direction: 'ltr' as Direction,
  fields: {
    linkType: 'custom' as const,
    newTab,
    url,
  },
  format: '' as Format,
  indent: 0,
  version: 3,
})

// Create a paragraph with mixed content (text and links)
export const mixedParagraph = (children: any[], format: Format = '') => ({
  type: 'paragraph' as const,
  children,
  direction: 'ltr' as Direction,
  format,
  indent: 0,
  textFormat: 0,
  version: 1,
})

// Create bold text
export const boldText = (text: string) => textNode(text, 1) // format: 1 = bold

// Create italic text
export const italicText = (text: string) => textNode(text, 2) // format: 2 = italic

// Create a root richText structure
export const richText = (children: any[]) => ({
  root: {
    type: 'root' as const,
    children,
    direction: 'ltr' as Direction,
    format: '' as Format,
    indent: 0,
    version: 1,
  },
})

// Simple richText with just paragraphs
export const simpleRichText = (paragraphs: string[]) =>
  richText(paragraphs.map((p) => paragraph(p)))

// RichText with a heading and paragraphs
export const richTextWithHeading = (headingText: string, paragraphs: string[], tag: 'h1' | 'h2' | 'h3' | 'h4' = 'h3') =>
  richText([heading(headingText, tag), ...paragraphs.map((p) => paragraph(p))])
