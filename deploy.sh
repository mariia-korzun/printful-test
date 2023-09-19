#!/usr/bin/env sh
set -e
npm run build
# navigate into the build output directory
cd dist
git init
git add -A
git commit -m 'deploy'
git push -f git@github.com:mariia-korzun/printful-test.git master:gh-pages
cd - 