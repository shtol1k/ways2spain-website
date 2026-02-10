import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  // Rename columns from separate groups (primaryCta.label, secondaryCta.label)
  // to unified group (cta.primaryLabel, cta.secondaryLabel)
  // Data is preserved since we're just renaming
  await db.execute(sql`
    -- Drop old foreign key constraints
    ALTER TABLE "pages_blocks_hero" DROP CONSTRAINT IF EXISTS "pages_blocks_hero_primary_cta_page_id_pages_id_fk";
    ALTER TABLE "pages_blocks_hero" DROP CONSTRAINT IF EXISTS "pages_blocks_hero_secondary_cta_page_id_pages_id_fk";
    ALTER TABLE "_pages_v_blocks_hero" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_hero_primary_cta_page_id_pages_id_fk";
    ALTER TABLE "_pages_v_blocks_hero" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_hero_secondary_cta_page_id_pages_id_fk";

    -- Drop old indexes
    DROP INDEX IF EXISTS "pages_blocks_hero_primary_cta_primary_cta_page_idx";
    DROP INDEX IF EXISTS "pages_blocks_hero_secondary_cta_secondary_cta_page_idx";
    DROP INDEX IF EXISTS "_pages_v_blocks_hero_primary_cta_primary_cta_page_idx";
    DROP INDEX IF EXISTS "_pages_v_blocks_hero_secondary_cta_secondary_cta_page_idx";

    -- Rename columns in pages_blocks_hero
    ALTER TABLE "pages_blocks_hero" RENAME COLUMN "primary_cta_label" TO "cta_primary_label";
    ALTER TABLE "pages_blocks_hero" RENAME COLUMN "primary_cta_page_id" TO "cta_primary_page_id";
    ALTER TABLE "pages_blocks_hero" RENAME COLUMN "secondary_cta_label" TO "cta_secondary_label";
    ALTER TABLE "pages_blocks_hero" RENAME COLUMN "secondary_cta_page_id" TO "cta_secondary_page_id";

    -- Rename columns in _pages_v_blocks_hero (versions table)
    ALTER TABLE "_pages_v_blocks_hero" RENAME COLUMN "primary_cta_label" TO "cta_primary_label";
    ALTER TABLE "_pages_v_blocks_hero" RENAME COLUMN "primary_cta_page_id" TO "cta_primary_page_id";
    ALTER TABLE "_pages_v_blocks_hero" RENAME COLUMN "secondary_cta_label" TO "cta_secondary_label";
    ALTER TABLE "_pages_v_blocks_hero" RENAME COLUMN "secondary_cta_page_id" TO "cta_secondary_page_id";

    -- Re-create foreign key constraints with new column names
    ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_cta_primary_page_id_pages_id_fk" FOREIGN KEY ("cta_primary_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_cta_secondary_page_id_pages_id_fk" FOREIGN KEY ("cta_secondary_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_cta_primary_page_id_pages_id_fk" FOREIGN KEY ("cta_primary_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_cta_secondary_page_id_pages_id_fk" FOREIGN KEY ("cta_secondary_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;

    -- Re-create indexes with new column names
    CREATE INDEX "pages_blocks_hero_cta_cta_primary_page_idx" ON "pages_blocks_hero" USING btree ("cta_primary_page_id");
    CREATE INDEX "pages_blocks_hero_cta_cta_secondary_page_idx" ON "pages_blocks_hero" USING btree ("cta_secondary_page_id");
    CREATE INDEX "_pages_v_blocks_hero_cta_cta_primary_page_idx" ON "_pages_v_blocks_hero" USING btree ("cta_primary_page_id");
    CREATE INDEX "_pages_v_blocks_hero_cta_cta_secondary_page_idx" ON "_pages_v_blocks_hero" USING btree ("cta_secondary_page_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    -- Drop new constraints
    ALTER TABLE "pages_blocks_hero" DROP CONSTRAINT IF EXISTS "pages_blocks_hero_cta_primary_page_id_pages_id_fk";
    ALTER TABLE "pages_blocks_hero" DROP CONSTRAINT IF EXISTS "pages_blocks_hero_cta_secondary_page_id_pages_id_fk";
    ALTER TABLE "_pages_v_blocks_hero" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_hero_cta_primary_page_id_pages_id_fk";
    ALTER TABLE "_pages_v_blocks_hero" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_hero_cta_secondary_page_id_pages_id_fk";

    -- Drop new indexes
    DROP INDEX IF EXISTS "pages_blocks_hero_cta_cta_primary_page_idx";
    DROP INDEX IF EXISTS "pages_blocks_hero_cta_cta_secondary_page_idx";
    DROP INDEX IF EXISTS "_pages_v_blocks_hero_cta_cta_primary_page_idx";
    DROP INDEX IF EXISTS "_pages_v_blocks_hero_cta_cta_secondary_page_idx";

    -- Rename columns back
    ALTER TABLE "pages_blocks_hero" RENAME COLUMN "cta_primary_label" TO "primary_cta_label";
    ALTER TABLE "pages_blocks_hero" RENAME COLUMN "cta_primary_page_id" TO "primary_cta_page_id";
    ALTER TABLE "pages_blocks_hero" RENAME COLUMN "cta_secondary_label" TO "secondary_cta_label";
    ALTER TABLE "pages_blocks_hero" RENAME COLUMN "cta_secondary_page_id" TO "secondary_cta_page_id";

    ALTER TABLE "_pages_v_blocks_hero" RENAME COLUMN "cta_primary_label" TO "primary_cta_label";
    ALTER TABLE "_pages_v_blocks_hero" RENAME COLUMN "cta_primary_page_id" TO "primary_cta_page_id";
    ALTER TABLE "_pages_v_blocks_hero" RENAME COLUMN "cta_secondary_label" TO "secondary_cta_label";
    ALTER TABLE "_pages_v_blocks_hero" RENAME COLUMN "cta_secondary_page_id" TO "secondary_cta_page_id";

    -- Re-create old constraints
    ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_primary_cta_page_id_pages_id_fk" FOREIGN KEY ("primary_cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_secondary_cta_page_id_pages_id_fk" FOREIGN KEY ("secondary_cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_primary_cta_page_id_pages_id_fk" FOREIGN KEY ("primary_cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
    ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_secondary_cta_page_id_pages_id_fk" FOREIGN KEY ("secondary_cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;

    -- Re-create old indexes
    CREATE INDEX "pages_blocks_hero_primary_cta_primary_cta_page_idx" ON "pages_blocks_hero" USING btree ("primary_cta_page_id");
    CREATE INDEX "pages_blocks_hero_secondary_cta_secondary_cta_page_idx" ON "pages_blocks_hero" USING btree ("secondary_cta_page_id");
    CREATE INDEX "_pages_v_blocks_hero_primary_cta_primary_cta_page_idx" ON "_pages_v_blocks_hero" USING btree ("primary_cta_page_id");
    CREATE INDEX "_pages_v_blocks_hero_secondary_cta_secondary_cta_page_idx" ON "_pages_v_blocks_hero" USING btree ("secondary_cta_page_id");
  `)
}
