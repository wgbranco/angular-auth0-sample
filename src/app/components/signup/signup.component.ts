import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Credentials } from '../login-form/credentials-model';
import { Subscription } from 'rxjs/Subscription'
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['../../app.component.css']
})
export class SignUpComponent {

  errorOnSignUp: boolean = false;
  isLoading: boolean;

  constructor(private _authService: AuthService, private _router: Router) { }

  onSignUp(success: boolean)
  {
    this.isLoading = false;
    this.errorOnSignUp = !success;
    if (success) {
      alert('Successfully signed up! Please, verify your e-mail and log in!');
      this._router.navigate(['/login']);
    }
  }

  onSubmit(credentials: Credentials)
  {
    this.isLoading = true;
    this._authService.signUp(credentials, this.onSignUp.bind(this));
  }

}
