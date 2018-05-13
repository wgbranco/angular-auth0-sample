import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as auth0 from 'auth0-js';
import { AUTH_CONFIG } from './auth.config';
import { Credentials } from '../models/credentials';
import { LoginSuccess, LoginFailure, SignupFailure, SignupSuccess, FirstAccess } from '../actions/auth.actions';
import { fromPromise } from 'rxjs/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import * as fromAuth from '../reducers';
import { ERROR_SESSION_EXPIRED, ERROR_LOGIN_INVALID_CREDENTIALS, ERROR_SIGNUP_EMAIL_ALREADY_REGISTERED, ERROR_SIGNUP } from '../../core/utils/constants';

@Injectable()
export class AuthService {

  webAuth = new auth0.WebAuth({
    clientID: AUTH_CONFIG.CLIENT_ID,
    domain: AUTH_CONFIG.CLIENT_DOMAIN,
    scope: AUTH_CONFIG.SCOPE
  });

  constructor(private _store:Store<fromAuth.State>)
  {
    const user = this._getProfile();

    !user
    ? this._store.dispatch(new FirstAccess())
    : this.authenticated
    ? this._store.dispatch(new LoginSuccess(user))
    : this._store.dispatch(new LoginFailure(ERROR_SESSION_EXPIRED));
  }

  login(credentials: Credentials)
  {
    this.webAuth.client.login({
      realm: AUTH_CONFIG.CONNECTION, //connection name or HRD domain
      username: credentials.username,
      password: credentials.password,
      scope: AUTH_CONFIG.SCOPE,
    },
    (err, response) => {
      err
      ? this._store.dispatch(new LoginFailure(ERROR_LOGIN_INVALID_CREDENTIALS))
      : this._handleAuth(response)
    });
  }

  signUp(credentials: Credentials)
  {
      this.webAuth.signup({
        connection: AUTH_CONFIG.CONNECTION,
        email: credentials.username,
        password: credentials.password
      },
      res => {
        const conflict = ( res && (400 == res.statusCode) && ('user_exists' === res.code) );
        const success = (!res) || (200 === res.statusCode);

        conflict
        ? this._store.dispatch(new SignupFailure(ERROR_SIGNUP_EMAIL_ALREADY_REGISTERED))
        : success
        ? this._store.dispatch(new SignupSuccess())
        : this._store.dispatch(new SignupFailure(ERROR_SIGNUP))
      });
  }

  logout() {
    this.clearSession();
  }

  private _handleAuth(authResult)
  {
    // When Auth0 hash parsed, get profile
    if (authResult && authResult.accessToken && authResult.idToken)
      this._getUserInfo(authResult);
  }

  private _getUserInfo(authResult)
  {
    // Use access token to retrieve user's profile and set session
    this.webAuth.client.userInfo(authResult.accessToken, (err, profile) => {
      this._createSession(authResult, profile);
      this._store.dispatch(new LoginSuccess(profile));
    });
  }

  private _createSession(authResult, profile)
  {
    const expTime = authResult.expiresIn * 1000 + Date.now();
    // Save session data and update login status subject
    localStorage.setItem('token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('profile', JSON.stringify(profile));
    localStorage.setItem('expires_at', JSON.stringify(expTime));
  }

  clearSession()
  {
    // Remove tokens and profile and update login status subject
    localStorage.removeItem('token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    localStorage.removeItem('expires_at');
  }

  private _getProfile() {
    return JSON.parse(localStorage.getItem('profile'));
  }

  get authenticated(): boolean
  {
    // Check if current date is greater than expiration
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return expiresAt ? (Date.now() < expiresAt) : false;
  }

}
