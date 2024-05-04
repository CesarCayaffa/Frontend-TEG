import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdatePartoPageRoutingModule } from './update-parto-routing.module';

import { UpdatePartoPage } from './update-parto.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatePartoPageRoutingModule
  ],
  declarations: [UpdatePartoPage]
})
export class UpdatePartoPageModule {}
