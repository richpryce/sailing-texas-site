# Create Cloudflare Pages Project

## The Issue
The project "sailing-texas-site" doesn't exist yet in Cloudflare Pages.

## Solution: Create the Project First

You have two options:

### Option 1: Create via Cloudflare Dashboard (Easiest)

1. Go to: https://dash.cloudflare.com
2. Navigate to **Pages** → **Create a project**
3. Choose **"Upload assets"** (for manual deployment)
4. Project name: `sailing-texas-site`
5. Click **"Create project"**
6. Now run: `npm run deploy`

### Option 2: Create via Wrangler CLI

```bash
# Create the project first
npx wrangler pages project create sailing-texas-site

# Then deploy
npm run deploy
```

Or use the new script I added:
```bash
npm run deploy:create
```

### Option 3: Let Wrangler Create It Automatically

Update the deploy command to create the project if it doesn't exist. I've added a `deploy:create` script that does this.

## Recommended: Use Dashboard Method

The dashboard method is easier and lets you:
- Connect to GitHub for auto-deployments
- Set build settings
- Configure custom domains
- Manage environment variables

Once created via dashboard, you can still use `npm run deploy` for manual deployments.
