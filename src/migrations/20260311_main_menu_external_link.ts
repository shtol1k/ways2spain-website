import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "main_menu_nav_items" ADD COLUMN "external_link" varchar;
    ALTER TABLE "main_menu_nav_items" ALTER COLUMN "link_id" DROP NOT NULL;
  `)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "main_menu_nav_items" DROP COLUMN IF EXISTS "external_link";
    ALTER TABLE "main_menu_nav_items" ALTER COLUMN "link_id" SET NOT NULL;
  `)
}
