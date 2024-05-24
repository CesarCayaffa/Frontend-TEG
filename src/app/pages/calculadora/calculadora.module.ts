import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CalculadoraPageRoutingModule } from './calculadora-routing.module';

import { CalculadoraPage } from './calculadora.page';

import { MenuModule } from '../../components/menu/menu.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CalculadoraPageRoutingModule,
    MenuModule
  ],
  declarations: [CalculadoraPage]
})
export class CalculadoraPageModule {}
