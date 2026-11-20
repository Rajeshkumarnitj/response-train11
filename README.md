# ResponseTrain11
ResponseTrain11 Training assignments

## Team Standards plugin

Install the `team-standards` Claude Code plugin (PR check skill + PreToolUse guard hook):

```
/plugin install team-standards --marketplace Rajeshkumarnitj/response-train11
```

On older Claude Code versions:

```
/plugin marketplace add Rajeshkumarnitj/response-train11
/plugin install team-standards@team-marketplace
```

Requires Python on the PATH (hook) and the `gh` CLI (PR check).
