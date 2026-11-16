# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

Playwright (`@playwright/test`) training project that runs end-to-end tests against https://www.saucedemo.com/ (login `standard_user` / `secret_sauce`). All tests live in `tests/sauce-demo.spec.js`. There are no npm scripts; use `npx` directly.

## Commands

```bash
npm ci                                   # install deps (as CI does)
npx playwright install chromium          # install browser
npx playwright test                      # run all tests
npx playwright test -g "test-4"          # run a single test by title
npx playwright test tests/sauce-demo.spec.js:73   # run a single test by line
npx playwright show-report               # serve the HTML report (default port 9323)
```

## Configuration notes (`playwright.config.js`)

- Reporter is `html` (output in `playwright-report/`); `PW_TEST_HTML_REPORT_OPEN=never` stops it auto-opening after a run.
- Tests run **headed** (`headless: false`) in Chromium with a single worker (no `fullyParallel`); test timeout 60s, `expect` timeout 40s.
- The config uses ESM `import` syntax while `package.json` says `"type": "commonjs"`; keep this in mind if changing module settings.

## CI

`Jenkinsfile` (Windows agent, `bat` steps): `npm ci` → `npx playwright install chromium` → `npx playwright test`, then archives `playwright-report/**`. Because CI runs the whole suite, never commit `test.only`.
