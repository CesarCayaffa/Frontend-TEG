import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoPalpacionPage } from './info-palpacion.page';

const routes: Routes = [
  {
    path: '',
    component: InfoPalpacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoPalpacionPageRoutingModule {}
