import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Migration to create the authors table for blog posts.
 * 
 * Authors are the people who write blog posts.
 * They can optionally be linked to CMS users.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
    console.log('✍️ Creating authors table for blog...')

    // Step 1: Create the authors table
    await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "authors" (
      "id" serial PRIMARY KEY NOT NULL,
      "name" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "photo_id" integer REFERENCES "media"("id") ON DELETE SET NULL,
      "bio" varchar,
      "role" varchar,
      "social_links_linkedin" varchar,
      "social_links_twitter" varchar,
      "social_links_instagram" varchar,
      "social_links_facebook" varchar,
      "social_links_telegram" varchar,
      "user_id" integer REFERENCES "users"("id") ON DELETE SET NULL,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
  `)
    console.log('  ✓ Created authors table')

    // Step 2: Create indexes
    await db.execute(sql`CREATE UNIQUE INDEX IF NOT EXISTS "authors_slug_idx" ON "authors"("slug");`)
    await db.execute(sql`CREATE INDEX IF NOT EXISTS "authors_photo_idx" ON "authors"("photo_id");`)
    await db.execute(sql`CREATE INDEX IF NOT EXISTS "authors_user_idx" ON "authors"("user_id");`)
    await db.execute(sql`CREATE INDEX IF NOT EXISTS "authors_updated_at_idx" ON "authors"("updated_at");`)
    await db.execute(sql`CREATE INDEX IF NOT EXISTS "authors_created_at_idx" ON "authors"("created_at");`)
    console.log('  ✓ Created indexes')

    // Step 3: Add authors_id column to payload_locked_documents_rels
    await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels"
    ADD COLUMN IF NOT EXISTS "authors_id" integer REFERENCES "authors"("id") ON DELETE CASCADE;
  `)
    console.log('  ✓ Added authors_id to payload_locked_documents_rels')

    // Step 4: Create index for authors_id
    await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_authors_id_idx"
    ON "payload_locked_documents_rels"("authors_id");
  `)
    console.log('  ✓ Created index on authors_id')

    console.log('✅ Authors table created successfully!')
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
    console.log('🔄 Dropping authors table...')

    // Drop index first
    await db.execute(sql`
    DROP INDEX IF EXISTS "payload_locked_documents_rels_authors_id_idx";
  `)

    // Drop column from payload_locked_documents_rels
    await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels"
    DROP COLUMN IF EXISTS "authors_id";
  `)
    console.log('  ✓ Removed authors_id from payload_locked_documents_rels')

    // Drop indexes
    await db.execute(sql`
    DROP INDEX IF EXISTS "authors_slug_idx";
    DROP INDEX IF EXISTS "authors_photo_idx";
    DROP INDEX IF EXISTS "authors_user_idx";
    DROP INDEX IF EXISTS "authors_updated_at_idx";
    DROP INDEX IF EXISTS "authors_created_at_idx";
  `)
    console.log('  ✓ Dropped indexes')

    // Drop table
    await db.execute(sql`
    DROP TABLE IF EXISTS "authors" CASCADE;
  `)
    console.log('  ✓ Dropped authors table')

    console.log('✅ Authors table removed!')
}
