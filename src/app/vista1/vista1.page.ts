import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; // Importar para capturar los parámetros

@Component({
  selector: 'app-vista1',
  templateUrl: './vista1.page.html',
  styleUrls: ['./vista1.page.scss'],
})
export class Vista1Page implements OnInit {
  nombre: string = '';
  apellido: string = '';

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // Capturar los parámetros de la navegación
    this.route.queryParams.subscribe(params => {
      this.nombre = params['nombre'];
      this.apellido = params['apellido'];
    });
  }
}
