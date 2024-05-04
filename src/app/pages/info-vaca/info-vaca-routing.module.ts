import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoVacaPage } from './info-vaca.page';

const routes: Routes = [
  {
    path: '',
    component: InfoVacaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoVacaPageRoutingModule {}
