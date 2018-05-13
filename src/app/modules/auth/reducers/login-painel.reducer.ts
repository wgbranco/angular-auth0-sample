import { Action } from '@ngrx/store';
import { AuthActions, AuthActionTypes } from '../actions/auth.actions';
import { LoginPageActionTypes, LoginPageActions } from '../actions/login-page.actions';

export interface State {
  pending: boolean;
  showError: boolean;
  errorMsg: string | null;
}

export const initialState: State = {
  pending: false,
  showError: false,
  errorMsg: null
};

export function reducer(
  state = initialState,
  action: AuthActions | LoginPageActions
): State {
  switch (action.type) {

    case AuthActionTypes.LOGIN:
      return { ...state, pending: true, errorMsg: null, showError: false };

    case AuthActionTypes.LOGIN_SUCCESS:
      return { ...state, pending: false, errorMsg: null, showError: false };
    
    case AuthActionTypes.LOGIN_FAILURE:
      return { ...state, pending: false, errorMsg: action.payload, showError: true };

    case AuthActionTypes.FIRST_ACCESS:
    case LoginPageActionTypes.LEAVE_LOGIN_PAGE:
      return initialState;

    default:
      return state;
  }
}

//

export const getPending = (state: State) => state.pending;

export const getErrorMsg = (state: State) => state.errorMsg;

export const getShowError = (state: State) => state.showError;
