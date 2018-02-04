import { NgModule } from '@angular/core';
import { Routes, RouterModule, CanActivate } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignUpComponent } from './components/signup/signup.component';
import { AccountComponent } from './components/account/account.component';
import { AuthGuard, LoggedOutGuard } from './services/auth/auth.guards';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'account',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [
      LoggedOutGuard
    ]
  },
  {
    path: 'signup',
    component: SignUpComponent,
    canActivate: [
      LoggedOutGuard
    ]
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [
      AuthGuard
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [
    AuthGuard,
    LoggedOutGuard
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
