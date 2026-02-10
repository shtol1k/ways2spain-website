---
name: payload-migrations
description: Manage Payload CMS database migrations for schema changes. Use when adding fields, creating collections, modifying relationships, or any database schema modifications in Payload CMS projects. Ensures migrations are created, tested, and committed correctly.
---

# Payload CMS Migrations

## ⚠️ CRITICAL: Automatic vs Manual Migrations

### ALWAYS use `migrate:create` for schema changes

When adding collections, fields, or relationships, **ALWAYS use Payload's migration generator**:

```bash
npx payload migrate:create --name descriptive-name
```

**Payload's generator automatically includes:**

- ✅ Main table creation (CREATE TABLE)
- ✅ **System table updates** (`payload_locked_documents_rels`, `payload_preferences_rels`)
- ✅ All required foreign keys and indexes
- ✅ Proper Payload-specific column types
- ✅ Schema snapshot for future comparisons

### NEVER create manual migrations for schema changes

**Why manual schema migrations break things:**

- ❌ Missing `payload_locked_documents_rels` relations → **Blank edit pages in admin**
- ❌ No schema snapshot created → Generator creates "full" migration next time
- ❌ Missing system table indexes and constraints
- ❌ Hydration errors in Next.js admin panel

### When to use manual migrations

Manual migrations are ONLY for:

- ✅ **Seed data** (INSERT statements)
- ✅ **Data transformations** (UPDATE, data migration)
- ✅ **Cleanup** (DROP old tables not managed by Payload)
- ✅ **Custom SQL** that doesn't affect Payload schema

---

## ⚠️ File Naming Convention

### Use ONLY underscores (`_`) in migration file names — NEVER hyphens (`-`)

Payload auto-generates `src/migrations/index.ts`, which imports each migration file using `import * as <identifier> from './filename'`. The identifier is derived directly from the filename.

**Hyphens (`-`) are NOT valid characters in TypeScript/JavaScript identifiers.** TypeScript interprets `-` as the subtraction operator, which causes a **build-breaking syntax error**.

**Example of the error:**

```
./src/migrations/index.ts:1:47
Type error: 'from' expected.

> 1 | import * as migration_20260202_120000_rollback-folder-system from '...';
  |                                               ^
```

TypeScript reads `rollback` as a valid identifier, then sees `-` (subtraction), then `folder` — and at that point expects `from`, not another identifier. This **breaks the production build on Vercel**.

**Correct naming:**

```bash
# ✅ CORRECT — underscores only
npx payload migrate:create --name add_folders_support
npx payload migrate:create --name create_categories_table
npx payload migrate:create --name rollback_folder_system

# ❌ WRONG — hyphens will break the build
npx payload migrate:create --name add-folders-support
npx payload migrate:create --name create-categories-table
npx payload migrate:create --name rollback-folder-system
```

**If you already have migration files with hyphens:**

1. Open `src/migrations/index.ts`
2. Replace all hyphens with underscores **only in import alias names** and their references (`.up`, `.down`)
3. Keep original file paths and `name` values with hyphens (they match actual filenames)

---

## Quick Workflow

### Adding a New Collection

```bash
# 1. Create collection file
# src/collections/Tags.ts

# 2. Add to payload.config.ts
import { Tags } from './src/collections/Tags'
collections: [Users, Media, Tags]

# 3. Generate migration AUTOMATICALLY
npx payload migrate:create --name add-tags-collection

# 4. Review generated migration
cat src/migrations/YYYYMMDD_HHMMSS_*.ts
# ✅ Should include: CREATE TABLE tags
# ✅ Should include: ALTER TABLE payload_locked_documents_rels ADD COLUMN tags_id

# 5. Apply migration
npx payload migrate

# 6. Test in admin panel
npm run dev

# 7. Commit ALL files
git add src/migrations/ src/collections/ payload.config.ts
```

### Adding a Field to Existing Collection

