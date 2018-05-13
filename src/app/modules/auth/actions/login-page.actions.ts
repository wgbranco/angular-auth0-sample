import { Action } from '@ngrx/store';

export enum LoginPageActionTypes {
  LEAVE_LOGIN_PAGE = '[LoginPage] Leave Page',
}

export class LeaveLoginPage implements Action {
  readonly type = LoginPageActionTypes.LEAVE_LOGIN_PAGE;
}

export type LoginPageActions = LeaveLoginPage;
