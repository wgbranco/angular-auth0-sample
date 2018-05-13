import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store, select } from '@ngrx/store';
import * as fromAuth from '../../reducers';
import { take } from 'rxjs/operators';

@Injectable()
export class LoggedInGuard implements CanActivate {

  constructor( private _store: Store<fromAuth.State> ) {}

  canActivate(): Observable<boolean> {
    return this._store.pipe(
      select(fromAuth.getUserLoggedIn),
      take(1)
    );
  }
}
