import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { OpencageService } from '../services/opencage.service';

@Component({
  selector: 'app-vista1',
  templateUrl: './vista1.page.html',
  styleUrls: ['./vista1.page.scss'],
})
export class Vista1Page implements OnInit {
  comuna: string = ''; // Variable para almacenar la comuna
  nombre: string = ''; // Nombre del usuario
  apellido: string = ''; // Apellido del usuario
  weatherData: any; // Datos del clima
  asignaturas: any[] = []; // Lista de asignaturas del alumno (local)

  constructor(
    private router: Router,
    private weatherService: WeatherService,
    private opencageService: OpencageService // Inyecta el servicio de OpenCage
  ) {}

  async ngOnInit() {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

    if (usuario && usuario.email) {
      this.nombre = 'Administrador';
      this.apellido = '';

      console.log('Usuario encontrado:', usuario);
      console.log('Nombre completo:', this.nombre);

      // Llama al método para obtener el clima
      await this.getWeather();

      // Asignaturas locales (puedes adaptarlas según necesites)
      this.asignaturas = [
        { sigla: 'MAT101', nombre: 'Matemáticas Básicas', seccion: '002D' },
        { sigla: 'HIS202', nombre: 'Historia Universal', seccion: '015D' },
        { sigla: 'PGY4121', nombre: 'Programación Aplicación Móviles', seccion: '012D' },
      ];

      console.log('Asignaturas cargadas localmente:', this.asignaturas);
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

          // Llama al servicio de OpenCage para obtener la comuna
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
          console.error('Error obteniendo el clima:', error);
        }
      );
    } catch (error) {
      console.error('Error obteniendo ubicación:', error);
    }
  }

  // Nueva función para obtener el ícono basado en el clima
  getWeatherIcon(): string {
    if (!this.weatherData) {
      return 'cloud'; // Ícono predeterminado si no hay datos
    }

    const weatherCondition = this.weatherData.weather[0].main.toLowerCase();

    switch (weatherCondition) {
      case 'clear':
        return 'sunny'; // Ícono de sol
      case 'clouds':
        return 'cloud'; // Ícono de nube
      case 'rain':
        return 'rainy'; // Ícono de lluvia
      case 'snow':
        return 'snow'; // Ícono de nieve
      case 'thunderstorm':
        return 'thunderstorm'; // Ícono de tormenta
      default:
        return 'cloud'; // Ícono predeterminado
    }
  }
}
