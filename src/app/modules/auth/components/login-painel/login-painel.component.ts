import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../reducers';
import { Credentials } from '../../models/credentials';
import { Login } from '../../actions/auth.actions';

@Component({
  selector: 'login-painel',
  templateUrl: './login-painel.component.html',
  styleUrls: ['./login-painel.component.scss']
})
export class LoginPainelComponent {
  pending$: Store<boolean>;
  showError$: Store<boolean>;
  errorMsg$: Store<string>;

  constructor(
    private _store:Store<fromAuth.State>
  ) {
    this.pending$ = this._store.select(fromAuth.getLoginPainelPending);
    this.showError$ = this._store.select(fromAuth.getLoginPainelShowError);
    this.errorMsg$ = this._store.select(fromAuth.getLoginPainelErrorMsg);
  }

  onSubmit($event: Credentials) {
    this._store.dispatch(new Login($event));
  }
}
