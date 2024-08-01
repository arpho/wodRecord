import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DigitalaidPage } from './digitalaid.page';

const routes: Routes = [
  {
    path: '',
    component: DigitalaidPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DigitalaidPageRoutingModule {}
