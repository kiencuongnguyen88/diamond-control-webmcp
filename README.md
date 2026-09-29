# Diamond Control

Diamond Control is a human-gated agent workspace built with WebMCP.

It demonstrates a bounded collaboration pattern: an agent can read work state, identify what needs attention, recommend a next move, prepare that move, and request review — while the final decision remains explicitly Human-controlled in the visible interface.

The demo uses deterministic synthetic work data. It has no backend, database, authentication, direct AI API, private user records, or automatic approval.

## AI Solution Makers 2026 — Safe Stop & Recovery

The August baseline already had five WebMCP tools, a visible Human Gate, and a guard preventing an agent from replacing an action already awaiting Human review.

The Sep 28–30 event successor adds one bounded reliability contract: **an agent may prepare a state-changing action only from the lane revision it actually observed**.

If the world changes after recommendation but before preparation, `prepare_action` returns `BLOCKED_SAFE / STALE_STATE` before authoritative action mutation, exposes expected vs observed state, preserves the current action state, and gives the agent one recovery path: fresh-read → re-recommend → continue only from the new revision.

Event-built delta:

- monotonic lane revisions;
- revision/state-bound recommendations;
- precondition validation at `prepare_action`;
- `STALE_STATE` in addition to the existing Human-Gate conflict;
- proof-oriented `BLOCKED_SAFE` receipts;
- explicit `action_state_changed:false` semantics;
- deterministic re-read/re-recommend recovery;
- visible state-drift demo fixture;
- regression tests for no-mutation and recovery.

The public WebMCP surface remains exactly five tools.

## Why WebMCP

Without a structured tool contract, an agent has to infer meaning from page text and controls. Diamond Control exposes the workflow directly through WebMCP, so an agent can use explicit schemas and state transitions instead of guessing at the UI.

| Tool | Role | State mutation |
| --- | --- | --- |
| `get_workspace_state` | Read normalized work lanes, revisions, proposal, Human Gate state, and receipts | No |
| `get_attention_items` | Read lanes that need attention and why | No |
| `recommend_next_move` | Recommend one bounded next move bound to the observed revision/state | No |
| `prepare_action` | Validate the bound revision and create a reversible `PROPOSED` action or return `BLOCKED_SAFE` | Yes only on valid preparation; diagnostic receipt on blocked attempt |
| `request_human_gate` | Move the current proposal to `AWAITING_HUMAN` | Yes, gated |

No WebMCP tool can approve or reject an action. Only the visible Human Gate controls can produce `APPROVED` or `REJECTED`.

## Failure and recovery journey

```text
recommend_next_move at revision N
→ external/Human state changes to N+1
→ prepare_action(expected_revision=N)
→ BLOCKED_SAFE / STALE_STATE
→ action_state_changed=false
→ fresh-read + re-recommend at N+1
→ valid prepare succeeds
→ request Human Gate
→ Human decides in visible UI
```

A proposal already waiting at the Human Gate also cannot be replaced by another agent preparation; the Human must resolve it first.

## Run the committed build

The repository includes a prebuilt `dist/` directory.

With Node.js installed:

```bash
npm run serve
```

Open `http://127.0.0.1:4173`.

On Windows, `RUN_LOCAL_WEBMCP.bat` does the same thing.

## Rebuild and verify from source

Source verification requires Node.js and npm. TypeScript is pinned to `5.8.3` in `devDependencies` and `package-lock.json`.

On Windows, run:

```text
RUN_VERIFY_SOURCE.bat
```

If the pinned local TypeScript dependency is missing, the runner performs one bounded `npm ci --ignore-scripts --no-audit --no-fund` installation and then runs the verification suite.

On other platforms:

```bash
npm ci --ignore-scripts --no-audit --no-fund
npm run verify
```

The verification sequence runs strict TypeScript checking, builds the test target, executes the domain/WebMCP tests, runs the static safety scan, and rebuilds `dist/`.

## Test with WebMCP

Useful test surfaces include:

- **ChatGPT desktop built-in browser**: open the site and inspect/use its Site tools.
- **Chrome**: enable the WebMCP testing flag, relaunch Chrome, then use the Model Context Tool Inspector or another WebMCP-capable agent surface.

The app remains usable as a normal Human interface when WebMCP is unavailable; the status card reports whether `document.modelContext` is available.

## Reality acceptance

The August five-tool flow and Human-Gate fail-closed guard were previously exercised on WebMCP-capable Chrome and ChatGPT built-in-browser surfaces; see `REALITY_ACCEPTANCE.md` in the baseline repository.

For this exact event delta, automated sandbox verification is complete, while real-browser/WebMCP acceptance remains explicitly pending until the exact approved/deployed bytes are exercised. See `REALITY_ACCEPTANCE_EVENT.md`.

## Project structure

```text
src/                    application and WebMCP source
tests/                  domain and tool-contract tests
scripts/                build, verification, and local server scripts
dist/                   committed static build
ARCHITECTURE.md          state, authority, and failure-precondition design
WEBMCP_TOOL_CONTRACT.md  tool and safe-stop boundary
PRIVACY_AND_SAFETY.md    public data and authority boundary
DEMO_SCRIPT.md           five-minute failure/recovery proof flow
EVENT_BUILD_DELTA.md     Sep 28–30 event-new delta vs August baseline
REALITY_ACCEPTANCE.md    August baseline public-safe test summary
REALITY_ACCEPTANCE_EVENT.md event-delta proof status
```

## Design boundary

Diamond Control intentionally stays small. It is a browser-side demonstration of structured agent collaboration, stale-state precondition enforcement, explicit recovery, and a visible Human Gate — not a general workflow backend or autonomous execution system.
