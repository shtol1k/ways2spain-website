import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Migration to create the tags table for blog posts.
 * 
 * Tags are used to label blog posts with specific topics.
 * Unlike categories, a post can have multiple tags.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
    console.log('🏷️ Creating tags table for blog...')

    // Step 1: Create the tags table
    await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "tags" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
  `)
    console.log('  ✓ Created tags table')

    // Step 2: Create unique index on slug
    await db.execute(sql`
    CREATE UNIQUE INDEX IF NOT EXISTS "tags_slug_idx" ON "tags" USING btree ("slug");
  `)
    console.log('  ✓ Created unique index on slug')

    // Step 3: Create indexes for timestamps
    await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "tags_updated_at_idx" ON "tags" USING btree ("updated_at");
  `)
    await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "tags_created_at_idx" ON "tags" USING btree ("created_at");
  `)
    console.log('  ✓ Created timestamp indexes')

    // Step 4: Add tags_id column to payload_locked_documents_rels
    await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels"
    ADD COLUMN IF NOT EXISTS "tags_id" integer REFERENCES "tags"("id") ON DELETE CASCADE;
  `)
    console.log('  ✓ Added tags_id to payload_locked_documents_rels')

    // Step 5: Create index for tags_id
    await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_tags_id_idx"
    ON "payload_locked_documents_rels" USING btree ("tags_id");
  `)
    console.log('  ✓ Created index on tags_id')

    console.log('✅ Tags table created successfully!')
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    console.log('🔄 Dropping tags table...')

    // Drop index first
    await db.execute(sql`
    DROP INDEX IF EXISTS "payload_locked_documents_rels_tags_id_idx";
  `)

    // Drop column from payload_locked_documents_rels
    await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels"
    DROP COLUMN IF EXISTS "tags_id";
  `)
    console.log('  ✓ Removed tags_id from payload_locked_documents_rels')

    // Drop indexes
    await db.execute(sql`
    DROP INDEX IF EXISTS "tags_slug_idx";
    DROP INDEX IF EXISTS "tags_updated_at_idx";
    DROP INDEX IF EXISTS "tags_created_at_idx";
  `)
    console.log('  ✓ Dropped indexes')

    // Drop table
    await db.execute(sql`
    DROP TABLE IF EXISTS "tags" CASCADE;
  `)
    console.log('  ✓ Dropped tags table')

    console.log('✅ Tags table removed!')
}
