import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController
  ) {}

  // Método para iniciar sesión localmente
  async iniciarSesion() {
    // Credenciales estáticas
    const adminEmail = 'admin';
    const adminPassword = 'admin';

    if (this.email === adminEmail && this.password === adminPassword) {
      // Guardar datos en LocalStorage
      localStorage.setItem(
        'usuario',
        JSON.stringify({
          email: this.email,
          nombre: 'Administrador',
        })
      );

      // Navegar a la vista1 después de inicio de sesión exitoso
      this.navCtrl.navigateForward('/tabs/vista1', {
        queryParams: {
          nombre: 'Administrador',
          email: this.email,
        },
      });
    } else {
      // Muestra un mensaje de error si las credenciales son incorrectas
      const alert = await this.alertController.create({
        header: 'Error',
        message: 'Correo o contraseña incorrectos.',
        buttons: ['OK'],
      });
      await alert.present();
    }
  }

  // Método para comprobar si el usuario ya está autenticado
  ngOnInit() {
    const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');
    if (usuario && usuario.email) {
      // Si el usuario ya está autenticado, redirige a vista1
      this.navCtrl.navigateForward('/tabs/vista1', {
        queryParams: {
          nombre: usuario.nombre || 'Usuario',
          email: usuario.email,
        },
      });
    } else {
      console.log('No hay datos de usuario en el localStorage');
    }
  }
}




/*import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http'; // Importa HttpClient para realizar peticiones HTTP

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  email: string = '';
  password: string = '';

  constructor(
    private navCtrl: NavController,
    private alertController: AlertController,
    private http: HttpClient // Inyecta HttpClient para realizar solicitudes HTTP
  ) {}

  // Método para iniciar sesión
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

        // Navegar a la vista1 después de inicio de sesión exitoso
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

  // Método para comprobar si el usuario ya está autenticado
  ngOnInit() {
    const usuario = JSON.parse(localStorage.getItem('usuario') || 'null');
    if (usuario && usuario.email && usuario.userData) {
      // Si el usuario ya está autenticado, redirige a vista1
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
}*/
