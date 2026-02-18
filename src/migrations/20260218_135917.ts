import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "header_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link_id" integer NOT NULL
  );
  
  CREATE TABLE "header" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"cta_button_label" varchar DEFAULT 'Get Consultation',
  	"cta_button_link_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "pages" ADD COLUMN "published" boolean DEFAULT true;
  ALTER TABLE "_pages_v" ADD COLUMN "version_published" boolean DEFAULT true;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_link_id_pages_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_cta_button_link_id_pages_id_fk" FOREIGN KEY ("cta_button_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_link_idx" ON "header_nav_items" USING btree ("link_id");
  CREATE INDEX "header_cta_button_cta_button_link_idx" ON "header" USING btree ("cta_button_link_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  ALTER TABLE "pages" DROP COLUMN "published";
  ALTER TABLE "_pages_v" DROP COLUMN "version_published";`)
}
