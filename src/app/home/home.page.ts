import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private alertController: AlertController,
    private http: HttpClient,
    private router: Router
  ) {}

  async iniciarSesion() {
    try {
      // Realiza la solicitud POST para iniciar sesión
      const response: any = await firstValueFrom(
        this.http.post('https://caso-semestral.vercel.app/api/login', {
          email: this.email,
          password: this.password,
        })
      );

      console.log('Respuesta del servidor:', response);

      if (response?.message === 'Inicio de sesión exitoso') {
        // Guarda los datos del usuario en localStorage
        localStorage.setItem(
          'usuario',
          JSON.stringify({
            email: this.email,
            userData: response.user,
          })
        );

        // Redirige a la página de vista1
        this.router.navigate(['/tabs/vista1'], {
          queryParams: {
            nombre: response.user.nombre || 'Usuario',
            email: this.email,
          },
        });
      } else {
        // Muestra una alerta si hay un error en el inicio de sesión
        const alert = await this.alertController.create({
          header: 'Error',
          message: response.message,
          buttons: ['OK'],
        });
        await alert.present();
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      // Muestra una alerta si hay un problema de conexión
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Error en la conexión al servidor.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  ngOnInit() {
    // Recupera los datos del usuario del localStorage
    const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');

    if (usuario && usuario.email && usuario.userData) {
      // Verifica si ya estás en la ruta antes de redirigir
      const currentUrl = this.router.url;
      if (currentUrl !== '/tabs/vista1') {
        console.log('Redirigiendo a /tabs/vista1');
        this.router.navigate(['/tabs/vista1'], {
          queryParams: {
            nombre: usuario.userData.nombre || 'Usuario',
            email: usuario.email,
          },
        });
      } else {
        console.log('Ya estás en /tabs/vista1');
      }
    } else {
      console.log('No hay datos de usuario en el localStorage');
    }
  }
}
