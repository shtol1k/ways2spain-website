import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Migration to create the categories table for blog posts.
 * 
 * This is the first table required for the blog feature.
 * Categories have no dependencies on other blog tables.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  console.log('📂 Creating categories table for blog...')

  // Step 1: Create the main categories table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "categories" (
      "id" serial PRIMARY KEY,
      "name" varchar NOT NULL,
      "slug" varchar NOT NULL UNIQUE,
      "description" varchar,
      "order" integer DEFAULT 0,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
  `)
  console.log('  ✓ Created categories table')

  // Step 2: Create index on slug for fast lookups
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "categories_slug_idx" ON "categories" ("slug");
  `)
  console.log('  ✓ Created index on slug')

  // Step 3: Create index on order for sorting
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "categories_order_idx" ON "categories" ("order");
  `)
  console.log('  ✓ Created index on order')

  // Step 4: Create localized fields table for i18n support
  // Payload stores localized fields in a separate table with _locales suffix
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
  console.log('  ✓ Created categories_locales table for i18n')

  // Step 5: Create index on locale lookups
  await db.execute(sql`
    CREATE INDEX IF NOT EXISTS "categories_locales_parent_idx" ON "categories_locales" ("_parent_id");
  `)
  console.log('  ✓ Created index on _parent_id for locales')

  console.log('✅ Categories table created successfully!')
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  console.log('🔄 Dropping categories tables...')

  // Drop locales table first (has foreign key)
  await db.execute(sql`
    DROP TABLE IF EXISTS "categories_locales" CASCADE;
  `)
  console.log('  ✓ Dropped categories_locales table')

  // Drop indexes
  await db.execute(sql`
    DROP INDEX IF EXISTS "categories_slug_idx";
  `)
  await db.execute(sql`
    DROP INDEX IF EXISTS "categories_order_idx";
  `)
  console.log('  ✓ Dropped indexes')

  // Drop main table
  await db.execute(sql`
    DROP TABLE IF EXISTS "categories" CASCADE;
  `)
  console.log('  ✓ Dropped categories table')

  console.log('✅ Categories tables removed!')
}
