import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateLocationPageRoutingModule } from './create-location-routing.module';

import { CreateLocationPage } from './create-location.page';
import { DynamicFormModule } from 'src/app/modules/dynamic-form/dynamic-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateLocationPageRoutingModule,
    DynamicFormModule
  ],
  declarations: []
})
export class CreateLocationPageModule {}
