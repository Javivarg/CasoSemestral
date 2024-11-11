import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-vista1',
  templateUrl: './vista1.page.html',
  styleUrls: ['./vista1.page.scss'],
})
export class Vista1Page implements OnInit {
  nombre: string = '';
  apellido: string = '';
  weatherData: any;

  constructor(private router: Router, private weatherService: WeatherService) {}

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
