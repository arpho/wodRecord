import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListProviderPageRoutingModule } from './list-provider-routing.module';

import { ListProviderPage } from './list-provider.page';
import { ItemModule } from 'src/app/modules/item/item.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListProviderPageRoutingModule,
    ItemModule
  ],
  declarations: []
})
export class ListProviderPageModule {}
