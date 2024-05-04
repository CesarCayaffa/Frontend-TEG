import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPalpacionPageRoutingModule } from './add-palpacion-routing.module';

import { AddPalpacionPage } from './add-palpacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPalpacionPageRoutingModule
  ],
  declarations: [AddPalpacionPage]
})
export class AddPalpacionPageModule {}
