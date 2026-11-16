---
name: adr-writer
description: Draft, revise or supersede Architecture Decision Records (ADRs) in docs/adr/. Use this whenever the user wants to record, document or justify a technical decision, even if they don't say "ADR" — e.g. "write up why we chose X over Y", "document this trade-off", "log this decision", "we decided to use X", or when comparing architecture or tooling options that will need a paper trail. Also use it to review or update an existing ADR. Never invents rationale, evidence, or approval.
---

# ADR writer

An ADR is useful only if a future reader can see *why* the choice was made and *what would change it*. Most of this workflow protects that: don't invent reasons, show the rejected options, and keep accepted records stable.

Bundled files: `assets/adr-template.md` (the structure to copy) and `references/review-checklist.md` (the review rubric).

## Workflow

1. **Gather the decision.** You need the problem, constraints, options considered, who is affected, and the status. Take these from the user's message and from repo evidence (code, config, README, CI). Whatever is still unknown goes in as `TBD`; a visible gap is better than a plausible-sounding invention that a reviewer might trust.
2. **Read `docs/adr/` first.** Look for an existing record that covers or contradicts this decision, and note the numbering and tone so the new record matches. If the decision replaces an earlier one, plan a superseding ADR (see "Revising" below).
3. **Pick the ID.** List `docs/adr/`, take the highest `ADR-NNN`, add one, and keep the three-digit padding. Use a short kebab-case slug: `ADR-002-playwright-headed-chromium.md`. Create `docs/adr/` if it doesn't exist.
4. **Draft from the template.** Fill every section of `assets/adr-template.md`. Use today's date for `Date`. Keep it to about one page; link to evidence rather than pasting it.
5. **Show the trade-offs.** List the options that were rejected and why, and give the chosen option at least one real downside or operating cost. A record with only upsides can't be reviewed.
6. **Self-review** against `references/review-checklist.md` and fix what fails before showing the user.
7. **Present as `Proposed`.** Only a human can mark a record `Accepted`; when the user confirms, update the status and date. Don't commit or push unless asked.

## Revising

- A `Proposed` ADR can be edited in place.
- An `Accepted` ADR is history. Don't rewrite its decision. Write a new ADR with `Supersedes: ADR-NNN`, and change only the old record's status line to `Superseded by ADR-MMM`. Typos and broken links are fine to fix directly.
- If the user asks to "update" an accepted ADR, say which of these you're doing.

## Guardrails

- Cite repository evidence (file paths, config values) where it exists. Don't fabricate benchmarks, costs, approvals or security reviews.
- If the decision involves irreversible data changes or a production deployment, say so in Consequences and get explicit approval before taking any action; writing the ADR never counts as that approval.
- If an existing ADR doesn't match the repo (for example, it describes files that don't exist), flag the mismatch instead of silently copying its claims into the new one.

## Example

> Draft an ADR for choosing Postgres + pgvector versus a managed vector database for our knowledge assistant, accounting for operating cost, latency, and team capacity.

Result: `docs/adr/ADR-00N-pgvector-vs-managed-vector-db.md`, status `Proposed`, with both options, the cost/latency/capacity trade-offs marked `TBD` where the user gave no numbers, and a Validation section saying what measurement would confirm or reverse the choice.

## Done when

The ADR passes the checklist, a reviewer can explain why the choice was made, and the record names the evidence that could reverse it.
