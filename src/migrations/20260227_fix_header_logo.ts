import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Add logo_id column to header table
  // Upload fields with single relationTo store as direct column '{name}_id' on the parent table
  await db.execute(sql`
    ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "logo_id" integer;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "header"
        ADD CONSTRAINT "header_logo_id_media_id_fk"
        FOREIGN KEY ("logo_id") REFERENCES "media"("id") ON DELETE set null ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
  `)

  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "header_logo_idx" ON "header" USING btree ("logo_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`ALTER TABLE "header" DROP CONSTRAINT IF EXISTS "header_logo_id_media_id_fk";`)
  await db.execute(sql`DROP INDEX IF EXISTS "header_logo_idx";`)
  await db.execute(sql`ALTER TABLE "header" DROP COLUMN IF EXISTS "logo_id";`)
}
