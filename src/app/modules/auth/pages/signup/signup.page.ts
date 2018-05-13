import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { LeaveSignupPage } from '../../actions/signup-page.actions';
import * as fromAuth from '../../reducers';

@Component({
  selector: 'signup-page',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss']
})
export class SignupPage implements OnInit, OnDestroy {

  constructor(
    private store:Store<fromAuth.State>
  ) { }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.store.dispatch(new LeaveSignupPage());
  }

}
