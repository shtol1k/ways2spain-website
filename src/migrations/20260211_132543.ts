import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_features_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_features_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"subtitle" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_hero" DROP CONSTRAINT IF EXISTS "pages_blocks_hero_primary_cta_page_id_pages_id_fk";
  
  ALTER TABLE "pages_blocks_hero" DROP CONSTRAINT IF EXISTS "pages_blocks_hero_secondary_cta_page_id_pages_id_fk";
  
  ALTER TABLE "_pages_v_blocks_hero" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_hero_primary_cta_page_id_pages_id_fk";
  
  ALTER TABLE "_pages_v_blocks_hero" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_hero_secondary_cta_page_id_pages_id_fk";
  
  DROP INDEX IF EXISTS "pages_blocks_hero_primary_cta_primary_cta_page_idx";
  DROP INDEX IF EXISTS "pages_blocks_hero_secondary_cta_secondary_cta_page_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_hero_primary_cta_primary_cta_page_idx";
  DROP INDEX IF EXISTS "_pages_v_blocks_hero_secondary_cta_secondary_cta_page_idx";
  ALTER TABLE "pages_blocks_hero" ADD COLUMN IF NOT EXISTS "cta_primary_label" varchar;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN IF NOT EXISTS "cta_primary_page_id" integer;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN IF NOT EXISTS "cta_secondary_label" varchar;
  ALTER TABLE "pages_blocks_hero" ADD COLUMN IF NOT EXISTS "cta_secondary_page_id" integer;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN IF NOT EXISTS "cta_primary_label" varchar;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN IF NOT EXISTS "cta_primary_page_id" integer;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN IF NOT EXISTS "cta_secondary_label" varchar;
  ALTER TABLE "_pages_v_blocks_hero" ADD COLUMN IF NOT EXISTS "cta_secondary_page_id" integer;
  ALTER TABLE "pages_blocks_features_features" ADD CONSTRAINT "pages_blocks_features_features_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_features_features" ADD CONSTRAINT "pages_blocks_features_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_features" ADD CONSTRAINT "pages_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features_features" ADD CONSTRAINT "_pages_v_blocks_features_features_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features_features" ADD CONSTRAINT "_pages_v_blocks_features_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_features"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_features" ADD CONSTRAINT "_pages_v_blocks_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_features_features_order_idx" ON "pages_blocks_features_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_features_features_parent_id_idx" ON "pages_blocks_features_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_features_features_icon_idx" ON "pages_blocks_features_features" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_features_order_idx" ON "pages_blocks_features" USING btree ("_order");
  CREATE INDEX "pages_blocks_features_parent_id_idx" ON "pages_blocks_features" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_features_path_idx" ON "pages_blocks_features" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_features_features_order_idx" ON "_pages_v_blocks_features_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_features_features_parent_id_idx" ON "_pages_v_blocks_features_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_features_features_icon_idx" ON "_pages_v_blocks_features_features" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_features_order_idx" ON "_pages_v_blocks_features" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_features_parent_id_idx" ON "_pages_v_blocks_features" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_features_path_idx" ON "_pages_v_blocks_features" USING btree ("_path");
  ALTER TABLE "pages_blocks_hero" DROP CONSTRAINT IF EXISTS "pages_blocks_hero_cta_primary_page_id_pages_id_fk";
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_cta_primary_page_id_pages_id_fk" FOREIGN KEY ("cta_primary_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_hero" DROP CONSTRAINT IF EXISTS "pages_blocks_hero_cta_secondary_page_id_pages_id_fk";
  ALTER TABLE "pages_blocks_hero" ADD CONSTRAINT "pages_blocks_hero_cta_secondary_page_id_pages_id_fk" FOREIGN KEY ("cta_secondary_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_hero_cta_primary_page_id_pages_id_fk";
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_cta_primary_page_id_pages_id_fk" FOREIGN KEY ("cta_primary_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_hero" DROP CONSTRAINT IF EXISTS "_pages_v_blocks_hero_cta_secondary_page_id_pages_id_fk";
  ALTER TABLE "_pages_v_blocks_hero" ADD CONSTRAINT "_pages_v_blocks_hero_cta_secondary_page_id_pages_id_fk" FOREIGN KEY ("cta_secondary_page_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_cta_cta_primary_page_idx" ON "pages_blocks_hero" USING btree ("cta_primary_page_id");
  CREATE INDEX IF NOT EXISTS "pages_blocks_hero_cta_cta_secondary_page_idx" ON "pages_blocks_hero" USING btree ("cta_secondary_page_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_cta_cta_primary_page_idx" ON "_pages_v_blocks_hero" USING btree ("cta_primary_page_id");
  CREATE INDEX IF NOT EXISTS "_pages_v_blocks_hero_cta_cta_secondary_page_idx" ON "_pages_v_blocks_hero" USING btree ("cta_secondary_page_id");
  ALTER TABLE "pages_blocks_hero" DROP COLUMN IF EXISTS "primary_cta_label";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN IF EXISTS "primary_cta_page_id";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN IF EXISTS "secondary_cta_label";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN IF EXISTS "secondary_cta_page_id";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN IF EXISTS "primary_cta_label";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN IF EXISTS "primary_cta_page_id";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN IF EXISTS "secondary_cta_label";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN IF EXISTS "secondary_cta_page_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_features_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_blocks_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_features_features" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_features" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_features_features" CASCADE;
  DROP TABLE "pages_blocks_features" CASCADE;
  DROP TABLE "_pages_v_blocks_features_features" CASCADE;
  DROP TABLE "_pages_v_blocks_features" CASCADE;
  ALTER TABLE "pages_blocks_hero" DROP CONSTRAINT "pages_blocks_hero_cta_primary_page_id_pages_id_fk";
  
  ALTER TABLE "pages_blocks_hero" DROP CONSTRAINT "pages_blocks_hero_cta_secondary_page_id_pages_id_fk";
  
  ALTER TABLE "_pages_v_blocks_hero" DROP CONSTRAINT "_pages_v_blocks_hero_cta_primary_page_id_pages_id_fk";
  
  ALTER TABLE "_pages_v_blocks_hero" DROP CONSTRAINT "_pages_v_blocks_hero_cta_secondary_page_id_pages_id_fk";
  
  DROP INDEX "pages_blocks_hero_cta_cta_primary_page_idx";
  DROP INDEX "pages_blocks_hero_cta_cta_secondary_page_idx";
  DROP INDEX "_pages_v_blocks_hero_cta_cta_primary_page_idx";
  DROP INDEX "_pages_v_blocks_hero_cta_cta_secondary_page_idx";
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
  CREATE INDEX "_pages_v_blocks_hero_secondary_cta_secondary_cta_page_idx" ON "_pages_v_blocks_hero" USING btree ("secondary_cta_page_id");
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "cta_primary_label";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "cta_primary_page_id";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "cta_secondary_label";
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "cta_secondary_page_id";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "cta_primary_label";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "cta_primary_page_id";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "cta_secondary_label";
  ALTER TABLE "_pages_v_blocks_hero" DROP COLUMN "cta_secondary_page_id";`)
}
