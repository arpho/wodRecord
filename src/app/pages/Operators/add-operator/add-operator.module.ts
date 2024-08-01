import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddOperatorPageRoutingModule } from './add-operator-routing.module';

import { AddOperatorPage } from './add-operator.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddOperatorPageRoutingModule,
    TranslateModule
    
  ],
  declarations: []
})
export class AddOperatorPageModule {}
