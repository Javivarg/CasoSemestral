import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Vista1PageRoutingModule } from './vista1-routing.module';

import { Vista1Page } from './vista1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Vista1PageRoutingModule
  ],
  declarations: [Vista1Page]
})
export class Vista1PageModule {}
