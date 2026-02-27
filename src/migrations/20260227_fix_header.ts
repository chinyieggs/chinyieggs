import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // 1. Create enum types (IF NOT EXISTS)
  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_header_style" AS ENUM('default', 'japanese');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_header_nav_items_submenu_link_type" AS ENUM('reference', 'custom');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
  `)

  await db.execute(sql`
    DO $$ BEGIN
      CREATE TYPE "public"."enum_header_nav_items_submenu_link_appearance" AS ENUM('default', 'outline');
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
  `)

  // 2. Add missing columns to header table
  await db.execute(sql`
    ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "style" "enum_header_style" DEFAULT 'default';
  `)
  await db.execute(sql`
    ALTER TABLE "header" ADD COLUMN IF NOT EXISTS "logo_text" varchar DEFAULT 'CHINYI EGGS';
  `)

  // 3. Create header_nav_items_submenu table if not exists
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "header_nav_items_submenu" (
      "_order" integer NOT NULL,
      "_parent_id" varchar NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "link_type" "enum_header_nav_items_submenu_link_type" DEFAULT 'reference',
      "link_new_tab" boolean,
      "link_url" varchar,
      "link_label" varchar NOT NULL,
      "link_appearance" "enum_header_nav_items_submenu_link_appearance" DEFAULT 'default'
    );
  `)

  // Create indexes for submenu table
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "header_nav_items_submenu_order_idx" ON "header_nav_items_submenu" USING btree ("_order");
  `)
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "header_nav_items_submenu_parent_id_idx" ON "header_nav_items_submenu" USING btree ("_parent_id");
  `)

  // Add foreign key if not exists
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "header_nav_items_submenu"
        ADD CONSTRAINT "header_nav_items_submenu_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
  `)

  // 4. Add media_id to header_rels for the logo upload field
  await db.execute(sql`
    ALTER TABLE "header_rels" ADD COLUMN IF NOT EXISTS "media_id" integer;
  `)

  // Add foreign key for media_id
  await db.execute(sql`
    DO $$ BEGIN
      ALTER TABLE "header_rels"
        ADD CONSTRAINT "header_rels_media_fk"
        FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE cascade ON UPDATE no action;
    EXCEPTION WHEN duplicate_object THEN null;
    END $$;
  `)

  // Add index for media_id
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "header_rels_media_id_idx" ON "header_rels" USING btree ("media_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Remove media_id from header_rels
  await db.execute(sql`ALTER TABLE "header_rels" DROP CONSTRAINT IF EXISTS "header_rels_media_fk";`)
  await db.execute(sql`DROP INDEX IF EXISTS "header_rels_media_id_idx";`)
  await db.execute(sql`ALTER TABLE "header_rels" DROP COLUMN IF EXISTS "media_id";`)

  // Drop submenu table
  await db.execute(sql`DROP TABLE IF EXISTS "header_nav_items_submenu";`)

  // Remove added columns from header
  await db.execute(sql`ALTER TABLE "header" DROP COLUMN IF EXISTS "style";`)
  await db.execute(sql`ALTER TABLE "header" DROP COLUMN IF EXISTS "logo_text";`)

  // Drop enum types
  await db.execute(sql`DROP TYPE IF EXISTS "enum_header_nav_items_submenu_link_appearance";`)
  await db.execute(sql`DROP TYPE IF EXISTS "enum_header_nav_items_submenu_link_type";`)
  await db.execute(sql`DROP TYPE IF EXISTS "enum_header_style";`)
}
