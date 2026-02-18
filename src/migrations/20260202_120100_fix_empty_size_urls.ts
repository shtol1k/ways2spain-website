import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Fix empty string URLs in media sizes
 * The generateFileURL function was returning '' instead of NULL for sizes 
 * that weren't generated (image too small). This caused React crashes in Admin UI.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
    console.log('🔧 Fixing empty size URLs in media records...')

    // Fix medium size URLs
    await db.execute(sql`
    UPDATE media SET sizes_medium_url = NULL WHERE sizes_medium_url = '';
  `)

    // Fix large size URLs  
    await db.execute(sql`
    UPDATE media SET sizes_large_url = NULL WHERE sizes_large_url = '';
  `)

    // Fix thumbnail URLs (just in case)
    await db.execute(sql`
    UPDATE media SET sizes_thumbnail_url = NULL WHERE sizes_thumbnail_url = '';
  `)

    console.log('✅ Fixed empty size URLs')
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    // This is a data fix - no need to revert
    console.log('⏩ Data fix migration, not reversible')
}
