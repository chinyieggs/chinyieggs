import { formBuilderPlugin } from '@payloadcms/plugin-form-builder'
import { redirectsPlugin } from '@payloadcms/plugin-redirects'
import { seoPlugin } from '@payloadcms/plugin-seo'
import { Plugin } from 'payload'
import { revalidateRedirects } from '@/hooks/revalidateRedirects'
import { GenerateTitle, GenerateURL } from '@payloadcms/plugin-seo/types'
import { FixedToolbarFeature, HeadingFeature, lexicalEditor } from '@payloadcms/richtext-lexical'

import { Page } from '@/payload-types'
import { getServerSideURL } from '@/utilities/getURL'

const generateTitle: GenerateTitle<Page> = ({ doc }) => {
  return doc?.title ? `${doc.title} | Payload Website Template` : 'Payload Website Template'
}

const generateURL: GenerateURL<Page> = ({ doc }) => {
  const url = getServerSideURL()

  return doc?.slug ? `${url}/${doc.slug}` : url
}

export const plugins: Plugin[] = [
  redirectsPlugin({
    collections: ['pages'],
    overrides: {
      // @ts-expect-error - This is a valid override, mapped fields don't resolve to the same type
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'from') {
            return {
              ...field,
              admin: {
                description: 'You will need to rebuild the website when changing this field.',
              },
            }
          }
          return field
        })
      },
      hooks: {
        afterChange: [revalidateRedirects],
      },
    },
  }),
  seoPlugin({
    generateTitle,
    generateURL,
  }),
  formBuilderPlugin({
    fields: {
      payment: false,
    },
    formOverrides: {
      fields: ({ defaultFields }) => {
        return defaultFields.map((field) => {
          if ('name' in field && field.name === 'confirmationMessage') {
            return {
              ...field,
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    FixedToolbarFeature(),
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                  ]
                },
              }),
            }
          }
          return field
        })
      },
    },
    formSubmissionOverrides: {
      labels: {
        singular: '表單提交',
        plural: '表單提交',
      },
      admin: {
        useAsTitle: 'id',
        defaultColumns: ['submissionData', 'form', 'createdAt'],
      },
      fields: ({ defaultFields }) => {
        // Hide original submissionData field, add custom UI display
        const modifiedFields = defaultFields.map((field) => {
          if ('name' in field && field.name === 'submissionData') {
            return {
              ...field,
              admin: {
                ...('admin' in field ? field.admin : {}),
                hidden: true,
                components: {
                  Cell: '@/components/admin/FormSubmissions/SubmissionCell#NameCell',
                },
              },
            } as typeof field
          }
          return field
        })

        // Add custom UI field for display
        return [
          {
            name: 'submissionDisplay',
            type: 'ui',
            label: '提交內容',
            admin: {
              components: {
                Field: '@/components/admin/FormSubmissions/SubmissionDataField#SubmissionDataField',
              },
            },
          },
          ...modifiedFields,
        ]
      },
    },
  }),
]
