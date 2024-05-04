import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateMesLechePage } from './update-mes-leche.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateMesLechePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateMesLechePageRoutingModule {}
