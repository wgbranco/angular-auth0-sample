import { Injectable } from '@angular/core';
import * as auth0 from 'auth0-js';
import { Observable } from "rxjs/Observable";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Credentials } from '../../components/login-form/credentials-model';
import { AUTH_CONFIG } from './auth-config';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { EventEmitter } from '@angular/core';


@Injectable()
export class AuthService {

  API_BASE_URL = `https://${AUTH_CONFIG.CLIENT_DOMAIN}`;
  LOGIN_URL = `${this.API_BASE_URL}/oauth/token`;
  SIGNUP_URL = `${this.API_BASE_URL}/dbconnections/signup`;

  webAuth = new auth0.WebAuth({
    clientID: AUTH_CONFIG.CLIENT_ID,
    domain: AUTH_CONFIG.CLIENT_DOMAIN,
    scope: AUTH_CONFIG.SCOPE
  });

  userProfile: any;

  // Create a stream of logged in status to communicate throughout app
  isLoggedIn$ = new BehaviorSubject<boolean>(false);
  signupSucess$ = new BehaviorSubject<boolean>(false);

  // Methods
  constructor(private _router: Router, private _http: HttpClient) {
    // If authenticated, set local profile property and update login status subject
    // If token is expired, log out to clear any data from localStorage
    if (this.authenticated) {
        this.userProfile = JSON.parse(localStorage.getItem('profile'));
        this.setLoggedIn(true);
    }
    else
        this.logout();
  }

  private setLoggedIn(value: boolean)
  {
    // Update login status subject
    this.isLoggedIn$.next(value);
  }

  login(credentials:Credentials)
  {
    this.webAuth.client.login({
      realm: AUTH_CONFIG.CONNECTION, //connection name or HRD domain
      username: credentials.email,
      password: credentials.password,
      scope: AUTH_CONFIG.SCOPE,
    },
      (err, authResult) => {
        if (err)
          this.setLoggedIn(false);
        else if (authResult)
          this.handleAuth(authResult);
      }
    );
  }

  signUp(credentials: Credentials)
  {
      this.webAuth.signup({
        connection: AUTH_CONFIG.CONNECTION,
        email: credentials.email,
        password: credentials.password
      },
      res => {
        if ( res && (400 == res.statusCode) && ('user_exists' === res.code) )
          alert('The e-mail address you have entered is already registered!');

        const success = (!res) || (200 === res.statusCode);
        this.signupSucess$.next(success);
      });
  }

  private handleAuth(authResult )
  {
    // When Auth0 hash parsed, get profile
    if (authResult && authResult.accessToken && authResult.idToken)
      this._getProfile(authResult);
  }

  private _getProfile(authResult)
  {
    // Use access token to retrieve user's profile and set session
    this.webAuth.client.userInfo(authResult.accessToken, (err, profile) => {
      this._setSession(authResult, profile);
    });
  }

  private _setSession(authResult, profile)
  {
    const expTime = authResult.expiresIn * 1000 + Date.now();
    // Save session data and update login status subject
    localStorage.setItem('token', authResult.accessToken);
    localStorage.setItem('id_token', authResult.idToken);
    localStorage.setItem('profile', JSON.stringify(profile));
    localStorage.setItem('expires_at', JSON.stringify(expTime));
    this.userProfile = profile;
    this.setLoggedIn(true);
  }

  logout()
  {
    // Remove tokens and profile and update login status subject
    localStorage.removeItem('token');
    localStorage.removeItem('id_token');
    localStorage.removeItem('profile');
    localStorage.removeItem('expires_at');
    this.userProfile = undefined;
    this.setLoggedIn(false);
    this._router.navigate(['/login']);
  }

  get authenticated(): boolean
  {
    // Check if current date is greater than expiration
    const expiresAt = JSON.parse(localStorage.getItem('expires_at'));
    return expiresAt ? (Date.now() < expiresAt) : false;
  }

}
