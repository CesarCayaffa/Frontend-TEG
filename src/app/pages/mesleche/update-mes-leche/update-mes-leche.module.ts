import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateMesLechePageRoutingModule } from './update-mes-leche-routing.module';

import { UpdateMesLechePage } from './update-mes-leche.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdateMesLechePageRoutingModule
  ],
  declarations: [UpdateMesLechePage]
})
export class UpdateMesLechePageModule {}
