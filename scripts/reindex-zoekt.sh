#!/bin/bash
set -eu

CPAN_DIR="${CPAN_DIR:-/metacpan-cpan-extracted}"
ZOEKT_INDEX_DIR="${ZOEKT_INDEX_DIR:-/var/zoekt-index}"

if [ ! -d "$CPAN_DIR/distros" ]; then
    echo "ERROR: $CPAN_DIR/distros not found"
    exit 1
fi

mkdir -p "$ZOEKT_INDEX_DIR"

echo "Building Zoekt index from $CPAN_DIR/distros/ ..."
echo "Index directory: $ZOEKT_INDEX_DIR"

START=$(date +%s)

zoekt-index \
    -index "$ZOEKT_INDEX_DIR" \
    -file_limit 2097152 \
    "$CPAN_DIR/distros"

END=$(date +%s)
echo "Zoekt index built in $((END - START)) seconds"

# Write a marker file with the current HEAD for change detection
if [ -d "$CPAN_DIR/.git" ]; then
    git -C "$CPAN_DIR" rev-parse --short HEAD > "$ZOEKT_INDEX_DIR/.indexed-head"
fi
