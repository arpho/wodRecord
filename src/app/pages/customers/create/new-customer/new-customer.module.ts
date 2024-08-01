import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewCustomerPageRoutingModule } from './new-customer-routing.module';

import { NewCustomerPage } from './new-customer.page';
import { DynamicFormModule } from 'src/app/modules/dynamic-form/dynamic-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewCustomerPageRoutingModule,
    DynamicFormModule,
    ReactiveFormsModule
  ],
  declarations: []
})
export class NewCustomerPageModule {}
