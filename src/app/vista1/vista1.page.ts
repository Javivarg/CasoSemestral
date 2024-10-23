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
  city: string = 'Santiago'; // Ciudad predeterminada o puedes usar la del usuario

  constructor(private router: Router, private weatherService: WeatherService) {}

  ngOnInit() {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (usuario && usuario.email) {
      this.nombre = usuario.nombre;
      this.apellido = usuario.apellido;
      this.getWeather();  
    } else {
      
      this.router.navigate(['/home']);
    }
  }

  getWeather() {
    this.weatherService.getWeather(this.city).subscribe(
      (data) => {
        this.weatherData = data;
      },
      (error) => {
        console.error('Error fetching weather data:', error);
      }
    );
  }
}
