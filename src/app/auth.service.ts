import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLoggedIn = false; // Cambia esto según tu lógica real

  constructor() {
    // Verifica el estado de autenticación al iniciar
    this.isLoggedIn = this.checkLoginStatus();
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.isLoggedIn; // Devuelve el estado actual de autenticación
  }

  // Método para iniciar sesión (simulación)
  login(username: string, password: string): boolean {
    // Aquí puedes agregar tu lógica de autenticación real
    // Por ejemplo, hacer una llamada a una API para validar las credenciales
    if (username === 'admin' && password === 'admin') { // Ejemplo básico
      this.isLoggedIn = true;
      localStorage.setItem('isLoggedIn', 'true'); // Guarda el estado en localStorage
      return true;
    }
    return false;
  }

  // Método para cerrar sesión
  logout(): void {
    this.isLoggedIn = false;
    localStorage.removeItem('isLoggedIn'); // Elimina el estado de localStorage
  }

  // Método para verificar el estado de inicio de sesión persistente
  private checkLoginStatus(): boolean {
    return localStorage.getItem('isLoggedIn') === 'true'; // Recupera el estado de localStorage
  }
}
