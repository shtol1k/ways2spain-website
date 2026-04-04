import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // 1. Add single-value summary_format column to guides
  await db.execute(sql`
    ALTER TABLE "guides"
      ADD COLUMN IF NOT EXISTS "summary_format" "enum_guides_summary_format";
  `)

  // 2. Populate from the join table (take first value per guide by order)
  await db.execute(sql`
    UPDATE "guides" g
    SET "summary_format" = sub."value"
    FROM (
      SELECT DISTINCT ON ("parent_id") "parent_id", "value"
      FROM "guides_summary_format"
      ORDER BY "parent_id", "order" ASC
    ) sub
    WHERE g."id" = sub."parent_id";
  `)

  // 3. Drop the hasMany join table for guides
  await db.execute(sql`
    DROP TABLE IF EXISTS "guides_summary_format" CASCADE;
  `)

  // 4. Add single-value version_summary_format column to _guides_v
  await db.execute(sql`
    ALTER TABLE "_guides_v"
      ADD COLUMN IF NOT EXISTS "version_summary_format" "enum__guides_v_version_summary_format";
  `)

  // 5. Populate versions from the join table
  await db.execute(sql`
    UPDATE "_guides_v" v
    SET "version_summary_format" = sub."value"
    FROM (
      SELECT DISTINCT ON ("parent_id") "parent_id", "value"
      FROM "_guides_v_version_summary_format"
      ORDER BY "parent_id", "order" ASC
    ) sub
    WHERE v."id" = sub."parent_id";
  `)

  // 6. Drop the hasMany join table for versions
  await db.execute(sql`
    DROP TABLE IF EXISTS "_guides_v_version_summary_format" CASCADE;
  `)

  // 7. Drop summary_last_updated column (field removed in previous task)
  await db.execute(sql`
    ALTER TABLE "guides"
      DROP COLUMN IF EXISTS "summary_last_updated";
    ALTER TABLE "_guides_v"
      DROP COLUMN IF EXISTS "version_summary_last_updated";
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Restore summary_last_updated columns
  await db.execute(sql`
    ALTER TABLE "guides"
      ADD COLUMN IF NOT EXISTS "summary_last_updated" timestamp(3) with time zone;
    ALTER TABLE "_guides_v"
      ADD COLUMN IF NOT EXISTS "version_summary_last_updated" timestamp(3) with time zone;
  `)

  // Recreate guides_summary_format join table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "guides_summary_format" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "value" "enum_guides_summary_format"
    );
    ALTER TABLE "guides_summary_format"
      ADD CONSTRAINT "guides_summary_format_parent_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "guides"("id") ON DELETE CASCADE;
    CREATE INDEX "guides_summary_format_order_idx" ON "guides_summary_format" ("_order");
    CREATE INDEX "guides_summary_format_parent_idx" ON "guides_summary_format" ("_parent_id");
  `)

  // Restore data from column back to join table
  await db.execute(sql`
    INSERT INTO "guides_summary_format" ("_order", "_parent_id", "id", "value")
    SELECT 1, "id", gen_random_uuid(), "summary_format"
    FROM "guides"
    WHERE "summary_format" IS NOT NULL;
  `)

  // Recreate _guides_v_version_summary_format join table
  await db.execute(sql`
    CREATE TABLE IF NOT EXISTS "_guides_v_version_summary_format" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" serial PRIMARY KEY NOT NULL,
      "value" "enum__guides_v_version_summary_format"
    );
    ALTER TABLE "_guides_v_version_summary_format"
      ADD CONSTRAINT "_guides_v_version_summary_format_parent_fk"
      FOREIGN KEY ("_parent_id") REFERENCES "_guides_v"("id") ON DELETE CASCADE;
    CREATE INDEX "_guides_v_version_summary_format_order_idx" ON "_guides_v_version_summary_format" ("_order");
    CREATE INDEX "_guides_v_version_summary_format_parent_idx" ON "_guides_v_version_summary_format" ("_parent_id");
  `)

  // Restore data from column back to versions join table
  await db.execute(sql`
    INSERT INTO "_guides_v_version_summary_format" ("_order", "_parent_id", "value")
    SELECT 1, "id", "version_summary_format"
    FROM "_guides_v"
    WHERE "version_summary_format" IS NOT NULL;
  `)

  // Drop the single-value columns
  await db.execute(sql`
    ALTER TABLE "guides" DROP COLUMN IF EXISTS "summary_format";
    ALTER TABLE "_guides_v" DROP COLUMN IF EXISTS "version_summary_format";
  `)
}
