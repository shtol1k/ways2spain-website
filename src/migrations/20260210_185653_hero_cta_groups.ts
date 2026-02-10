import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_hero_buttons" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_hero_buttons" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_hero_buttons" CASCADE;
  DROP TABLE "_pages_v_blocks_hero_buttons" CASCADE;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "primary_cta_label" varchar;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "primary_cta_page_id" integer;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "secondary_cta_label" varchar;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "secondary_cta_page_id" integer;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "primary_cta_label" varchar;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "primary_cta_page_id" integer;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "secondary_cta_label" varchar;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN "secondary_cta_page_id" integer;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_primary_cta_page_id_pages_id_fk" FOREIGN KEY ("primary_cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_secondary_cta_page_id_pages_id_fk" FOREIGN KEY ("secondary_cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_primary_cta_page_id_pages_id_fk" FOREIGN KEY ("primary_cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_secondary_cta_page_id_pages_id_fk" FOREIGN KEY ("secondary_cta_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_primary_cta_primary_cta_page_idx" ON "pages_blocks_hero" USING btree ("primary_cta_page_id");
  CREATE INDEX "pages_blocks_hero_secondary_cta_secondary_cta_page_idx" ON "pages_blocks_hero" USING btree ("secondary_cta_page_id");
  CREATE INDEX "_pages_v_blocks_hero_primary_cta_primary_cta_page_idx" ON "_pages_v_blocks_hero" USING btree ("primary_cta_page_id");
  CREATE INDEX "_pages_v_blocks_hero_secondary_cta_secondary_cta_page_idx" ON "_pages_v_blocks_hero" USING btree ("secondary_cta_page_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"page_id" integer
  );
  
  CREATE TABLE "_pages_v_blocks_hero_buttons" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"label" varchar,
  	"page_id" integer,
  	"_uuid" varchar
  );
  
  ALTER TABLE "pages_blocks_hero" DROP CONSTRAINT "pages_blocks_hero_primary_cta_page_id_pages_id_fk";
  
  ALTER TABLE "pages_blocks_hero" DROP CONSTRAINT "pages_blocks_hero_secondary_cta_page_id_pages_id_fk";
  
  ALTER TABLE "_pages_v_blocks_hero" DROP CONSTRAINT "_pages_v_blocks_hero_primary_cta_page_id_pages_id_fk";
  
  ALTER TABLE "_pages_v_blocks_hero" DROP CONSTRAINT "_pages_v_blocks_hero_secondary_cta_page_id_pages_id_fk";
  
  DROP INDEX "pages_blocks_hero_primary_cta_primary_cta_page_idx";
  DROP INDEX "pages_blocks_hero_secondary_cta_secondary_cta_page_idx";
  DROP INDEX "_pages_v_blocks_hero_primary_cta_primary_cta_page_idx";
  DROP INDEX "_pages_v_blocks_hero_secondary_cta_secondary_cta_page_idx";
  ALTER TABLE "pages_blocks_hero_buttons" ADD CONSTRAINT "pages_blocks_hero_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero_buttons" ADD CONSTRAINT "pages_blocks_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_buttons" ADD CONSTRAINT "_pages_v_blocks_hero_buttons_page_id_pages_id_fk" FOREIGN KEY ("page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero_buttons" ADD CONSTRAINT "_pages_v_blocks_hero_buttons_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_hero"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_hero_buttons_order_idx" ON "pages_blocks_hero_buttons" USING btree ("_order");
  CREATE INDEX "pages_blocks_hero_buttons_parent_id_idx" ON "pages_blocks_hero_buttons" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_buttons_page_idx" ON "pages_blocks_hero_buttons" USING btree ("page_id");
  CREATE INDEX "_pages_v_blocks_hero_buttons_order_idx" ON "_pages_v_blocks_hero_buttons" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_hero_buttons_parent_id_idx" ON "_pages_v_blocks_hero_buttons" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_hero_buttons_page_idx" ON "_pages_v_blocks_hero_buttons" USING btree ("page_id");
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "primary_cta_label";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "primary_cta_page_id";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "secondary_cta_label";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "secondary_cta_page_id";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "primary_cta_label";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "primary_cta_page_id";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "secondary_cta_label";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "secondary_cta_page_id";`)
}
