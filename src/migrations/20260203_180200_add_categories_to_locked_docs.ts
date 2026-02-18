import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Migration to add categories support to payload_locked_documents_rels.
 * 
 * This is required for Payload CMS to properly handle document locking
 * when editing categories in the admin panel.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
    console.log('🔗 Adding categories relation to payload_locked_documents_rels...')

    // Add categories_id column to payload_locked_documents_rels
    await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels"
    ADD COLUMN IF NOT EXISTS "categories_id" integer REFERENCES "categories"("id") ON DELETE CASCADE;
  `)
    console.log('  ✓ Added categories_id column')

    // Create index for faster lookups
    await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_categories_id_idx"
    ON "payload_locked_documents_rels"("categories_id");
  `)
    console.log('  ✓ Created index on categories_id')

    console.log('✅ Categories relation added successfully!')
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    console.log('🔄 Removing categories relation from payload_locked_documents_rels...')

    // Drop index first
    await db.execute(sql`
    DROP INDEX IF EXISTS "payload_locked_documents_rels_categories_id_idx";
  `)
    console.log('  ✓ Dropped index')

    // Drop column
    await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels"
    DROP COLUMN IF EXISTS "categories_id";
  `)
    console.log('  ✓ Dropped categories_id column')

    console.log('✅ Categories relation removed!')
}
