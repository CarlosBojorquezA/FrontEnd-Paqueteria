import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';  // Importar CommonModule
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-rastreo',
  imports: [CommonModule, FormsModule ],
  templateUrl: './rastreo.component.html',
  styleUrl: './rastreo.component.css'
})
export class RastreoComponent {
  rastreoMenu: string = '';
  @ViewChild('numRastreo') NumRastreo!: ElementRef;
  constructor(private authService: AuthService, private route: ActivatedRoute) {}
  contenidoVisible = false;
  idEnvio: number | null = null;
  idPaquete: number | null = null;
  estatus: string | null = null;
  remitente: string | null = null;
  destinatario: string | null = null;
  status: string = 'DESCONOCIDO'; // Aquí se guarda el estado actual del paquete
  mensajeError: string | null = null; // Nuevo campo para manejar errores

  // Este metodo se ejecuta en cuanto se carga el componente
  ngOnInit(): void {
    this.solicitarUbicacion();
    this.route.queryParams.subscribe(params => {
    this.rastreoMenu = params['rastreoMenu'] || '';
      if (this.rastreoMenu !== ''){
        this.rastrear(this.rastreoMenu);
      }
    });
  }

  // Función para solicitar la ubicacion actual del usuario
  solicitarUbicacion() {
    // Verifica si la geolocalización está disponible en el navegador
    if (navigator.geolocation) {
      // Solicita la ubicación actual del usuario
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('Ubicación obtenida:', position.coords); // Muestra la ubicación obtenida en la consola
        },
        (error) => {
          console.error('Error al obtener ubicación:', error.message);
        }
      );
    } else {
      // Si la geolocalización no está soportada, se muestra un mensaje en la consola
      console.error('Geolocalización no soportada por el navegador.');
    }
  }

  rastrear(rastreo: string) {
    const rastreoLimpio = rastreo.trim(); // Eliminar espacios en blanco

    if (!rastreoLimpio || rastreoLimpio.length !== 20) { // Validación previa en frontend
      this.mensajeError = 'Por favor, ingrese un número de rastreo válido de 20 dígitos.';
      return;
    }

    this.mensajeError = ''; // Borra el mensaje si todo está bien
    
    this.authService.rastrearPaquete(rastreoLimpio).subscribe(
      (response) => {
        if (response.status === 'success') {
          this.contenidoVisible = !this.contenidoVisible;
          this.idEnvio = response.id_Envio;
          this.idPaquete = response.id_Paquete;
          this.estatus = response.Estatus;
          this.remitente = response.Remitente;
          this.destinatario = response.Destinatario;
          this.status = response.Estatus;
          console.log(this.status); // Verifica el valor de status
        }
      },
      (error) => {
        if (error.status === 401){
          this.mensajeError = 'El número de rastreo ingresado no es válido. Verifique e intente nuevamente.';
        }
        console.error('Error en la solicitud:', error);
        this.mensajeError = 'Hubo un problema con el servidor. Intente nuevamente más tarde.';
      }
    );
  }

  getStatusColor(status: string) {
    // Cambia el color de acuerdo con el estatus
    if (this.status !== status) return '#363636'; // Gris por defecto

    switch (status) {
      case 'EN PROCESO':
      case 'ENVIADO':
      case 'EN ENTREGA A DOMICILIO':
        return 'rgb(186, 0, 0)'; // Rojo
      case 'ENTREGADO':
        return 'rgb(14, 204, 0)' // Verde
      default:
        return '#363636' // Si no es el estatus actual, no cambiar el color
    }
  }
  
  mostrarContenido(){
    this.contenidoVisible = !this.contenidoVisible; 
  }
}
