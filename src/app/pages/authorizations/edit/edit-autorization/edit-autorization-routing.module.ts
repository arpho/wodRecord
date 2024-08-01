import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditAutorizationPage } from './edit-autorization.page';

const routes: Routes = [
  {
    path: '',
    component: EditAutorizationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditAutorizationPageRoutingModule {}
