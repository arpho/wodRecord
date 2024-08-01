import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlantarsPageRoutingModule } from './plantars-routing.module';

import { PlantarsPage } from './plantars.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlantarsPageRoutingModule
  ],
  declarations: []
})
export class PlantarsPageModule {}
