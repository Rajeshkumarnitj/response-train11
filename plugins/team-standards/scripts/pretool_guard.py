#!/usr/bin/env python3
"""PreToolUse guard enforcing team standards.

Reads the hook event JSON from stdin. Exit code 2 blocks the tool call and
sends stderr back to Claude; exit code 0 allows it.
"""
import json
import re
import sys

BASH_RULES = [
    (r"git\s+push\b.*(--force\b|--force-with-lease\b|\s-f\b)", "Force-push is not allowed by team standards."),
    (r"git\s+push\b.*\b(master|main)\b", "Do not push directly to master/main; open a PR."),
    (r"--no-verify\b", "Skipping git hooks (--no-verify) is not allowed."),
    (r"git\s+reset\s+--hard\b", "git reset --hard is destructive; confirm with the user first."),
    (r"\brm\s+-[a-zA-Z]*r[a-zA-Z]*f|\brm\s+-[a-zA-Z]*f[a-zA-Z]*r", "Recursive force delete (rm -rf) is not allowed."),
]

SECRET_PATTERNS = [
    r"AKIA[0-9A-Z]{16}",
    r"-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----",
    r"(?i)(api[_-]?key|secret|token|password)\s*[:=]\s*['\"][^'\"\s]{8,}['\"]",
]


def block(msg):
    print(f"team-standards: {msg}", file=sys.stderr)
    sys.exit(2)


def main():
    try:
        event = json.load(sys.stdin)
    except json.JSONDecodeError:
        sys.exit(0)

    tool = event.get("tool_name", "")
    tin = event.get("tool_input", {}) or {}

    if tool == "Bash":
        cmd = tin.get("command", "")
        for pattern, msg in BASH_RULES:
            if re.search(pattern, cmd):
                block(msg)
    elif tool in ("Write", "Edit"):
        content = tin.get("content") or tin.get("new_string") or ""
        for pattern in SECRET_PATTERNS:
            if re.search(pattern, content):
                block("Possible hardcoded secret detected. Use environment variables instead.")

    sys.exit(0)


if __name__ == "__main__":
    main()
