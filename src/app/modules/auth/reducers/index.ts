import * as fromRoot from '../../../reducers';
import * as fromUserStatus from './user-status.reducer';
import * as fromLoginPainel from './login-painel.reducer';
import * as fromSignUpPainel from './signup-painel.reducer';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface AuthState {
    status: fromUserStatus.State;
    loginPainel: fromLoginPainel.State;
    signupPainel: fromSignUpPainel.State;
}

export interface State extends fromRoot.State {
    auth: AuthState;
}

export const reducers: ActionReducerMap<AuthState> = {
    status: fromUserStatus.reducer,
    loginPainel: fromLoginPainel.reducer,
    signupPainel: fromSignUpPainel.reducer,
};

//

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectUserStatus = createSelector(
    selectAuthState,
    (state: AuthState) => state.status
)

export const selectLoginPainelState = createSelector(
    selectAuthState,
    (state: AuthState) => state.loginPainel
)

export const selectSignupPainelState = createSelector(
    selectAuthState,
    (state: AuthState) => state.signupPainel
)
//
export const getUser = createSelector(
    selectUserStatus,
    fromUserStatus.getUser
);

export const getUserLoggedIn = createSelector(
    selectUserStatus,
    fromUserStatus.getLoggedIn
);

//

export const getLoginPainelPending = createSelector(
    selectLoginPainelState,
    fromLoginPainel.getPending
);

export const getLoginPainelErrorMsg = createSelector(
    selectLoginPainelState,
    fromLoginPainel.getErrorMsg
);

export const getLoginPainelShowError = createSelector(
    selectLoginPainelState,
    fromLoginPainel.getShowError
);

//

export const getSignupPainelPending = createSelector(
    selectSignupPainelState,
    fromSignUpPainel.getPending
);

export const getSignupPainelErrorMsg = createSelector(
    selectSignupPainelState,
    fromSignUpPainel.getErrorMsg
);

export const getSignupPainelShowError = createSelector(
    selectSignupPainelState,
    fromSignUpPainel.getShowError
);
