import { RequiredDataFromCollectionSlug } from 'payload'

export const contactForm: RequiredDataFromCollectionSlug<'forms'> = {
  confirmationMessage: {
    root: {
      type: 'root',
      children: [
        {
          type: 'heading',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'Thank you for contacting us!',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          tag: 'h2',
          version: 1,
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              detail: 0,
              format: 0,
              mode: 'normal',
              style: '',
              text: 'Your inquiry has been submitted successfully. Our team will respond within 1-2 business days.',
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          textFormat: 0,
          version: 1,
        },
      ],
      direction: 'ltr',
      format: '',
      indent: 0,
      version: 1,
    },
  },
  confirmationType: 'message',
  createdAt: '2023-01-12T21:47:41.374Z',
  emails: [
    {
      emailFrom: '"Chinyi Eggs Technology" \u003Cinfo@chinyieggs.com\u003E',
      emailTo: '{{email}}',
      message: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  text: 'Thank you for contacting Chinyi Eggs Technology. Your inquiry has been received and our team will respond within 1-2 business days.',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              textFormat: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      subject: "Thank you for contacting Chinyi Eggs Technology",
    },
  ],
  fields: [
    // First Name
    {
      name: 'firstName',
      blockName: 'firstName',
      blockType: 'text',
      label: 'First Name',
      required: true,
      width: 50,
    },
    // Last Name
    {
      name: 'lastName',
      blockName: 'lastName',
      blockType: 'text',
      label: 'Last Name',
      required: true,
      width: 50,
    },
    // Email
    {
      name: 'email',
      blockName: 'email',
      blockType: 'email',
      label: 'Email',
      required: true,
      width: 50,
    },
    // Phone
    {
      name: 'phone',
      blockName: 'phone',
      blockType: 'text',
      label: 'Phone',
      required: false,
      width: 50,
    },
    // Company
    {
      name: 'company',
      blockName: 'company',
      blockType: 'text',
      label: 'Company Name',
      required: false,
      width: 100,
    },
    // Country
    {
      name: 'country',
      blockName: 'country',
      blockType: 'select',
      label: 'Country / Region',
      required: false,
      width: 100,
      options: [
        { label: 'Taiwan', value: 'TW' },
        { label: 'Japan', value: 'JP' },
        { label: 'China', value: 'CN' },
        { label: 'Hong Kong', value: 'HK' },
        { label: 'South Korea', value: 'KR' },
        { label: 'Singapore', value: 'SG' },
        { label: 'Malaysia', value: 'MY' },
        { label: 'Thailand', value: 'TH' },
        { label: 'Vietnam', value: 'VN' },
        { label: 'Indonesia', value: 'ID' },
        { label: 'Philippines', value: 'PH' },
        { label: 'Australia', value: 'AU' },
        { label: 'New Zealand', value: 'NZ' },
        { label: 'United States', value: 'US' },
        { label: 'Canada', value: 'CA' },
        { label: 'United Kingdom', value: 'UK' },
        { label: 'Germany', value: 'DE' },
        { label: 'France', value: 'FR' },
        { label: 'Other', value: 'OTHER' },
      ],
    },
    // Inquiry Type
    {
      name: 'inquiry',
      blockName: 'inquiry',
      blockType: 'select',
      label: 'Inquiry Type',
      required: true,
      width: 100,
      options: [
        { label: 'Product Information', value: 'product' },
        { label: 'Sample Request', value: 'sample' },
        { label: 'Price Quote', value: 'quote' },
        { label: 'OEM/ODM Inquiry', value: 'oem' },
        { label: 'Distribution Partnership', value: 'distribution' },
        { label: 'Technical Support', value: 'technical' },
        { label: 'Other', value: 'other' },
      ],
    },
    // Products of Interest
    {
      name: 'products',
      blockName: 'products',
      blockType: 'select',
      label: 'Products of Interest',
      required: false,
      width: 100,
      options: [
        { label: 'Prepared Egg Liquid Series', value: 'liquid' },
        { label: 'Hydrolyzed Eggshell Membrane', value: 'membrane' },
        { label: 'Eggshell Membrane', value: 'eggshell' },
        { label: 'Eggshell Calcium Powder', value: 'calcium' },
        { label: 'Calcined Eggshell Powder', value: 'calcined' },
        { label: 'Egg Oil', value: 'oil' },
        { label: 'High-Protein Egg White Products', value: 'protein' },
        { label: 'Multiple Products', value: 'multiple' },
      ],
    },
    // Message
    {
      name: 'message',
      blockName: 'message',
      blockType: 'textarea',
      label: 'Message',
      required: true,
      width: 100,
    },
  ],
  redirect: undefined,
  submitButtonLabel: 'Submit Inquiry',
  title: 'Contact Form',
  updatedAt: '2023-01-12T21:47:41.374Z',
}
