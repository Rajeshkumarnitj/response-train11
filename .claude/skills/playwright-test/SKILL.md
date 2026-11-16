---
name: playwright-test
description: Add, fix, run and report on Playwright tests in this repo (tests/*.spec.js against saucedemo.com). Use this whenever the user asks to write or add a test, run the tests, show or open the test report, rename or renumber tests, or fix a flaky or failing Playwright test, even if they don't say "Playwright". Covers running the suite, serving the HTML report in the preview pane, and committing and pushing test changes when asked.
---

# Playwright tests in this repo

The suite lives in `tests/sauce-demo.spec.js` and tests https://www.saucedemo.com/ (login `standard_user` / `secret_sauce`; other users: `locked_out_user`, `problem_user`). Config is `playwright.config.js`: headed Chromium, one worker, HTML reporter, 60s test timeout.

## Writing a test

1. Read the existing spec first and match its style: `test('Sauce demo test-N <what it checks>', async ({page}) => {...})`, `require('@playwright/test')`, double-quoted locators, login at the top of each test.
2. **Name and number.** Titles are `Sauce demo test-N <meaningful description>`, numbered consecutively in file order. Never leave a bare `Sauce demo test`. After adding, removing or merging tests, renumber so there are no gaps or duplicates.
3. **Wait before you read.** The inventory renders after login, so `allTextContents()` or `count()` right after `click()` can return empty and make a test pass or fail by timing. Put a web-first assertion first (`await expect(locator).toHaveCount(6)`), then read values.
4. **Assert something.** A test that only `console.log`s can't fail. Use `expect` on the title, URL, text, counts or prices. Prefer `data-test` attributes, then ids and classes already used in the file.
5. Never commit `test.only` (CI runs the whole suite) and never skip a test to make a run green.

## Running and reporting

Always set `PW_TEST_HTML_REPORT_OPEN=never`; otherwise the report server blocks the command.

```bash
PW_TEST_HTML_REPORT_OPEN=never npx playwright test                    # whole suite
PW_TEST_HTML_REPORT_OPEN=never npx playwright test -g "test-3"        # one test by title
PW_TEST_HTML_REPORT_OPEN=never npx playwright test --repeat-each=3 -g "test-3"   # check for flakiness
```

For a new or changed test, run it a few times with `--repeat-each` before trusting it, then run the full suite once.

**Showing the report on the right:** check whether port 9323 already has a report server (the page keeps showing the latest report from disk). If not, run `npx playwright show-report --port 9323 --host localhost` in the background. Then open `http://localhost:9323` with the browser pane's `navigate`, and call `show_pane` with `preview` so the pane is visible. If the start fails with `EADDRINUSE`, a server is already running and nothing more is needed.

When you report results, give the pass/fail count, name any failing test with its cause, and say whether anything is committed.

## Committing

Commit or push only when the user asks. Stage just the files for the change (for example `tests/sauce-demo.spec.js`), not unrelated untracked folders. End commit messages with the attribution line the session requires. The branch is `claudework`; `git push` rules in `.claude/settings.json` ask first.
