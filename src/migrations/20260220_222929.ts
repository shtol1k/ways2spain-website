import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TYPE "public"."enum_footer_social_links_platform" ADD VALUE 'xTwitter' BEFORE 'twitter';
  CREATE TABLE "footer_resource_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link_id" integer,
  	"external_link" varchar
  );
  
  CREATE TABLE "footer_service_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"url" varchar NOT NULL
  );
  
  ALTER TABLE "footer_resource_items" ADD CONSTRAINT "footer_resource_items_link_id_pages_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer_resource_items" ADD CONSTRAINT "footer_resource_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_service_links" ADD CONSTRAINT "footer_service_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "footer_resource_items_order_idx" ON "footer_resource_items" USING btree ("_order");
  CREATE INDEX "footer_resource_items_parent_id_idx" ON "footer_resource_items" USING btree ("_parent_id");
  CREATE INDEX "footer_resource_items_link_idx" ON "footer_resource_items" USING btree ("link_id");
  CREATE INDEX "footer_service_links_order_idx" ON "footer_service_links" USING btree ("_order");
  CREATE INDEX "footer_service_links_parent_id_idx" ON "footer_service_links" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "footer_resource_items" CASCADE;
  DROP TABLE "footer_service_links" CASCADE;
  ALTER TABLE "footer_social_links" ALTER COLUMN "platform" SET DATA TYPE text;
  DROP TYPE "public"."enum_footer_social_links_platform";
  CREATE TYPE "public"."enum_footer_social_links_platform" AS ENUM('facebook', 'instagram', 'twitter', 'linkedin', 'youtube', 'telegram', 'tiktok');
  ALTER TABLE "footer_social_links" ALTER COLUMN "platform" SET DATA TYPE "public"."enum_footer_social_links_platform" USING "platform"::"public"."enum_footer_social_links_platform";`)
}
