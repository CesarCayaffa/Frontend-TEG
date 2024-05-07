import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllReportPage } from './all-report.page';

const routes: Routes = [
  {
    path: '',
    component: AllReportPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllReportPageRoutingModule {}
