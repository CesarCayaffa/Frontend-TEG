import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrearVacaPage } from './crear-vaca.page';

const routes: Routes = [
  {
    path: '',
    component: CrearVacaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrearVacaPageRoutingModule {}
