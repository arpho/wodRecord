import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateProviderPageRoutingModule } from './create-provider-routing.module';

import { CreateProviderPage } from './create-provider.page';
import { DynamicFormModule } from 'src/app/modules/dynamic-form/dynamic-form.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateProviderPageRoutingModule,
    DynamicFormModule
  ],
  declarations: [CreateProviderPage]
})
export class CreateProviderPageModule {}
