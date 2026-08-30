# Demo Script — target: under 3 minutes

## 0:00–0:25 — Problem

Show Diamond Control and explain the problem: agents can help triage work, but giving an agent the ability to recommend an action should not silently give it decision authority.

## 0:25–0:50 — WebMCP contract

Open Site tools and show the five explicit WebMCP tools:

`get_workspace_state`, `get_attention_items`, `recommend_next_move`, `prepare_action`, `request_human_gate`.

Point out that the first three are read/advisory tools and the last two only prepare state for Human review.

## 0:50–1:45 — Natural-language agent flow

Ask:

> What needs my attention? Recommend one next move, prepare it for my review, and request my approval. Do not approve or reject anything for me.

Show the agent select the synthetic `proof-repair` lane, prepare the bounded next move, and request the Human Gate.

## 1:45–2:20 — Human authority

Show `AWAITING_HUMAN`.

Explain that no WebMCP tool can approve or reject. Click one visible Human decision button and show the receipt.

Mention that once an action is awaiting Human review, another agent preparation cannot replace it.

## 2:20–2:45 — Close

Summarize the WebMCP value: explicit structured tools make the agent workflow reliable, while the visible Human Gate keeps consequential authority with the person using the page.
