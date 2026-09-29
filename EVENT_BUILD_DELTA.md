# AI Solution Makers — event-built delta

Baseline: public `main` commit `7f3f5a8c54afc75961c08c150bb4c630ff891c1d`, published 2026-08-30.

Event successor goal: prove a stateful agent can detect when its planned action has become invalid **before** mutation, preserve authoritative state, and recover deterministically.

## Event-new behavior

- Work lanes carry monotonic revisions.
- Recommendations expose the revision/state they observed.
- `prepare_action` checks `expected_revision` (and optional expected state).
- Stale intent returns `BLOCKED_SAFE / STALE_STATE`.
- Failure receipt exposes expected vs observed state, preserved action, `action_state_changed:false`, and one next valid move.
- Fresh re-read/recommendation produces a new valid bound action.
- A visible deterministic state-drift fixture enables the failure to be demonstrated on demand.

## Deliberately not built

Backend, database, auth, autonomous decisions, generic multi-agent orchestration, auto-repair, broad observability, full Failure Frontier.
