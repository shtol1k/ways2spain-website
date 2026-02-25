import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_cards_type1_card_left_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_cards_type1_card_right_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar
  );
  
  CREATE TABLE "pages_blocks_cards_type1" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"card_left_image_id" integer,
  	"card_left_title" varchar,
  	"card_right_image_id" integer,
  	"card_right_title" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cards_type1_card_left_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cards_type1_card_right_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"text" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_pages_v_blocks_cards_type1" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"card_left_image_id" integer,
  	"card_left_title" varchar,
  	"card_right_image_id" integer,
  	"card_right_title" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  ALTER TABLE "pages_blocks_cards_type1_card_left_items" ADD CONSTRAINT "pages_blocks_cards_type1_card_left_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cards_type1"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cards_type1_card_right_items" ADD CONSTRAINT "pages_blocks_cards_type1_card_right_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages_blocks_cards_type1"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_blocks_cards_type1" ADD CONSTRAINT "pages_blocks_cards_type1_card_left_image_id_media_id_fk" FOREIGN KEY ("card_left_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cards_type1" ADD CONSTRAINT "pages_blocks_cards_type1_card_right_image_id_media_id_fk" FOREIGN KEY ("card_right_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_cards_type1" ADD CONSTRAINT "pages_blocks_cards_type1_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cards_type1_card_left_items" ADD CONSTRAINT "_pages_v_blocks_cards_type1_card_left_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cards_type1"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cards_type1_card_right_items" ADD CONSTRAINT "_pages_v_blocks_cards_type1_card_right_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v_blocks_cards_type1"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cards_type1" ADD CONSTRAINT "_pages_v_blocks_cards_type1_card_left_image_id_media_id_fk" FOREIGN KEY ("card_left_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cards_type1" ADD CONSTRAINT "_pages_v_blocks_cards_type1_card_right_image_id_media_id_fk" FOREIGN KEY ("card_right_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_cards_type1" ADD CONSTRAINT "_pages_v_blocks_cards_type1_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_cards_type1_card_left_items_order_idx" ON "pages_blocks_cards_type1_card_left_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_cards_type1_card_left_items_parent_id_idx" ON "pages_blocks_cards_type1_card_left_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cards_type1_card_right_items_order_idx" ON "pages_blocks_cards_type1_card_right_items" USING btree ("_order");
  CREATE INDEX "pages_blocks_cards_type1_card_right_items_parent_id_idx" ON "pages_blocks_cards_type1_card_right_items" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cards_type1_order_idx" ON "pages_blocks_cards_type1" USING btree ("_order");
  CREATE INDEX "pages_blocks_cards_type1_parent_id_idx" ON "pages_blocks_cards_type1" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_cards_type1_path_idx" ON "pages_blocks_cards_type1" USING btree ("_path");
  CREATE INDEX "pages_blocks_cards_type1_card_left_card_left_image_idx" ON "pages_blocks_cards_type1" USING btree ("card_left_image_id");
  CREATE INDEX "pages_blocks_cards_type1_card_right_card_right_image_idx" ON "pages_blocks_cards_type1" USING btree ("card_right_image_id");
  CREATE INDEX "_pages_v_blocks_cards_type1_card_left_items_order_idx" ON "_pages_v_blocks_cards_type1_card_left_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cards_type1_card_left_items_parent_id_idx" ON "_pages_v_blocks_cards_type1_card_left_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cards_type1_card_right_items_order_idx" ON "_pages_v_blocks_cards_type1_card_right_items" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cards_type1_card_right_items_parent_id_idx" ON "_pages_v_blocks_cards_type1_card_right_items" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cards_type1_order_idx" ON "_pages_v_blocks_cards_type1" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_cards_type1_parent_id_idx" ON "_pages_v_blocks_cards_type1" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_cards_type1_path_idx" ON "_pages_v_blocks_cards_type1" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_cards_type1_card_left_card_left_image_idx" ON "_pages_v_blocks_cards_type1" USING btree ("card_left_image_id");
  CREATE INDEX "_pages_v_blocks_cards_type1_card_right_card_right_image_idx" ON "_pages_v_blocks_cards_type1" USING btree ("card_right_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "pages_blocks_cards_type1_card_left_items" CASCADE;
  DROP TABLE "pages_blocks_cards_type1_card_right_items" CASCADE;
  DROP TABLE "pages_blocks_cards_type1" CASCADE;
  DROP TABLE "_pages_v_blocks_cards_type1_card_left_items" CASCADE;
  DROP TABLE "_pages_v_blocks_cards_type1_card_right_items" CASCADE;
  DROP TABLE "_pages_v_blocks_cards_type1" CASCADE;`)
}
