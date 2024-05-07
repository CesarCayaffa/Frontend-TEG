import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InfoCondicionesPageRoutingModule } from './info-condiciones-routing.module';

import { InfoCondicionesPage } from './info-condiciones.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InfoCondicionesPageRoutingModule
  ],
  declarations: [InfoCondicionesPage]
})
export class InfoCondicionesPageModule {}
