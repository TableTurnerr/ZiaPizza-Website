---
name: commit-changes
description: Automate committing changes in the ZiaPizza Website repository with granular objective-based commits, a separate final package.json version bump, and repo-specific commit message formatting. Use when the user asks Codex to commit current changes, make focused git commits, bump the project version after commits, or preserve the old Claude commit workflow in Codex.
---

# Commit Changes

Use this skill to commit changes in this repository. The project is a single Next.js app at the repo root. Keep commits focused by objective, keep version changes separate from functional changes, and follow the repository's existing commit message style.

## Prerequisites

- Run commands from the repository root.
- Use the active shell syntax. In this workspace that is usually PowerShell.
- Follow Codex sandbox and approval rules. Proceed autonomously after the user asks to commit, but request escalation when required by the runtime policy.

## Workflow

### 1. Audit Status

Report the current version before analyzing changes:

```powershell
node .codex\skills\commit-changes\scripts\get_status.js
```

Then inspect the workspace:

```powershell
git status --short
git diff --stat
git diff
```

Also inspect staged changes if any exist:

```powershell
git diff --cached --stat
git diff --cached
```

### 2. Group Changes

Group changed files into logical sets based on objective. Maximize granularity: create a separate group for each distinct objective. Do not mix unrelated UI, content, styling, dependency, or configuration changes in one commit.

Respect user changes already in the worktree. Stage only files and hunks that belong to the commit being made.

### 3. Determine Version Bump

Choose the bump for the final version commit:

- `patch`: default; increments the second digit in this repo's `X.Y` version format.
- `major`: increments the first digit and resets the second digit to `0`.
- `none`: use only when the user asks not to bump, or when no functional change was committed.

### 4. Commit Functional Groups

For each logical group:

1. Stage only relevant files or hunks.
2. Generate a message matching recent `git log` style.
3. Commit without adding `Co-Authored-By`.

Message format:

- Regular: `nature(Component): description`
- Fix: `fix(Component): description (vX.Y)` where `vX.Y` is the current version before the final bump.

Common natures: `feat`, `fix`, `chore`, `refactor`, `style`, `docs`, `perf`.

Common components: page or section names such as `Header`, `Hero`, `Footer`, `Admin`, `Loyalty`, `Reviews`, `StickyOrderBar`, `SmoothScroll`, or content areas such as `content` and `styles`.

Do not include `package.json` version updates in functional commits.

### 5. Final Version Bump Commit

After all functional changes are committed, create one version bump commit unless the chosen bump is `none`.

First check whether `package.json` already contains a version change versus `HEAD`:

```powershell
git diff HEAD -- package.json
```

If the version was already changed, stage that file without bumping again. Otherwise run:

```powershell
node .codex\skills\commit-changes\scripts\bump_version.js package.json patch
```

Use `major` instead of `patch` when a major bump is needed.

Then stage `package.json` and `package-lock.json` if it changed, and commit:

```text
chore(version): bump to vX.Y
```

## Rules

- Do not push unless the user explicitly asks.
- Do not create PRs unless the user explicitly asks.
- Do not use `--no-verify`; fix hook failures instead.
- Do not ask for confirmation after the user asks to commit, except for required Codex sandbox escalation.
- Keep commits atomic. If two unrelated changes touch the same component, use separate commits.
- Keep the final version bump as the last commit.
