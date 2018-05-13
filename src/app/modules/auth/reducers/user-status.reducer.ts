import { Action } from '@ngrx/store';
import { AuthActions, AuthActionTypes } from '../actions/auth.actions';

export interface State {
  isLoggedIn: boolean;
  user: any | null;
}

export const initialState: State = {
  isLoggedIn: false,
  user: null
};

export function reducer(
  state = initialState,
  action: AuthActions
): State {
  switch (action.type) {

    case AuthActionTypes.LOGIN_SUCCESS:
      return {...state, isLoggedIn: true, user: action.payload};
    
    case AuthActionTypes.LOGIN_FAILURE:
    case AuthActionTypes.LOGOUT:
      return {...state, isLoggedIn: false, user: null};

    default:
      return state;
  }
}

//

export const getUser = (state: State) => state.user;

export const getLoggedIn = (state: State) => state.isLoggedIn;
