import { Action } from '@ngrx/store';

export enum SignupPageActionTypes {
  LEAVE_SIGNUP_PAGE = '[SignupPage] Leave Page'
}

export class LeaveSignupPage implements Action {
  readonly type = SignupPageActionTypes.LEAVE_SIGNUP_PAGE;
}

export type SignupPageActions = LeaveSignupPage;
