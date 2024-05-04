import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ActualizarVacaPageRoutingModule } from './actualizar-vaca-routing.module';

import { ActualizarVacaPage } from './actualizar-vaca.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ActualizarVacaPageRoutingModule
  ],
  declarations: [ActualizarVacaPage]
})
export class ActualizarVacaPageModule {}
