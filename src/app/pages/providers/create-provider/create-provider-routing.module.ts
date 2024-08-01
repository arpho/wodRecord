import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateProviderPage } from './create-provider.page';

const routes: Routes = [
  {
    path: '',
    component: CreateProviderPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateProviderPageRoutingModule {}
