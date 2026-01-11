# Deployment Guide

## ⚠️ Important: Use Cloudflare Pages, NOT Workers

Your site is a **static site** (11ty), so you need **Cloudflare Pages**, not Workers.

### ❌ Wrong Command (This is what's causing your error):
```bash
wrangler deploy          # This is for Workers (serverless functions)
```

### ✅ Correct Command:
```bash
wrangler pages deploy _site --project-name=sailing-texas-site
```

## Quick Deploy

```bash
# Option 1: Use the npm script (recommended)
npm run deploy

# Option 2: Manual commands
npm run build
wrangler pages deploy _site --project-name=sailing-texas-site
```

## Step-by-Step

1. **Build your site:**
   ```bash
   npm run build
   ```

2. **Deploy to Cloudflare Pages:**
   ```bash
   wrangler pages deploy _site --project-name=sailing-texas-site
   ```

3. **First time? Login to Cloudflare:**
   ```bash
   wrangler login
   ```

## Alternative: Use Cloudflare Dashboard (Easiest)

1. Go to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Navigate to **Pages** → **Create a project**
3. Connect your GitHub repository
4. Configure:
   - **Build command:** `npm run build`
   - **Build output directory:** `_site`
5. Click **Save and Deploy**

This will auto-deploy on every push to GitHub!

## Troubleshooting

### Error: "If are uploading a directory of assets..."
- **Cause:** You're using `wrangler deploy` instead of `wrangler pages deploy`
- **Fix:** Use `wrangler pages deploy` (note the "pages" part)

### Error: "Failed: error occurred while running deploy command"
- Make sure you've built the site first: `npm run build`
- Make sure the `_site` directory exists
- Check you're logged in: `wrangler login`
