import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './pages/login/login.page';
import { routes } from './user-routing.module'
import { DynamicFormModule } from '../dynamic-form/dynamic-form.module';
import { LogoutUserComponent } from './components/logout-user/logout-user.component';
import { LoginComponent } from './components/login/login.component';
import { LoginDefinitivoComponent } from './components/login-definitivo/login-definitivo.component';
import { SleekLoginComponent } from './components/sleek-login/sleek-login.component';
import { SleekResetComponent } from './components/sleek-reset/sleek-reset.component';
import { ResetPasswordPage } from './pages/reset-password/reset-password.page';
import { UsersPage } from './pages/users/users.page';
import { ItemModule } from '../item/item.module';
import { TranslateModule } from '@ngx-translate/core';
import { DesignoLoginInComponent } from './components/designo-login-in/designo-login-in.component';
import { SignupPage } from './pages/signup/signup.page';
import { ProfilePage } from './pages/profile/profile.page';
import { EditUserPage } from './pages/edit-user/edit-user.page';



@NgModule({
  declarations: [
    LoginPage,
    ResetPasswordPage,
    UsersPage,
    LogoutUserComponent,
    LoginComponent,
   LoginDefinitivoComponent,
   SleekLoginComponent,
   DesignoLoginInComponent,
   SleekResetComponent,
   SignupPage,
   ProfilePage,
   EditUserPage,
  ],
  imports: [FormsModule,
     ReactiveFormsModule,
      IonicModule.forRoot(),
       RouterModule.forChild(routes),
    CommonModule,
     DynamicFormModule,
     ItemModule,
     TranslateModule
  ],
  exports:[
    LogoutUserComponent,
    LoginComponent,
    UsersPage,
    LoginDefinitivoComponent,
    SleekLoginComponent,
    DesignoLoginInComponent,
  ]
})
export class UserModule { }

