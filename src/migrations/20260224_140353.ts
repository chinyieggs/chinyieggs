import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_image_carousel_autoplay_interval" AS ENUM('3', '5', '7', '10');
  CREATE TYPE "public"."enum__pages_v_blocks_image_carousel_autoplay_interval" AS ENUM('3', '5', '7', '10');
  CREATE TABLE "pages_blocks_image_carousel_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_url" varchar,
  	"caption" varchar
  );
  
  CREATE TABLE "pages_blocks_image_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"autoplay" boolean DEFAULT true,
  	"autoplay_interval" "enum_pages_blocks_image_carousel_autoplay_interval" DEFAULT '3',
  	"pause_on_hover" boolean DEFAULT true,
  	"show_thumbnails" boolean DEFAULT true,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_carousel_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_url" varchar,
  	"caption" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_image_carousel" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"autoplay" boolean DEFAULT true,
  	"autoplay_interval" "enum__pages_v_blocks_image_carousel_autoplay_interval" DEFAULT '3',
  	"pause_on_hover" boolean DEFAULT true,
  	"show_thumbnails" boolean DEFAULT true,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_japanese_hero" ADD COLUMN IF NOT EXISTS "show_divider" boolean DEFAULT true;
  ALTER TABLE "_pages_v_blocks_japanese_hero" ADD COLUMN IF NOT EXISTS "show_divider" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_image_carousel_images" ADD CONSTRAINT "pages_blocks_image_carousel_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_carousel_images" ADD CONSTRAINT "pages_blocks_image_carousel_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_image_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_image_carousel" ADD CONSTRAINT "pages_blocks_image_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_carousel_images" ADD CONSTRAINT "_pages_v_blocks_image_carousel_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_carousel_images" ADD CONSTRAINT "_pages_v_blocks_image_carousel_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_image_carousel"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_image_carousel" ADD CONSTRAINT "_pages_v_blocks_image_carousel_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_image_carousel_images_order_idx" ON "pages_blocks_image_carousel_images" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_carousel_images_parent_id_idx" ON "pages_blocks_image_carousel_images" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_carousel_images_image_idx" ON "pages_blocks_image_carousel_images" USING btree ("image_id");
  CREATE INDEX "pages_blocks_image_carousel_order_idx" ON "pages_blocks_image_carousel" USING btree ("_order");
  CREATE INDEX "pages_blocks_image_carousel_parent_id_idx" ON "pages_blocks_image_carousel" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_image_carousel_path_idx" ON "pages_blocks_image_carousel" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_image_carousel_images_order_idx" ON "_pages_v_blocks_image_carousel_images" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_carousel_images_parent_id_idx" ON "_pages_v_blocks_image_carousel_images" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_carousel_images_image_idx" ON "_pages_v_blocks_image_carousel_images" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_image_carousel_order_idx" ON "_pages_v_blocks_image_carousel" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_image_carousel_parent_id_idx" ON "_pages_v_blocks_image_carousel" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_image_carousel_path_idx" ON "_pages_v_blocks_image_carousel" USING btree ("_path");
  ALTER TABLE "header" DROP COLUMN IF EXISTS "show_language_switch";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_image_carousel_images" CASCADE;
  DROP TABLE "pages_blocks_image_carousel" CASCADE;
  DROP TABLE "_pages_v_blocks_image_carousel_images" CASCADE;
  DROP TABLE "_pages_v_blocks_image_carousel" CASCADE;
  ALTER TABLE "header" ADD COLUMN "show_language_switch" boolean DEFAULT true;
  ALTER TABLE "pages_blocks_japanese_hero" DROP COLUMN "show_divider";
  ALTER TABLE "_pages_v_blocks_japanese_hero" DROP COLUMN "show_divider";
  DROP TYPE "public"."enum_pages_blocks_image_carousel_autoplay_interval";
  DROP TYPE "public"."enum__pages_v_blocks_image_carousel_autoplay_interval";`)
}
