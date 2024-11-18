import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from '../services/weather.service';
import { OpencageService } from '../services/opencage.service'; // Importa el servicio de OpenCage

@Component({
  selector: 'app-vista1',
  templateUrl: './vista1.page.html',
  styleUrls: ['./vista1.page.scss'],
})
export class Vista1Page implements OnInit {
  nombre: string = '';
  apellido: string = '';
  weatherData: any;
  comuna: string = ''; // Variable para almacenar la comuna

  constructor(
    private router: Router,
    private weatherService: WeatherService,
    private opencageService: OpencageService // Inyecta el servicio de OpenCage
  ) {}

  async ngOnInit() {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (usuario && usuario.email) {
      this.nombre = usuario.nombre;
      this.apellido = usuario.apellido;
      await this.getWeather();
    } else {
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
          console.error('Error fetching weather data by location:', error);
        }
      );
    } catch (error) {
      console.error('Error obtaining location:', error);
    }
  }

  getWeatherIcon(): string {
    const weatherCondition = this.weatherData?.weather[0].main.toLowerCase();

    switch (weatherCondition) {
      case 'clear':
        return 'sunny-outline'; // Icono para clima despejado
      case 'clouds':
        return 'cloudy-outline'; // Icono para nublado
      case 'rain':
        return 'rainy-outline'; // Icono para lluvia
      case 'snow':
        return 'snow-outline'; // Icono para nieve
      case 'thunderstorm':
        return 'thunderstorm-outline'; // Icono para tormenta
      default:
        return 'partly-sunny-outline'; // Icono predeterminado
    }
  }
}
