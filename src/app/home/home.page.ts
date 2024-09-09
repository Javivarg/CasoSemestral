import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  email: string = '';
  password: string = '';

  // Diccionario Usuario
  private usuario = {
    email: 'admin',
    password: 'admin',
    nombre: 'admin',
    apellido: 'admin'
  };

  constructor(private navCtrl: NavController, private alertController: AlertController) {}

  // Funcion inicio de sesion
  async iniciarSesion() {
    if (this.email === this.usuario.email && this.password === this.usuario.password) {
      // Validador
      this.navCtrl.navigateForward('/vista1', {
        queryParams: {
          nombre: this.usuario.nombre,
          apellido: this.usuario.apellido
        }
      });
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Usuario o contraseña incorrectos.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
