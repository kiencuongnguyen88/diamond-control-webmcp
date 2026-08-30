# Privacy and Safety

Diamond Control is intentionally self-contained.

## Data

- All visible work-lane data is synthetic and deterministic.
- The app has no backend or database.
- It does not collect account data, personal records, credentials, or analytics.
- It does not call an AI API directly.

## Authority

WebMCP tools may read state, recommend, prepare a reversible proposal, and request Human review.

They may not:

- approve or reject an action;
- publish, send, commit, or deploy anything;
- bypass the visible Human Gate;
- replace an action that is already awaiting Human review.

Only visible Human interaction can resolve `AWAITING_HUMAN` into `APPROVED` or `REJECTED`.

## Public repository boundary

This repository contains only the standalone demo, synthetic fixtures, tests, build scripts, and public documentation. Private work data, credentials, local machine paths, internal audit screenshots, and unrelated repository history are not part of the public payload.
