import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ActualizarVacaPage } from './actualizar-vaca.page';

const routes: Routes = [
  {
    path: '',
    component: ActualizarVacaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ActualizarVacaPageRoutingModule {}
