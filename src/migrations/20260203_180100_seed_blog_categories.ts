import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

/**
 * Migration to seed initial blog categories.
 * 
 * Based on existing hardcoded categories from blogPosts.ts:
 * - Інструкції
 * - Документи
 * - Податки
 * - Поради
 * - Родина
 * - Порівняння
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  console.log('🌱 Seeding initial blog categories...')

  // Insert base categories (slug, order are non-localized)
  const categories = [
    { slug: 'instrukcii', order: 1 },
    { slug: 'dokumenty', order: 2 },
    { slug: 'podatkyi', order: 3 },
    { slug: 'porady', order: 4 },
    { slug: 'rodyna', order: 5 },
    { slug: 'porivnyannya', order: 6 },
  ]

  // Insert main category records
  for (const cat of categories) {
    await db.execute(sql`
      INSERT INTO "categories" ("slug", "order", "name")
      VALUES (${cat.slug}, ${cat.order}, ${cat.slug})
      ON CONFLICT ("slug") DO NOTHING;
    `)
  }
  console.log('  ✓ Inserted 6 categories')

  // Insert Ukrainian localized names and descriptions
  const localesUA = [
    { slug: 'instrukcii', name: 'Інструкції', description: 'Покрокові гайди та інструкції з оформлення документів' },
    { slug: 'dokumenty', name: 'Документи', description: 'Інформація про необхідні документи для візи та ВНЖ' },
    { slug: 'podatkyi', name: 'Податки', description: 'Все про податкову систему Іспанії для Digital Nomad' },
    { slug: 'porady', name: 'Поради', description: 'Корисні поради від експертів та досвід клієнтів' },
    { slug: 'rodyna', name: 'Родина', description: 'Легалізація членів сім\'ї та возз\'єднання родини' },
    { slug: 'porivnyannya', name: 'Порівняння', description: 'Порівняння різних типів віз та варіантів легалізації' },
  ]

  for (const locale of localesUA) {
    // Get category id by slug
    const result = await db.execute(sql`
      SELECT "id" FROM "categories" WHERE "slug" = ${locale.slug}
    `)

    if (result.rows && result.rows.length > 0) {
      const categoryId = result.rows[0].id
      await db.execute(sql`
        INSERT INTO "categories_locales" ("_parent_id", "_locale", "name", "description")
        VALUES (${categoryId}, 'uk', ${locale.name}, ${locale.description})
        ON CONFLICT ("_parent_id", "_locale") DO UPDATE SET
          "name" = ${locale.name},
          "description" = ${locale.description};
      `)
    }
  }
  console.log('  ✓ Added Ukrainian localized names')

  // Insert English localized names (prepared for future i18n)
  const localesEN = [
    { slug: 'instrukcii', name: 'Instructions', description: 'Step-by-step guides for document processing' },
    { slug: 'dokumenty', name: 'Documents', description: 'Information about required documents for visa and residence permit' },
    { slug: 'podatkyi', name: 'Taxes', description: 'Everything about Spanish tax system for Digital Nomads' },
    { slug: 'porady', name: 'Tips', description: 'Useful tips from experts and client experiences' },
    { slug: 'rodyna', name: 'Family', description: 'Family member legalization and reunification' },
    { slug: 'porivnyannya', name: 'Comparison', description: 'Comparison of different visa types and legalization options' },
  ]

  for (const locale of localesEN) {
    const result = await db.execute(sql`
      SELECT "id" FROM "categories" WHERE "slug" = ${locale.slug}
    `)

    if (result.rows && result.rows.length > 0) {
      const categoryId = result.rows[0].id
      await db.execute(sql`
        INSERT INTO "categories_locales" ("_parent_id", "_locale", "name", "description")
        VALUES (${categoryId}, 'en', ${locale.name}, ${locale.description})
        ON CONFLICT ("_parent_id", "_locale") DO UPDATE SET
          "name" = ${locale.name},
          "description" = ${locale.description};
      `)
    }
  }
  console.log('  ✓ Added English localized names')

  console.log('✅ Blog categories seeded successfully!')
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  console.log('🔄 Removing seeded categories...')

  // Delete locales first (foreign key constraint)
  await db.execute(sql`
    DELETE FROM "categories_locales" WHERE "_parent_id" IN (
      SELECT "id" FROM "categories" WHERE "slug" IN (
        'instrukcii', 'dokumenty', 'podatkyi', 'porady', 'rodyna', 'porivnyannya'
      )
    );
  `)
  console.log('  ✓ Deleted category locales')

  // Delete categories
  await db.execute(sql`
    DELETE FROM "categories" WHERE "slug" IN (
      'instrukcii', 'dokumenty', 'podatkyi', 'porady', 'rodyna', 'porivnyannya'
    );
  `)
  console.log('  ✓ Deleted categories')

  console.log('✅ Seeded categories removed!')
}
