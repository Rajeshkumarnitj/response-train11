---
name: rag-eval
description: Evaluate RAG retrieval and answer outputs against a versioned JSONL fixture, generate machine-readable reports, and explain failing cases. Use before merging retrieval, chunking, prompt, or model changes, and in CI; do not mislabel deterministic proxies as model-judged faithfulness.
---

# RAG evaluation – reproducible team workflow

1. Read the dataset contract in `references/dataset-schema.md`.
2. Run the standard-library evaluator (no API key or LLM needed):

   `python .claude/skills/rag-eval/scripts/evaluate.py --input evals/fixtures.jsonl --report evals/report.json`

3. Inspect per-case failures and classify: retrieval miss, missing answer keyword, invalid source citation, or prohibited answer phrase.
4. To gate CI, repeat with `--fail-on-regression --min-retrieval-recall 0.80 --min-answer-coverage 0.80`.
5. Report dataset version, command, summary, failed case IDs, and artifact path. Propose a fix; do not silently edit expected answers to make a test pass.
6. For true grounding/faithfulness, recommend a separate verified human or model-judge check. **Citation validity is not proof of faithfulness.**

## Done when

Another instructor can run the command from a fresh clone with Python 3, reproduce the same scores, review the JSON, and use an exit code as a CI gate. This is the Day 12 handoff contract.