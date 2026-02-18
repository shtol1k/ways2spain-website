import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Migration to remove categories_locales table.
 * 
 * Localization is temporarily disabled in the project.
 * This table was created prematurely before global localization was configured.
 * 
 * When ready to enable localization:
 * 1. Enable localization in payload.config.ts
 * 2. Create proper migration using: npx payload migrate:create
 * 3. This will generate the correct schema for all localized fields
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
    console.log('🗑️ Removing categories_locales table (localization disabled)...')

    // Drop the locales table
    await db.execute(sql`
    DROP TABLE IF EXISTS "categories_locales" CASCADE;
  `)
    console.log('  ✓ Dropped categories_locales table')

    console.log('✅ categories_locales removed!')
    console.log('   Note: When re-enabling localization, run npx payload migrate:create')
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    console.log('🔄 Recreating categories_locales table...')

    // Recreate the locales table
    await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "categories_locales" (
      "id" serial PRIMARY KEY,
      "_parent_id" integer NOT NULL REFERENCES "categories"("id") ON DELETE CASCADE,
      "_locale" varchar NOT NULL,
      "name" varchar,
      "description" varchar,
      UNIQUE("_parent_id", "_locale")
    );
  `)
    console.log('  ✓ Created categories_locales table')

    await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "categories_locales_parent_idx" ON "categories_locales" ("_parent_id");
  `)
    console.log('  ✓ Created index')

    console.log('✅ categories_locales recreated!')
}
