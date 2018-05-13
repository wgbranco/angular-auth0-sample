import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { LeaveLoginPage } from '../../actions/login-page.actions';
import * as fromAuth from '../../reducers';

@Component({
  selector: 'login-page',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage implements OnInit, OnDestroy {

  constructor(
    private store:Store<fromAuth.State>
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.store.dispatch(new LeaveLoginPage());
  }
}
