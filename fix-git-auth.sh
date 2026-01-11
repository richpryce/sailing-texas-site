#!/bin/bash
# Git Authentication Fix Script
# This script helps fix git push authentication issues

echo "🔧 Git Authentication Fix"
echo "========================"
echo ""

# Check current remote
echo "Current remote URL:"
git remote -v
echo ""

# Option 1: Switch to SSH (if key is added to GitHub)
read -p "Do you want to switch to SSH? (y/n) " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    echo "Switching to SSH..."
    git remote set-url origin git@github.com:richpryce/sailing-texas-site.git
    echo "✅ Remote updated to SSH"
    echo ""
    echo "⚠️  Make sure your SSH key is added to GitHub:"
    echo "   1. Go to: https://github.com/settings/keys"
    echo "   2. Add this key:"
    cat ~/.ssh/id_ed25519.pub
    echo ""
    echo "Then try: git push"
    exit 0
fi

# Option 2: Use Personal Access Token
echo ""
echo "📝 To use HTTPS with Personal Access Token:"
echo ""
echo "1. Create a Personal Access Token:"
echo "   - Go to: https://github.com/settings/tokens"
echo "   - Click 'Generate new token (classic)'"
echo "   - Select scopes: repo (all)"
echo "   - Copy the token"
echo ""
echo "2. Update your remote URL with the token:"
echo "   git remote set-url origin https://YOUR_TOKEN@github.com/richpryce/sailing-texas-site.git"
echo ""
echo "3. Or use credential helper (safer):"
echo "   git config credential.helper store"
echo "   git push"
echo "   (Enter your username and paste token as password)"
echo ""
