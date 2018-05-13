import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomePage } from './pages/home/home.page';
import { RouterModule } from '@angular/router';
import { AuthModule } from '../auth/auth.module';
import { ProfileComponent } from './components/profile/profile.component';

const routes = [
  {
    path: '',
    component: HomePage
  }
];

@NgModule({
  imports: [
    CommonModule,
    AuthModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomePage,
    ProfileComponent
  ],
  exports: [
    HomePage
  ]
})
export class HomeModule { }
