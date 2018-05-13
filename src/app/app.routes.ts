import { NgModule } from '@angular/core';
import { Routes, CanActivate } from '@angular/router';
import { RootComponent } from './modules/core/components/root/root.component';
import { NotFoundPageComponent } from './modules/core/components/not-found-page/not-found-page.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: './modules/home/home.module#HomeModule'
  },
  {
    path: '**',
    component: NotFoundPageComponent
  }
];