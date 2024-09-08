import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Vista1Page } from './vista1.page';

const routes: Routes = [
  {
    path: '',
    component: Vista1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Vista1PageRoutingModule {}
