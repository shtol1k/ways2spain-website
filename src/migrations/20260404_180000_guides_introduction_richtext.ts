import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Change introduction from varchar to jsonb (richText)
  await db.execute(sql`
    ALTER TABLE "guides"
      DROP COLUMN IF EXISTS "introduction";
    ALTER TABLE "guides"
      ADD COLUMN IF NOT EXISTS "introduction" jsonb;
    ALTER TABLE "guides"
      ADD COLUMN IF NOT EXISTS "introduction_html" varchar;

    ALTER TABLE "_guides_v"
      DROP COLUMN IF EXISTS "version_introduction";
    ALTER TABLE "_guides_v"
      ADD COLUMN IF NOT EXISTS "version_introduction" jsonb;
    ALTER TABLE "_guides_v"
      ADD COLUMN IF NOT EXISTS "version_introduction_html" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "guides"
      DROP COLUMN IF EXISTS "introduction",
      DROP COLUMN IF EXISTS "introduction_html";
    ALTER TABLE "guides"
      ADD COLUMN IF NOT EXISTS "introduction" varchar;

    ALTER TABLE "_guides_v"
      DROP COLUMN IF EXISTS "version_introduction",
      DROP COLUMN IF EXISTS "version_introduction_html";
    ALTER TABLE "_guides_v"
      ADD COLUMN IF NOT EXISTS "version_introduction" varchar;
  `)
}
