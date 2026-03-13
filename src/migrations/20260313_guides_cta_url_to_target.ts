import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_guides_c_t_a" ADD COLUMN "primary_button_target_id" integer;
  ALTER TABLE "pages_blocks_guides_c_t_a" ADD COLUMN "secondary_button_target_id" integer;
  ALTER TABLE "_pages_v_blocks_guides_c_t_a" ADD COLUMN "primary_button_target_id" integer;
  ALTER TABLE "_pages_v_blocks_guides_c_t_a" ADD COLUMN "secondary_button_target_id" integer;
  ALTER TABLE "pages_blocks_guides_c_t_a" ADD CONSTRAINT "pages_blocks_guides_c_t_a_primary_button_target_id_pages_id_fk" FOREIGN KEY ("primary_button_target_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "pages_blocks_guides_c_t_a" ADD CONSTRAINT "pages_blocks_guides_c_t_a_secondary_button_target_id_pages_id_fk" FOREIGN KEY ("secondary_button_target_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_guides_c_t_a" ADD CONSTRAINT "_pages_v_blocks_guides_c_t_a_primary_button_target_id_pages_id_fk" FOREIGN KEY ("primary_button_target_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_pages_v_blocks_guides_c_t_a" ADD CONSTRAINT "_pages_v_blocks_guides_c_t_a_secondary_button_target_id_pages_id_fk" FOREIGN KEY ("secondary_button_target_id") REFERENCES "public"."pages"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "pages_blocks_guides_c_t_a_primary_button_target_idx" ON "pages_blocks_guides_c_t_a" USING btree ("primary_button_target_id");
  CREATE INDEX "pages_blocks_guides_c_t_a_secondary_button_target_idx" ON "pages_blocks_guides_c_t_a" USING btree ("secondary_button_target_id");
  CREATE INDEX "_pages_v_blocks_guides_c_t_a_primary_button_target_idx" ON "_pages_v_blocks_guides_c_t_a" USING btree ("primary_button_target_id");
  CREATE INDEX "_pages_v_blocks_guides_c_t_a_secondary_button_target_idx" ON "_pages_v_blocks_guides_c_t_a" USING btree ("secondary_button_target_id");
  ALTER TABLE "pages_blocks_guides_c_t_a" DROP COLUMN "primary_button_url";
  ALTER TABLE "pages_blocks_guides_c_t_a" DROP COLUMN "secondary_button_url";
  ALTER TABLE "_pages_v_blocks_guides_c_t_a" DROP COLUMN "primary_button_url";
  ALTER TABLE "_pages_v_blocks_guides_c_t_a" DROP COLUMN "secondary_button_url";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_guides_c_t_a" DROP CONSTRAINT "pages_blocks_guides_c_t_a_primary_button_target_id_pages_id_fk";
  ALTER TABLE "pages_blocks_guides_c_t_a" DROP CONSTRAINT "pages_blocks_guides_c_t_a_secondary_button_target_id_pages_id_fk";
  ALTER TABLE "_pages_v_blocks_guides_c_t_a" DROP CONSTRAINT "_pages_v_blocks_guides_c_t_a_primary_button_target_id_pages_id_fk";
  ALTER TABLE "_pages_v_blocks_guides_c_t_a" DROP CONSTRAINT "_pages_v_blocks_guides_c_t_a_secondary_button_target_id_pages_id_fk";
  DROP INDEX "pages_blocks_guides_c_t_a_primary_button_target_idx";
  DROP INDEX "pages_blocks_guides_c_t_a_secondary_button_target_idx";
  DROP INDEX "_pages_v_blocks_guides_c_t_a_primary_button_target_idx";
  DROP INDEX "_pages_v_blocks_guides_c_t_a_secondary_button_target_idx";
  ALTER TABLE "pages_blocks_guides_c_t_a" ADD COLUMN "primary_button_url" varchar;
  ALTER TABLE "pages_blocks_guides_c_t_a" ADD COLUMN "secondary_button_url" varchar;
  ALTER TABLE "_pages_v_blocks_guides_c_t_a" ADD COLUMN "primary_button_url" varchar;
  ALTER TABLE "_pages_v_blocks_guides_c_t_a" ADD COLUMN "secondary_button_url" varchar;
  ALTER TABLE "pages_blocks_guides_c_t_a" DROP COLUMN "primary_button_target_id";
  ALTER TABLE "pages_blocks_guides_c_t_a" DROP COLUMN "secondary_button_target_id";
  ALTER TABLE "_pages_v_blocks_guides_c_t_a" DROP COLUMN "primary_button_target_id";
  ALTER TABLE "_pages_v_blocks_guides_c_t_a" DROP COLUMN "secondary_button_target_id";`)
}
