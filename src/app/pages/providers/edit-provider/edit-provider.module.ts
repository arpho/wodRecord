import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProviderPageRoutingModule } from './edit-provider-routing.module';

import { EditProviderPage } from './edit-provider.page';
import { DynamicFormModule } from 'src/app/modules/dynamic-form/dynamic-form.module';
import { ItemModule } from 'src/app/modules/item/item.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemModule,
    EditProviderPageRoutingModule,
    DynamicFormModule
  ],
  declarations: []
})
export class EditProviderPageModule {}
