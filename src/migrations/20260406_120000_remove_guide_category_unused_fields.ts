import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE guide_categories
    DROP COLUMN IF EXISTS description,
    DROP COLUMN IF EXISTS icon,
    DROP COLUMN IF EXISTS color;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE guide_categories
    ADD COLUMN IF NOT EXISTS description varchar,
    ADD COLUMN IF NOT EXISTS icon varchar,
    ADD COLUMN IF NOT EXISTS color varchar;
  `)
}
