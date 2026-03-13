import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "pages_blocks_guides_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"primary_button_label" varchar,
  	"primary_button_url" varchar,
  	"secondary_button_label" varchar,
  	"secondary_button_url" varchar,
  	"block_name" varchar
  );

  CREATE TABLE "_pages_v_blocks_guides_c_t_a" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar,
  	"description" varchar,
  	"primary_button_label" varchar,
  	"primary_button_url" varchar,
  	"secondary_button_label" varchar,
  	"secondary_button_url" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );

  ALTER TABLE "pages_blocks_guides_c_t_a" ADD CONSTRAINT "pages_blocks_guides_c_t_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_guides_c_t_a" ADD CONSTRAINT "_pages_v_blocks_guides_c_t_a_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_pages_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "pages_blocks_guides_c_t_a_order_idx" ON "pages_blocks_guides_c_t_a" USING btree ("_order");
  CREATE INDEX "pages_blocks_guides_c_t_a_parent_id_idx" ON "pages_blocks_guides_c_t_a" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_guides_c_t_a_path_idx" ON "pages_blocks_guides_c_t_a" USING btree ("_path");
  CREATE INDEX "_pages_v_blocks_guides_c_t_a_order_idx" ON "_pages_v_blocks_guides_c_t_a" USING btree ("_order");
  CREATE INDEX "_pages_v_blocks_guides_c_t_a_parent_id_idx" ON "_pages_v_blocks_guides_c_t_a" USING btree ("_parent_id");
  CREATE INDEX "_pages_v_blocks_guides_c_t_a_path_idx" ON "_pages_v_blocks_guides_c_t_a" USING btree ("_path");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_guides_c_t_a" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_pages_v_blocks_guides_c_t_a" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "pages_blocks_guides_c_t_a" CASCADE;
  DROP TABLE "_pages_v_blocks_guides_c_t_a" CASCADE;`)
}
