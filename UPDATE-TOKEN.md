# Update Your API Token

## The Issue
Your token configuration looks correct, but you're likely using an **old token** that was created before you added Pages permissions.

## Solution: Create a New Token

Even though your current token shows the right permissions, you need to:

1. **Create a NEW token** with these permissions (don't edit the old one)
2. **Update the environment variable** with the new token

### Steps:

1. **In the Cloudflare token page:**
   - Click "Create Token" (create a new one, don't edit the old)
   - Set the same permissions you showed:
     - Account → Cloudflare Pages → Edit
     - Account → Account Settings → Read
   - Account Resources: Include → All accounts
   - Copy the NEW token immediately

2. **Update where the token is used:**

   **If deploying locally:**
   ```bash
   export CLOUDFLARE_API_TOKEN="your-new-token-here"
   npm run deploy
   ```

   **If deploying from Cloudflare Pages (CI/CD):**
   - Go to: Cloudflare Dashboard → Pages → Your Project → Settings
   - Find "Environment Variables"
   - Update `CLOUDFLARE_API_TOKEN` with your NEW token
   - Save

3. **Test the deployment:**
   ```bash
   npm run deploy
   ```

## Why This Happens

When you edit permissions on an existing token, sometimes the changes don't propagate immediately, or the token was created with different scopes. Creating a fresh token ensures it has the correct permissions from the start.

## Alternative: Use OAuth (No Token Management)

If you keep having issues, switch to OAuth:

```bash
# Unset the token
unset CLOUDFLARE_API_TOKEN

# Login with OAuth
npx wrangler login

# Deploy
npm run deploy
```

This avoids token management entirely!
