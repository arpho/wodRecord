import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { editProfileGuard, loggedGuard, roleGuard } from "./services/canActivate";
/* import { AuthGuard } from "./services/authguard.service";
import { RoleGuardService } from './services/role-guards.service'; */
// import { CanActivate } from "@angular/router/src/utils/preactivation";

export const routes: Routes = [
  {
    path: "profile",
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [loggedGuard()]
  },
  {
    path: "signup",
    loadChildren: () => import("./pages/signup/signup.module").then(m => m.SignupPageModule)
  },
  {
    path: "login",
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: "reset-password",
    loadChildren: () => import(
      "./pages/reset-password/reset-password.module").then(m => m.ResetPasswordPageModule),

  },
  {
    path: "profile",
    loadChildren: () => import('./pages/profile/profile.module').then(m => m.ProfilePageModule),
    canActivate: [loggedGuard()]
  },
  {
    path: "users",
    loadChildren: () => import('./pages/users/users.module').then(m => m.UsersPageModule),
   canActivate: [roleGuard(2)]
  },
  {
    path: "edit-user/:key",
    loadChildren: () => import('./pages/edit-user/edit-user.module').then(m => m.EditUserPageModule),
    canActivate: [loggedGuard,editProfileGuard()]
  },
  {
    path: "not-authorized/:message",
    loadChildren: () => import('./pages/not-authorized/not-authorized.module').then(m => m.NotAuthorizedPageModule)
  },
];
