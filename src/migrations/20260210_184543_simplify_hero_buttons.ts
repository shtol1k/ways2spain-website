import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media" ADD COLUMN "sizes_hero_url" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_width" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_height" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_mime_type" varchar;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_filesize" numeric;
  ALTER TABLE "media" ADD COLUMN "sizes_hero_filename" varchar;
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  ALTER TABLE "pages_blocks_hero_buttons" DROP COLUMN "type";
  ALTER TABLE "pages_blocks_hero_buttons" DROP COLUMN "url";
  ALTER TABLE "pages_blocks_hero_buttons" DROP COLUMN "style";
  ALTER TABLE "_pages_v_blocks_hero_buttons" DROP COLUMN "type";
  ALTER TABLE "_pages_v_blocks_hero_buttons" DROP COLUMN "url";
  ALTER TABLE "_pages_v_blocks_hero_buttons" DROP COLUMN "style";
  DROP TYPE "public"."enum_pages_blocks_hero_buttons_type";
  DROP TYPE "public"."enum_pages_blocks_hero_buttons_style";
  DROP TYPE "public"."enum__pages_v_blocks_hero_buttons_type";
  DROP TYPE "public"."enum__pages_v_blocks_hero_buttons_style";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_pages_blocks_hero_buttons_type" AS ENUM('custom', 'page');
  CREATE TYPE "public"."enum_pages_blocks_hero_buttons_style" AS ENUM('primary', 'secondary', 'outline');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_buttons_type" AS ENUM('custom', 'page');
  CREATE TYPE "public"."enum__pages_v_blocks_hero_buttons_style" AS ENUM('primary', 'secondary', 'outline');
  DROP INDEX "media_sizes_hero_sizes_hero_filename_idx";
  ALTER TABLE "pages_blocks_hero_buttons" ADD COLUMN "type" "enum_pages_blocks_hero_buttons_type" DEFAULT 'custom';
  ALTER TABLE "pages_blocks_hero_buttons" ADD COLUMN "url" varchar;
  ALTER TABLE "pages_blocks_hero_buttons" ADD COLUMN "style" "enum_pages_blocks_hero_buttons_style" DEFAULT 'primary';
  ALTER TABLE "_pages_v_blocks_hero_buttons" ADD COLUMN "type" "enum__pages_v_blocks_hero_buttons_type" DEFAULT 'custom';
  ALTER TABLE "_pages_v_blocks_hero_buttons" ADD COLUMN "url" varchar;
  ALTER TABLE "_pages_v_blocks_hero_buttons" ADD COLUMN "style" "enum__pages_v_blocks_hero_buttons_style" DEFAULT 'primary';
  ALTER TABLE "media" DROP COLUMN "sizes_hero_url";
  ALTER TABLE "media" DROP COLUMN "sizes_hero_width";
  ALTER TABLE "media" DROP COLUMN "sizes_hero_height";
  ALTER TABLE "media" DROP COLUMN "sizes_hero_mime_type";
  ALTER TABLE "media" DROP COLUMN "sizes_hero_filesize";
  ALTER TABLE "media" DROP COLUMN "sizes_hero_filename";`)
}
