import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatePalpacionPage } from './update-palpacion.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatePalpacionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatePalpacionPageRoutingModule {}
