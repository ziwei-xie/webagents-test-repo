#!/bin/bash
set -e

echo "=== Custom Build for CAP App ==="

# Step 1: Run cds build --production
# @sap/cds-dk is available from devDependencies (installed with --ignore-scripts)
echo "Running cds build --production..."
npx cds build --production 2>&1
echo "CDS build completed."

# Step 2: Copy app/ static assets into gen/srv/app/
if [ -d app ]; then
  echo "Copying app/ to gen/srv/app/..."
  mkdir -p gen/srv/app
  cp -r app/* gen/srv/app/
fi

# Step 3: Copy db/data/ for initial data loading
if [ -d db/data ]; then
  echo "Copying db/data/ to gen/srv/data/..."
  mkdir -p gen/srv/data
  cp -r db/data/* gen/srv/data/
fi

# Step 4: Copy node_modules to gen/srv/
echo "Copying node_modules to gen/srv/..."
cp -r node_modules gen/srv/

# Step 5: CRITICAL - Remove broken @cap-js/sqlite and better-sqlite3
# These were pulled in as transitive deps of @sap/cds-dk but their native
# addons were NOT compiled (due to --ignore-scripts). If left in place,
# CDS auto-detects them and tries to use broken SQLite → crash.
# Without them, CDS falls back to its built-in mock database.
echo "Removing broken SQLite native modules..."
rm -rf gen/srv/node_modules/@cap-js/sqlite 2>/dev/null || true
rm -rf gen/srv/node_modules/better-sqlite3 2>/dev/null || true
rm -rf gen/srv/node_modules/prebuild-install 2>/dev/null || true

echo "=== Custom Build Completed ==="
echo "Contents of gen/srv/:"
ls gen/srv/
