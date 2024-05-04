import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListaVacasPageRoutingModule } from './lista-vacas-routing.module';

import { ListaVacasPage } from './lista-vacas.page';

import { MenuModule } from '../../components/menu/menu.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListaVacasPageRoutingModule,
    MenuModule
  ],
  declarations: [ListaVacasPage]
})
export class ListaVacasPageModule {}
