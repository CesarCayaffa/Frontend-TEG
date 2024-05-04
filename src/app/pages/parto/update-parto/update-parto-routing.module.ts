import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatePartoPage } from './update-parto.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatePartoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatePartoPageRoutingModule {}
