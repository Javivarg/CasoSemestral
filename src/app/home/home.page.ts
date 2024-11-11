// home.page.ts
import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  email: string = '';
  password: string = '';

  constructor(private navCtrl: NavController, private alertController: AlertController) {}

  async iniciarSesion() {
    const auth = getAuth();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
      const usuario = userCredential.user;
      
      // Guardar datos en LocalStorage
      localStorage.setItem('usuario', JSON.stringify({ email: usuario.email }));
      this.navCtrl.navigateForward('/tabs/vista1', {
        queryParams: {
          nombre: usuario.displayName || 'Usuario',
          email: usuario.email
        }
      });
    } catch (error) {
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Usuario o contraseña incorrectos.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }

  ngOnInit() {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (usuario && usuario.email) {
      this.navCtrl.navigateForward('/vista1', {
        queryParams: {
          nombre: usuario.displayName || 'Usuario',
          email: usuario.email
        }
      });
    }
  }
}
