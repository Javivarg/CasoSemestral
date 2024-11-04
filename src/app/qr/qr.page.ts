import { Component, OnInit } from '@angular/core';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  styleUrls: ['./qr.page.scss'],
})
export class QrPage implements OnInit {

  scannedData: string | null = null; // Variable para almacenar los datos escaneados

  constructor() { }

  ngOnInit() {}

  async startScan() {
    // Verifica y solicita permisos para acceder a la cámara
    const permission = await BarcodeScanner.checkPermission({ force: true });
    
    if (permission.granted) {
      // Oculta el fondo para que el escáner se ejecute en pantalla completa
      BarcodeScanner.hideBackground();

      const result = await BarcodeScanner.startScan(); // Inicia el escáner

      // Verifica si hay contenido escaneado
      if (result.hasContent) {
        this.scannedData = result.content; // Guarda el contenido del código QR escaneado
        console.log('Scanned data:', this.scannedData);
      }

      // Muestra el fondo nuevamente cuando termina el escaneo
      BarcodeScanner.showBackground();
    } else {
      console.log('No se otorgaron permisos para usar la cámara.');
    }
  }

  // Método para detener el escáner (opcional)
  stopScan() {
    BarcodeScanner.stopScan();
  }
}
