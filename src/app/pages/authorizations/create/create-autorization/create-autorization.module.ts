import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateAutorizationPageRoutingModule } from './create-autorization-routing.module';

import { CreateAutorizationPage } from './create-autorization.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateAutorizationPageRoutingModule
  ],
  declarations: [CreateAutorizationPage]
})
export class CreateAutorizationPageModule {}
