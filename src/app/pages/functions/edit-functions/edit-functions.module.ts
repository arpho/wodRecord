import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditFunctionsPageRoutingModule } from './edit-functions-routing.module';

import { EditFunctionsPage } from './edit-functions.page';
import { DynamicFormModule } from 'src/app/modules/dynamic-form/dynamic-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditFunctionsPageRoutingModule,
    DynamicFormModule
  ],
  declarations: [EditFunctionsPage]
})
export class EditFunctionsPageModule {}
