import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllReportPageRoutingModule } from './all-report-routing.module';

import { AllReportPage } from './all-report.page';

import { MenuModule } from '../../../components/menu/menu.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllReportPageRoutingModule,
    MenuModule
  ],
  declarations: [AllReportPage]
})
export class AllReportPageModule {}
