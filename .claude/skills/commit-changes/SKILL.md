---
name: commit-changes
description: Automates the process of committing changes with granular objective-based commits, separate final version bumps, and specialized "Fix" type formatting. Operates autonomously without asking for confirmation.
---

# Commit Changes Skill

Automates the workflow for committing changes in the ZiaPizza Website repository (single Next.js app at the root). Ensures logical grouping of related changes, consistent versioning (`X.Y` format in root `package.json`), and accurate commit messages. Designed for autonomous execution.

## Prerequisites

- **Git** installed and configured.
- **Node.js** available to run the bump scripts.
- Use bash shell commands (Unix-style paths).

## Workflow

### 1. Status Audit

Before analyzing changes, report the current state of the workspace.

1. **Check Version**:
   ```bash
   node .claude/skills/commit-changes/scripts/get_status.js
   ```
2. **Report**: Display the current version. Proceed autonomously to analyze changes without asking for confirmation.

### 2. Analyze and Group Changes

Run `git status` and `git diff` to identify all changed files. Group them into **logical sets** based on objective. **Maximize granularity**: a separate group for each distinct objective.

### 3. Determine Bump Type

Decide on the bump type for this phase: `patch` (default — bumps the minor digit in `X.Y`), `major`, or `none`.

### 4. Execute Objective-Based Commits (Code Only)

For EACH logical group:

1. **Stage only the relevant files**: `git add path/to/file1 ...`
2. **Generate a commit message** matching this repo's style (see recent `git log`):
   - **Regular**: `Nature(Component): description` — e.g. `feat(Admin): add local /admin CMS for editing content`
   - **Fix**: `fix(Component): description (vX.Y)` where `vX.Y` is the **current** version (not the bumped one) — e.g. `fix(Footer): move phone tel link out of wrapping location Link (v2.0)`
   - Common natures: `feat`, `fix`, `chore`, `refactor`, `style`, `docs`, `perf`.
   - Common components: page/section names (`Header`, `Hero`, `Footer`, `Admin`, `Loyalty`, `Reviews`, `StickyOrderBar`, `SmoothScroll`), or content areas (`content`, `styles`).
3. **Commit** using a heredoc for the message.
4. Repeat for each logical group.

**CRITICAL**: Do NOT include `package.json` version updates in these commits.

### 5. Final Version Bump Commit

After all functional changes are committed, perform a single final commit for the version bump.

**Check for pre-existing version bump first**: Inspect `git diff HEAD package.json`. If `package.json` already contains a version change versus `git show HEAD:package.json`, **do NOT bump again** — just stage the modified file. Otherwise:

1. **Apply Bump**:
   ```bash
   node .claude/skills/commit-changes/scripts/bump_version.js package.json patch
   ```
2. **Stage**: `git add package.json` (and `package-lock.json` if it changed as a result).
3. **Commit message** (matches recent style `chore(version): bump to v2.1`):
   ```
   chore(version): bump to vX.Y
   ```
4. **Commit** using a heredoc.

If bump type is `none`, skip this step entirely.

## Guidelines

- **Autonomous Mode**: Do NOT ask the user for confirmation, approval, or additional information once the directive to commit is given.
- **No Co-Author**: NEVER add a `Co-Authored-By` line to commit messages.
- **No `--no-verify`**: Never skip git hooks. If a hook fails, fix the underlying issue and create a new commit.
- **Atomic Commits**: Keep commits focused. Don't mix unrelated changes (e.g. UI tweak + content JSON edit) in one commit.
- **Granularity**: Two unrelated changes in the same component → two separate commits.
- **No Push**: Do not push to remote unless the user explicitly asks.
- **No PRs**: This project commits directly to `master`; there is no release branch / PR workflow.
