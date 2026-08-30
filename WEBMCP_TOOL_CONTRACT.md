# WebMCP Tool Contract

The five public tools are declared in `src/webmcp.ts`.

| Tool | Read-only hint | Contract |
| --- | --- | --- |
| `get_workspace_state` | `true` | Return normalized page state; never mutate |
| `get_attention_items` | `true` | Return lanes that need attention; never mutate |
| `recommend_next_move` | `true` | Return one advisory bounded next move |
| `prepare_action` | `false` | Prepare a reversible `PROPOSED` action |
| `request_human_gate` | `false` | Move the current proposal to `AWAITING_HUMAN` |

## Non-authority guarantees

No tool has approval, rejection, publish, commit, send, deployment, or gate-bypass semantics.

`prepare_action` fails if an action is already `AWAITING_HUMAN`. This prevents an agent from replacing the item currently awaiting Human review.

Only the visible UI calls the Human decision function.
