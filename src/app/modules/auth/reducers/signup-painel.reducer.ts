import { Action } from '@ngrx/store';
import { AuthActions, AuthActionTypes } from '../actions/auth.actions';
import { SignupPageActions, SignupPageActionTypes } from '../actions/signup-page.actions';

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
  action: AuthActions | SignupPageActions
): State {
  switch (action.type) {

    case AuthActionTypes.SIGN_UP:
      return { ...state, pending: true, errorMsg: null, showError: false };

    case AuthActionTypes.SIGN_UP_SUCCESS:
      return { ...state, pending: false, errorMsg: null, showError: false };
    
    case AuthActionTypes.SIGN_UP_FAILURE:
      return { ...state, pending: false, errorMsg: action.payload, showError: true };

    case SignupPageActionTypes.LEAVE_SIGNUP_PAGE:
      return initialState;

    default:
      return state;
  }
}

//

export const getPending = (state: State) => state.pending;

export const getErrorMsg = (state: State) => state.errorMsg;

export const getShowError = (state: State) => state.showError;
