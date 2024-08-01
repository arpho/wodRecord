import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddOperatorPage } from './add-operator.page';

const routes: Routes = [
  {
    path: '',
    component: AddOperatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddOperatorPageRoutingModule {}
