import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditOPeratorPage } from './edit-operator.page';

const routes: Routes = [
  {
    path: '',
    component: EditOPeratorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditOPeratorPageRoutingModule {}
