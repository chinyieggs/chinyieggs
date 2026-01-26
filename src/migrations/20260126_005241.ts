import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_content_columns_content_type" AS ENUM('text', 'media', 'both');
  CREATE TYPE "public"."enum_pages_blocks_content_columns_media_position" AS ENUM('above', 'below');
  CREATE TYPE "public"."enum_pages_blocks_youtube_aspect_ratio" AS ENUM('16:9', '4:3', '1:1', '9:16');
  CREATE TYPE "public"."enum_pages_blocks_japanese_hero_title_font" AS ENUM('serif', 'sans');
  CREATE TYPE "public"."enum_pages_blocks_japanese_hero_size" AS ENUM('small', 'medium', 'large', 'full');
  CREATE TYPE "public"."enum_pages_blocks_stats_grid_background_color" AS ENUM('kinari', 'shiro', 'sumi');
  CREATE TYPE "public"."enum_pages_blocks_stats_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_product_grid_items_product_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_product_grid_items_product_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_product_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_page_nav_items_nav_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_pages_blocks_page_nav_items_nav_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_pages_blocks_page_nav_style" AS ENUM('tabs', 'buttons', 'text');
  CREATE TYPE "public"."enum_pages_blocks_page_nav_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum_pages_blocks_timeline_layout" AS ENUM('alternating', 'left', 'right');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_card_style" AS ENUM('imageTop', 'imageLeft', 'textOnly');
  CREATE TYPE "public"."enum_pages_blocks_feature_grid_background_color" AS ENUM('shiro', 'kinari');
  CREATE TYPE "public"."enum_pages_blocks_highlight_box_variant" AS ENUM('quote', 'info', 'highlight', 'warning');
  CREATE TYPE "public"."enum_pages_blocks_check_list_icon" AS ENUM('check', 'bullet', 'number', 'star');
  CREATE TYPE "public"."enum_pages_blocks_check_list_columns" AS ENUM('1', '2');
  CREATE TYPE "public"."enum_pages_blocks_spec_table_style" AS ENUM('striped', 'bordered', 'minimal');
  CREATE TYPE "public"."enum_pages_blocks_certification_grid_background_color" AS ENUM('kinari', 'shiro');
  CREATE TYPE "public"."enum_pages_blocks_section_intro_text_align" AS ENUM('center', 'left');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_content_type" AS ENUM('text', 'media', 'both');
  CREATE TYPE "public"."enum__pages_v_blocks_content_columns_media_position" AS ENUM('above', 'below');
  CREATE TYPE "public"."enum__pages_v_blocks_youtube_aspect_ratio" AS ENUM('16:9', '4:3', '1:1', '9:16');
  CREATE TYPE "public"."enum__pages_v_blocks_japanese_hero_title_font" AS ENUM('serif', 'sans');
  CREATE TYPE "public"."enum__pages_v_blocks_japanese_hero_size" AS ENUM('small', 'medium', 'large', 'full');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_grid_background_color" AS ENUM('kinari', 'shiro', 'sumi');
  CREATE TYPE "public"."enum__pages_v_blocks_stats_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_product_grid_items_product_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_product_grid_items_product_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_product_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_page_nav_items_nav_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum__pages_v_blocks_page_nav_items_nav_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_page_nav_style" AS ENUM('tabs', 'buttons', 'text');
  CREATE TYPE "public"."enum__pages_v_blocks_page_nav_alignment" AS ENUM('left', 'center', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_timeline_layout" AS ENUM('alternating', 'left', 'right');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_columns" AS ENUM('2', '3', '4');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_card_style" AS ENUM('imageTop', 'imageLeft', 'textOnly');
  CREATE TYPE "public"."enum__pages_v_blocks_feature_grid_background_color" AS ENUM('shiro', 'kinari');
  CREATE TYPE "public"."enum__pages_v_blocks_highlight_box_variant" AS ENUM('quote', 'info', 'highlight', 'warning');
  CREATE TYPE "public"."enum__pages_v_blocks_check_list_icon" AS ENUM('check', 'bullet', 'number', 'star');
  CREATE TYPE "public"."enum__pages_v_blocks_check_list_columns" AS ENUM('1', '2');
  CREATE TYPE "public"."enum__pages_v_blocks_spec_table_style" AS ENUM('striped', 'bordered', 'minimal');
  CREATE TYPE "public"."enum__pages_v_blocks_certification_grid_background_color" AS ENUM('kinari', 'shiro');
  CREATE TYPE "public"."enum__pages_v_blocks_section_intro_text_align" AS ENUM('center', 'left');
  CREATE TYPE "public"."enum_header_nav_items_submenu_link_type" AS ENUM('reference', 'custom');
  CREATE TYPE "public"."enum_header_nav_items_submenu_link_appearance" AS ENUM('default', 'outline');
  CREATE TYPE "public"."enum_header_style" AS ENUM('default', 'japanese');
  CREATE TYPE "public"."enum_footer_style" AS ENUM('default', 'japanese');
  CREATE TABLE "pages_blocks_youtube" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"title" varchar,
  	"width" numeric DEFAULT 100,
  	"aspect_ratio" "enum_pages_blocks_youtube_aspect_ratio" DEFAULT '16:9',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_japanese_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Taiwan''s Most Trusted',
  	"title" varchar DEFAULT 'CHINYI EGGS',
  	"subtitle" varchar DEFAULT 'Cherishing Everyone. Treasuring Taiwan.',
  	"title_font" "enum_pages_blocks_japanese_hero_title_font" DEFAULT 'serif',
  	"background_image_id" integer,
  	"background_image_url" varchar,
  	"size" "enum_pages_blocks_japanese_hero_size" DEFAULT 'medium',
  	"overlay_opacity" numeric DEFAULT 40,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"label" varchar,
  	"suffix" varchar
  );
  
  CREATE TABLE "pages_blocks_stats_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"background_color" "enum_pages_blocks_stats_grid_background_color" DEFAULT 'kinari',
  	"columns" "enum_pages_blocks_stats_grid_columns" DEFAULT '4',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_product_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_url" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"product_link_type" "enum_pages_blocks_product_grid_items_product_link_type" DEFAULT 'reference',
  	"product_link_new_tab" boolean,
  	"product_link_url" varchar,
  	"product_link_label" varchar,
  	"product_link_appearance" "enum_pages_blocks_product_grid_items_product_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "pages_blocks_product_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_label" varchar DEFAULT 'Products',
  	"section_title" varchar DEFAULT 'Our Product Lines',
  	"columns" "enum_pages_blocks_product_grid_columns" DEFAULT '3',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_page_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"nav_link_type" "enum_pages_blocks_page_nav_items_nav_link_type" DEFAULT 'reference',
  	"nav_link_new_tab" boolean,
  	"nav_link_url" varchar,
  	"nav_link_label" varchar,
  	"nav_link_appearance" "enum_pages_blocks_page_nav_items_nav_link_appearance" DEFAULT 'default',
  	"is_active" boolean DEFAULT false
  );
  
  CREATE TABLE "pages_blocks_page_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"group_id" varchar,
  	"style" "enum_pages_blocks_page_nav_style" DEFAULT 'tabs',
  	"alignment" "enum_pages_blocks_page_nav_alignment" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_timeline_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"year" varchar,
  	"title" varchar,
  	"description" jsonb,
  	"image_id" integer
  );
  
  CREATE TABLE "pages_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_label" varchar DEFAULT 'History',
  	"section_title" varchar DEFAULT 'Corporate Milestones',
  	"layout" "enum_pages_blocks_timeline_layout" DEFAULT 'alternating',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_url" varchar,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_label" varchar,
  	"section_title" varchar,
  	"columns" "enum_pages_blocks_feature_grid_columns" DEFAULT '3',
  	"card_style" "enum_pages_blocks_feature_grid_card_style" DEFAULT 'imageTop',
  	"background_color" "enum_pages_blocks_feature_grid_background_color" DEFAULT 'shiro',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_highlight_box" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"variant" "enum_pages_blocks_highlight_box_variant" DEFAULT 'quote',
  	"content" jsonb,
  	"author" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_check_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_check_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"icon" "enum_pages_blocks_check_list_icon" DEFAULT 'check',
  	"columns" "enum_pages_blocks_check_list_columns" DEFAULT '1',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_spec_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar
  );
  
  CREATE TABLE "pages_blocks_spec_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"show_headers" boolean DEFAULT true,
  	"column_headers_label_header" varchar DEFAULT 'Item',
  	"column_headers_value_header" varchar DEFAULT 'Specification',
  	"style" "enum_pages_blocks_spec_table_style" DEFAULT 'striped',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_certification_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"icon_id" integer
  );
  
  CREATE TABLE "pages_blocks_certification_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"section_label" varchar DEFAULT 'Quality',
  	"section_title" varchar DEFAULT 'Certified Excellence',
  	"description" varchar,
  	"background_color" "enum_pages_blocks_certification_grid_background_color" DEFAULT 'kinari',
  	"block_name" varchar
  );
  
  CREATE TABLE "pages_blocks_section_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"content" jsonb,
  	"show_divider" boolean DEFAULT true,
  	"cta_label" varchar,
  	"cta_link" varchar,
  	"text_align" "enum_pages_blocks_section_intro_text_align" DEFAULT 'center',
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_youtube" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"title" varchar,
  	"width" numeric DEFAULT 100,
  	"aspect_ratio" "enum__pages_v_blocks_youtube_aspect_ratio" DEFAULT '16:9',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_japanese_hero" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar DEFAULT 'Taiwan''s Most Trusted',
  	"title" varchar DEFAULT 'CHINYI EGGS',
  	"subtitle" varchar DEFAULT 'Cherishing Everyone. Treasuring Taiwan.',
  	"title_font" "enum__pages_v_blocks_japanese_hero_title_font" DEFAULT 'serif',
  	"background_image_id" integer,
  	"background_image_url" varchar,
  	"size" "enum__pages_v_blocks_japanese_hero_size" DEFAULT 'medium',
  	"overlay_opacity" numeric DEFAULT 40,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"number" varchar,
  	"label" varchar,
  	"suffix" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_stats_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"background_color" "enum__pages_v_blocks_stats_grid_background_color" DEFAULT 'kinari',
  	"columns" "enum__pages_v_blocks_stats_grid_columns" DEFAULT '4',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_url" varchar,
  	"title" varchar,
  	"subtitle" varchar,
  	"description" varchar,
  	"product_link_type" "enum__pages_v_blocks_product_grid_items_product_link_type" DEFAULT 'reference',
  	"product_link_new_tab" boolean,
  	"product_link_url" varchar,
  	"product_link_label" varchar,
  	"product_link_appearance" "enum__pages_v_blocks_product_grid_items_product_link_appearance" DEFAULT 'default',
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_product_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_label" varchar DEFAULT 'Products',
  	"section_title" varchar DEFAULT 'Our Product Lines',
  	"columns" "enum__pages_v_blocks_product_grid_columns" DEFAULT '3',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_page_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"nav_link_type" "enum__pages_v_blocks_page_nav_items_nav_link_type" DEFAULT 'reference',
  	"nav_link_new_tab" boolean,
  	"nav_link_url" varchar,
  	"nav_link_label" varchar,
  	"nav_link_appearance" "enum__pages_v_blocks_page_nav_items_nav_link_appearance" DEFAULT 'default',
  	"is_active" boolean DEFAULT false,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_page_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"group_id" varchar,
  	"style" "enum__pages_v_blocks_page_nav_style" DEFAULT 'tabs',
  	"alignment" "enum__pages_v_blocks_page_nav_alignment" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_timeline_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"year" varchar,
  	"title" varchar,
  	"description" jsonb,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_timeline" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_label" varchar DEFAULT 'History',
  	"section_title" varchar DEFAULT 'Corporate Milestones',
  	"layout" "enum__pages_v_blocks_timeline_layout" DEFAULT 'alternating',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"image_url" varchar,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_feature_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_label" varchar,
  	"section_title" varchar,
  	"columns" "enum__pages_v_blocks_feature_grid_columns" DEFAULT '3',
  	"card_style" "enum__pages_v_blocks_feature_grid_card_style" DEFAULT 'imageTop',
  	"background_color" "enum__pages_v_blocks_feature_grid_background_color" DEFAULT 'shiro',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_highlight_box" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"variant" "enum__pages_v_blocks_highlight_box_variant" DEFAULT 'quote',
  	"content" jsonb,
  	"author" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_check_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_check_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"icon" "enum__pages_v_blocks_check_list_icon" DEFAULT 'check',
  	"columns" "enum__pages_v_blocks_check_list_columns" DEFAULT '1',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_spec_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_spec_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"show_headers" boolean DEFAULT true,
  	"column_headers_label_header" varchar DEFAULT 'Item',
  	"column_headers_value_header" varchar DEFAULT 'Specification',
  	"style" "enum__pages_v_blocks_spec_table_style" DEFAULT 'striped',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_certification_grid_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"description" varchar,
  	"icon_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_certification_grid" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"section_label" varchar DEFAULT 'Quality',
  	"section_title" varchar DEFAULT 'Certified Excellence',
  	"description" varchar,
  	"background_color" "enum__pages_v_blocks_certification_grid_background_color" DEFAULT 'kinari',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_section_intro" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"title" varchar,
  	"content" jsonb,
  	"show_divider" boolean DEFAULT true,
  	"cta_label" varchar,
  	"cta_link" varchar,
  	"text_align" "enum__pages_v_blocks_section_intro_text_align" DEFAULT 'center',
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "header_nav_items_submenu" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"link_type" "enum_header_nav_items_submenu_link_type" DEFAULT 'reference',
  	"link_new_tab" boolean,
  	"link_url" varchar,
  	"link_label" varchar NOT NULL,
  	"link_appearance" "enum_header_nav_items_submenu_link_appearance" DEFAULT 'default'
  );
  
  CREATE TABLE "footer_certifications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  ALTER TABLE "pages_blocks_archive" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_archive" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_populated_authors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "posts_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_version_populated_authors" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_posts_v_rels" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categories_breadcrumbs" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "search_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "search" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "search_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_archive" CASCADE;
  DROP TABLE "_pages_v_blocks_archive" CASCADE;
  DROP TABLE "posts_populated_authors" CASCADE;
  DROP TABLE "posts" CASCADE;
  DROP TABLE "posts_rels" CASCADE;
  DROP TABLE "_posts_v_version_populated_authors" CASCADE;
  DROP TABLE "_posts_v" CASCADE;
  DROP TABLE "_posts_v_rels" CASCADE;
  DROP TABLE "categories_breadcrumbs" CASCADE;
  DROP TABLE "categories" CASCADE;
  DROP TABLE "search_categories" CASCADE;
  DROP TABLE "search" CASCADE;
  DROP TABLE "search_rels" CASCADE;
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_posts_fk";
  
  ALTER TABLE "pages_rels" DROP CONSTRAINT "pages_rels_categories_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_posts_fk";
  
  ALTER TABLE "_pages_v_rels" DROP CONSTRAINT "_pages_v_rels_categories_fk";
  
  ALTER TABLE "redirects_rels" DROP CONSTRAINT "redirects_rels_posts_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_posts_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_categories_fk";
  
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_search_fk";
  
  ALTER TABLE "header_rels" DROP CONSTRAINT "header_rels_posts_fk";
  
  ALTER TABLE "footer_rels" DROP CONSTRAINT "footer_rels_posts_fk";
  
  DROP INDEX "pages_rels_posts_id_idx";
  DROP INDEX "pages_rels_categories_id_idx";
  DROP INDEX "_pages_v_rels_posts_id_idx";
  DROP INDEX "_pages_v_rels_categories_id_idx";
  DROP INDEX "redirects_rels_posts_id_idx";
  DROP INDEX "payload_locked_documents_rels_posts_id_idx";
  DROP INDEX "payload_locked_documents_rels_categories_id_idx";
  DROP INDEX "payload_locked_documents_rels_search_id_idx";
  DROP INDEX "header_rels_posts_id_idx";
  DROP INDEX "footer_rels_posts_id_idx";
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "content_type" "enum_pages_blocks_content_columns_content_type" DEFAULT 'text';
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "media_id" integer;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "media_width" numeric DEFAULT 100;
  ALTER TABLE "pages_blocks_content_columns" ADD COLUMN "media_position" "enum_pages_blocks_content_columns_media_position" DEFAULT 'above';
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "image_url" varchar;
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "alt" varchar;
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "width" numeric DEFAULT 100;
  ALTER TABLE "pages_blocks_media_block" ADD COLUMN "offset_x" numeric DEFAULT 0;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "content_type" "enum__pages_v_blocks_content_columns_content_type" DEFAULT 'text';
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "media_id" integer;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "media_width" numeric DEFAULT 100;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD COLUMN "media_position" "enum__pages_v_blocks_content_columns_media_position" DEFAULT 'above';
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "image_url" varchar;
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "alt" varchar;
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "width" numeric DEFAULT 100;
  ALTER TABLE "_pages_v_blocks_media_block" ADD COLUMN "offset_x" numeric DEFAULT 0;
  ALTER TABLE "header" ADD COLUMN "style" "enum_header_style" DEFAULT 'default';
  ALTER TABLE "header" ADD COLUMN "logo_text" varchar DEFAULT 'CHINYI EGGS';
  ALTER TABLE "header" ADD COLUMN "show_language_switch" boolean DEFAULT true;
  ALTER TABLE "footer" ADD COLUMN "style" "enum_footer_style" DEFAULT 'default';
  ALTER TABLE "footer" ADD COLUMN "company_name" varchar DEFAULT 'CHINYI EGGS TECHNOLOGY';
  ALTER TABLE "footer" ADD COLUMN "contact_info_address" varchar DEFAULT 'No. 37, Xinmin Road, Chiayi City, Taiwan';
  ALTER TABLE "footer" ADD COLUMN "contact_info_phone" varchar DEFAULT '05-2354049';
  ALTER TABLE "footer" ADD COLUMN "contact_info_fax" varchar;
  ALTER TABLE "footer" ADD COLUMN "copyright" varchar;
  ALTER TABLE "pages_blocks_youtube" ADD CONSTRAINT "pages_blocks_youtube_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_japanese_hero" ADD CONSTRAINT "pages_blocks_japanese_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_japanese_hero" ADD CONSTRAINT "pages_blocks_japanese_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_grid_items" ADD CONSTRAINT "pages_blocks_stats_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_stats_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_stats_grid" ADD CONSTRAINT "pages_blocks_stats_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_grid_items" ADD CONSTRAINT "pages_blocks_product_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_grid_items" ADD CONSTRAINT "pages_blocks_product_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_product_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_product_grid" ADD CONSTRAINT "pages_blocks_product_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_page_nav_items" ADD CONSTRAINT "pages_blocks_page_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_page_nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_page_nav" ADD CONSTRAINT "pages_blocks_page_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline_items" ADD CONSTRAINT "pages_blocks_timeline_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline_items" ADD CONSTRAINT "pages_blocks_timeline_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_timeline" ADD CONSTRAINT "pages_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_items" ADD CONSTRAINT "pages_blocks_feature_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid_items" ADD CONSTRAINT "pages_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_feature_grid" ADD CONSTRAINT "pages_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_highlight_box" ADD CONSTRAINT "pages_blocks_highlight_box_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_check_list_items" ADD CONSTRAINT "pages_blocks_check_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_check_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_check_list" ADD CONSTRAINT "pages_blocks_check_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_spec_table_rows" ADD CONSTRAINT "pages_blocks_spec_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_spec_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_spec_table" ADD CONSTRAINT "pages_blocks_spec_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_certification_grid_items" ADD CONSTRAINT "pages_blocks_certification_grid_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_certification_grid_items" ADD CONSTRAINT "pages_blocks_certification_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_certification_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_certification_grid" ADD CONSTRAINT "pages_blocks_certification_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_section_intro" ADD CONSTRAINT "pages_blocks_section_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_youtube" ADD CONSTRAINT "_pages_v_blocks_youtube_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_japanese_hero" ADD CONSTRAINT "_pages_v_blocks_japanese_hero_background_image_id_media_id_fk" FOREIGN KEY ("background_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_japanese_hero" ADD CONSTRAINT "_pages_v_blocks_japanese_hero_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_grid_items" ADD CONSTRAINT "_pages_v_blocks_stats_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_stats_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_stats_grid" ADD CONSTRAINT "_pages_v_blocks_stats_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_grid_items" ADD CONSTRAINT "_pages_v_blocks_product_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_grid_items" ADD CONSTRAINT "_pages_v_blocks_product_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_product_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_product_grid" ADD CONSTRAINT "_pages_v_blocks_product_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_page_nav_items" ADD CONSTRAINT "_pages_v_blocks_page_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_page_nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_page_nav" ADD CONSTRAINT "_pages_v_blocks_page_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline_items" ADD CONSTRAINT "_pages_v_blocks_timeline_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline_items" ADD CONSTRAINT "_pages_v_blocks_timeline_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_timeline"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_timeline" ADD CONSTRAINT "_pages_v_blocks_timeline_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid_items" ADD CONSTRAINT "_pages_v_blocks_feature_grid_items_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid_items" ADD CONSTRAINT "_pages_v_blocks_feature_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_feature_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_feature_grid" ADD CONSTRAINT "_pages_v_blocks_feature_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_highlight_box" ADD CONSTRAINT "_pages_v_blocks_highlight_box_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_check_list_items" ADD CONSTRAINT "_pages_v_blocks_check_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_check_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_check_list" ADD CONSTRAINT "_pages_v_blocks_check_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_spec_table_rows" ADD CONSTRAINT "_pages_v_blocks_spec_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_spec_table"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_spec_table" ADD CONSTRAINT "_pages_v_blocks_spec_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_certification_grid_items" ADD CONSTRAINT "_pages_v_blocks_certification_grid_items_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_certification_grid_items" ADD CONSTRAINT "_pages_v_blocks_certification_grid_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_certification_grid"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_certification_grid" ADD CONSTRAINT "_pages_v_blocks_certification_grid_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_section_intro" ADD CONSTRAINT "_pages_v_blocks_section_intro_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_nav_items_submenu" ADD CONSTRAINT "header_nav_items_submenu_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header_nav_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_certifications" ADD CONSTRAINT "footer_certifications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_youtube_order_idx" ON "pages_blocks_youtube" USING btree ("_order");
  CREATE INDEX "pages_blocks_youtube_parent_id_idx" ON "pages_blocks_youtube" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_youtube_path_idx" ON "pages_blocks_youtube" USING btree ("_path");
  CREATE INDEX "pages_blocks_japanese_hero_order_idx" ON "pages_blocks_japanese_hero" USING btree ("_order");
  CREATE INDEX "pages_blocks_japanese_hero_parent_id_idx" ON "pages_blocks_japanese_hero" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_japanese_hero_path_idx" ON "pages_blocks_japanese_hero" USING btree ("_path");
  CREATE INDEX "pages_blocks_japanese_hero_background_image_idx" ON "pages_blocks_japanese_hero" USING btree ("background_image_id");
  CREATE INDEX "pages_blocks_stats_grid_items_order_idx" ON "pages_blocks_stats_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_grid_items_parent_id_idx" ON "pages_blocks_stats_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_grid_order_idx" ON "pages_blocks_stats_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_stats_grid_parent_id_idx" ON "pages_blocks_stats_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_stats_grid_path_idx" ON "pages_blocks_stats_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_product_grid_items_order_idx" ON "pages_blocks_product_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_grid_items_parent_id_idx" ON "pages_blocks_product_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_grid_items_image_idx" ON "pages_blocks_product_grid_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_product_grid_order_idx" ON "pages_blocks_product_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_product_grid_parent_id_idx" ON "pages_blocks_product_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_product_grid_path_idx" ON "pages_blocks_product_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_page_nav_items_order_idx" ON "pages_blocks_page_nav_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_page_nav_items_parent_id_idx" ON "pages_blocks_page_nav_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_page_nav_order_idx" ON "pages_blocks_page_nav" USING btree ("_order");
  CREATE INDEX "pages_blocks_page_nav_parent_id_idx" ON "pages_blocks_page_nav" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_page_nav_path_idx" ON "pages_blocks_page_nav" USING btree ("_path");
  CREATE INDEX "pages_blocks_timeline_items_order_idx" ON "pages_blocks_timeline_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_timeline_items_parent_id_idx" ON "pages_blocks_timeline_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_timeline_items_image_idx" ON "pages_blocks_timeline_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_timeline_order_idx" ON "pages_blocks_timeline" USING btree ("_order");
  CREATE INDEX "pages_blocks_timeline_parent_id_idx" ON "pages_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_timeline_path_idx" ON "pages_blocks_timeline" USING btree ("_path");
  CREATE INDEX "pages_blocks_feature_grid_items_order_idx" ON "pages_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_grid_items_parent_id_idx" ON "pages_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_items_image_idx" ON "pages_blocks_feature_grid_items" USING btree ("image_id");
  CREATE INDEX "pages_blocks_feature_grid_order_idx" ON "pages_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_feature_grid_parent_id_idx" ON "pages_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_feature_grid_path_idx" ON "pages_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_highlight_box_order_idx" ON "pages_blocks_highlight_box" USING btree ("_order");
  CREATE INDEX "pages_blocks_highlight_box_parent_id_idx" ON "pages_blocks_highlight_box" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_highlight_box_path_idx" ON "pages_blocks_highlight_box" USING btree ("_path");
  CREATE INDEX "pages_blocks_check_list_items_order_idx" ON "pages_blocks_check_list_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_check_list_items_parent_id_idx" ON "pages_blocks_check_list_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_check_list_order_idx" ON "pages_blocks_check_list" USING btree ("_order");
  CREATE INDEX "pages_blocks_check_list_parent_id_idx" ON "pages_blocks_check_list" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_check_list_path_idx" ON "pages_blocks_check_list" USING btree ("_path");
  CREATE INDEX "pages_blocks_spec_table_rows_order_idx" ON "pages_blocks_spec_table_rows" USING btree ("_order");
  CREATE INDEX "pages_blocks_spec_table_rows_parent_id_idx" ON "pages_blocks_spec_table_rows" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_spec_table_order_idx" ON "pages_blocks_spec_table" USING btree ("_order");
  CREATE INDEX "pages_blocks_spec_table_parent_id_idx" ON "pages_blocks_spec_table" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_spec_table_path_idx" ON "pages_blocks_spec_table" USING btree ("_path");
  CREATE INDEX "pages_blocks_certification_grid_items_order_idx" ON "pages_blocks_certification_grid_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_certification_grid_items_parent_id_idx" ON "pages_blocks_certification_grid_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_certification_grid_items_icon_idx" ON "pages_blocks_certification_grid_items" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_certification_grid_order_idx" ON "pages_blocks_certification_grid" USING btree ("_order");
  CREATE INDEX "pages_blocks_certification_grid_parent_id_idx" ON "pages_blocks_certification_grid" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_certification_grid_path_idx" ON "pages_blocks_certification_grid" USING btree ("_path");
  CREATE INDEX "pages_blocks_section_intro_order_idx" ON "pages_blocks_section_intro" USING btree ("_order");
  CREATE INDEX "pages_blocks_section_intro_parent_id_idx" ON "pages_blocks_section_intro" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_section_intro_path_idx" ON "pages_blocks_section_intro" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_youtube_order_idx" ON "_pages_v_blocks_youtube" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_youtube_parent_id_idx" ON "_pages_v_blocks_youtube" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_youtube_path_idx" ON "_pages_v_blocks_youtube" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_japanese_hero_order_idx" ON "_pages_v_blocks_japanese_hero" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_japanese_hero_parent_id_idx" ON "_pages_v_blocks_japanese_hero" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_japanese_hero_path_idx" ON "_pages_v_blocks_japanese_hero" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_japanese_hero_background_image_idx" ON "_pages_v_blocks_japanese_hero" USING btree ("background_image_id");
  CREATE INDEX "_pages_v_blocks_stats_grid_items_order_idx" ON "_pages_v_blocks_stats_grid_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_grid_items_parent_id_idx" ON "_pages_v_blocks_stats_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_grid_order_idx" ON "_pages_v_blocks_stats_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_stats_grid_parent_id_idx" ON "_pages_v_blocks_stats_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_stats_grid_path_idx" ON "_pages_v_blocks_stats_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_product_grid_items_order_idx" ON "_pages_v_blocks_product_grid_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_grid_items_parent_id_idx" ON "_pages_v_blocks_product_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_grid_items_image_idx" ON "_pages_v_blocks_product_grid_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_product_grid_order_idx" ON "_pages_v_blocks_product_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_product_grid_parent_id_idx" ON "_pages_v_blocks_product_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_product_grid_path_idx" ON "_pages_v_blocks_product_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_page_nav_items_order_idx" ON "_pages_v_blocks_page_nav_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_page_nav_items_parent_id_idx" ON "_pages_v_blocks_page_nav_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_page_nav_order_idx" ON "_pages_v_blocks_page_nav" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_page_nav_parent_id_idx" ON "_pages_v_blocks_page_nav" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_page_nav_path_idx" ON "_pages_v_blocks_page_nav" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_timeline_items_order_idx" ON "_pages_v_blocks_timeline_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_timeline_items_parent_id_idx" ON "_pages_v_blocks_timeline_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_timeline_items_image_idx" ON "_pages_v_blocks_timeline_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_timeline_order_idx" ON "_pages_v_blocks_timeline" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_timeline_parent_id_idx" ON "_pages_v_blocks_timeline" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_timeline_path_idx" ON "_pages_v_blocks_timeline" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_feature_grid_items_order_idx" ON "_pages_v_blocks_feature_grid_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_grid_items_parent_id_idx" ON "_pages_v_blocks_feature_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_items_image_idx" ON "_pages_v_blocks_feature_grid_items" USING btree ("image_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_order_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_feature_grid_parent_id_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_feature_grid_path_idx" ON "_pages_v_blocks_feature_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_highlight_box_order_idx" ON "_pages_v_blocks_highlight_box" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_highlight_box_parent_id_idx" ON "_pages_v_blocks_highlight_box" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_highlight_box_path_idx" ON "_pages_v_blocks_highlight_box" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_check_list_items_order_idx" ON "_pages_v_blocks_check_list_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_check_list_items_parent_id_idx" ON "_pages_v_blocks_check_list_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_check_list_order_idx" ON "_pages_v_blocks_check_list" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_check_list_parent_id_idx" ON "_pages_v_blocks_check_list" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_check_list_path_idx" ON "_pages_v_blocks_check_list" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_spec_table_rows_order_idx" ON "_pages_v_blocks_spec_table_rows" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_spec_table_rows_parent_id_idx" ON "_pages_v_blocks_spec_table_rows" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_spec_table_order_idx" ON "_pages_v_blocks_spec_table" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_spec_table_parent_id_idx" ON "_pages_v_blocks_spec_table" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_spec_table_path_idx" ON "_pages_v_blocks_spec_table" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_certification_grid_items_order_idx" ON "_pages_v_blocks_certification_grid_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_certification_grid_items_parent_id_idx" ON "_pages_v_blocks_certification_grid_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_certification_grid_items_icon_idx" ON "_pages_v_blocks_certification_grid_items" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_certification_grid_order_idx" ON "_pages_v_blocks_certification_grid" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_certification_grid_parent_id_idx" ON "_pages_v_blocks_certification_grid" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_certification_grid_path_idx" ON "_pages_v_blocks_certification_grid" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_section_intro_order_idx" ON "_pages_v_blocks_section_intro" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_section_intro_parent_id_idx" ON "_pages_v_blocks_section_intro" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_section_intro_path_idx" ON "_pages_v_blocks_section_intro" USING btree ("_path");
  CREATE INDEX "header_nav_items_submenu_order_idx" ON "header_nav_items_submenu" USING btree ("_order");
  CREATE INDEX "header_nav_items_submenu_parent_id_idx" ON "header_nav_items_submenu" USING btree ("_parent_id");
  CREATE INDEX "footer_certifications_order_idx" ON "footer_certifications" USING btree ("_order");
  CREATE INDEX "footer_certifications_parent_id_idx" ON "footer_certifications" USING btree ("_parent_id");
  ALTER TABLE "pages_blocks_content_columns" ADD CONSTRAINT "pages_blocks_content_columns_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_content_columns" ADD CONSTRAINT "_pages_v_blocks_content_columns_media_id_media_id_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_content_columns_media_idx" ON "pages_blocks_content_columns" USING btree ("media_id");
  CREATE INDEX "_pages_v_blocks_content_columns_media_idx" ON "_pages_v_blocks_content_columns" USING btree ("media_id");
  ALTER TABLE "pages_rels" DROP COLUMN "posts_id";
  ALTER TABLE "pages_rels" DROP COLUMN "categories_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "posts_id";
  ALTER TABLE "_pages_v_rels" DROP COLUMN "categories_id";
  ALTER TABLE "redirects_rels" DROP COLUMN "posts_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "posts_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "categories_id";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "search_id";
  ALTER TABLE "header_rels" DROP COLUMN "posts_id";
  ALTER TABLE "footer_rels" DROP COLUMN "posts_id";
  DROP TYPE "public"."enum_pages_blocks_archive_populate_by";
  DROP TYPE "public"."enum_pages_blocks_archive_relation_to";
  DROP TYPE "public"."enum__pages_v_blocks_archive_populate_by";
  DROP TYPE "public"."enum__pages_v_blocks_archive_relation_to";
  DROP TYPE "public"."enum_posts_status";
  DROP TYPE "public"."enum__posts_v_version_status";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum_pages_blocks_archive_relation_to" AS ENUM('posts');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_populate_by" AS ENUM('collection', 'selection');
  CREATE TYPE "public"."enum__pages_v_blocks_archive_relation_to" AS ENUM('posts');
  CREATE TYPE "public"."enum_posts_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__posts_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE "pages_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populate_by" "enum_pages_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum_pages_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_archive" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"intro_content" jsonb,
  	"populate_by" "enum__pages_v_blocks_archive_populate_by" DEFAULT 'collection',
  	"relation_to" "enum__pages_v_blocks_archive_relation_to" DEFAULT 'posts',
  	"limit" numeric DEFAULT 10,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "posts_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar
  );
  
  CREATE TABLE "posts" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"hero_image_id" integer,
  	"content" jsonb,
  	"meta_title" varchar,
  	"meta_image_id" integer,
  	"meta_description" varchar,
  	"published_at" timestamp(3) with time zone,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_posts_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "posts_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"categories_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "_posts_v_version_populated_authors" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"name" varchar
  );
  
  CREATE TABLE "_posts_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_title" varchar,
  	"version_hero_image_id" integer,
  	"version_content" jsonb,
  	"version_meta_title" varchar,
  	"version_meta_image_id" integer,
  	"version_meta_description" varchar,
  	"version_published_at" timestamp(3) with time zone,
  	"version_generate_slug" boolean DEFAULT true,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__posts_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean,
  	"autosave" boolean
  );
  
  CREATE TABLE "_posts_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer,
  	"categories_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "categories_breadcrumbs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"doc_id" integer,
  	"url" varchar,
  	"label" varchar
  );
  
  CREATE TABLE "categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"generate_slug" boolean DEFAULT true,
  	"slug" varchar NOT NULL,
  	"parent_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "search_categories" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"relation_to" varchar,
  	"category_i_d" varchar,
  	"title" varchar
  );
  
  CREATE TABLE "search" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"priority" numeric,
  	"slug" varchar,
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "search_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"posts_id" integer
  );
  
  ALTER TABLE "pages_blocks_youtube" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_japanese_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stats_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_stats_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_product_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_product_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_nav_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_page_nav" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_timeline_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_feature_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_highlight_box" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_check_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_check_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_spec_table_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_spec_table" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_certification_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_certification_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_section_intro" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_youtube" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_japanese_hero" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_stats_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_stats_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_product_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_product_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_nav_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_page_nav" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_timeline_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_timeline" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_feature_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_highlight_box" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_check_list_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_check_list" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_spec_table_rows" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_spec_table" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_certification_grid_items" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_certification_grid" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_section_intro" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "header_nav_items_submenu" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_certifications" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_youtube" CASCADE;
  DROP TABLE "pages_blocks_japanese_hero" CASCADE;
  DROP TABLE "pages_blocks_stats_grid_items" CASCADE;
  DROP TABLE "pages_blocks_stats_grid" CASCADE;
  DROP TABLE "pages_blocks_product_grid_items" CASCADE;
  DROP TABLE "pages_blocks_product_grid" CASCADE;
  DROP TABLE "pages_blocks_page_nav_items" CASCADE;
  DROP TABLE "pages_blocks_page_nav" CASCADE;
  DROP TABLE "pages_blocks_timeline_items" CASCADE;
  DROP TABLE "pages_blocks_timeline" CASCADE;
  DROP TABLE "pages_blocks_feature_grid_items" CASCADE;
  DROP TABLE "pages_blocks_feature_grid" CASCADE;
  DROP TABLE "pages_blocks_highlight_box" CASCADE;
  DROP TABLE "pages_blocks_check_list_items" CASCADE;
  DROP TABLE "pages_blocks_check_list" CASCADE;
  DROP TABLE "pages_blocks_spec_table_rows" CASCADE;
  DROP TABLE "pages_blocks_spec_table" CASCADE;
  DROP TABLE "pages_blocks_certification_grid_items" CASCADE;
  DROP TABLE "pages_blocks_certification_grid" CASCADE;
  DROP TABLE "pages_blocks_section_intro" CASCADE;
  DROP TABLE "_pages_v_blocks_youtube" CASCADE;
  DROP TABLE "_pages_v_blocks_japanese_hero" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_grid_items" CASCADE;
  DROP TABLE "_pages_v_blocks_stats_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_product_grid_items" CASCADE;
  DROP TABLE "_pages_v_blocks_product_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_page_nav_items" CASCADE;
  DROP TABLE "_pages_v_blocks_page_nav" CASCADE;
  DROP TABLE "_pages_v_blocks_timeline_items" CASCADE;
  DROP TABLE "_pages_v_blocks_timeline" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_grid_items" CASCADE;
  DROP TABLE "_pages_v_blocks_feature_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_highlight_box" CASCADE;
  DROP TABLE "_pages_v_blocks_check_list_items" CASCADE;
  DROP TABLE "_pages_v_blocks_check_list" CASCADE;
  DROP TABLE "_pages_v_blocks_spec_table_rows" CASCADE;
  DROP TABLE "_pages_v_blocks_spec_table" CASCADE;
  DROP TABLE "_pages_v_blocks_certification_grid_items" CASCADE;
  DROP TABLE "_pages_v_blocks_certification_grid" CASCADE;
  DROP TABLE "_pages_v_blocks_section_intro" CASCADE;
  DROP TABLE "header_nav_items_submenu" CASCADE;
  DROP TABLE "footer_certifications" CASCADE;
  ALTER TABLE "pages_blocks_content_columns" DROP CONSTRAINT "pages_blocks_content_columns_media_id_media_id_fk";
  
  ALTER TABLE "_pages_v_blocks_content_columns" DROP CONSTRAINT "_pages_v_blocks_content_columns_media_id_media_id_fk";
  
  DROP INDEX "pages_blocks_content_columns_media_idx";
  DROP INDEX "_pages_v_blocks_content_columns_media_idx";
  ALTER TABLE "pages_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "pages_rels" ADD COLUMN "categories_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "_pages_v_rels" ADD COLUMN "categories_id" integer;
  ALTER TABLE "redirects_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "categories_id" integer;
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "search_id" integer;
  ALTER TABLE "header_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "footer_rels" ADD COLUMN "posts_id" integer;
  ALTER TABLE "pages_blocks_archive" ADD CONSTRAINT "pages_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_archive" ADD CONSTRAINT "_pages_v_blocks_archive_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_populated_authors" ADD CONSTRAINT "posts_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_hero_image_id_media_id_fk" FOREIGN KEY ("hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts" ADD CONSTRAINT "posts_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "posts_rels" ADD CONSTRAINT "posts_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_version_populated_authors" ADD CONSTRAINT "_posts_v_version_populated_authors_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_parent_id_posts_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."posts"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_hero_image_id_media_id_fk" FOREIGN KEY ("version_hero_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v" ADD CONSTRAINT "_posts_v_version_meta_image_id_media_id_fk" FOREIGN KEY ("version_meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_posts_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_posts_v_rels" ADD CONSTRAINT "_posts_v_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories_breadcrumbs" ADD CONSTRAINT "categories_breadcrumbs_doc_id_categories_id_fk" FOREIGN KEY ("doc_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "categories_breadcrumbs" ADD CONSTRAINT "categories_breadcrumbs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "categories" ADD CONSTRAINT "categories_parent_id_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "search_categories" ADD CONSTRAINT "search_categories_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search" ADD CONSTRAINT "search_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "search_rels" ADD CONSTRAINT "search_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_archive_order_idx" ON "pages_blocks_archive" USING btree ("_order");
  CREATE INDEX "pages_blocks_archive_parent_id_idx" ON "pages_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_archive_path_idx" ON "pages_blocks_archive" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_archive_order_idx" ON "_pages_v_blocks_archive" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_archive_parent_id_idx" ON "_pages_v_blocks_archive" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_archive_path_idx" ON "_pages_v_blocks_archive" USING btree ("_path");
  CREATE INDEX "posts_populated_authors_order_idx" ON "posts_populated_authors" USING btree ("_order");
  CREATE INDEX "posts_populated_authors_parent_id_idx" ON "posts_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "posts_hero_image_idx" ON "posts" USING btree ("hero_image_id");
  CREATE INDEX "posts_meta_meta_image_idx" ON "posts" USING btree ("meta_image_id");
  CREATE UNIQUE INDEX "posts_slug_idx" ON "posts" USING btree ("slug");
  CREATE INDEX "posts_updated_at_idx" ON "posts" USING btree ("updated_at");
  CREATE INDEX "posts_created_at_idx" ON "posts" USING btree ("created_at");
  CREATE INDEX "posts__status_idx" ON "posts" USING btree ("_status");
  CREATE INDEX "posts_rels_order_idx" ON "posts_rels" USING btree ("order");
  CREATE INDEX "posts_rels_parent_idx" ON "posts_rels" USING btree ("parent_id");
  CREATE INDEX "posts_rels_path_idx" ON "posts_rels" USING btree ("path");
  CREATE INDEX "posts_rels_posts_id_idx" ON "posts_rels" USING btree ("posts_id");
  CREATE INDEX "posts_rels_categories_id_idx" ON "posts_rels" USING btree ("categories_id");
  CREATE INDEX "posts_rels_users_id_idx" ON "posts_rels" USING btree ("users_id");
  CREATE INDEX "_posts_v_version_populated_authors_order_idx" ON "_posts_v_version_populated_authors" USING btree ("_order");
  CREATE INDEX "_posts_v_version_populated_authors_parent_id_idx" ON "_posts_v_version_populated_authors" USING btree ("_parent_id");
  CREATE INDEX "_posts_v_parent_idx" ON "_posts_v" USING btree ("parent_id");
  CREATE INDEX "_posts_v_version_version_hero_image_idx" ON "_posts_v" USING btree ("version_hero_image_id");
  CREATE INDEX "_posts_v_version_meta_version_meta_image_idx" ON "_posts_v" USING btree ("version_meta_image_id");
  CREATE INDEX "_posts_v_version_version_slug_idx" ON "_posts_v" USING btree ("version_slug");
  CREATE INDEX "_posts_v_version_version_updated_at_idx" ON "_posts_v" USING btree ("version_updated_at");
  CREATE INDEX "_posts_v_version_version_created_at_idx" ON "_posts_v" USING btree ("version_created_at");
  CREATE INDEX "_posts_v_version_version__status_idx" ON "_posts_v" USING btree ("version__status");
  CREATE INDEX "_posts_v_created_at_idx" ON "_posts_v" USING btree ("created_at");
  CREATE INDEX "_posts_v_updated_at_idx" ON "_posts_v" USING btree ("updated_at");
  CREATE INDEX "_posts_v_latest_idx" ON "_posts_v" USING btree ("latest");
  CREATE INDEX "_posts_v_autosave_idx" ON "_posts_v" USING btree ("autosave");
  CREATE INDEX "_posts_v_rels_order_idx" ON "_posts_v_rels" USING btree ("order");
  CREATE INDEX "_posts_v_rels_parent_idx" ON "_posts_v_rels" USING btree ("parent_id");
  CREATE INDEX "_posts_v_rels_path_idx" ON "_posts_v_rels" USING btree ("path");
  CREATE INDEX "_posts_v_rels_posts_id_idx" ON "_posts_v_rels" USING btree ("posts_id");
  CREATE INDEX "_posts_v_rels_categories_id_idx" ON "_posts_v_rels" USING btree ("categories_id");
  CREATE INDEX "_posts_v_rels_users_id_idx" ON "_posts_v_rels" USING btree ("users_id");
  CREATE INDEX "categories_breadcrumbs_order_idx" ON "categories_breadcrumbs" USING btree ("_order");
  CREATE INDEX "categories_breadcrumbs_parent_id_idx" ON "categories_breadcrumbs" USING btree ("_parent_id");
  CREATE INDEX "categories_breadcrumbs_doc_idx" ON "categories_breadcrumbs" USING btree ("doc_id");
  CREATE UNIQUE INDEX "categories_slug_idx" ON "categories" USING btree ("slug");
  CREATE INDEX "categories_parent_idx" ON "categories" USING btree ("parent_id");
  CREATE INDEX "categories_updated_at_idx" ON "categories" USING btree ("updated_at");
  CREATE INDEX "categories_created_at_idx" ON "categories" USING btree ("created_at");
  CREATE INDEX "search_categories_order_idx" ON "search_categories" USING btree ("_order");
  CREATE INDEX "search_categories_parent_id_idx" ON "search_categories" USING btree ("_parent_id");
  CREATE INDEX "search_slug_idx" ON "search" USING btree ("slug");
  CREATE INDEX "search_meta_meta_image_idx" ON "search" USING btree ("meta_image_id");
  CREATE INDEX "search_updated_at_idx" ON "search" USING btree ("updated_at");
  CREATE INDEX "search_created_at_idx" ON "search" USING btree ("created_at");
  CREATE INDEX "search_rels_order_idx" ON "search_rels" USING btree ("order");
  CREATE INDEX "search_rels_parent_idx" ON "search_rels" USING btree ("parent_id");
  CREATE INDEX "search_rels_path_idx" ON "search_rels" USING btree ("path");
  CREATE INDEX "search_rels_posts_id_idx" ON "search_rels" USING btree ("posts_id");
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_rels" ADD CONSTRAINT "pages_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_rels" ADD CONSTRAINT "_pages_v_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "redirects_rels" ADD CONSTRAINT "redirects_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_categories_fk" FOREIGN KEY ("categories_id") REFERENCES "public"."categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_search_fk" FOREIGN KEY ("search_id") REFERENCES "public"."search"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header_rels" ADD CONSTRAINT "header_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_rels" ADD CONSTRAINT "footer_rels_posts_fk" FOREIGN KEY ("posts_id") REFERENCES "public"."posts"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_rels_posts_id_idx" ON "pages_rels" USING btree ("posts_id");
  CREATE INDEX "pages_rels_categories_id_idx" ON "pages_rels" USING btree ("categories_id");
  CREATE INDEX "_pages_v_rels_posts_id_idx" ON "_pages_v_rels" USING btree ("posts_id");
  CREATE INDEX "_pages_v_rels_categories_id_idx" ON "_pages_v_rels" USING btree ("categories_id");
  CREATE INDEX "redirects_rels_posts_id_idx" ON "redirects_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_posts_id_idx" ON "payload_locked_documents_rels" USING btree ("posts_id");
  CREATE INDEX "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
  CREATE INDEX "payload_locked_documents_rels_search_id_idx" ON "payload_locked_documents_rels" USING btree ("search_id");
  CREATE INDEX "header_rels_posts_id_idx" ON "header_rels" USING btree ("posts_id");
  CREATE INDEX "footer_rels_posts_id_idx" ON "footer_rels" USING btree ("posts_id");
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "content_type";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "media_id";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "media_width";
  ALTER TABLE "pages_blocks_content_columns" DROP COLUMN "media_position";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "image_url";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "alt";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "width";
  ALTER TABLE "pages_blocks_media_block" DROP COLUMN "offset_x";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "content_type";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "media_id";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "media_width";
  ALTER TABLE "_pages_v_blocks_content_columns" DROP COLUMN "media_position";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "image_url";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "alt";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "width";
  ALTER TABLE "_pages_v_blocks_media_block" DROP COLUMN "offset_x";
  ALTER TABLE "header" DROP COLUMN "style";
  ALTER TABLE "header" DROP COLUMN "logo_text";
  ALTER TABLE "header" DROP COLUMN "show_language_switch";
  ALTER TABLE "footer" DROP COLUMN "style";
  ALTER TABLE "footer" DROP COLUMN "company_name";
  ALTER TABLE "footer" DROP COLUMN "contact_info_address";
  ALTER TABLE "footer" DROP COLUMN "contact_info_phone";
  ALTER TABLE "footer" DROP COLUMN "contact_info_fax";
  ALTER TABLE "footer" DROP COLUMN "copyright";
  DROP TYPE "public"."enum_pages_blocks_content_columns_content_type";
  DROP TYPE "public"."enum_pages_blocks_content_columns_media_position";
  DROP TYPE "public"."enum_pages_blocks_youtube_aspect_ratio";
  DROP TYPE "public"."enum_pages_blocks_japanese_hero_title_font";
  DROP TYPE "public"."enum_pages_blocks_japanese_hero_size";
  DROP TYPE "public"."enum_pages_blocks_stats_grid_background_color";
  DROP TYPE "public"."enum_pages_blocks_stats_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_product_grid_items_product_link_type";
  DROP TYPE "public"."enum_pages_blocks_product_grid_items_product_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_product_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_page_nav_items_nav_link_type";
  DROP TYPE "public"."enum_pages_blocks_page_nav_items_nav_link_appearance";
  DROP TYPE "public"."enum_pages_blocks_page_nav_style";
  DROP TYPE "public"."enum_pages_blocks_page_nav_alignment";
  DROP TYPE "public"."enum_pages_blocks_timeline_layout";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_columns";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_card_style";
  DROP TYPE "public"."enum_pages_blocks_feature_grid_background_color";
  DROP TYPE "public"."enum_pages_blocks_highlight_box_variant";
  DROP TYPE "public"."enum_pages_blocks_check_list_icon";
  DROP TYPE "public"."enum_pages_blocks_check_list_columns";
  DROP TYPE "public"."enum_pages_blocks_spec_table_style";
  DROP TYPE "public"."enum_pages_blocks_certification_grid_background_color";
  DROP TYPE "public"."enum_pages_blocks_section_intro_text_align";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_content_type";
  DROP TYPE "public"."enum__pages_v_blocks_content_columns_media_position";
  DROP TYPE "public"."enum__pages_v_blocks_youtube_aspect_ratio";
  DROP TYPE "public"."enum__pages_v_blocks_japanese_hero_title_font";
  DROP TYPE "public"."enum__pages_v_blocks_japanese_hero_size";
  DROP TYPE "public"."enum__pages_v_blocks_stats_grid_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_stats_grid_columns";
  DROP TYPE "public"."enum__pages_v_blocks_product_grid_items_product_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_product_grid_items_product_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_product_grid_columns";
  DROP TYPE "public"."enum__pages_v_blocks_page_nav_items_nav_link_type";
  DROP TYPE "public"."enum__pages_v_blocks_page_nav_items_nav_link_appearance";
  DROP TYPE "public"."enum__pages_v_blocks_page_nav_style";
  DROP TYPE "public"."enum__pages_v_blocks_page_nav_alignment";
  DROP TYPE "public"."enum__pages_v_blocks_timeline_layout";
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_columns";
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_card_style";
  DROP TYPE "public"."enum__pages_v_blocks_feature_grid_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_highlight_box_variant";
  DROP TYPE "public"."enum__pages_v_blocks_check_list_icon";
  DROP TYPE "public"."enum__pages_v_blocks_check_list_columns";
  DROP TYPE "public"."enum__pages_v_blocks_spec_table_style";
  DROP TYPE "public"."enum__pages_v_blocks_certification_grid_background_color";
  DROP TYPE "public"."enum__pages_v_blocks_section_intro_text_align";
  DROP TYPE "public"."enum_header_nav_items_submenu_link_type";
  DROP TYPE "public"."enum_header_nav_items_submenu_link_appearance";
  DROP TYPE "public"."enum_header_style";
  DROP TYPE "public"."enum_footer_style";`)
}
