import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../reducers';
import { Credentials } from '../../models/credentials';
import { Signup } from '../../actions/auth.actions';

@Component({
  selector: 'signup-painel',
  templateUrl: './signup-painel.component.html',
  styleUrls: ['./signup-painel.component.scss']
})
export class SignupPainelComponent {
  pending$: Store<boolean>;
  showError$: Store<boolean>;
  errorMsg$: Store<string>;

  constructor(
    private _store:Store<fromAuth.State>
  ) {
    this.pending$ = this._store.select(fromAuth.getSignupPainelPending);
    this.showError$ = this._store.select(fromAuth.getSignupPainelShowError);
    this.errorMsg$ = this._store.select(fromAuth.getSignupPainelErrorMsg);
  }

  onSubmit($event: Credentials) {
    this._store.dispatch(new Signup($event));
  }
}
