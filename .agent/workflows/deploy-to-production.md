---
description: Merge `develop` branch into `main` and push to remote to trigger production deployment.
---

## Command

1. Check current git status
2. Switch to `main` branch
3. Merge `develop` into `main` (fast-forward)
4. Push `main` to origin
5. Switch back to `develop` branch

## Usage

When you need to deploy current changes from `develop` to production:

```bash
git checkout main && git merge develop && git push origin main && git checkout develop
```

## Notes

- Always ensure `develop` branch is clean before merging
- This triggers automatic deployment to production via CI/CD
- After deployment, verify on ways2spain.com
