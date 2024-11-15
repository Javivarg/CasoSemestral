// home.page.ts

import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient para realizar peticiones HTTP

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  email: string = '';
  password: string = '';

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private http: HttpClient // Inyecta HttpClient para realizar solicitudes HTTP
  ) {}

  async iniciarSesion() {
    try {
      // Realiza la solicitud POST a la API para verificar las credenciales
      const response: any = await this.http.post('http://localhost:3000/login', {
        email: this.email,
        password: this.password
      }).toPromise();

      console.log('Respuesta del servidor:', response); // Verifica lo que el servidor responde

      if (response.message === 'Inicio de sesión exitoso') {
        // Guardar datos en LocalStorage
        localStorage.setItem('usuario', JSON.stringify({
          email: this.email,
          userData: response.user
        }));

        // Navegar a la siguiente vista
        this.navCtrl.navigateForward('/tabs/vista1', {
          queryParams: {
            nombre: response.user.nombre || 'Usuario',
            email: this.email
          }
        });
      } else {
        // Muestra un mensaje de error si la autenticación falla
        const alert = await this.alertController.create({
          header: 'Error',
          message: response.message,
          buttons: ['OK']
        });
        await alert.present();
      }
    } catch (error) {
      // Muestra un mensaje de error si ocurre un problema de conexión
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
      this.navCtrl.navigateForward('/tabs/vista1', {
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
