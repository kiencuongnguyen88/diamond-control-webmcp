# Architecture

Diamond Control is a static browser application with one shared in-memory state.

- `fixtures.ts` supplies deterministic synthetic work lanes, now with monotonic lane revisions.
- `domain.ts` owns attention ranking, revision-bound recommendation, precondition validation, proposal preparation, Human Gate transition, Human-only decisions, safe-stop receipts, and deterministic recovery helpers.
- `webmcp.ts` exposes five structured tools through the WebMCP imperative API.
- `app.ts` renders the same state to the Human UI and includes a visible demo-only state-drift control.
- `scripts/serve.mjs` serves the committed static build for local testing.

## Authority invariant

```text
agent: read(revision N) -> recommend(bound to N) -> validate N -> PROPOSED -> AWAITING_HUMAN
human:                                                                APPROVED | REJECTED
```

An agent cannot approve or reject. Once an action reaches `AWAITING_HUMAN`, another agent preparation cannot replace it; the Human must resolve the current gate first.

## Failure invariant

```text
if current lane revision/state != recommendation precondition
  -> BLOCKED_SAFE / STALE_STATE
  -> no authoritative action-state mutation
  -> expected/observed evidence
  -> fresh-read + re-recommend
```

`failureReceipt` is diagnostic state. It may be updated when a blocked attempt is recorded. The no-mutation proof therefore compares the authoritative action-state surfaces: lanes after the external change, proposed action, and Human decision receipt before vs. after the blocked preparation.

The visible `simulateExternalLaneUpdate` control is a deterministic demo fixture representing another actor/process changing state between planning and action. It is not exposed as a WebMCP tool.

There is no backend, database, authentication layer, direct AI API, or hidden execution/recovery service.
