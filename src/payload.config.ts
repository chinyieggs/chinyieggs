import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { zhTw } from '@payloadcms/translations/languages/zhTw'
import { en } from '@payloadcms/translations/languages/en'
import sharp from 'sharp'
import path from 'path'
import { buildConfig, PayloadRequest } from 'payload'
import { fileURLToPath } from 'url'

import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Users } from './collections/Users'
import { Footer } from './Footer/config'
import { Header } from './Header/config'
import { plugins } from './plugins'
import { defaultLexical } from '@/fields/defaultLexical'
import { getServerSideURL } from './utilities/getURL'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  i18n: {
    // @ts-expect-error zhTw key mapping
    supportedLanguages: { zhTw, en },
    // @ts-expect-error zhTw fallback
    fallbackLanguage: 'zhTw',
    translations: {
      // @ts-expect-error zhTw translations
      zhTw: {
        'lexical:heading:label': '標題',
        'lexical:heading1:label': '標題 1',
        'lexical:heading2:label': '標題 2',
        'lexical:heading3:label': '標題 3',
        'lexical:heading4:label': '標題 4',
        'lexical:heading5:label': '標題 5',
        'lexical:heading6:label': '標題 6',
        'lexical:paragraph:label': '段落',
        'lexical:bold:label': '粗體',
        'lexical:italic:label': '斜體',
        'lexical:underline:label': '底線',
        'lexical:link:label': '連結',
        'lexical:horizontalRule:label': '分隔線',
        'lexical:blockquote:label': '引用',
        'lexical:code:label': '程式碼',
      },
    },
  },
  admin: {
    theme: 'light',
    meta: {
      title: 'Chinyi Eggs Admin',
      description: 'Chinyi Eggs 管理後台',
      icons: [
        {
          type: 'image/png',
          rel: 'icon',
          url: '/favicon.ico',
        },
      ],
    },
    components: {
      graphics: {
        Logo: '@/components/graphics/Logo#Logo',
        Icon: '@/components/graphics/Icon#Icon',
      },
      beforeLogin: ['@/components/BeforeLogin'],
      beforeDashboard: ['@/components/BeforeDashboard'],
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
    user: Users.slug,
    livePreview: {
      breakpoints: [
        {
          label: 'Mobile',
          name: 'mobile',
          width: 375,
          height: 667,
        },
        {
          label: 'Tablet',
          name: 'tablet',
          width: 768,
          height: 1024,
        },
        {
          label: 'Desktop',
          name: 'desktop',
          width: 1440,
          height: 900,
        },
      ],
    },
  },
  // This config helps us configure global or default features that the other editors can inherit
  editor: defaultLexical,
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.POSTGRES_URL || '',
    },
    push: true,
  }),
  collections: [Pages, Media, Users],
  cors: [getServerSideURL()].filter(Boolean),
  plugins: [
    ...plugins,
    vercelBlobStorage({
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
  globals: [Header, Footer],
  secret: process.env.PAYLOAD_SECRET,
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  jobs: {
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        if (req.user) return true

        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
    tasks: [],
  },
})
