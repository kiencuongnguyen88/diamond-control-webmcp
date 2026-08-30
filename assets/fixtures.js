export const INITIAL_LANES = [
    { id: 'local-ai-benchmark', title: 'Local AI benchmark', state: 'READY', priority: 'MEDIUM', blocker: null, evidence_refs: ['benchmark_fixture_ready'], next_valid_move: 'Run bounded benchmark', human_gate_required: false },
    { id: 'proof-repair', title: 'Proof repair', state: 'NEEDS_REVIEW', priority: 'HIGH', blocker: 'Validation receipt incomplete', evidence_refs: ['receipt_gap_01'], next_valid_move: 'Review and run proof validation', human_gate_required: true },
    { id: 'event-radar', title: 'Event Radar', state: 'BLOCKED', priority: 'MEDIUM', blocker: 'Eligibility source not verified', evidence_refs: [], next_valid_move: 'Fresh-read official eligibility source', human_gate_required: false },
    { id: 'content-draft', title: 'Content draft', state: 'WAITING', priority: 'LOW', blocker: 'Awaiting external input', evidence_refs: [], next_valid_move: null, human_gate_required: false }
];
