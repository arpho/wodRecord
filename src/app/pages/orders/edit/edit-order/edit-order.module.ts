import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditOrderPageRoutingModule } from './edit-order-routing.module';

import { EditOrderPage } from './edit-order.page';
import { DynamicFormModule } from 'src/app/modules/dynamic-form/dynamic-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditOrderPageRoutingModule,
    DynamicFormModule
  ],
  declarations: []
})
export class EditOrderPageModule {}
