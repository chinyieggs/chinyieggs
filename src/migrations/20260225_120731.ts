import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Fix: ensure show_divider column exists (may have been missed if previous migration partially failed)
  await db.execute(sql`
    ALTER TABLE "pages_blocks_japanese_hero" ADD COLUMN IF NOT EXISTS "show_divider" boolean DEFAULT true;
  `)
  await db.execute(sql`
    ALTER TABLE "_pages_v_blocks_japanese_hero" ADD COLUMN IF NOT EXISTS "show_divider" boolean DEFAULT true;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "pages_blocks_japanese_hero" DROP COLUMN IF EXISTS "show_divider";`)
  await db.execute(sql`ALTER TABLE "_pages_v_blocks_japanese_hero" DROP COLUMN IF EXISTS "show_divider";`)
}
