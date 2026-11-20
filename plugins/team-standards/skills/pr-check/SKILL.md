---
name: pr-check
description: Review a pull request against team standards and report findings. Use when the user asks to check, review, or validate a PR or branch before merge.
---

# PR check

Review the PR (number or branch given by the user; default to the current branch's PR, else `git diff master...HEAD`).

## Steps
1. Get metadata and diff: `gh pr view <pr>` and `gh pr diff <pr>`. Read changed files for context.
2. Check against the team standards below.
3. Report findings ranked by severity, each with `file:line`, the problem, and a suggested fix.
4. End with a one-line verdict: **Approve**, **Request changes**, or **Needs discussion**.

Report to the user only. Never post comments or modify the PR unless explicitly asked.

## Team standards
- **Tests:** every behavior change has a test; Playwright tests use web-first assertions (`expect(locator)...`), no `waitForTimeout`, no brittle CSS/XPath when role/text/test-id locators exist, no `test.only` left in.
- **Secrets:** no hardcoded credentials, tokens, or keys; use env vars.
- **Cleanliness:** no leftover `console.log` debugging, commented-out code, or unrelated file changes (e.g. `test-results/`, `playwright-report/`, local JSON outputs).
- **PR hygiene:** clear title and description, focused scope, targets `master`, commits not pushed directly to `master`.
- **Correctness:** logic bugs, unhandled errors, and missing edge cases.
