import type { Payload, PayloadRequest } from 'payload'

import { seedAllChinyiPages, seedChinyiGlobals } from './chinyi'

/**
 * 非破壞性 seed — 使用 upsert 邏輯
 * - 表單：已存在就跳過，不存在就建立
 * - 頁面：已存在就更新，不存在就建立
 * - Globals：直接更新 Header / Footer
 * - Media：不處理（圖片由 Vercel Blob 管理，不適合 seed）
 * - Form Submissions：不處理（保留使用者提交記錄）
 */
export const seed = async ({
  payload,
  req,
}: {
  payload: Payload
  req: PayloadRequest
}): Promise<void> => {
  payload.logger.info('Seeding database (upsert mode)...')

  // 建立/更新所有頁面 + Contact Form
  await seedAllChinyiPages(payload, { clearFirst: false, req })

  // 更新 Header & Footer
  await seedChinyiGlobals(payload)

  payload.logger.info('Seeded database successfully!')
}
