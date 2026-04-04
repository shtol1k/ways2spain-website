import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "guides"
      ADD COLUMN IF NOT EXISTS "introduction" varchar;
    ALTER TABLE "_guides_v"
      ADD COLUMN IF NOT EXISTS "version_introduction" varchar;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "guides"
      DROP COLUMN IF EXISTS "introduction";
    ALTER TABLE "_guides_v"
      DROP COLUMN IF EXISTS "version_introduction";
  `)
}
