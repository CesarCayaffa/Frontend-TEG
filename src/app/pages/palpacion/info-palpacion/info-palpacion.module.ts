import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoPalpacionPageRoutingModule } from './info-palpacion-routing.module';

import { InfoPalpacionPage } from './info-palpacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoPalpacionPageRoutingModule
  ],
  declarations: [InfoPalpacionPage]
})
export class InfoPalpacionPageModule {}
