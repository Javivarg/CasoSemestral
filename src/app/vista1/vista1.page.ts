import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { WeatherService } from '../services/weather.service';

@Component({
  selector: 'app-vista1',
  templateUrl: './vista1.page.html',
  styleUrls: ['./vista1.page.scss'],
})
export class Vista1Page implements OnInit {
  nombre: string = ''; // Nombre del usuario
  apellido: string = ''; // Apellido del usuario
  weatherData: any; // Datos del clima
  asignaturas: any[] = []; // Lista de asignaturas del alumno

  constructor(
    private router: Router,
    private http: HttpClient, // Cliente HTTP para llamadas a la API
    private weatherService: WeatherService // Servicio para obtener el clima
  ) {}

  async ngOnInit() {
    // Obtiene el usuario desde el localStorage
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    
    if (usuario && usuario.email) {
      const userData = usuario.userData;
    
      // Combina los nombres y apellidos
      this.nombre = userData.pnombre + ' ' + userData.snombre;
      this.apellido = userData.apaterno + ' ' + userData.amaterno;
      
      // Imprime los datos en la consola
      console.log('Usuario encontrado:', usuario);
      console.log('Nombre completo:', this.nombre);
      console.log('Apellido completo:', this.apellido);
      
      // Llama al método para obtener el clima
      await this.getWeather();
      
      // Llama al método para cargar las asignaturas
      this.cargarAsignaturas(userData.rut);
  
    } else {
      // Si no se encuentra el usuario, redirige a la página de inicio
      console.log('No se encontró usuario en el localStorage');
      this.router.navigate(['/home']);
    }
  }
  
  

  // Obtener datos del clima
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

  // Cargar asignaturas del alumno desde el servidor
  cargarAsignaturas(rut: number) {
    this.http.get(`http://localhost:3000/asignaturas/${rut}`).subscribe(
      (data: any) => {
        if (Array.isArray(data)) {
          this.asignaturas = data; // Asignar asignaturas si la respuesta es un array
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

  // Obtener icono del clima basado en la condición
  getWeatherIcon(): string {
    const weatherCondition = this.weatherData?.weather[0]?.main.toLowerCase();

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
