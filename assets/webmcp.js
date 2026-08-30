import { getAttentionItems, prepareAction, recommendNextMove, requestHumanGate } from './domain.js';
export const WEBMCP_TOOL_NAMES = ['get_workspace_state', 'get_attention_items', 'recommend_next_move', 'prepare_action', 'request_human_gate'];
export async function registerDiamondControlTools(getState, setState, modelContext) {
    const mc = modelContext ?? (typeof document !== 'undefined' ? document.modelContext : undefined);
    if (!mc)
        return { status: 'UNAVAILABLE', registered: [] };
    const tools = [
        { name: 'get_workspace_state', title: 'Get workspace state', description: 'Read normalized work lanes, proposed action, Human Gate state, and proof receipt. Never mutates state.', inputSchema: { type: 'object', properties: {}, additionalProperties: false }, annotations: { readOnlyHint: true }, execute: async () => ({ workspace: getState() }) },
        { name: 'get_attention_items', title: 'Get attention items', description: 'Read work lanes that need attention and why. Never mutates state.', inputSchema: { type: 'object', properties: {}, additionalProperties: false }, annotations: { readOnlyHint: true }, execute: async () => ({ items: getAttentionItems(getState().lanes) }) },
        { name: 'recommend_next_move', title: 'Recommend next move', description: 'Recommend one bounded next move. Advisory only; grants no execution authority.', inputSchema: { type: 'object', properties: { lane_ids: { type: 'array', items: { type: 'string' } } }, additionalProperties: false }, annotations: { readOnlyHint: true }, execute: async (input) => recommendNextMove(getState().lanes, input?.lane_ids) },
        { name: 'prepare_action', title: 'Prepare action', description: 'Prepare a reversible PROPOSED action. Cannot approve, publish, commit, send, or bypass Human Gate.', inputSchema: { type: 'object', properties: { lane_id: { type: 'string' } }, required: ['lane_id'], additionalProperties: false }, annotations: { readOnlyHint: false }, execute: async (input) => { if (!input?.lane_id)
                throw new Error('lane_id is required'); const next = prepareAction(getState(), input.lane_id); setState(next); return { proposed_action: next.proposedAction }; } },
        { name: 'request_human_gate', title: 'Request Human Gate', description: 'Move current proposed action into explicit Human review. Cannot approve or reject on behalf of the Human.', inputSchema: { type: 'object', properties: {}, additionalProperties: false }, annotations: { readOnlyHint: false }, execute: async () => { const next = requestHumanGate(getState()); setState(next); return { gate_state: 'AWAITING_HUMAN', required_decision: 'Human must choose Approve or Reject in the visible UI.', proposed_action: next.proposedAction }; } }
    ];
    for (const tool of tools)
        await mc.registerTool(tool);
    return { status: 'AVAILABLE', registered: tools.map(t => t.name) };
}
