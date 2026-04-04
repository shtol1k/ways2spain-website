import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // 1. Drop old blocks tables (steps and nested callouts)
  await db.execute(sql`
    DROP TABLE IF EXISTS "guides_blocks_guide_step_required_documents" CASCADE;
    DROP TABLE IF EXISTS "guides_blocks_callout" CASCADE;
    DROP TABLE IF EXISTS "guides_blocks_guide_step" CASCADE;
  `)

  // Drop same tables from versions
  await db.execute(sql`
    DROP TABLE IF EXISTS "_guides_v_blocks_guide_step_required_documents" CASCADE;
    DROP TABLE IF EXISTS "_guides_v_blocks_callout" CASCADE;
    DROP TABLE IF EXISTS "_guides_v_blocks_guide_step" CASCADE;
  `)

  // 2. Drop old enum types
  await db.execute(sql`
    DROP TYPE IF EXISTS "public"."enum_guides_blocks_guide_step_difficulty" CASCADE;
    DROP TYPE IF EXISTS "public"."enum__guides_v_blocks_guide_step_difficulty" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_guides_blocks_callout_type" CASCADE;
    DROP TYPE IF EXISTS "public"."enum__guides_v_blocks_callout_type" CASCADE;
  `)

  // 3. Remove old columns from guides table
  await db.execute(sql`
    ALTER TABLE "guides"
      DROP COLUMN IF EXISTS "introduction",
      DROP COLUMN IF EXISTS "introduction_html",
      DROP COLUMN IF EXISTS "conclusion",
      DROP COLUMN IF EXISTS "conclusion_html";
  `)

  // Remove same columns from versions table
  await db.execute(sql`
    ALTER TABLE "_guides_v"
      DROP COLUMN IF EXISTS "version_introduction",
      DROP COLUMN IF EXISTS "version_introduction_html",
      DROP COLUMN IF EXISTS "version_conclusion",
      DROP COLUMN IF EXISTS "version_conclusion_html";
  `)

  // 4. Create new enum types
  await db.execute(sql`
    CREATE TYPE "public"."enum_guides_blocks_guide_step_header_format" AS ENUM('online', 'hybrid', 'offline');
    CREATE TYPE "public"."enum__guides_v_blocks_guide_step_header_format" AS ENUM('online', 'hybrid', 'offline');
    CREATE TYPE "public"."enum_guides_blocks_guide_callout_type" AS ENUM('info', 'warning', 'alert', 'success');
    CREATE TYPE "public"."enum__guides_v_blocks_guide_callout_type" AS ENUM('info', 'warning', 'alert', 'success');
  `)

  // 5. Create new blocks tables for guides (published)
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
      "block_name" varchar
    );

    CREATE TABLE "guides_blocks_guide_rich_text" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "content" jsonb NOT NULL,
      "content_html" varchar,
      "block_name" varchar
    );

    CREATE TABLE "guides_blocks_guide_callout" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "type" "enum_guides_blocks_guide_callout_type" NOT NULL,
      "title" varchar,
      "content" jsonb NOT NULL,
      "content_html" varchar,
      "block_name" varchar
    );
  `)

  // 6. Create new blocks tables for _guides_v (versions/drafts)
  await db.execute(sql`
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
      "_uuid" varchar
    );

    CREATE TABLE "_guides_v_blocks_guide_rich_text" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "content" jsonb NOT NULL,
      "content_html" varchar,
      "block_name" varchar,
      "_uuid" varchar
    );

    CREATE TABLE "_guides_v_blocks_guide_callout" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "type" "enum__guides_v_blocks_guide_callout_type" NOT NULL,
      "title" varchar,
      "content" jsonb NOT NULL,
      "content_html" varchar,
      "block_name" varchar,
      "_uuid" varchar
    );
  `)

  // 7. Add foreign key constraints
  await db.execute(sql`
    ALTER TABLE "guides_blocks_guide_step_header"
      ADD CONSTRAINT "guides_blocks_guide_step_header_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "guides"("id") ON DELETE CASCADE;

    ALTER TABLE "guides_blocks_guide_rich_text"
      ADD CONSTRAINT "guides_blocks_guide_rich_text_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "guides"("id") ON DELETE CASCADE;

    ALTER TABLE "guides_blocks_guide_callout"
      ADD CONSTRAINT "guides_blocks_guide_callout_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "guides"("id") ON DELETE CASCADE;

    ALTER TABLE "_guides_v_blocks_guide_step_header"
      ADD CONSTRAINT "_guides_v_blocks_guide_step_header_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "_guides_v"("id") ON DELETE CASCADE;

    ALTER TABLE "_guides_v_blocks_guide_rich_text"
      ADD CONSTRAINT "_guides_v_blocks_guide_rich_text_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "_guides_v"("id") ON DELETE CASCADE;

    ALTER TABLE "_guides_v_blocks_guide_callout"
      ADD CONSTRAINT "_guides_v_blocks_guide_callout_parent_id_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "_guides_v"("id") ON DELETE CASCADE;
  `)

  // 8. Add indexes
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "guides_blocks_guide_step_header_order_idx"
      ON "guides_blocks_guide_step_header" ("_order");
    CREATE INDEX IF NOT EXISTS "guides_blocks_guide_step_header_parent_id_idx"
      ON "guides_blocks_guide_step_header" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "guides_blocks_guide_step_header_path_idx"
      ON "guides_blocks_guide_step_header" ("_path");

    CREATE INDEX IF NOT EXISTS "guides_blocks_guide_rich_text_order_idx"
      ON "guides_blocks_guide_rich_text" ("_order");
    CREATE INDEX IF NOT EXISTS "guides_blocks_guide_rich_text_parent_id_idx"
      ON "guides_blocks_guide_rich_text" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "guides_blocks_guide_rich_text_path_idx"
      ON "guides_blocks_guide_rich_text" ("_path");

    CREATE INDEX IF NOT EXISTS "guides_blocks_guide_callout_order_idx"
      ON "guides_blocks_guide_callout" ("_order");
    CREATE INDEX IF NOT EXISTS "guides_blocks_guide_callout_parent_id_idx"
      ON "guides_blocks_guide_callout" ("_parent_id");
    CREATE INDEX IF NOT EXISTS "guides_blocks_guide_callout_path_idx"
      ON "guides_blocks_guide_callout" ("_path");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Reverse: drop new tables and restore old ones
  await db.execute(sql`
    DROP TABLE IF EXISTS "guides_blocks_guide_step_header" CASCADE;
    DROP TABLE IF EXISTS "guides_blocks_guide_rich_text" CASCADE;
    DROP TABLE IF EXISTS "guides_blocks_guide_callout" CASCADE;
    DROP TABLE IF EXISTS "_guides_v_blocks_guide_step_header" CASCADE;
    DROP TABLE IF EXISTS "_guides_v_blocks_guide_rich_text" CASCADE;
    DROP TABLE IF EXISTS "_guides_v_blocks_guide_callout" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_guides_blocks_guide_step_header_format" CASCADE;
    DROP TYPE IF EXISTS "public"."enum__guides_v_blocks_guide_step_header_format" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_guides_blocks_guide_callout_type" CASCADE;
    DROP TYPE IF EXISTS "public"."enum__guides_v_blocks_guide_callout_type" CASCADE;
  `)
}
