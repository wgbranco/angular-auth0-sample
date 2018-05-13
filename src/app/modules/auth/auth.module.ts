import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromAuth from './reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from './effects/auth.effects';
import { ModuleWithProviders } from '@angular/compiler/src/core';
import { CredentialsFormComponent } from './components/credentials-form/credentials-form.component';
import { LoginPainelComponent } from './components/login-painel/login-painel.component';
import * as fromLoginPainel from './reducers/login-painel.reducer';
import { SignupPainelComponent } from './components/signup-painel/signup-painel.component';
import { AuthService } from './services/auth.service';
import { reducers } from './reducers';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LoginPage } from './pages/login/login.page';
import { SignupPage } from './pages/signup/signup.page';
import { LoggedOutGuard } from './services/guards/logged-out.guard';
import { LoggedInGuard } from './services/guards/logged-in.guard';


const GUARDS = [
  LoggedInGuard,
  LoggedOutGuard
];

const COMPONENTS = [
  CredentialsFormComponent,
  LoginPainelComponent,
  SignupPainelComponent,
  LoginPage,
  SignupPage
];

const routes = [
  {
    path: 'login',
    component: LoginPage,
    canActivate: [ LoggedOutGuard ]
  },
  {
    path: 'signup',
    component: SignupPage,
    canActivate: [ LoggedOutGuard ]
  }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  declarations: [
    COMPONENTS,
  ],
  exports: [
    LoginPainelComponent,
  ]
})
export class AuthModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: RootAuthModule,
      providers: [
        GUARDS,
        AuthService,
      ]
    };
  }
}

@NgModule({
  imports: [
    AuthModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),
    RouterModule.forChild(routes)
  ],
  declarations: []
})
export class RootAuthModule { }