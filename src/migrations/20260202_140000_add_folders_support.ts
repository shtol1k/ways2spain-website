import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Migration to add folder_id column for Payload's built-in Folders feature.
 * 
 * The Folders feature requires a 'folder_id' column in collections that have
 * folders: true enabled. This column references the payload_folders table
 * which is automatically created by Payload.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
    console.log('📁 Adding folder_id column for Payload Folders feature...')

    // Step 1: Create payload_folders table if it doesn't exist
    // Payload may create this automatically, but we ensure it exists
    await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "payload_folders" (
      "id" serial PRIMARY KEY,
      "name" varchar NOT NULL,
      "folder_id" integer,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
  `)
    console.log('  ✓ Created payload_folders table (if not exists)')

    // Step 2: Add folder_id column to media table
    await db.execute(sql`
    ALTER TABLE "media" 
    ADD COLUMN IF NOT EXISTS "folder_id" integer;
  `)
    console.log('  ✓ Added folder_id column to media')

    // Step 3: Create index for folder_id
    await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "media_folder_idx" ON "media" ("folder_id");
  `)
    console.log('  ✓ Created index on folder_id')

    // Step 4: Add foreign key constraint (optional - Payload may handle this)
    // We'll skip this for now as Payload's built-in folders may use a different table name

    console.log('✅ Folder support enabled for Media collection!')
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    console.log('🔄 Removing folder_id column...')

    await db.execute(sql`
    DROP INDEX IF EXISTS "media_folder_idx";
  `)

    await db.execute(sql`
    ALTER TABLE "media" DROP COLUMN IF EXISTS "folder_id";
  `)

    console.log('✅ Removed folder_id column from media')
}
