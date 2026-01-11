#!/bin/bash
# Fix Cloudflare Authentication for Pages Deployment

echo "🔐 Cloudflare Authentication Fix"
echo "================================="
echo ""

# Check if API token is set
if [ -n "$CLOUDFLARE_API_TOKEN" ]; then
    echo "⚠️  Found CLOUDFLARE_API_TOKEN environment variable"
    echo "   This may have insufficient permissions for Pages."
    echo ""
    echo "Options:"
    echo "1. Unset the token and use OAuth login (recommended)"
    echo "2. Update token permissions at: https://dash.cloudflare.com/profile/api-tokens"
    echo ""
    read -p "Unset CLOUDFLARE_API_TOKEN and use OAuth? (y/n) " -n 1 -r
    echo
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        unset CLOUDFLARE_API_TOKEN
        echo "✅ Token unset. Now run: npx wrangler login"
    fi
else
    echo "✅ No API token found. Using OAuth login..."
    echo ""
    echo "Run: npx wrangler login"
fi
