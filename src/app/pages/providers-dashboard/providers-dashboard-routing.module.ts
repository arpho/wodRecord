import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProvidersDashboardPage } from './providers-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: ProvidersDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProvidersDashboardPageRoutingModule {}
