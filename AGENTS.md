# Repository Working Agreement

This file applies to the entire repository. Every contributor and coding agent must follow it.

## Change workflow

1. Inspect the repository status and existing conventions before editing.
2. Keep each change focused on one logical outcome and avoid unrelated edits.
3. Add or update tests together with every change:
   - Feature work must include tests for the new behavior.
   - Bug fixes must include a regression test.
   - Refactors must preserve or improve relevant coverage.
   - Documentation, content, and configuration changes must include an appropriate automated validation when a behavioral test is not meaningful.
4. Run targeted checks while developing, then run every applicable test and validation command before delivery. This includes the full test suite plus lint, type-check, and build checks when the repository provides them.
5. Do not deliver or commit a change while a relevant test or validation is failing. Fix the failure first; if that is impossible, stop and report the blocker and the failing command.
6. Review `git diff` and `git status` before committing so generated files, secrets, and unrelated user changes are not included.

## Git commits

- Create one Git commit for each completed logical change after all applicable tests and validations pass.
- Do not leave completed work uncommitted when handing it back to the user.
- Stage only files that belong to the current change; preserve unrelated and pre-existing worktree changes.
- Use a concise, descriptive commit subject that explains the outcome, such as `feat: add project case-study section` or `test: cover portfolio navigation`.
- Do not amend, squash, reset, rebase, force-push, or otherwise rewrite history unless the user explicitly requests it.
- Do not push commits or create remote resources unless the user explicitly requests it.

## Test discovery

- Prefer the commands documented by the repository and its package manager.
- When present, run the repository's `test`, `lint`, `typecheck`, and `build` scripts before delivery.
- If a change introduces the first executable behavior in a repository with no test infrastructure, add a minimal maintainable test setup as part of that same change.
- Keep tests deterministic and focused on user-visible behavior or stable public interfaces. Avoid tests that merely duplicate implementation details.

## Definition of done

A change is complete only when all of the following are true:

- The requested behavior or content is implemented.
- Relevant tests were added or updated.
- Every applicable test and validation passes.
- The final diff contains only intended files and no secrets or disposable artifacts.
- The change has its own Git commit.
- The handoff names the commit and lists the verification commands that passed.
