#!/usr/bin/env bash
set -euo pipefail

PORT="${1:-8000}"
HOST="${HOST:-127.0.0.1}"

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"

echo "Starting static preview at http://${HOST}:${PORT}/ (root: ${REPO_ROOT})"
echo "Press Ctrl+C to stop the server."

cd "${REPO_ROOT}"
python -m http.server "${PORT}" --bind "${HOST}"
