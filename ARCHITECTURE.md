# Architecture

Diamond Control is a static browser application with one shared in-memory state.

- `fixtures.ts` supplies deterministic synthetic work lanes.
- `domain.ts` owns attention ranking, recommendation, proposal preparation, Human Gate transition, Human-only decisions, and receipts.
- `webmcp.ts` exposes five structured tools through the WebMCP imperative API.
- `app.ts` renders the same state to the Human UI.
- `scripts/serve.mjs` serves the committed static build for local testing.

## Authority invariant

```text
agent: read → recommend → PROPOSED → AWAITING_HUMAN
human:                              APPROVED | REJECTED
```

An agent cannot approve or reject. Once an action reaches `AWAITING_HUMAN`, another agent preparation cannot replace it; the Human must resolve the current gate first.

There is no backend, database, authentication layer, direct AI API, or hidden execution service.
