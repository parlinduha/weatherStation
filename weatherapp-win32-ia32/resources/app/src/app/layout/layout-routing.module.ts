import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutPage } from './layout.page';

const routes: Routes = [
  {
    path: '',
    component: LayoutPage,
  },
  {
    path: '',
    redirectTo: 'layout',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutPageRoutingModule {}
