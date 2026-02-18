import * as migration_20260202_120000_rollback-folder-system from './20260202_120000_rollback-folder-system';
import * as migration_20260202_120100_fix-empty-size-urls from './20260202_120100_fix-empty-size-urls';
import * as migration_20260202_140000_add-folders-support from './20260202_140000_add-folders-support';
import * as migration_20260202_150000_add-folders-to-locked-docs from './20260202_150000_add-folders-to-locked-docs';
import * as migration_20260203_180000_create-categories-table from './20260203_180000_create-categories-table';
import * as migration_20260203_180100_seed-blog-categories from './20260203_180100_seed-blog-categories';
import * as migration_20260203_180200_add-categories-to-locked-docs from './20260203_180200_add-categories-to-locked-docs';
import * as migration_20260203_180300_remove-categories-locales from './20260203_180300_remove-categories-locales';
import * as migration_20260203_204436 from './20260203_204436';
import * as migration_20260203_204712 from './20260203_204712';
import * as migration_20260203_212300_create-tags-table from './20260203_212300_create-tags-table';
import * as migration_20260203_213800_create-authors-table from './20260203_213800_create-authors-table';
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

export const migrations = [
  {
    up: migration_20260202_120000_rollback-folder-system.up,
    down: migration_20260202_120000_rollback-folder-system.down,
    name: '20260202_120000_rollback-folder-system',
  },
  {
    up: migration_20260202_120100_fix-empty-size-urls.up,
    down: migration_20260202_120100_fix-empty-size-urls.down,
    name: '20260202_120100_fix-empty-size-urls',
  },
  {
    up: migration_20260202_140000_add-folders-support.up,
    down: migration_20260202_140000_add-folders-support.down,
    name: '20260202_140000_add-folders-support',
  },
  {
    up: migration_20260202_150000_add-folders-to-locked-docs.up,
    down: migration_20260202_150000_add-folders-to-locked-docs.down,
    name: '20260202_150000_add-folders-to-locked-docs',
  },
  {
    up: migration_20260203_180000_create-categories-table.up,
    down: migration_20260203_180000_create-categories-table.down,
    name: '20260203_180000_create-categories-table',
  },
  {
    up: migration_20260203_180100_seed-blog-categories.up,
    down: migration_20260203_180100_seed-blog-categories.down,
    name: '20260203_180100_seed-blog-categories',
  },
  {
    up: migration_20260203_180200_add-categories-to-locked-docs.up,
    down: migration_20260203_180200_add-categories-to-locked-docs.down,
    name: '20260203_180200_add-categories-to-locked-docs',
  },
  {
    up: migration_20260203_180300_remove-categories-locales.up,
    down: migration_20260203_180300_remove-categories-locales.down,
    name: '20260203_180300_remove-categories-locales',
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
    up: migration_20260203_212300_create-tags-table.up,
    down: migration_20260203_212300_create-tags-table.down,
    name: '20260203_212300_create-tags-table',
  },
  {
    up: migration_20260203_213800_create-authors-table.up,
    down: migration_20260203_213800_create-authors-table.down,
    name: '20260203_213800_create-authors-table',
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
    name: '20260218_152352'
  },
];
