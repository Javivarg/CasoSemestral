import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { NotFoundComponent } from './not-found/not-found.component'; // Asegúrate de que esta línea esté correctamente escrita

const routes: Routes = [
  { path: 'home', loadChildren: () => import('./home/home.module').then(m => m.HomePageModule) },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'vista1', loadChildren: () => import('./vista1/vista1.module').then(m => m.Vista1PageModule), canActivate: [authGuard] },
  { path: 'reset-password', loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordPageModule) },
  { path: '**', component: NotFoundComponent } // Esta línea debe estar al final
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
