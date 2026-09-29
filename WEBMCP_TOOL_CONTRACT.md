# WebMCP Tool Contract

The five public tools are declared in `src/webmcp.ts`.

| Tool | Read-only hint | Contract |
| --- | --- | --- |
| `get_workspace_state` | `true` | Return normalized page state, revisions and receipts; never mutate authoritative state |
| `get_attention_items` | `true` | Return lanes that need attention with current revisions; never mutate |
| `recommend_next_move` | `true` | Return one advisory bounded next move bound to `observed_revision` / `observed_state` |
| `prepare_action` | `false` | Require `lane_id` + `expected_revision`; create `PROPOSED` only when the recommendation precondition is still current |
| `request_human_gate` | `false` | Move the current proposal to `AWAITING_HUMAN` |

## Safe-stop behavior

`prepare_action` can return a structured `BLOCKED_SAFE` outcome with:

- `STALE_STATE` — observed lane revision/state no longer matches the recommendation;
- `HUMAN_GATE_OCCUPIED` — another proposal is already awaiting Human review;
- `INVALID_INPUT`;
- `UNKNOWN_LANE`.

Blocked preparation records diagnostic evidence but does not change authoritative action state. The receipt carries expected/observed state, preserved action/lane evidence, `action_state_changed:false`, and one explicit `next_valid_move`.

## Non-authority guarantees

No tool has approval, rejection, publish, commit, send, deployment, or gate-bypass semantics.

Only the visible UI calls the Human decision function.
