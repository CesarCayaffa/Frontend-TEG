import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoPartoPage } from './info-parto.page';

const routes: Routes = [
  {
    path: '',
    component: InfoPartoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoPartoPageRoutingModule {}
