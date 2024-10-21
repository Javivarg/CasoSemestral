import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  recuperar() {
    localStorage.removeItem('usuario'); // Elimina el usuario de LocalStorage
    this.router.navigate(['/home']); // Redirige a la página de inicio
  }
}
