import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Credentials } from '../login-form/credentials-model';
import { Subscription } from 'rxjs/Subscription'
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../../app.component.css']
})
export class SignUpComponent implements OnInit, OnDestroy {

  signupSubs: Subscription;
  errorOnSignUp: boolean = false;
  firstAttempt: boolean;
  isLoading: boolean;

  constructor(private _authService: AuthService, private _router: Router) { }

  ngOnInit() {
    this.firstAttempt = true;
  }

  subscribeToSignUpStream()
  {
    if (!this.signupSubs)
    {
      this.signupSubs = this._authService.signupSucess$.subscribe(
        success => {
          this.errorOnSignUp = false;
          if (!this.firstAttempt) this.isLoading = false;

          if (!!success) {
            alert('Successfully signed up! Please, verify your e-mail and log in!');
            this._router.navigate(['/login']);
          }
          else {
            this.errorOnSignUp = !this.firstAttempt;
            this.firstAttempt = false;
          }
        }
      );
    }
  }

  onSubmit(credentials: Credentials)
  {
    this.isLoading = true;
    this.subscribeToSignUpStream();
    this._authService.signUp(credentials);
  }

  ngOnDestroy() {
    if (this.signupSubs) this.signupSubs.unsubscribe();
  }

}
