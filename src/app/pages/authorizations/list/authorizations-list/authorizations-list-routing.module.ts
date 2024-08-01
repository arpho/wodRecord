import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthorizationsListPage } from './authorizations-list.page';

const routes: Routes = [
  {
    path: '',
    component: AuthorizationsListPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthorizationsListPageRoutingModule {}
