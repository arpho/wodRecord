import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListFunctionsPageRoutingModule } from './list-functions-routing.module';

import { ListFunctionsPage } from './list-functions.page';
import { ItemModule } from 'src/app/modules/item/item.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListFunctionsPageRoutingModule,
    ItemModule
  ],
  declarations: []
})
export class ListFunctionsPageModule {}
