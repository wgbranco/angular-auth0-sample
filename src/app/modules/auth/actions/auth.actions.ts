import { Action } from '@ngrx/store';
import { Credentials } from '../models/credentials';

export enum AuthActionTypes {
  FIRST_ACCESS = '[Auth] First Access',

  LOGIN = '[Auth] Login',
  LOGIN_SUCCESS = '[Auth] Login Success',
  LOGIN_FAILURE = '[Auth] Login Failure',
  LOGOUT = '[Auth] Logout',
  
  SIGN_UP = '[Auth] Sign Up',
  SIGN_UP_SUCCESS = '[Auth] Sign Up Success',
  SIGN_UP_FAILURE = '[Auth] Sign Up Failure',
}

export class FirstAccess implements Action {
  readonly type = AuthActionTypes.FIRST_ACCESS;
}

export class Login implements Action {
  readonly type = AuthActionTypes.LOGIN;

  constructor(public payload: Credentials) {}
}

export class LoginSuccess implements Action {
  readonly type = AuthActionTypes.LOGIN_SUCCESS;

  constructor(public payload: any) {}
}

export class LoginFailure implements Action {
  readonly type = AuthActionTypes.LOGIN_FAILURE;

  constructor(public payload: string) {}
}

export class Logout implements Action {
  readonly type = AuthActionTypes.LOGOUT;
}

export class Signup implements Action {
  readonly type = AuthActionTypes.SIGN_UP;

  constructor(public payload: Credentials) {}
}

export class SignupSuccess implements Action {
  readonly type = AuthActionTypes.SIGN_UP_SUCCESS;

  // constructor(public payload: string) {}
}

export class SignupFailure implements Action {
  readonly type = AuthActionTypes.SIGN_UP_FAILURE;

  constructor(public payload: string) {}
}

export type AuthActions =
  | FirstAccess
  | Login
  | LoginSuccess
  | LoginFailure
  | Logout
  | Signup
  | SignupSuccess
  | SignupFailure;