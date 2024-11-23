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
      const response: any = await firstValueFrom(this.http.post('https://caso-semestral.vercel.app/api/login', {
        email: this.email,
        password: this.password
      }));

      console.log('Respuesta del servidor:', response);

      if (response?.message === 'Inicio de sesión exitoso') {
        localStorage.setItem('usuario', JSON.stringify({
          email: this.email,
          userData: response.user
        }));

        this.router.navigate(['/tabs/vista1'], {
          queryParams: {
            nombre: response.user.nombre || 'Usuario',
            email: this.email
          }
        });
      } else {
        const alert = await this.alertController.create({
          header: 'Error',
          message: response.message,
          buttons: ['OK']
        });
        await alert.present();
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Error en la conexión al servidor.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  ngOnInit() {
    const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');
    if (usuario && usuario.email && usuario.userData) {
      this.router.navigate(['/tabs/vista1'], {
        queryParams: {
          nombre: usuario.userData.nombre || 'Usuario',
          email: usuario.email
        }
      });
    } else {
      console.log('No hay datos de usuario en el localStorage');
    }
  }
}
