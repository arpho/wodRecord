import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CamOperationsPage } from './cam-operations.page';

const routes: Routes = [
  {
    path: '',
    component: CamOperationsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CamOperationsPageRoutingModule {}
