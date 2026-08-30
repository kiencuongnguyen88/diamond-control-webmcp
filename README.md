# Diamond Control

Diamond Control is a human-gated agent workspace built with WebMCP.

It demonstrates a bounded collaboration pattern: an agent can read work state, identify what needs attention, recommend a next move, prepare that move, and request review — while the final decision remains explicitly Human-controlled in the visible interface.

The demo uses deterministic synthetic work data. It has no backend, database, authentication, direct AI API, private user records, or automatic approval.

## Why WebMCP

Without a structured tool contract, an agent has to infer meaning from page text and controls. Diamond Control exposes the workflow directly through WebMCP, so an agent can use explicit schemas and state transitions instead of guessing at the UI.

The page registers exactly five tools:

| Tool | Role | State mutation |
| --- | --- | --- |
| `get_workspace_state` | Read normalized work lanes, proposal, Human Gate state, and receipt | No |
| `get_attention_items` | Read lanes that need attention and why | No |
| `recommend_next_move` | Recommend one bounded next move | No |
| `prepare_action` | Create a reversible `PROPOSED` action | Yes, reversible |
| `request_human_gate` | Move the current proposal to `AWAITING_HUMAN` | Yes, gated |

No WebMCP tool can approve or reject an action. Only the visible Human Gate controls can produce `APPROVED` or `REJECTED`.

A proposal already waiting at the Human Gate cannot be replaced by another agent preparation. The Human must resolve it first.

## Agent journey

1. Human asks what needs attention.
2. Agent reads structured attention state.
3. Agent recommends one bounded next move.
4. Agent prepares that move as `PROPOSED`.
5. Agent requests Human review.
6. The page enters `AWAITING_HUMAN`.
7. Human selects **Approve** or **Reject** in the visible UI.
8. The page emits a proof receipt.

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

Running the committed `dist/` does **not** require installing TypeScript; source verification does. The build helpers invoke the pinned local compiler through npm's script environment.

## Test with WebMCP

Useful test surfaces include:

- **ChatGPT desktop built-in browser**: open the site and inspect/use its Site tools.
- **Chrome**: enable the WebMCP testing flag, relaunch Chrome, then use the Model Context Tool Inspector or another WebMCP-capable agent surface.

The app remains usable as a normal Human interface when WebMCP is unavailable; the status card reports whether `document.modelContext` is available.

## Reality acceptance

The five-tool flow and the Human-Gate fail-closed guard have been exercised on WebMCP-capable Chrome and ChatGPT built-in-browser surfaces.

The tested natural-language journey selected `proof-repair`, prepared `Review and run proof validation`, entered `AWAITING_HUMAN`, and stopped without deciding for the Human. While that Human Gate was still open, a second attempt to prepare `event-radar` was rejected by the application with the fail-closed guard, and the original `proof-repair` proposal remained under Human review. The Human then rejected the original proposal and the page emitted a `NO_ACTION` receipt.

The current public payload changes documentation only from the reality-tested application/build bytes; application source, WebMCP tool code, build scripts, tests, and committed `dist/` bytes are unchanged.

See `REALITY_ACCEPTANCE.md`.

## Project structure

```text
src/                    application and WebMCP source
tests/                  domain and tool-contract tests
scripts/                build, verification, and local server scripts
dist/                   committed static build
ARCHITECTURE.md          state and authority design
WEBMCP_TOOL_CONTRACT.md  tool boundary
PRIVACY_AND_SAFETY.md    public data and authority boundary
DEMO_SCRIPT.md           short demonstration flow
REALITY_ACCEPTANCE.md    public-safe test summary
```

## Design boundary

Diamond Control intentionally stays small. It is a browser-side demonstration of structured agent collaboration with an explicit Human Gate, not a general workflow backend or autonomous execution system.
