import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlantarsPage } from './plantars.page';

const routes: Routes = [
  {
    path: '',
    component: PlantarsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlantarsPageRoutingModule {}
