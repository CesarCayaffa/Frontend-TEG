import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatePalpacionPageRoutingModule } from './update-palpacion-routing.module';

import { UpdatePalpacionPage } from './update-palpacion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatePalpacionPageRoutingModule
  ],
  declarations: [UpdatePalpacionPage]
})
export class UpdatePalpacionPageModule {}
