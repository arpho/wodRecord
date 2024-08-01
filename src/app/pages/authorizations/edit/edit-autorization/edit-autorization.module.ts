import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditAutorizationPageRoutingModule } from './edit-autorization-routing.module';

import { EditAutorizationPage } from './edit-autorization.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditAutorizationPageRoutingModule
  ],
  declarations: [EditAutorizationPage]
})
export class EditAutorizationPageModule {}