```bash
# 1. Modify collection file
# src/collections/Media.ts - add new field

# 2. Generate migration
npx payload migrate:create --name add-category-to-media

# 3. Review + Apply + Test
npx payload migrate
npm run dev

# 4. Commit
git add src/migrations/ src/collections/
```

### Adding Seed Data (Manual Migration OK)

```bash
# 1. Create manual migration file
# src/migrations/YYYYMMDD_HHMMSS_seed-categories.ts

# 2. Write INSERT-only SQL
export async function up({ db }) {
  await db.execute(sql`
    INSERT INTO categories (name, slug) VALUES
    ('News', 'news'),
    ('Tips', 'tips');
  `)
}

# 3. Apply
npx payload migrate
```

---

## Critical Rules

**NEVER:**

- ❌ Create manual migrations for CREATE TABLE / ALTER TABLE schema changes
- ❌ Modify `payload_locked_documents_rels` manually without understanding Payload's requirements
- ❌ Skip migration creation and modify DB directly
- ❌ Delete `.json` snapshot files from migrations folder

**ALWAYS:**

- ✅ Use `npx payload migrate:create` for any schema changes
- ✅ Review the generated SQL before applying
- ✅ Check that system tables are updated in the migration
- ✅ Keep snapshot `.json` files in git

---

## Troubleshooting

### `Type error: 'from' expected` in `src/migrations/index.ts`

**Cause:** Migration file names contain hyphens (`-`), which produce invalid TypeScript identifiers in auto-generated `index.ts`.

**Fix:**

1. Open `src/migrations/index.ts`
2. Replace hyphens with underscores in all import alias names and their `.up`/`.down` references
3. Do NOT rename the actual migration files or change `name` strings — they must match the filesystem
4. Going forward, always use underscores in migration names (see **File Naming Convention** section above)

### Blank/empty edit pages in admin panel

**Cause:** Collection missing from `payload_locked_documents_rels`

**Fix:**

```sql
-- Add missing column
ALTER TABLE payload_locked_documents_rels
ADD COLUMN IF NOT EXISTS {collection}_id integer
REFERENCES {collection}(id) ON DELETE CASCADE;

CREATE INDEX IF NOT EXISTS payload_locked_documents_rels_{collection}_id_idx
ON payload_locked_documents_rels({collection}_id);
```

### Migration creates ALL tables instead of incremental changes

**Cause:** No previous schema snapshot exists

**Solution:**

1. If this is initial setup, this is expected — apply the full migration
2. If tables already exist, you need to:
   - Extract ONLY the new changes from the migration
   - Apply them manually via SQL
   - Register the migration as completed:
   ```sql
   INSERT INTO payload_migrations (name, batch, created_at, updated_at)
   VALUES ('migration_name', NEXT_BATCH, NOW(), NOW());
   ```

### "column already exists" error

Migration already applied partially. Check status:

```bash
npx payload migrate:status
```

### "relation does not exist" error

Migration not applied. Run:

```bash
npx payload migrate
```

---

## Quick Reference

```bash
# Create migration (ALWAYS use for schema changes)
npx payload migrate:create --name descriptive-name

# Apply pending migrations
npx payload migrate

# Check migration status
npx payload migrate:status

# Rollback last migration
npx payload migrate:down

# Start dev server
npm run dev
```

---

## Pre-Commit Checklist

- [ ] Migration created via `npx payload migrate:create` (not manually for schema)
- [ ] Migration SQL includes system table updates if adding collection
- [ ] Migration applied locally
- [ ] `npx payload migrate:status` shows "Ran: Yes"
- [ ] Dev server runs without errors
- [ ] Edit pages work (not blank!)
- [ ] Can create/edit records
- [ ] Migration `.ts` file in commit
- [ ] Snapshot `.json` file in commit (if generated)

---

## Additional Resources

- For detailed workflows: [reference.md](reference.md)
- For project-specific guide: `documentation/PAYLOAD_MIGRATIONS_GUIDE.md`
- Payload CMS docs: https://payloadcms.com/docs/database/migrations
