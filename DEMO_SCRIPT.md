# Demo Script — 5-minute judge proof

## 0:00–0:35 — Problem
An agent can make a correct plan from state N and become wrong one second later when another actor changes the state. The dangerous part is not the error message; it is mutating after the plan's preconditions have expired.

## 0:35–1:20 — Bind intent to reality
Ask the agent to read attention items and recommend a next move. Show the returned lane, state, and `observed_revision`.

## 1:20–2:10 — Break it deliberately
Before preparation, use the visible **Simulate external update** control. The lane revision changes, but the prior recommendation remains bound to the old revision. Ask the agent to prepare using the old revision.

Expected result:
- `BLOCKED_SAFE`
- `STALE_STATE`
- expected vs observed revision visible
- `action_state_changed:false`
- no proposal created/replaced
- explicit next valid move

## 2:10–3:10 — Recover
Fresh-read and run `recommend_next_move` again. It returns the new revision and updated next move. Prepare from that revision; preparation succeeds.

## 3:10–4:00 — Human authority
Request Human Gate. Attempt a conflicting preparation while the gate is open. Show `BLOCKED_SAFE / HUMAN_GATE_OCCUPIED`; the original proposal remains intact. Human resolves the gate in the visible UI.

## 4:00–4:40 — Proof
Show automated tests and explain the invariant: diagnostic failure state may be recorded, but authoritative action state is byte-equivalent before/after a blocked prepare in tests.

## 4:40–5:00 — Engineering judgment
Five tools retained. No backend, no hidden execution, no automatic approval, no generic reliability platform. The event work is the state-precondition + safe-stop + recovery loop, not the August baseline.
