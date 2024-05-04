import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPalpacionPage } from './add-palpacion.page';

const routes: Routes = [
  {
    path: '',
    component: AddPalpacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPalpacionPageRoutingModule {}
