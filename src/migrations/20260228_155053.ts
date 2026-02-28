import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_cards_type1_card_left_items" ADD COLUMN "details" varchar;
  ALTER TABLE "pages_blocks_cards_type1_card_right_items" ADD COLUMN "details" varchar;
  ALTER TABLE "_pages_v_blocks_cards_type1_card_left_items" ADD COLUMN "details" varchar;
  ALTER TABLE "_pages_v_blocks_cards_type1_card_right_items" ADD COLUMN "details" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "pages_blocks_cards_type1_card_left_items" DROP COLUMN "details";
  ALTER TABLE "pages_blocks_cards_type1_card_right_items" DROP COLUMN "details";
  ALTER TABLE "_pages_v_blocks_cards_type1_card_left_items" DROP COLUMN "details";
  ALTER TABLE "_pages_v_blocks_cards_type1_card_right_items" DROP COLUMN "details";`)
}
