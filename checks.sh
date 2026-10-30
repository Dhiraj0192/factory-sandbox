#!/usr/bin/env bash
set -euo pipefail

echo "==> lint"
npm run lint

echo "==> typecheck"
npm run typecheck

echo "==> test"
npm run test

echo "==> build"
npm run build

echo "All checks passed."
