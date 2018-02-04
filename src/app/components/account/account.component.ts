import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['../../app.component.css']
})
export class AccountComponent implements OnInit {
  userData: any;

  constructor(private _authService: AuthService) { }

  ngOnInit() {
    this.userData = this._authService.userProfile;
  }

  logout() {
    this._authService.logout();
  }

}
