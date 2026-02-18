import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Rollback migration: Remove folder system from media collection
 * This removes the folder_id and folder_path columns from media table,
 * and drops the media_folders table entirely.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
    console.log('🔄 Rolling back folder system...')

    // Step 1: Remove foreign key constraint
    try {
        await db.execute(sql`
      ALTER TABLE "media" DROP CONSTRAINT IF EXISTS "media_folder_id_media_folders_id_fk";
    `)
        console.log('  ✓ Removed foreign key constraint')
    } catch (e) {
        console.log('  ⏩ Foreign key constraint did not exist, skipping')
    }

    // Step 2: Remove indexes
    try {
        await db.execute(sql`DROP INDEX IF EXISTS "media_folder_idx";`)
        await db.execute(sql`DROP INDEX IF EXISTS "media_folders_parent_idx";`)
        await db.execute(sql`DROP INDEX IF EXISTS "media_folders_name_idx";`)
        console.log('  ✓ Removed indexes')
    } catch (e) {
        console.log('  ⏩ Indexes did not exist, skipping')
    }

    // Step 3: Remove columns from media table
    try {
        await db.execute(sql`
      ALTER TABLE "media" DROP COLUMN IF EXISTS "folder_id";
    `)
        await db.execute(sql`
      ALTER TABLE "media" DROP COLUMN IF EXISTS "folder_path";
    `)
        console.log('  ✓ Removed folder_id and folder_path columns from media')
    } catch (e) {
        console.log('  ⚠️ Error removing columns:', e)
    }

    // Step 4: Drop media_folders table
    try {
        await db.execute(sql`DROP TABLE IF EXISTS "media_folders" CASCADE;`)
        console.log('  ✓ Dropped media_folders table')
    } catch (e) {
        console.log('  ⏩ media_folders table did not exist, skipping')
    }

    console.log('✅ Folder system rollback complete!')
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    // This is a rollback migration - no need to implement down
    console.log('⏩ This is a rollback migration, down() is not implemented')
}
