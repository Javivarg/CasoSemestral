import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, from } from 'rxjs'; // 'from' para convertir la Promise en Observable
import { Geolocation } from '@capacitor/geolocation';
import { switchMap } from 'rxjs/operators';  // Importa switchMap
import { Platform } from '@ionic/angular'; // Importa Platform para detectar el entorno

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  private apiKey = '46d724360170bad3d7c9a590c4edbfaf';
  private apiUrl = 'https://api.openweathermap.org/data/2.5/weather';

  constructor(private http: HttpClient, private platform: Platform) {}

  getWeather(city: string): Observable<any> {
    const url = `${this.apiUrl}?q=${city}&appid=${this.apiKey}&units=metric`;
    return this.http.get(url);
  }

  // Modificación de la geolocalización para manejar la Web y dispositivos móviles
  getWeatherByLocation(): Observable<any> {
    if (this.platform.is('hybrid')) {
      // Solo usar geolocalización real en dispositivos móviles
      return from(Geolocation.getCurrentPosition()).pipe(
        switchMap((coordinates) => {
          const lat = coordinates.coords.latitude;
          const lon = coordinates.coords.longitude;
          const url = `${this.apiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
          return this.http.get(url); // Devuelve el Observable de la petición HTTP
        })
      );
    } else {
      // Para la Web, usa coordenadas predeterminadas (por ejemplo, latitud y longitud de una ciudad)
      const lat = 40.730610;  // Coordenadas de ejemplo (Nueva York)
      const lon = -73.935242;
      const url = `${this.apiUrl}?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`;
      return this.http.get(url); // Devuelve el Observable con los datos de clima simulados
    }
  }
}
