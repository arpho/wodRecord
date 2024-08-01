import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditFunctionsPage } from './edit-functions.page';

const routes: Routes = [
  {
    path: '',
    component: EditFunctionsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditFunctionsPageRoutingModule {}
