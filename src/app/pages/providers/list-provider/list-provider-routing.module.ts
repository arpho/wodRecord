import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListProviderPage } from './list-provider.page';

const routes: Routes = [
  {
    path: '',
    component: ListProviderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListProviderPageRoutingModule {}
