export type LaneState = 'READY'|'NEEDS_REVIEW'|'BLOCKED'|'WAITING'|'DONE'
export type Priority = 'LOW'|'MEDIUM'|'HIGH'
export type ActionStatus = 'PROPOSED'|'AWAITING_HUMAN'|'APPROVED'|'REJECTED'
export type FailureCode = 'INVALID_INPUT'|'UNKNOWN_LANE'|'HUMAN_GATE_OCCUPIED'|'STALE_STATE'
export interface WorkLane { id:string; title:string; state:LaneState; revision:number; priority:Priority; blocker:string|null; evidence_refs:string[]; next_valid_move:string|null; human_gate_required:boolean }
export interface Recommendation { lane_id:string|null; action:string|null; rationale:string; uncertainty:string|null; observed_revision:number|null; observed_state:LaneState|null }
export interface ProposedAction { id:string; lane_id:string; source_lane_revision:number; action_type:string; summary:string; rationale:string; status:ActionStatus; created_by:'agent'|'human'; human_gate_required:true }
export interface ProofReceipt { action_id:string; decision:'APPROVED'|'REJECTED'; decided_by:'human'; result:'PASS'|'NO_ACTION'; evidence_refs:string[]; next_valid_move:string|null; timestamp:string }
export interface PreservedAction { id:string; lane_id:string; status:ActionStatus }
export interface ObservedLaneState { lane_id:string; state:LaneState; revision:number; next_valid_move:string|null }
export interface FailureReceipt { result:'BLOCKED_SAFE'; failure_code:FailureCode; failed_stage:'prepare_action'; reason:string; requested_lane_id:string|null; expected_lane_revision:number|null; observed_lane_revision:number|null; expected_lane_state:LaneState|null; observed_lane_state:LaneState|null; preserved_action:PreservedAction|null; preserved_lane:ObservedLaneState|null; action_state_changed:false; diagnostic_state_recorded:true; next_valid_move:string }
export interface WorkspaceState { lanes:WorkLane[]; proposedAction:ProposedAction|null; receipt:ProofReceipt|null; failureReceipt:FailureReceipt|null }
export interface PrepareActionOutcome { status:'PREPARED'|'BLOCKED_SAFE'; proposed_action:ProposedAction|null; failure_receipt:FailureReceipt|null }
