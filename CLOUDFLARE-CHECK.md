# Cloudflare Pages Configuration Check

## Current Issue
404 errors for paths like `/boats/catalina-22-1986/` even though files exist in build output.

## Required Cloudflare Pages Settings

Go to: **Cloudflare Dashboard → Pages → sailing-texas-site → Settings → Builds & deployments**

### Build Settings Must Be:
- **Build command:** `npm run build`
- **Build output directory:** `_site`
- **Root directory:** `/` (or leave empty)
- **Deploy command:** (leave EMPTY - Cloudflare handles deployment automatically)

### ⚠️ Important Checks:

1. **Build Output Directory:**
   - Must be exactly: `_site`
   - NOT: `_site/` (no trailing slash)
   - NOT: `dist` or `build`

2. **Deploy Command:**
   - Should be EMPTY
   - If it says `npm run deploy`, that's WRONG - clear it!

3. **Node Version:**
   - Should be Node.js 18 or higher
   - Check in: Settings → Environment Variables

## Verify Build is Working

1. Go to: **Pages → sailing-texas-site → Deployments**
2. Click on the latest deployment
3. Check the build logs - you should see:
   ```
   [11ty] Writing ./_site/boats/catalina-22-1986/index.html
   ```
4. If you see errors, check the logs

## Test After Fix

After updating settings, trigger a new deployment:
- Either push a new commit, or
- Go to Deployments → Retry deployment

Then test: `https://sailing-texas-site.pages.dev/boats/catalina-22-1986/`
