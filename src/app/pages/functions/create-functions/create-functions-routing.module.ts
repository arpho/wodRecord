import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateFunctionsPage } from './create-functions.page';

const routes: Routes = [
  {
    path: '',
    component: CreateFunctionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateFunctionsPageRoutingModule {}
