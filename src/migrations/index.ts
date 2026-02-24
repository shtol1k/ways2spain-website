import * as migration_20260202_120000_rollback_folder_system from './20260202_120000_rollback_folder_system';
import * as migration_20260202_120100_fix_empty_size_urls from './20260202_120100_fix_empty_size_urls';
import * as migration_20260202_140000_add_folders_support from './20260202_140000_add_folders_support';
import * as migration_20260202_150000_add_folders_to_locked_docs from './20260202_150000_add_folders_to_locked_docs';
import * as migration_20260203_180000_create_categories_table from './20260203_180000_create_categories_table';
import * as migration_20260203_180100_seed_blog_categories from './20260203_180100_seed_blog_categories';
import * as migration_20260203_180200_add_categories_to_locked_docs from './20260203_180200_add_categories_to_locked_docs';
import * as migration_20260203_180300_remove_categories_locales from './20260203_180300_remove_categories_locales';
import * as migration_20260203_204436 from './20260203_204436';
import * as migration_20260203_204712 from './20260203_204712';
import * as migration_20260203_212300_create_tags_table from './20260203_212300_create_tags_table';
import * as migration_20260203_213800_create_authors_table from './20260203_213800_create_authors_table';
import * as migration_20260204_114317 from './20260204_114317';
import * as migration_20260204_154132 from './20260204_154132';
import * as migration_20260204_160500_ensure_site_settings from './20260204_160500_ensure_site_settings';
import * as migration_20260207_172758_add_guides_collections from './20260207_172758_add_guides_collections';
import * as migration_20260210_104633 from './20260210_104633';
import * as migration_20260210_115249 from './20260210_115249';
import * as migration_20260210_120334 from './20260210_120334';
import * as migration_20260210_170144 from './20260210_170144';
import * as migration_20260210_171238 from './20260210_171238';
import * as migration_20260210_172306 from './20260210_172306';
import * as migration_20260210_181642_add_hero_benefits from './20260210_181642_add_hero_benefits';
import * as migration_20260210_184543_simplify_hero_buttons from './20260210_184543_simplify_hero_buttons';
import * as migration_20260210_185653_hero_cta_groups from './20260210_185653_hero_cta_groups';
import * as migration_20260210_191200_hero_cta_unified_group from './20260210_191200_hero_cta_unified_group';
import * as migration_20260211_132543 from './20260211_132543';
import * as migration_20260218_135917 from './20260218_135917';
import * as migration_20260218_152352 from './20260218_152352';
import * as migration_20260220_222929 from './20260220_222929';
import * as migration_20260221_footer_slogan_service_links from './20260221_footer_slogan_service_links';
import * as migration_20260223_162355 from './20260223_162355';
import * as migration_20260224_203422 from './20260224_203422';

export const migrations = [
  {
    up: migration_20260202_120000_rollback_folder_system.up,
    down: migration_20260202_120000_rollback_folder_system.down,
    name: '20260202_120000_rollback_folder_system',
  },
  {
    up: migration_20260202_120100_fix_empty_size_urls.up,
    down: migration_20260202_120100_fix_empty_size_urls.down,
    name: '20260202_120100_fix_empty_size_urls',
  },
  {
    up: migration_20260202_140000_add_folders_support.up,
    down: migration_20260202_140000_add_folders_support.down,
    name: '20260202_140000_add_folders_support',
  },
  {
    up: migration_20260202_150000_add_folders_to_locked_docs.up,
    down: migration_20260202_150000_add_folders_to_locked_docs.down,
    name: '20260202_150000_add_folders_to_locked_docs',
  },
  {
    up: migration_20260203_180000_create_categories_table.up,
    down: migration_20260203_180000_create_categories_table.down,
    name: '20260203_180000_create_categories_table',
  },
  {
    up: migration_20260203_180100_seed_blog_categories.up,
    down: migration_20260203_180100_seed_blog_categories.down,
    name: '20260203_180100_seed_blog_categories',
  },
  {
    up: migration_20260203_180200_add_categories_to_locked_docs.up,
    down: migration_20260203_180200_add_categories_to_locked_docs.down,
    name: '20260203_180200_add_categories_to_locked_docs',
  },
  {
    up: migration_20260203_180300_remove_categories_locales.up,
    down: migration_20260203_180300_remove_categories_locales.down,
    name: '20260203_180300_remove_categories_locales',
  },
  {
    up: migration_20260203_204436.up,
    down: migration_20260203_204436.down,
    name: '20260203_204436',
  },
  {
    up: migration_20260203_204712.up,
    down: migration_20260203_204712.down,
    name: '20260203_204712',
  },
  {
    up: migration_20260203_212300_create_tags_table.up,
    down: migration_20260203_212300_create_tags_table.down,
    name: '20260203_212300_create_tags_table',
  },
  {
    up: migration_20260203_213800_create_authors_table.up,
    down: migration_20260203_213800_create_authors_table.down,
    name: '20260203_213800_create_authors_table',
  },
  {
    up: migration_20260204_114317.up,
    down: migration_20260204_114317.down,
    name: '20260204_114317',
  },
  {
    up: migration_20260204_154132.up,
    down: migration_20260204_154132.down,
    name: '20260204_154132',
  },
  {
    up: migration_20260204_160500_ensure_site_settings.up,
    down: migration_20260204_160500_ensure_site_settings.down,
    name: '20260204_160500_ensure_site_settings',
  },
  {
    up: migration_20260207_172758_add_guides_collections.up,
    down: migration_20260207_172758_add_guides_collections.down,
    name: '20260207_172758_add_guides_collections',
  },
  {
    up: migration_20260210_104633.up,
    down: migration_20260210_104633.down,
    name: '20260210_104633',
  },
  {
    up: migration_20260210_115249.up,
    down: migration_20260210_115249.down,
    name: '20260210_115249',
  },
  {
    up: migration_20260210_120334.up,
    down: migration_20260210_120334.down,
    name: '20260210_120334',
  },
  {
    up: migration_20260210_170144.up,
    down: migration_20260210_170144.down,
    name: '20260210_170144',
  },
  {
    up: migration_20260210_171238.up,
    down: migration_20260210_171238.down,
    name: '20260210_171238',
  },
  {
    up: migration_20260210_172306.up,
    down: migration_20260210_172306.down,
    name: '20260210_172306',
  },
  {
    up: migration_20260210_181642_add_hero_benefits.up,
    down: migration_20260210_181642_add_hero_benefits.down,
    name: '20260210_181642_add_hero_benefits',
  },
  {
    up: migration_20260210_184543_simplify_hero_buttons.up,
    down: migration_20260210_184543_simplify_hero_buttons.down,
    name: '20260210_184543_simplify_hero_buttons',
  },
  {
    up: migration_20260210_185653_hero_cta_groups.up,
    down: migration_20260210_185653_hero_cta_groups.down,
    name: '20260210_185653_hero_cta_groups',
  },
  {
    up: migration_20260210_191200_hero_cta_unified_group.up,
    down: migration_20260210_191200_hero_cta_unified_group.down,
    name: '20260210_191200_hero_cta_unified_group',
  },
  {
    up: migration_20260211_132543.up,
    down: migration_20260211_132543.down,
    name: '20260211_132543',
  },
  {
    up: migration_20260218_135917.up,
    down: migration_20260218_135917.down,
    name: '20260218_135917',
  },
  {
    up: migration_20260218_152352.up,
    down: migration_20260218_152352.down,
    name: '20260218_152352',
  },
  {
    up: migration_20260220_222929.up,
    down: migration_20260220_222929.down,
    name: '20260220_222929',
  },
  {
    up: migration_20260221_footer_slogan_service_links.up,
    down: migration_20260221_footer_slogan_service_links.down,
    name: '20260221_footer_slogan_service_links',
  },
  {
    up: migration_20260223_162355.up,
    down: migration_20260223_162355.down,
    name: '20260223_162355',
  },
  {
    up: migration_20260224_203422.up,
    down: migration_20260224_203422.down,
    name: '20260224_203422'
  },
];
