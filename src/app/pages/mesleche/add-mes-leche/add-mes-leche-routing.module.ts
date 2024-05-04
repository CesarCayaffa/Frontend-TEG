import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddMesLechePage } from './add-mes-leche.page';

const routes: Routes = [
  {
    path: '',
    component: AddMesLechePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddMesLechePageRoutingModule {}
