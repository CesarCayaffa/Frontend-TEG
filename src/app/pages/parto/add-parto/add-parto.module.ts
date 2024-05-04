import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPartoPageRoutingModule } from './add-parto-routing.module';

import { AddPartoPage } from './add-parto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPartoPageRoutingModule
  ],
  declarations: [AddPartoPage]
})
export class AddPartoPageModule {}
