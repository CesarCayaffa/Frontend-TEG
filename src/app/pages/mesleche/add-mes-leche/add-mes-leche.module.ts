import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddMesLechePageRoutingModule } from './add-mes-leche-routing.module';

import { AddMesLechePage } from './add-mes-leche.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddMesLechePageRoutingModule
  ],
  declarations: [AddMesLechePage]
})
export class AddMesLechePageModule {}
