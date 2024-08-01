import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddFunctionPage } from './add-function.page';

const routes: Routes = [
  {
    path: '',
    component: AddFunctionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddFunctionPageRoutingModule {}
