import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // 1. Drop old blocks tables (guideStepHeader and guideRichText were top-level blocks)
  await db.execute(sql`
    DROP TABLE IF EXISTS "guides_blocks_guide_step_header" CASCADE;
    DROP TABLE IF EXISTS "guides_blocks_guide_rich_text" CASCADE;
    DROP TABLE IF EXISTS "_guides_v_blocks_guide_step_header" CASCADE;
    DROP TABLE IF EXISTS "_guides_v_blocks_guide_rich_text" CASCADE;
  `)

  // 2. Drop old enum types
  await db.execute(sql`
    DROP TYPE IF EXISTS "public"."enum_guides_blocks_guide_step_header_format" CASCADE;
    DROP TYPE IF EXISTS "public"."enum__guides_v_blocks_guide_step_header_format" CASCADE;
  `)

  // 3. Add content jsonb column to guides (richText field replaces the blocks field)
  await db.execute(sql`
    ALTER TABLE "guides"
      ADD COLUMN IF NOT EXISTS "content" jsonb;
    ALTER TABLE "_guides_v"
      ADD COLUMN IF NOT EXISTS "version_content" jsonb;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Remove new content columns
  await db.execute(sql`
    ALTER TABLE "guides" DROP COLUMN IF EXISTS "content";
    ALTER TABLE "_guides_v" DROP COLUMN IF EXISTS "version_content";
  `)

  // Restore enum types
  await db.execute(sql`
    CREATE TYPE "public"."enum_guides_blocks_guide_step_header_format" AS ENUM('online', 'hybrid', 'offline');
    CREATE TYPE "public"."enum__guides_v_blocks_guide_step_header_format" AS ENUM('online', 'hybrid', 'offline');
  `)

  // Restore old blocks tables
  await db.execute(sql`
    CREATE TABLE "guides_blocks_guide_step_header" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "format" "enum_guides_blocks_guide_step_header_format",
      "duration" varchar,
      "cost" varchar,
      "block_name" varchar,
      CONSTRAINT "guides_blocks_guide_step_header_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "guides"("id") ON DELETE CASCADE
    );

    CREATE TABLE "guides_blocks_guide_rich_text" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "content" jsonb NOT NULL,
      "content_html" varchar,
      "block_name" varchar,
      CONSTRAINT "guides_blocks_guide_rich_text_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "guides"("id") ON DELETE CASCADE
    );

    CREATE TABLE "_guides_v_blocks_guide_step_header" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "format" "enum__guides_v_blocks_guide_step_header_format",
      "duration" varchar,
      "cost" varchar,
      "block_name" varchar,
      "_uuid" varchar,
      CONSTRAINT "_guides_v_blocks_guide_step_header_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "_guides_v"("id") ON DELETE CASCADE
    );

    CREATE TABLE "_guides_v_blocks_guide_rich_text" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "content" jsonb NOT NULL,
      "content_html" varchar,
      "block_name" varchar,
      "_uuid" varchar,
      CONSTRAINT "_guides_v_blocks_guide_rich_text_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "_guides_v"("id") ON DELETE CASCADE
    );
  `)
}
