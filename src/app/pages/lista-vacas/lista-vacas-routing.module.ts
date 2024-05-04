import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListaVacasPage } from './lista-vacas.page';

const routes: Routes = [
  {
    path: '',
    component: ListaVacasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListaVacasPageRoutingModule {}
