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

  // Diccionario de autenticación
  private usuario = {
    email: 'admin@admin.com',
    password: 'admin',
    nombre: 'admin',
    apellido: 'admin'
  };

  constructor(private navCtrl: NavController, private alertController: AlertController) {}

  // Método para iniciar sesión
  async iniciarSesion() {
    if (this.email === this.usuario.email && this.password === this.usuario.password) {
      // Si el email y la contraseña son correctos, redirigir a la vista1 y pasar nombre y apellido
      this.navCtrl.navigateForward('/vista1', {
        queryParams: {
          nombre: this.usuario.nombre,
          apellido: this.usuario.apellido
        }
      });
    } else {
      // Si los datos no son correctos, mostrar una alerta
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Usuario o contraseña incorrectos.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
