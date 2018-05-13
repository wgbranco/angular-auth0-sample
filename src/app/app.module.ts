import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { routes } from './app.routes';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { reducers, metaReducers } from './reducers';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { EffectsModule } from '@ngrx/effects';

import { RootComponent } from './modules/core/components/root/root.component';
import { CoreModule } from './modules/core/core.module';
import { RouterModule } from '@angular/router';
import { AuthModule } from './modules/auth/auth.module';

@NgModule({
  declarations: [ ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes, {useHash: true}),

    // ngrx modules
    StoreModule.forRoot(reducers, { metaReducers }),
    EffectsModule.forRoot([]),

    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
    }),

    // Feature modules
    CoreModule.forRoot(),
    AuthModule.forRoot(),
  ],
  providers: [ ],
  bootstrap: [ RootComponent ]
})
export class AppModule { }
