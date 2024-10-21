import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-vista1',
  templateUrl: './vista1.page.html',
  styleUrls: ['./vista1.page.scss'],
})
export class Vista1Page implements OnInit {
  nombre: string = '';
  apellido: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');
    if (usuario && usuario.email) {
      this.nombre = usuario.nombre;
      this.apellido = usuario.apellido;
    } else {
      // Redirige al usuario si no hay información en LocalStorage
      this.router.navigate(['/home']);
    }
  }

  recuperar() {
    localStorage.removeItem('usuario'); // Elimina el usuario de LocalStorage
    this.router.navigate(['/home']); // Redirige a la página de inicio
  }
}
