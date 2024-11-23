// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'https://caso-semestral.vercel.app';  // Cambia esta URL a tu backend

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  // Método para obtener el token de autenticación desde el localStorage
  getAuthToken(): string | null {
    const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');
    if (usuario && usuario.token) {
      return usuario.token; // Asegúrate de almacenar el token en el localStorage al iniciar sesión
    }
    return null;
  }
}
