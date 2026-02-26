# Payload CMS Migration Workflow

## 📋 Overview

This project uses **Payload CMS 3.x** with **PostgreSQL** database. We follow a **migration-first** approach for all database schema changes. This ensures:

- ✅ Explicit, version-controlled database changes
- ✅ No unexpected schema modifications in production
- ✅ Clear audit trail of all database modifications
- ✅ Predictable behavior for AI-assisted development

---

## 🎯 Philosophy: Migrations-First Development

**We DO NOT use `push` mode (dev mode) for database synchronization.**

Instead, we:
1. Modify collections/config in `payload.config.ts`
2. Create a migration using `payload migrate:create`
3. Apply the migration locally with `payload migrate`
4. Test changes in development mode
5. Commit migration files to Git
6. Deploy to Vercel (migrations run automatically)

This approach is **safer**, **more predictable**, and **essential for AI-assisted development**.

---

## 🔄 Local Development Workflow

### Step 1: Modify Collections or Config

Make changes to your Payload configuration:

**Example: Add a new field to Media collection**

```typescript
// src/collections/Media.ts
fields: [
  // ... existing fields
  {
    name: 'folder',
    type: 'relationship',
    relationTo: 'mediaFolders',
    hasMany: false,
  },
  {
    name: 'folderPath',
    type: 'text',
    admin: { readOnly: true },
  },
],
```

### Step 2: Create Migration

```bash
npm run payload -- migrate:create descriptive-migration-name
```

**Examples:**
- `npm run payload -- migrate:create add-folder-field-to-media`
- `npm run payload -- migrate:create create-media-folders-collection`

**What happens:**
- Payload analyzes current database schema
- Compares with your Payload config
- Generates SQL migration file in `src/migrations/`
- Format: `YYYYMMDD_HHMMSS_descriptive-migration-name.ts`

### Step 3: Review Migration File

**Always review the generated migration!**

```typescript
// src/migrations/20260201_204122_add-folder-field.ts
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "media" ADD COLUMN "folder_id" integer;
    ALTER TABLE "media" ADD COLUMN "folder_path" varchar;
  `);
}
```

**Check:**
- ✅ SQL looks correct?
- ✅ All changes included?
- ✅ No unintended side effects?

### Step 4: Apply Migration Locally

```bash
npm run migrate
```

**What happens:**
- Payload runs all pending migrations
- Local database schema updated
- Ready for testing

### Step 5: Test in Development Mode

```bash
npm run dev:next
```

**Verify:**
- ✅ Admin panel opens without errors
- ✅ New fields/collections visible in UI
- ✅ Can create/edit records successfully
- ✅ Data persists correctly

### Step 6: Commit Changes

```bash
git add src/migrations/ src/collections/ payload.config.ts
git commit -m "feat: add folder organization to media collection"
```

**Always include:**
- Migration files (`src/migrations/`)
- Collection/config changes
- Related code modifications

---

## 🚀 Production Deployment Workflow

### What Happens Automatically on Vercel:

1. **Build Triggered:**
   - Code pushed to `migration/nextjs-payload` branch
   - Vercel starts new build

2. **Install Dependencies:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Postinstall Hook Runs:**
   ```bash
   npm run postinstall
   ```
   This executes: `npm run migrate`

4. **Migrations Applied:**
   - Cleanup script removes any dev mode artifacts
   - `payload migrate` runs against Supabase
   - Production database schema updated
   - Migration status recorded in `payload_migrations` table

5. **Build Completed:**
   ```bash
   npm run build:next
   ```
   - Next.js builds with updated schema
   - Admin panel includes new collections/fields

### No Manual Intervention Required!

---

## 🤖 AI Agent Guidelines

### When Modifying Database Schema:

**DO:**
1. ✅ Modify collection/config files first
2. ✅ Create migration immediately after
3. ✅ Review generated SQL code
4. ✅ Apply migration locally
5. ✅ Test in dev mode before committing
6. ✅ Include all migration files in commit

**DON'T:**
1. ❌ Skip migration creation
2. ❌ Assume dev mode will handle it
3. ❌ Apply migrations without reviewing
4. ❌ Commit without testing locally
5. ❌ Modify database directly (use migrations only)

### Common Scenarios:

#### Adding a New Collection:

```bash
# 1. Create collection file
# src/collections/NewCollection.ts

# 2. Import in payload.config.ts
import { NewCollection } from './src/collections/NewCollection'

# 3. Add to collections array
collections: [Users, NewCollection, Media, ...]

