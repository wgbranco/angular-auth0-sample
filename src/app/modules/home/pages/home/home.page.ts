import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../../auth/reducers';

@Component({
  selector: 'home-page',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss']
})
export class HomePage implements OnInit {
  isLoggedIn$: Store<boolean>;

  constructor(
    private _store: Store<fromAuth.State>
  ) {
    this.isLoggedIn$  = this._store.select(fromAuth.getUserLoggedIn);
  }

  ngOnInit() {
  }

}
