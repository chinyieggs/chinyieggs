import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

// No-op: ImageCarousel 表和 JapaneseHero showDivider 欄位已透過 db:push 在 production 建立
// 保留此 migration 及其 JSON snapshot 作為基準，供後續 migrate:create 計算差異
export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Tables and columns already exist in production (created via db:push)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // No-op
}
