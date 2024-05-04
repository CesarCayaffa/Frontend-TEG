import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrearVacaPageRoutingModule } from './crear-vaca-routing.module';

import { CrearVacaPage } from './crear-vaca.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrearVacaPageRoutingModule
  ],
  declarations: [CrearVacaPage]
})
export class CrearVacaPageModule {}
