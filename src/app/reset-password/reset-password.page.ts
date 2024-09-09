import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.page.html',
  styleUrls: ['./reset-password.page.scss'],
})
export class ResetPasswordPage {
  email: string = '';

  constructor(
    private alertController: AlertController,
    private router: Router 
  ) {}

  async resetPassword() {
    if (this.email) {
      // Mensaje restablecer contraseña 
      const alert = await this.alertController.create({
        header: 'Correo Enviado',
        message: 'Si este correo está registrado, recibirás un enlace para restablecer la contraseña.',
        buttons: ['OK']
      });
      await alert.present();
    } else {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Por favor ingresa un correo válido.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}
