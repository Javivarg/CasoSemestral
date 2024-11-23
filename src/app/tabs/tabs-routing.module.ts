import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'vista1',
        loadChildren: () => import('../vista1/vista1.module').then(m => m.Vista1PageModule)
      },
      {
        path: 'qr',
        loadChildren: () => import('../qr/qr.module').then(m => m.QrPageModule)
      },
      {
        path: 'settings',
        loadChildren: () => import('../settings/settings.module').then(m => m.SettingsPageModule)
      },
      {
        path: '', // Ruta predeterminada
        redirectTo: 'vista1',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
