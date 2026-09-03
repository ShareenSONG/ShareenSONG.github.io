#!/bin/sh

set -eu

policy_file="${1:-AGENTS.md}"

if [ ! -f "$policy_file" ]; then
  echo "Missing repository policy: $policy_file" >&2
  exit 1
fi

assert_policy() {
  description="$1"
  pattern="$2"

  if ! grep -Eq "$pattern" "$policy_file"; then
    echo "Missing policy requirement: $description" >&2
    exit 1
  fi
}

assert_policy "tests are added or updated with every change" "Add or update tests together with every change"
assert_policy "all relevant validation passes before delivery" "run every applicable test and validation command before delivery"
assert_policy "completed logical changes receive a commit" "Create one Git commit for each completed logical change"
assert_policy "unrelated worktree changes are preserved" "preserve unrelated and pre-existing worktree changes"
assert_policy "handoff reports the commit and checks" "handoff names the commit and lists the verification commands that passed"

echo "AGENTS.md policy validation passed"
