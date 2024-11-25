import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

export class ScannerPage {
  scannedData: string = '';
  sigla: string = '';
  seccion: string = '';
  sala: string = '';
  fecha: string = '';

  // Método para iniciar el escaneo
  async startScan() {
    // Inicia el escaneo de QR
    const result = await BarcodeScanner.startScan();

    if (result.hasContent) {
      this.scannedData = result.content || '';
      this.processScannedData(this.scannedData);  // Procesar los datos escaneados
      console.log('Datos escaneados:', this.scannedData);
    } else {
      console.log('No se detectó contenido en el código QR.');
    }
  }

  // Método para procesar los datos escaneados
  processScannedData(data: string) {
    // Suponiendo que el formato es "PGY4121|012D|L9|20241104"
    const parts = data.split('|');
    
    if (parts.length === 4) {
      this.sigla = parts[0];
      this.seccion = parts[1];
      this.sala = parts[2];
      this.fecha = this.formatDate(parts[3]);  // Formatear la fecha
    } else {
      console.error('Formato de QR inválido');
    }
  }

  // Método para formatear la fecha (de formato YYYYMMDD a DD/MM/YYYY)
  formatDate(date: string): string {
    if (date.length === 8) {
      const year = date.substring(0, 4);
      const month = date.substring(4, 6);
      const day = date.substring(6, 8);
      return `${day}/${month}/${year}`;
    }
    return 'Fecha inválida';  // Devolver un valor predeterminado si la fecha no tiene el formato esperado
  }

  // Método para detener el escaneo
  stopScan() {
    BarcodeScanner.stopScan();
    BarcodeScanner.hideBackground();
  }
}
