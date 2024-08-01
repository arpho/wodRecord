import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditOPeratorPageRoutingModule } from './edit-operator-routing.module';

import { EditOPeratorPage } from './edit-operator.page';
import { DynamicFormModule } from 'src/app/modules/dynamic-form/dynamic-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DynamicFormModule,
    EditOPeratorPageRoutingModule
  ],
  declarations: []
})
export class EditOPeratorPageModule {}
