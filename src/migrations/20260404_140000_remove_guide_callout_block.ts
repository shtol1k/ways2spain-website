import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    DROP TABLE IF EXISTS "guides_blocks_guide_callout" CASCADE;
    DROP TABLE IF EXISTS "_guides_v_blocks_guide_callout" CASCADE;
    DROP TYPE IF EXISTS "public"."enum_guides_blocks_guide_callout_type" CASCADE;
    DROP TYPE IF EXISTS "public"."enum__guides_v_blocks_guide_callout_type" CASCADE;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    CREATE TYPE "public"."enum_guides_blocks_guide_callout_type" AS ENUM('info', 'warning', 'alert', 'success');
    CREATE TYPE "public"."enum__guides_v_blocks_guide_callout_type" AS ENUM('info', 'warning', 'alert', 'success');

    CREATE TABLE "guides_blocks_guide_callout" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "_path" text NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "type" "enum_guides_blocks_guide_callout_type" NOT NULL,
      "title" varchar,
      "content" jsonb NOT NULL,
      "content_html" varchar,
      "block_name" varchar,
      CONSTRAINT "guides_blocks_guide_callout_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "guides"("id") ON DELETE CASCADE
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
      "_uuid" varchar,
      CONSTRAINT "_guides_v_blocks_guide_callout_parent_id_fk"
        FOREIGN KEY ("_parent_id") REFERENCES "_guides_v"("id") ON DELETE CASCADE
    );
  `)
}
