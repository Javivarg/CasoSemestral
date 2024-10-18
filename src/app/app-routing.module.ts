import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard'; // Importa el guard
import { NotFoundComponent } from './not-found/not-found.component'; // Asegúrate de importar el componente 404

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'vista1',
    loadChildren: () => import('./vista1/vista1.module').then(m => m.Vista1PageModule),
    canActivate: [AuthGuard] // Protege esta ruta con AuthGuard
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordPageModule)
  },
  {
    path: '404', // Ruta para la página 404
    component: NotFoundComponent
  },
  {
    path: '**', // Cualquier otra ruta
    redirectTo: '/404' // Redirigir a la página 404
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

