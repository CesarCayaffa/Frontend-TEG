import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoVacaPageRoutingModule } from './info-vaca-routing.module';

import { InfoVacaPage } from './info-vaca.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoVacaPageRoutingModule
  ],
  declarations: [InfoVacaPage]
})
export class InfoVacaPageModule {}
