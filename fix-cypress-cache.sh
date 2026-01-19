#!/bin/bash
# Script to fix Cypress cache permissions issue
# This sets the CYPRESS_CACHE_FOLDER to a location within the project

export CYPRESS_CACHE_FOLDER="$(pwd)/node_modules/.cache/cypress"
mkdir -p "$CYPRESS_CACHE_FOLDER"

echo "Cypress cache folder set to: $CYPRESS_CACHE_FOLDER"
echo "You can now run: npm install"




