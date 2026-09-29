# Event-delta Reality Acceptance

Current state: `PENDING_REAL_BROWSER_WEBMCP_PROOF`.

Automated sandbox tests verify the domain and WebMCP tool contract, including stale-state no-mutation and recovery. This file must not be promoted to real-browser PASS until the exact built/deployed bytes are exercised on a WebMCP-capable browser surface.

Required browser journeys:

1. Normal: recommend -> prepare at same revision -> Human Gate.
2. Adversarial stale state: recommend at N -> external update to N+1 -> prepare N -> `BLOCKED_SAFE / STALE_STATE` -> no action-state mutation -> fresh recommend N+1 -> prepare succeeds.
3. Human Gate conflict: action A awaiting Human -> prepare B -> `BLOCKED_SAFE / HUMAN_GATE_OCCUPIED` -> A preserved.
4. Human decision remains visible UI only.

Preferred evidence: a second participant/mentor/stranger drives the journey. Fallback: fresh context-isolated WebMCP session, labeled honestly.
