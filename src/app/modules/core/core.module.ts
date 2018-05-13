import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RootComponent } from './components/root/root.component';
import { NotFoundPageComponent } from './components/not-found-page/not-found-page.component';
import { TopbarComponent } from './components/topbar/topbar.component';

const COMPONENTS = [
  RootComponent,
  NotFoundPageComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [
    COMPONENTS,
    TopbarComponent
  ],
  exports: [
    COMPONENTS
  ]
})
export class CoreModule {
  static forRoot() {
    return {
      ngModule: CoreModule,
      providers: [ ]
    };
  }
}
