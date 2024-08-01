import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NotEnabledPage } from './not-enabled.page';

const routes: Routes = [
  {
    path: '',
    component: NotEnabledPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NotEnabledPageRoutingModule {}
