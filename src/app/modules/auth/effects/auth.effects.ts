import { Injectable } from '@angular/core';
import {
  Actions,
  Effect,
  ofType
} from '@ngrx/effects';
import {
  AuthActions,
  AuthActionTypes,
  Login,
  LoginSuccess,
  LoginFailure,
  Signup
} from '../actions/auth.actions';
import {
  tap,
  map,
  exhaustMap,
  catchError
} from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Credentials } from '../models/credentials';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { MSG_SIGUP_SUCCESS } from '../../core/utils/constants';

@Injectable()
export class AuthEffects {

  @Effect({ dispatch: false })
  login$ = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN),
    map((action: Login) => action.payload),
    tap((cred: Credentials) => 
      this.authService.login(cred)
    )
  );

  @Effect({ dispatch: false })
  loginSuccess$ = this.actions$
  .pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap(() => this.router.navigate(['']))
  );

  @Effect({ dispatch: false })
  loginFailure$ = this.actions$
  .pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE),
    tap(() => {
      this.authService.clearSession();
    })
  )

  @Effect({ dispatch: false })
  logout$ = this.actions$
  .pipe(
    ofType(AuthActionTypes.LOGOUT),
    tap(() => {
      this.authService.logout();
      this.router.navigate(['']);
    })
  )

  @Effect({ dispatch: false })
  signup$ = this.actions$.pipe(
    ofType(AuthActionTypes.SIGN_UP),
    map((action: Signup) => action.payload),
    tap((cred: Credentials) => 
      this.authService.signUp(cred)
    )
  );

  @Effect({ dispatch: false })
  signupSuccess$ = this.actions$.pipe(
    ofType(AuthActionTypes.SIGN_UP_SUCCESS),
    tap(() => {
      alert(MSG_SIGUP_SUCCESS);
      this.router.navigate(['/login']);
    })
  );

  constructor(
    private actions$: Actions,
    private router: Router,
    private authService: AuthService
  ) {}
}
