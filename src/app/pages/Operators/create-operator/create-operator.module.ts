import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateOperatorPageRoutingModule } from './create-operator-routing.module';

import { CreateOperatorPage } from './create-operator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateOperatorPageRoutingModule
  ],
  declarations: [CreateOperatorPage]
})
export class CreateOperatorPageModule {}
