# ADR review checklist

Go through every item before presenting a draft. Fix failures, or mark the gap `TBD` and tell the user.

## Honesty
- [ ] Every factual claim is backed by the user's words or by repo evidence; nothing is invented (numbers, benchmarks, approvals, security sign-off).
- [ ] Unknowns are marked `TBD`, not guessed.
- [ ] Status is `Proposed` unless the user explicitly confirmed acceptance.

## Completeness
- [ ] Title states the decision, not just the topic.
- [ ] Context explains the problem and the constraints, so it can be understood without the chat.
- [ ] At least two options are listed, with the rejected ones explained.
- [ ] The Decision section says what was chosen and the main reason.
- [ ] Consequences include at least one real downside or operating cost.
- [ ] Validation says what evidence would confirm or reverse the decision.

## Fit with the repo
- [ ] ID is the next free number in `docs/adr/`; the filename is `ADR-NNN-kebab-slug.md`.
- [ ] No existing ADR is contradicted or duplicated; related ones are linked, and superseded ones are updated (status line only).
- [ ] Claims about the codebase match what is actually in the repo.

## Readability
- [ ] About one page; a new teammate can follow it.
- [ ] Irreversible or production-affecting steps are called out, with an explicit approval requirement.
