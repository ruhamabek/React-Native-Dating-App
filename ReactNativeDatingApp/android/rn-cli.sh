#!/bin/bash
# Wrapper script for React Native CLI config used by Gradle autolinking.
# Uses the local react-native CLI directly to avoid pnpm/npx resolution issues.
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
PROJECT_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$PROJECT_ROOT"
node node_modules/react-native/cli.js config
