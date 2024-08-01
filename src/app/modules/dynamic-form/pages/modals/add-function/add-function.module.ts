import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddFunctionPageRoutingModule } from './add-function-routing.module';

import { AddFunctionPage } from './add-function.page';
import { DynamicFormModule } from '../../../dynamic-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddFunctionPageRoutingModule,
    DynamicFormModule
  ],
  declarations: []
})
export class AddFunctionPageModule {}
