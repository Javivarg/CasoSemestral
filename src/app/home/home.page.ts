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
  selectedUser: any;

  public lista = [
    {
      nombre: 'javier',
      apellido: 'Vargas',
      email: 'javier@gmail.com',
      password: 'hola',
    },
    {
      email: 'admin',
      password: 'admin',
      nombre: 'admin',
      apellido: 'admin'
    }
  ];

  constructor(private navCtrl: NavController, private alertController: AlertController) {}

  async iniciarSesion() {
    const usuario = this.lista.find(user => user.email === this.email && user.password === this.password);

    if (usuario) {
      // Guardar datos en LocalStorage
      localStorage.setItem('usuario', JSON.stringify(usuario));
      this.navCtrl.navigateForward('/vista1', {
        queryParams: {
          nombre: usuario.nombre,
          apellido: usuario.apellido
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

  // Agregar una función para verificar el inicio de sesión en la inicialización del componente
  ngOnInit() {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (usuario && usuario.email) {
      this.navCtrl.navigateForward('/vista1', {
        queryParams: {
          nombre: usuario.nombre,
          apellido: usuario.apellido
        }
      });
    }
  }
}
