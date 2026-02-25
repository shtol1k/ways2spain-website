import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "main_menu" RENAME COLUMN "logo_id" TO "logo_large_id";
  ALTER TABLE "footer" RENAME COLUMN "logo_id" TO "logo_large_id";
  ALTER TABLE "main_menu" DROP CONSTRAINT "main_menu_logo_id_media_id_fk";
  
  ALTER TABLE "footer" DROP CONSTRAINT "footer_logo_id_media_id_fk";
  
  DROP INDEX "main_menu_logo_idx";
  DROP INDEX "footer_logo_idx";
  ALTER TABLE "main_menu" ADD COLUMN "logo_medium_id" integer;
  ALTER TABLE "footer" ADD COLUMN "logo_medium_id" integer;
  ALTER TABLE "main_menu" ADD CONSTRAINT "main_menu_logo_large_id_media_id_fk" FOREIGN KEY ("logo_large_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "main_menu" ADD CONSTRAINT "main_menu_logo_medium_id_media_id_fk" FOREIGN KEY ("logo_medium_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_large_id_media_id_fk" FOREIGN KEY ("logo_large_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_medium_id_media_id_fk" FOREIGN KEY ("logo_medium_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "main_menu_logo_large_idx" ON "main_menu" USING btree ("logo_large_id");
  CREATE INDEX "main_menu_logo_medium_idx" ON "main_menu" USING btree ("logo_medium_id");
  CREATE INDEX "footer_logo_large_idx" ON "footer" USING btree ("logo_large_id");
  CREATE INDEX "footer_logo_medium_idx" ON "footer" USING btree ("logo_medium_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "main_menu" RENAME COLUMN "logo_large_id" TO "logo_id";
  ALTER TABLE "footer" RENAME COLUMN "logo_large_id" TO "logo_id";
  ALTER TABLE "main_menu" DROP CONSTRAINT "main_menu_logo_large_id_media_id_fk";
  
  ALTER TABLE "main_menu" DROP CONSTRAINT "main_menu_logo_medium_id_media_id_fk";
  
  ALTER TABLE "footer" DROP CONSTRAINT "footer_logo_large_id_media_id_fk";
  
  ALTER TABLE "footer" DROP CONSTRAINT "footer_logo_medium_id_media_id_fk";
  
  DROP INDEX "main_menu_logo_large_idx";
  DROP INDEX "main_menu_logo_medium_idx";
  DROP INDEX "footer_logo_large_idx";
  DROP INDEX "footer_logo_medium_idx";
  ALTER TABLE "main_menu" ADD CONSTRAINT "main_menu_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "footer" ADD CONSTRAINT "footer_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "main_menu_logo_idx" ON "main_menu" USING btree ("logo_id");
  CREATE INDEX "footer_logo_idx" ON "footer" USING btree ("logo_id");
  ALTER TABLE "main_menu" DROP COLUMN "logo_medium_id";
  ALTER TABLE "footer" DROP COLUMN "logo_medium_id";`)
}
