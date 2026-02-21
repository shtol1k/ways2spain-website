import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Add slogan column to footer table
    ALTER TABLE "footer" ADD COLUMN "slogan" varchar;

    -- Refactor footer_service_links: replace url with link (relationship) + external_link
    ALTER TABLE "footer_service_links" ADD COLUMN "link_id" integer;
    ALTER TABLE "footer_service_links" ADD COLUMN "external_link" varchar;
    ALTER TABLE "footer_service_links" DROP COLUMN IF EXISTS "url";

    ALTER TABLE "footer_service_links"
      ADD CONSTRAINT "footer_service_links_link_id_pages_id_fk"
      FOREIGN KEY ("link_id") REFERENCES "public"."pages"("id")
      ON DELETE set null ON UPDATE no action;

    CREATE INDEX "footer_service_links_link_idx"
      ON "footer_service_links" USING btree ("link_id");
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    -- Restore footer_service_links.url column
    ALTER TABLE "footer_service_links" DROP CONSTRAINT IF EXISTS "footer_service_links_link_id_pages_id_fk";
    DROP INDEX IF EXISTS "footer_service_links_link_idx";
    ALTER TABLE "footer_service_links" DROP COLUMN IF EXISTS "link_id";
    ALTER TABLE "footer_service_links" DROP COLUMN IF EXISTS "external_link";
    ALTER TABLE "footer_service_links" ADD COLUMN "url" varchar NOT NULL DEFAULT '';

    -- Remove slogan column from footer table
    ALTER TABLE "footer" DROP COLUMN IF EXISTS "slogan";
  `)
}
