import { getCachedGlobal } from '@/utilities/getGlobals'
import Link from 'next/link'
import React from 'react'

import type { Footer as FooterType } from '@/payload-types'

import { ThemeSelector } from '@/providers/Theme/ThemeSelector'
import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import { JapaneseFooter } from '@/components/Footer/JapaneseFooter'

export async function Footer() {
  const footerData: FooterType = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  // 如果是日式樣式，使用 JapaneseFooter
  if (footerData?.style === 'japanese') {
    // 從 navItems 提取連結
    const navLinks = navItems.map(({ link }, index) => {
      const slug = (link?.reference?.value as { slug?: string })?.slug
      return {
        id: `nav-${index}`,
        label: link?.label || '',
        href: link?.url || (slug ? `/${slug}` : '/'),
      }
    })

    return (
      <JapaneseFooter
        data={footerData}
        companyName={footerData?.companyName || 'CHINYI EGGS TECHNOLOGY'}
        navLinks={navLinks.length > 0 ? navLinks : undefined}
        address={footerData?.contactInfo?.address || undefined}
        phone={footerData?.contactInfo?.phone || undefined}
      />
    )
  }

  // 預設樣式
  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-8 gap-8 flex flex-col md:flex-row md:justify-between">
        <Link className="flex items-center" href="/">
          <Logo />
        </Link>

        <div className="flex flex-col-reverse items-start md:flex-row gap-4 md:items-center">
          <ThemeSelector />
          <nav className="flex flex-col md:flex-row gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} {...link} />
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
