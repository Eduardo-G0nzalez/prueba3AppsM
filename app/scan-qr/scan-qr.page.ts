import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Router } from '@angular/router';

@Component({
  selector: 'app-scan-qr',
  templateUrl: './scan-qr.page.html',
  styleUrls: ['./scan-qr.page.scss'],
})
export class ScanQrPage implements OnInit {
  scanActive: boolean = false; // Controla si la "cámara" está activa
  imageUrl: string | null = null; // Guarda la URL de la imagen capturada

  constructor(private router: Router) {}

  ngOnInit() {}

  async startScan() {
    try {
      this.scanActive = true; // Activa el estado de "escaneo"

      // Captura una imagen usando la cámara
      const image = await Camera.getPhoto({
        resultType: CameraResultType.Uri, // Devuelve la URI de la imagen
        source: CameraSource.Camera, // Usa la cámara directamente
        quality: 90, // Calidad de la imagen
      });

      // Asigna la URL de la imagen capturada
      this.imageUrl = image.webPath ?? null;

      // Detiene el estado de "escaneo"
      this.scanActive = false;
    } catch (error) {
      console.error('Error al abrir la cámara:', error);
      this.scanActive = false;
    }
  }

  stopScan() {
    // Función para detener el estado de escaneo
    this.scanActive = false;
  }

  goToLogin() {
    // Navega a la página de login
    this.router.navigate(['/login']);
  }
}
