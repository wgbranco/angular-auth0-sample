import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../../auth/reducers';
import { Logout } from '../../../auth/actions/auth.actions';

@Component({
  selector: 'profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  user$: Store<any>;

  constructor(
    private _store:Store<fromAuth.State>
  ) { }

  ngOnInit() {
    this.user$ = this._store.select(fromAuth.getUser);
  }

  logout() {
    this._store.dispatch(new Logout());
  }

}
