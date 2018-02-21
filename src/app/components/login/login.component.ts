import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Credentials } from '../login-form/credentials-model';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/do';
import { fromEvent } from 'rxjs/observable/fromEvent';
import "rxjs/add/operator/withLatestFrom";
import { Subscription } from 'rxjs/Subscription'
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../app.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginSubs: Subscription;
  errorOnLogin: boolean;
  isLoading: boolean;
  submitClick$: Observable<MouseEvent>;
  login$: Observable<any>;

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit()
  {
    const button = document.getElementById('submitButton');
    this.submitClick$ = fromEvent(button, 'click');

    this.login$ = this._authService.isLoggedIn$.withLatestFrom(
                  this.submitClick$,
                  (loginStatus, click) => loginStatus);

    this.subscribeToLoginStream();
  }

  subscribeToLoginStream()
  {
    if (!this.loginSubs)
    {
      this.loginSubs = this.login$.subscribe(
        status => {
          this.isLoading = false;
          this.errorOnLogin = !status;
          if (status) this._router.navigate(['/account']);
        }
      );
    }
  }

  onSubmit(credentials:Credentials)
  {
    this.isLoading = true;
    this._authService.login(credentials);
  }

  ngOnDestroy() {
    if (this.loginSubs) this.loginSubs.unsubscribe();
  }

}
