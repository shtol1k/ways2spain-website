import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_cards_type2_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar,
  	"description" varchar
  );
  
  CREATE TABLE "pages_blocks_cards_type2" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cards_type2_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"icon_id" integer,
  	"title" varchar,
  	"description" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cards_type2" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_cards_type2_cards" ADD CONSTRAINT "pages_blocks_cards_type2_cards_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cards_type2_cards" ADD CONSTRAINT "pages_blocks_cards_type2_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cards_type2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cards_type2" ADD CONSTRAINT "pages_blocks_cards_type2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cards_type2_cards" ADD CONSTRAINT "_pages_v_blocks_cards_type2_cards_icon_id_media_id_fk" FOREIGN KEY ("icon_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cards_type2_cards" ADD CONSTRAINT "_pages_v_blocks_cards_type2_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cards_type2"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cards_type2" ADD CONSTRAINT "_pages_v_blocks_cards_type2_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_cards_type2_cards_order_idx" ON "pages_blocks_cards_type2_cards" USING btree ("_order");
  CREATE INDEX "pages_blocks_cards_type2_cards_parent_id_idx" ON "pages_blocks_cards_type2_cards" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cards_type2_cards_icon_idx" ON "pages_blocks_cards_type2_cards" USING btree ("icon_id");
  CREATE INDEX "pages_blocks_cards_type2_order_idx" ON "pages_blocks_cards_type2" USING btree ("_order");
  CREATE INDEX "pages_blocks_cards_type2_parent_id_idx" ON "pages_blocks_cards_type2" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cards_type2_path_idx" ON "pages_blocks_cards_type2" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cards_type2_cards_order_idx" ON "_pages_v_blocks_cards_type2_cards" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cards_type2_cards_parent_id_idx" ON "_pages_v_blocks_cards_type2_cards" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cards_type2_cards_icon_idx" ON "_pages_v_blocks_cards_type2_cards" USING btree ("icon_id");
  CREATE INDEX "_pages_v_blocks_cards_type2_order_idx" ON "_pages_v_blocks_cards_type2" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cards_type2_parent_id_idx" ON "_pages_v_blocks_cards_type2" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cards_type2_path_idx" ON "_pages_v_blocks_cards_type2" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_cards_type2_cards" CASCADE;
  DROP TABLE "pages_blocks_cards_type2" CASCADE;
  DROP TABLE "_pages_v_blocks_cards_type2_cards" CASCADE;
  DROP TABLE "_pages_v_blocks_cards_type2" CASCADE;`)
}
