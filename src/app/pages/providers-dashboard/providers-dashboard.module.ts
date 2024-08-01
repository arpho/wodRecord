import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProvidersDashboardPageRoutingModule } from './providers-dashboard-routing.module';

import { ProvidersDashboardPage } from './providers-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProvidersDashboardPageRoutingModule
  ],
  declarations: []
})
export class ProvidersDashboardPageModule {}
