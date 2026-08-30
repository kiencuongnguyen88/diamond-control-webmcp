export type LaneState = 'READY'|'NEEDS_REVIEW'|'BLOCKED'|'WAITING'|'DONE'
export type Priority = 'LOW'|'MEDIUM'|'HIGH'
export type ActionStatus = 'PROPOSED'|'AWAITING_HUMAN'|'APPROVED'|'REJECTED'
export interface WorkLane { id:string; title:string; state:LaneState; priority:Priority; blocker:string|null; evidence_refs:string[]; next_valid_move:string|null; human_gate_required:boolean }
export interface ProposedAction { id:string; lane_id:string; action_type:string; summary:string; rationale:string; status:ActionStatus; created_by:'agent'|'human'; human_gate_required:true }
export interface ProofReceipt { action_id:string; decision:'APPROVED'|'REJECTED'; decided_by:'human'; result:'PASS'|'NO_ACTION'; evidence_refs:string[]; next_valid_move:string|null; timestamp:string }
export interface WorkspaceState { lanes:WorkLane[]; proposedAction:ProposedAction|null; receipt:ProofReceipt|null }
