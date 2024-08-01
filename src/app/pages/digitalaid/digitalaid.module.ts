import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DigitalaidPageRoutingModule } from './digitalaid-routing.module';

import { DigitalaidPage } from './digitalaid.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DigitalaidPageRoutingModule
  ],
  declarations: []
})
export class DigitalaidPageModule {}
