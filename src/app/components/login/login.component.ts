import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Credentials } from '../login-form/credentials-model';
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
  firstAttempt: boolean;
  isLoading: boolean;

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
    this.firstAttempt = true;
  }

  subscribeToLoginStream()
  {
    if (!this.loginSubs)
    {
      this.loginSubs = this._authService.isLoggedIn$.subscribe(
        status => {
          if (!this.firstAttempt) this.isLoading = false;
          this.errorOnLogin = !status && !this.firstAttempt;
          this.firstAttempt = false;
          if (status) this._router.navigate(['/account']);
        }
      );
    }
  }

  onSubmit(credentials:Credentials)
  {
    this.isLoading = true;
    this.subscribeToLoginStream();
    this._authService.login(credentials);
  }

  ngOnDestroy() {
    if (this.loginSubs) this.loginSubs.unsubscribe();
  }

}
