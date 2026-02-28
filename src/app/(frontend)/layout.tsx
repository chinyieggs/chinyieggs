import type { Metadata } from 'next'

import { cn } from '@/utilities/ui'
import { GeistMono } from 'geist/font/mono'
import { GeistSans } from 'geist/font/sans'
import React from 'react'

import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Chinyi Eggs Technology Co., Ltd.',
    url: getServerSideURL(),
    logo: `${getServerSideURL()}/chinyi-logo.svg`,
    description:
      "Taiwan's leading egg products brand specializing in pasteurized liquid eggs, egg biotechnology ingredients, and high-protein foods.",
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'No. 37, Xinmin Road',
      addressLocality: 'Chiayi City',
      postalCode: '600',
      addressCountry: 'TW',
    },
    telephone: '+886-5-235-4049',
    foundingDate: '1981',
  }

  return (
    <html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <link href="/favicon.ico" rel="icon" sizes="32x32" />
        <link href="/favicon-32.png" rel="icon" type="image/png" sizes="32x32" />
        <link href="/favicon-16.png" rel="icon" type="image/png" sizes="16x16" />
        <link href="/apple-touch-icon.png" rel="apple-touch-icon" sizes="180x180" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        <Providers>
          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  title: {
    default: 'Chinyi Eggs Technology | Taiwan\'s Leading Egg Products Brand',
    template: '%s | Chinyi Eggs Technology',
  },
  description:
    'Taiwan\'s leading egg products brand specializing in pasteurized liquid eggs, egg biotechnology ingredients, and high-protein foods.',
  metadataBase: new URL(getServerSideURL()),
  alternates: {
    languages: {
      'en': 'https://en.chinyieggs.com',
      'zh-Hant': 'https://tw.chinyieggs.com',
    },
  },
  openGraph: mergeOpenGraph(),
  twitter: {
    card: 'summary_large_image',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}
