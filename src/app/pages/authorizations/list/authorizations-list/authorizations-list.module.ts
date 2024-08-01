import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AuthorizationsListPageRoutingModule } from './authorizations-list-routing.module';

import { AuthorizationsListPage } from './authorizations-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AuthorizationsListPageRoutingModule
  ],
  declarations: []
})
export class AuthorizationsListPageModule {}
