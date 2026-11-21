#!/usr/bin/env bash
# Build the static site and publish it to the gh-pages branch (GitHub Pages "deploy from branch").
# Usage: npm run deploy:pages
set -euo pipefail
cd "$(dirname "$0")/.."
REPO_NAME=$(basename -s .git "$(git remote get-url origin)")
rm -rf .next-pages
GITHUB_PAGES=true BASE_PATH="/$REPO_NAME" NEXT_DIST_DIR=.next-pages NEXT_TELEMETRY_DISABLED=1 npx next build
touch .next-pages/.nojekyll
TMP=$(mktemp -d)
cp -R .next-pages/. "$TMP"
cd "$TMP"
git init -q -b gh-pages
git add -A
git commit -q -m "Deploy $(git -C "$OLDPWD" rev-parse --short HEAD)"
git push -f "$(git -C "$OLDPWD" remote get-url origin)" gh-pages
rm -rf "$TMP"
echo "Deployed to gh-pages"
