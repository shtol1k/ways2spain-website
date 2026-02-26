# Local Media Storage Setup

## Current Configuration

### Environment Variables (.env.local)
```bash
MEDIA_STORAGE=local
```

### How It Works

1. **Local Development** (localhost:3000):
   - `MEDIA_STORAGE=local` in .env.local
   - Files are saved to `public/media/`
   - Files are accessible at `/media/filename.ext`
   - NOT uploaded to R2

2. **Production** (Vercel):
   - `MEDIA_STORAGE=r2` in Vercel Environment Variables
   - Files are uploaded to Cloudflare R2
   - Files are accessible at `https://pub-xxx.r2.dev/media/filename.ext`

## Testing Local Storage

1. Start local server:
   ```bash
   npm run dev:next
   ```

2. Check console logs for:
   ```
   🔍 Storage Configuration Debug:
     - MEDIA_STORAGE: local
     - R2_BUCKET_NAME: w2s-media
     ...
     📁 Using LOCAL storage (explicit)
   ```

3. Upload file via Payload Admin:
   - Go to http://localhost:3000/admin
   - Navigate to Media collection
   - Upload a file

4. Verify file was saved:
   ```bash
   ls -la public/media/
   ```

5. Check URL in database:
   - Should be: `/media/filename.ext`
   - NOT: `https://pub-xxx.r2.dev/media/filename.ext`

## Troubleshooting

### Problem: Files still going to R2 locally

**Check 1:** Verify .env.local has `MEDIA_STORAGE=local`
```bash
grep MEDIA_STORAGE .env.local
# Should output: MEDIA_STORAGE=local
```

**Check 2:** Restart dev server
```bash
# Stop server (Ctrl+C)
npm run dev:next
```

**Check 3:** Clear Next.js cache
```bash
rm -rf .next
npm run dev:next
```

### Problem: Files not accessible

**Check 1:** Verify file exists
```bash
ls -la public/media/
```

**Check 2:** Check public folder is served
- Next.js serves files from `public/` automatically
- Should be accessible at `http://localhost:3000/media/filename.ext`

**Check 3:** Check URL in database
- Go to Payload Admin → Media collection
- Check the URL field
- Should start with `/media/`

### Problem: Permission denied

**Check folder permissions:**
```bash
chmod -R 755 public/media/
```

## File Structure

```
public/
├── media/
│   ├── .gitkeep           # Gitkeep to preserve folder in git
│   ├── uploaded-image.jpg # Uploaded files appear here
│   └── another-file.png
├── favicon.ico
├── logo.png
└── ...
```

## Git Ignore

The `.gitignore` file is configured to:
- Ignore all files in `public/media/*`
- Keep `.gitkeep` file
- Prevent accidentally committing uploaded media

## Important Notes

- ✅ Local files do NOT go to R2
- ✅ Local files are NOT committed to git
- ✅ Only works when `MEDIA_STORAGE=local`
- ✅ R2 files on Vercel are separate
- ✅ Each environment has its own storage

## Switching Between Storage Modes

### To test R2 locally:
```bash
# In .env.local
MEDIA_STORAGE=r2
```

### To use local storage:
```bash
# In .env.local
MEDIA_STORAGE=local
```

### Production always uses R2:
```bash
# In Vercel Environment Variables
MEDIA_STORAGE=r2
```
