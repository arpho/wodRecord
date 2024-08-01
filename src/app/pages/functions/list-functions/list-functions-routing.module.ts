import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListFunctionsPage } from './list-functions.page';

const routes: Routes = [
  {
    path: '',
    component: ListFunctionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListFunctionsPageRoutingModule {}
