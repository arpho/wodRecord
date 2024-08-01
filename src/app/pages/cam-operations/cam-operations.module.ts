import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CamOperationsPageRoutingModule } from './cam-operations-routing.module';

import { CamOperationsPage } from './cam-operations.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CamOperationsPageRoutingModule
  ],
  declarations: [CamOperationsPage]
})
export class CamOperationsPageModule {}
