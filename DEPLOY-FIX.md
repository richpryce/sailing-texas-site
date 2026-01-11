# Fix Cloudflare Pages Authentication Error

## The Problem
You're getting `Authentication error [code: 10000]` because your API token doesn't have Cloudflare Pages permissions.

## Solution 1: Update Token Permissions (If Using API Token)

1. **Go to:** https://dash.cloudflare.com/profile/api-tokens
2. **Find your token** (the one being used - check the last 4 characters)
3. **Click "Edit"** or create a new token
4. **Set these permissions:**
   ```
   Account Resources:
   - Include: All accounts
   - Permissions:
     ✅ Cloudflare Pages → Edit
     ✅ Account Settings → Read
   ```
5. **Save the token**
6. **Update the environment variable** with the new token

## Solution 2: Use OAuth Instead (Easier - Recommended)

### Step 1: Unset the API Token
```bash
# Check where it's set
env | grep CLOUDFLARE_API_TOKEN

# Unset it (if in current shell)
unset CLOUDFLARE_API_TOKEN

# If it's in your shell config, remove it:
# Check: ~/.zshrc, ~/.bashrc, ~/.bash_profile
# Remove the line: export CLOUDFLARE_API_TOKEN="..."
```

### Step 2: Use OAuth Login
```bash
npx wrangler login
```
This will open a browser to authenticate. Much easier!

### Step 3: Deploy
```bash
npm run deploy
```

## Solution 3: If Deploying from Cloudflare Pages CI/CD

If this error is happening during a Cloudflare Pages build:

1. Go to: Cloudflare Dashboard → Pages → Your Project → Settings
2. Find "Environment Variables"
3. Either:
   - **Update** `CLOUDFLARE_API_TOKEN` with a token that has Pages permissions
   - **Remove** `CLOUDFLARE_API_TOKEN` and use OAuth instead

## Quick Check: Where is the token set?

Run these to find where the token is coming from:

```bash
# Check current shell
echo $CLOUDFLARE_API_TOKEN

# Check shell config files
grep -r "CLOUDFLARE" ~/.zshrc ~/.bashrc ~/.bash_profile 2>/dev/null

# Check if it's in the project
grep -r "CLOUDFLARE" .env .env.local 2>/dev/null
```

## Recommended: Switch to OAuth

OAuth is simpler and doesn't require managing token permissions:

```bash
# 1. Unset token
unset CLOUDFLARE_API_TOKEN

# 2. Login with OAuth
npx wrangler login

# 3. Deploy
npm run deploy
```

This will work for all future deployments without token management!
