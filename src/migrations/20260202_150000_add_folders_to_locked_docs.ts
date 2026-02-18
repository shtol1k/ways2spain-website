import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Migration to add payload_folders_id column to payload_locked_documents_rels
 * 
 * This column is required by Payload's Folders feature for document locking functionality.
 * The column links locked documents to folders.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
    console.log('📁 Adding payload_folders_id column to payload_locked_documents_rels...')

    // Add payload_folders_id column to payload_locked_documents_rels
    await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels" 
    ADD COLUMN IF NOT EXISTS "payload_folders_id" integer;
  `)
    console.log('  ✓ Added payload_folders_id column')

    // Create index for the new column
    await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_payload_folders_idx" 
    ON "payload_locked_documents_rels" ("payload_folders_id");
  `)
    console.log('  ✓ Created index on payload_folders_id')

    // Add foreign key constraint (optional but good for data integrity)
    // Note: This may fail if payload_folders table doesn't exist yet
    try {
        await db.execute(sql`
      ALTER TABLE "payload_locked_documents_rels"
      ADD CONSTRAINT "payload_locked_documents_rels_payload_folders_fk"
      FOREIGN KEY ("payload_folders_id") 
      REFERENCES "payload_folders"("id") 
      ON DELETE CASCADE;
    `)
        console.log('  ✓ Added foreign key constraint')
    } catch (e) {
        console.log('  ⏩ Foreign key constraint skipped (payload_folders table may not exist yet)')
    }

    console.log('✅ Folders support fully configured!')
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    console.log('🔄 Removing payload_folders_id column...')

    // Drop foreign key first
    try {
        await db.execute(sql`
      ALTER TABLE "payload_locked_documents_rels"
      DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_payload_folders_fk";
    `)
    } catch (e) {
        // Constraint may not exist
    }

    // Drop index
    await db.execute(sql`
    DROP INDEX IF EXISTS "payload_locked_documents_rels_payload_folders_idx";
  `)

    // Drop column
    await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels" 
    DROP COLUMN IF EXISTS "payload_folders_id";
  `)

    console.log('✅ Removed payload_folders_id column')
}
