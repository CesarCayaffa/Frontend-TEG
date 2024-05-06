import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoMesLechePageRoutingModule } from './info-mes-leche-routing.module';

import { InfoMesLechePage } from './info-mes-leche.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoMesLechePageRoutingModule
  ],
  declarations: [InfoMesLechePage]
})
export class InfoMesLechePageModule {}
