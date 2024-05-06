import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InfoMesLechePage } from './info-mes-leche.page';

const routes: Routes = [
  {
    path: '',
    component: InfoMesLechePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InfoMesLechePageRoutingModule {}
