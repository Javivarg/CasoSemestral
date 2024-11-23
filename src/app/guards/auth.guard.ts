import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): Observable<boolean> {
    const token = localStorage.getItem('usuario');
    if (token) {
      return of(true);  // Permitir la navegación
    } else {
      this.router.navigate(['/login']);  // Redirigir al login si no hay token
      return of(false);  // Bloquear la navegación
    }
  }
}
