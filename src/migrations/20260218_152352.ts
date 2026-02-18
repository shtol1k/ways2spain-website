import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "main_menu_nav_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"link_id" integer NOT NULL
  );
  
  CREATE TABLE "main_menu" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"logo_id" integer,
  	"cta_primary_label" varchar DEFAULT 'Get Consultation',
  	"cta_primary_link_id" integer,
  	"cta_secondary_label" varchar DEFAULT 'Contact Us',
  	"cta_secondary_link_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  DROP TABLE "header_nav_items" CASCADE;
  DROP TABLE "header" CASCADE;
  ALTER TABLE "main_menu_nav_items" ADD CONSTRAINT "main_menu_nav_items_link_id_pages_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "main_menu_nav_items" ADD CONSTRAINT "main_menu_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."main_menu"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "main_menu" ADD CONSTRAINT "main_menu_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "main_menu" ADD CONSTRAINT "main_menu_cta_primary_link_id_pages_id_fk" FOREIGN KEY ("cta_primary_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "main_menu" ADD CONSTRAINT "main_menu_cta_secondary_link_id_pages_id_fk" FOREIGN KEY ("cta_secondary_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "main_menu_nav_items_order_idx" ON "main_menu_nav_items" USING btree ("_order");
  CREATE INDEX "main_menu_nav_items_parent_id_idx" ON "main_menu_nav_items" USING btree ("_parent_id");
  CREATE INDEX "main_menu_nav_items_link_idx" ON "main_menu_nav_items" USING btree ("link_id");
  CREATE INDEX "main_menu_logo_idx" ON "main_menu" USING btree ("logo_id");
  CREATE INDEX "main_menu_cta_primary_cta_primary_link_idx" ON "main_menu" USING btree ("cta_primary_link_id");
  CREATE INDEX "main_menu_cta_secondary_cta_secondary_link_idx" ON "main_menu" USING btree ("cta_secondary_link_id");
  ALTER TABLE "footer" DROP COLUMN "enabled";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
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
  
  DROP TABLE "main_menu_nav_items" CASCADE;
  DROP TABLE "main_menu" CASCADE;
  ALTER TABLE "footer" ADD COLUMN "enabled" boolean DEFAULT false;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_link_id_pages_id_fk" FOREIGN KEY ("link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "header_nav_items" ADD CONSTRAINT "header_nav_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."header"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "header" ADD CONSTRAINT "header_cta_button_link_id_pages_id_fk" FOREIGN KEY ("cta_button_link_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
  CREATE INDEX "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
  CREATE INDEX "header_nav_items_link_idx" ON "header_nav_items" USING btree ("link_id");
  CREATE INDEX "header_cta_button_cta_button_link_idx" ON "header" USING btree ("cta_button_link_id");`)
}
