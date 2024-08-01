import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CopyDesign2UserPage } from './copy-design2-user.page';

const routes: Routes = [
  {
    path: '',
    component: CopyDesign2UserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CopyDesign2UserPageRoutingModule {}
