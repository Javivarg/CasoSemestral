import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { OpencageService } from '../services/opencage.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vista1',
  templateUrl: './vista1.page.html',
  styleUrls: ['./vista1.page.scss'],
})
export class Vista1Page implements OnInit {
  comuna: string = '';
  nombre: string = '';
  apellido: string = '';
  weatherData: any = {}; // Inicializa weatherData como un objeto vacío
  asignaturas: any[] = [];

  constructor(
    private router: Router,
    private weatherService: WeatherService,
    private opencageService: OpencageService,
    private http: HttpClient
  ) {}

  async ngOnInit() {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    
    if (usuario && usuario.email) {
      const userData = usuario.userData;
      this.nombre = userData.pnombre + ' ' + userData.snombre;
      this.apellido = userData.apaterno + ' ' + userData.amaterno;
      
      console.log('Usuario encontrado:', usuario);
      console.log('Nombre completo:', this.nombre);
      console.log('Apellido completo:', this.apellido);
      
      await this.getWeather();
      this.cargarAsignaturas(userData.rut);
    } else {
      console.log('No se encontró usuario en el localStorage');
      this.router.navigate(['/home']);
    }
  }

  async getWeather() {
    try {
      const weatherObservable = await this.weatherService.getWeatherByLocation();
      weatherObservable.subscribe(
        (data) => {
          this.weatherData = data;
          const lat = data.coord.lat;
          const lon = data.coord.lon;
          this.opencageService.getComuna(lat, lon).subscribe(
            (locationData: any) => {
              const address = locationData.results[0];
              this.comuna =
                address.components.city ||
                address.components.town ||
                address.components.village ||
                'Comuna no disponible';
            },
            (error) => {
              console.error('Error obteniendo la comuna:', error);
            }
          );
        },
        (error) => {
          console.error('Error fetching weather data by location:', error);
        }
      );
    } catch (error) {
      console.error('Error obtaining location:', error);
    }
  }

  cargarAsignaturas(rut: number) {
    this.http.get(`https://caso-semestral.vercel.app/api/asignaturas/${rut}`).subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.asignaturas = data;
        } else {
          console.error('La respuesta no es un array:', data);
        }
        console.log('Asignaturas cargadas:', this.asignaturas);
      },
      (error) => {
        console.error('Error al cargar las asignaturas:', error);
      }
    );
  }

  getWeatherIcon(): string {
    const weatherCondition = this.weatherData?.weather[0].main.toLowerCase();
    switch (weatherCondition) {
      case 'clear':
        return 'sunny-outline';
      case 'clouds':
        return 'cloudy-outline';
      case 'rain':
        return 'rainy-outline';
      case 'snow':
        return 'snow-outline';
      case 'thunderstorm':
        return 'thunderstorm-outline';
      default:
        return 'partly-sunny-outline';
    }
  }
}
