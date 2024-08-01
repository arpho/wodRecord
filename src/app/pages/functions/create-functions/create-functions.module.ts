import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateFunctionsPageRoutingModule } from './create-functions-routing.module';

import { CreateFunctionsPage } from './create-functions.page';
import { DynamicFormModule } from 'src/app/modules/dynamic-form/dynamic-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateFunctionsPageRoutingModule,
    DynamicFormModule
  ],
  declarations: [CreateFunctionsPage]
})
export class CreateFunctionsPageModule {}
