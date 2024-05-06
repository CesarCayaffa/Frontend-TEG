import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoPartoPageRoutingModule } from './info-parto-routing.module';

import { InfoPartoPage } from './info-parto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoPartoPageRoutingModule
  ],
  declarations: [InfoPartoPage]
})
export class InfoPartoPageModule {}
