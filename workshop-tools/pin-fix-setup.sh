#!/usr/bin/env bash
# Sets up the workshop's pin fix on the integration lead's machine.
#
# AI-DLC 2.11.3-preview.20261029.1 rejects every published Unit at `pin`
# (known-issues/README.md). This script:
#   1. installs Bun if it is missing,
#   2. copies the project's .claude/ folder to ~/aidlc-pin-fix/runtime and
#      applies pin-run-floor.patch to that copy (the repository is untouched,
#      because `land` needs a clean checkout),
#   3. puts a small `aidlc` wrapper first on the PATH: `aidlc unit pin ...`
#      runs the patched copy, every other command runs the real `aidlc`.
#
# Run it from the lead's main clone, where the seed put it:
#   bash workshop-tools/pin-fix-setup.sh
#
# Everything it creates lives in ~/aidlc-pin-fix, ~/.bun and one PATH line in
# ~/.bashrc (or ~/.zshrc). In a Workshop Studio environment that is deleted
# with the event. On your own machine, undo it with:
#   rm -rf ~/aidlc-pin-fix   and delete the "aidlc-pin-fix" line from ~/.bashrc
set -euo pipefail

here="$(cd "$(dirname "$0")" && pwd)"
patch_file="$here/pin-run-floor.patch"
fix_dir="$HOME/aidlc-pin-fix"
path_line='export PATH="$HOME/aidlc-pin-fix/bin:$PATH"   # aidlc-pin-fix'

say() { printf '%s\n' "$*"; }
fail() { printf 'pin fix: %s\n' "$*" >&2; exit 1; }

project="$(git -C "$here" rev-parse --show-toplevel 2>/dev/null)" ||
  fail "run this from inside the group project (bash workshop-tools/pin-fix-setup.sh)."
[ -f "$patch_file" ] || fail "pin-run-floor.patch is missing next to this script."
[ -f "$project/.claude/tools/aidlc-unit.ts" ] ||
  fail "$project has no .claude/tools/aidlc-unit.ts. Run 'aidlc config --harness claude' in it first (participant guide, Step 8)."

# The real aidlc, never our own wrapper.
real_aidlc=""
IFS=: read -r -a path_dirs <<< "$PATH"
for d in "${path_dirs[@]}" "$HOME/.local/bin"; do
  if [ -x "$d/aidlc" ] && [ "$d" != "$fix_dir/bin" ]; then real_aidlc="$d/aidlc"; break; fi
done
[ -n "$real_aidlc" ] || fail "aidlc is not installed. Do the participant guide's Step 6 first."

# 1. Bun
if command -v bun >/dev/null 2>&1; then
  bun_bin="$(command -v bun)"
elif [ -x "$HOME/.bun/bin/bun" ]; then
  bun_bin="$HOME/.bun/bin/bun"
else
  say "Installing Bun..."
  curl -fsSL https://bun.sh/install | bash >/dev/null
  bun_bin="$HOME/.bun/bin/bun"
  [ -x "$bun_bin" ] || fail "Bun did not install. Ask a facilitator."
fi

# 2. Patched copy of the project's AI-DLC tools
rm -rf "$fix_dir/runtime"
mkdir -p "$fix_dir/runtime" "$fix_dir/bin"
cp -R "$project/.claude" "$fix_dir/runtime/"
if ! (cd "$fix_dir/runtime" && git apply -p1 "$patch_file" 2>/dev/null); then
  rm -rf "$fix_dir"
  fail "the patch does not fit this AI-DLC release. Check .aidlc-version says 2.11.3-preview.20261029.1, then ask a facilitator."
fi
grep -q "LOCAL PATCH" "$fix_dir/runtime/.claude/tools/aidlc-unit.ts" || fail "the patch did not apply."

# 3. Wrapper
cat > "$fix_dir/bin/aidlc" <<EOF
#!/usr/bin/env bash
# Workshop pin fix: 'aidlc unit pin' uses the patched copy; everything else is the real aidlc.
if [ "\${1:-}" = "unit" ] && [ "\${2:-}" = "pin" ]; then
  shift 2
  root="\$(git rev-parse --show-toplevel 2>/dev/null || pwd)"
  AIDLC_PROJECT_DIR="\$root" exec "$bun_bin" "$fix_dir/runtime/.claude/tools/aidlc-unit.ts" pin "\$@"
fi
exec "$real_aidlc" "\$@"
EOF
chmod +x "$fix_dir/bin/aidlc"

case "${SHELL:-}" in *zsh) rc="$HOME/.zshrc" ;; *) rc="$HOME/.bashrc" ;; esac
touch "$rc"
grep -q 'aidlc-pin-fix' "$rc" || printf '\n%s\n' "$path_line" >> "$rc"

say "Pin fix ready."
say "  Patched copy: $fix_dir/runtime"
say "  Wrapper:      $fix_dir/bin/aidlc  (real aidlc: $real_aidlc)"
say "Close every terminal and Claude Code session, open a new terminal, and check:"
say "  command -v aidlc     # should print $fix_dir/bin/aidlc"
