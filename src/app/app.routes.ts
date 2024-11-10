import { Routes } from '@angular/router';
import { AuthGuardFactory } from './Guards/authGuardFactory';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
    canActivate:[AuthGuardFactory()]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'recover-password',
    loadComponent: () => import('./pages/recover-password/recover-password.page').then( m => m.RecoverPasswordPage)
  },
];