# 4. Create migration
npm run payload -- migrate:create create-new-collection

# 5. Apply locally
npm run migrate

# 6. Test
npm run dev:next

# 7. Commit
git add src/collections/NewCollection.ts payload.config.ts src/migrations/
```

#### Adding Fields to Existing Collection:

```bash
# 1. Modify collection file
# src/collections/Media.ts - add new fields

# 2. Create migration
npm run payload -- migrate:create add-x-field-to-media

# 3. Apply + Test + Commit
npm run migrate && npm run dev:next
git add src/collections/Media.ts src/migrations/
```

#### Modifying Field Properties:

```bash
# 1. Change field definition
# src/collections/Users.ts - modify field type, options, etc.

# 2. Create migration
npm run payload -- migrate:create modify-user-field

# 3. Review migration carefully!
# ALTER COLUMN operations can be destructive

# 4. Apply + Test + Commit
npm run migrate && npm run dev:next
git add src/collections/Users.ts src/migrations/
```

---

## ⚠️ Troubleshooting

### Error: "column already exists"

**Cause:** Migration was already applied, but you're trying to run it again.

**Solution:**
```bash
# Check migration status
npm run payload -- migrate:status

# If migration shows as "ran", it's already applied
# Don't apply it again
```

### Error: "relation does not exist"

**Cause:** Migration not created or not applied.

**Solution:**
```bash
# Check if migration file exists
ls src/migrations/

# Check migration status
npm run payload -- migrate:status

# Apply pending migrations
npm run migrate
```

### Error: Dev mode still active

**Cause:** Push mode is enabled in config.

**Solution:**
```typescript
// payload.config.ts
db: postgresAdapter({
  pool: { ... },
  push: false,  // Ensure this is false!
}),
```

### Migration SQL Looks Wrong

**Cause:** Payload generated incorrect migration.

**Solution:**
1. Manually edit the migration file
2. Fix the SQL code
3. Apply with `npm run migrate`
4. Test thoroughly

---

## 📝 Migration Best Practices

### Naming Conventions:

Use descriptive, lowercase names with hyphens:

```
✅ Good:
- add-folder-field-to-media
- create-media-folders-collection
- modify-user-role-enum
- add-index-to-media-filename

❌ Bad:
- migration1
- stuff
- changes
```

### Before Committing:

1. **Check migration status:**
   ```bash
   npm run payload -- migrate:status
   ```
   All migrations should show as "ran"

2. **Verify local database:**
   - Open admin panel
   - Check all new fields/collections visible
   - Test creating/editing records

3. **Review migration file:**
   - SQL looks correct?
   - No unintended changes?
   - Indexes created if needed?

4. **Test deployment:**
   - Push to branch
   - Monitor Vercel build logs
   - Verify production database after deploy

### Rollback Strategy:

If something goes wrong:

```bash
# Option 1: Rollback migration
npm run payload -- migrate:down

# Option 2: Reset to specific migration
npm run payload -- migrate:reset

# Option 3: Fresh start (DESTRUCTIVE!)
npm run payload -- migrate:fresh
```

**⚠️ WARNING:** Rollbacks in production can be dangerous! Always:
1. Backup database first
2. Test rollback locally
3. Have a plan for data migration

---

## 🔍 Monitoring

### Check Migration History:

```sql
-- In Supabase SQL Editor
SELECT * FROM payload_migrations ORDER BY created_at DESC;
```

### Check Schema:

```sql
-- List all tables
SELECT table_name
FROM information_schema.tables
WHERE table_schema = 'public'
ORDER BY table_name;

-- Describe specific table
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'media'
ORDER BY ordinal_position;
```

---

## 📚 Additional Resources

- [Payload CMS Migrations Docs](https://payloadcms.com/docs/database/migrations)
- [PostgreSQL Schema Changes](https://www.postgresql.org/docs/current/ddl.html)
- [Vercel Deployment Guide](https://payloadcms.com/docs/production/deployment)

---

## 🎯 Quick Reference

```bash
# Create migration
npm run payload -- migrate:create --name descriptive-name

# Apply migrations locally
npm run migrate

# Check migration status
npm run payload -- migrate:status

# Rollback last migration
npm run payload -- migrate:down

# Start development server
npm run dev:next

# Create admin user
npm run db:create-admin
```

---

**Last Updated:** 2026-02-01
**Maintained by:** AI-assisted development team
**Questions?** Check Payload docs or ask in team chat
