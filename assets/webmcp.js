import { getAttentionItems, prepareActionSafe, recommendNextMove, requestHumanGate } from './domain.js';
export const WEBMCP_TOOL_NAMES = ['get_workspace_state', 'get_attention_items', 'recommend_next_move', 'prepare_action', 'request_human_gate'];
export async function registerDiamondControlTools(getState, setState, modelContext) {
    const mc = modelContext ?? (typeof document !== 'undefined' ? document.modelContext : undefined);
    if (!mc)
        return { status: 'UNAVAILABLE', registered: [] };
    const tools = [
        { name: 'get_workspace_state', title: 'Get workspace state', description: 'Read normalized work lanes with revisions, proposed action, Human Gate state, proof receipt, and latest safe-stop receipt. Never mutates authoritative state.', inputSchema: { type: 'object', properties: {}, additionalProperties: false }, annotations: { readOnlyHint: true }, execute: async () => ({ workspace: getState() }) },
        { name: 'get_attention_items', title: 'Get attention items', description: 'Read work lanes that need attention, including their current revisions. Never mutates state.', inputSchema: { type: 'object', properties: {}, additionalProperties: false }, annotations: { readOnlyHint: true }, execute: async () => ({ items: getAttentionItems(getState().lanes) }) },
        { name: 'recommend_next_move', title: 'Recommend next move', description: 'Recommend one bounded next move and bind it to the observed lane revision/state. Advisory only; grants no execution authority.', inputSchema: { type: 'object', properties: { lane_ids: { type: 'array', items: { type: 'string' } } }, additionalProperties: false }, annotations: { readOnlyHint: true }, execute: async (input) => recommendNextMove(getState().lanes, input?.lane_ids) },
        { name: 'prepare_action', title: 'Prepare action', description: 'Prepare a reversible PROPOSED action only if the supplied recommendation revision is still current. Stale or conflicting state returns BLOCKED_SAFE without changing authoritative action state.', inputSchema: { type: 'object', properties: { lane_id: { type: 'string' }, expected_revision: { type: 'integer', minimum: 1 }, expected_state: { type: 'string', enum: ['READY', 'NEEDS_REVIEW', 'BLOCKED', 'WAITING', 'DONE'] } }, required: ['lane_id', 'expected_revision'], additionalProperties: false }, annotations: { readOnlyHint: false }, execute: async (input) => { const r = prepareActionSafe(getState(), input?.lane_id, input?.expected_revision, input?.expected_state); setState(r.state); return r.outcome; } },
        { name: 'request_human_gate', title: 'Request Human Gate', description: 'Move current proposed action into explicit Human review. Cannot approve or reject on behalf of the Human.', inputSchema: { type: 'object', properties: {}, additionalProperties: false }, annotations: { readOnlyHint: false }, execute: async () => { const next = requestHumanGate(getState()); setState(next); return { gate_state: 'AWAITING_HUMAN', required_decision: 'Human must choose Approve or Reject in the visible UI.', proposed_action: next.proposedAction }; } }
    ];
    for (const tool of tools)
        await mc.registerTool(tool);
    return { status: 'AVAILABLE', registered: tools.map(t => t.name) };
}
