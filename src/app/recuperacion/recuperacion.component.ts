import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-recuperacion',
  imports: [RouterOutlet],
  templateUrl: './recuperacion.component.html',
  styleUrl: './recuperacion.component.css'
})
export class RecuperacionComponent {
  @ViewChild('email') email!: ElementRef;
  @ViewChild('password1') pass1!: ElementRef;
  @ViewChild('password2') pass2!: ElementRef;
  constructor(private authService: AuthService, private router: Router) {}

  contraseñaIncorrecta: boolean = false; // Variable para validar la coincidencia de las nuevas contraseñas

// Método para cambiar la contraseña
actualizarContrasena() {
  const password1Value = this.pass1.nativeElement.value;  // Obtiene el valor de la primera contraseña desde el formulario
  const password2Value = this.pass2.nativeElement.value; // Obtiene el valor de la segunda contraseña desde el formulario

  // Crea el objeto que se enviará al backend para cambiar la contraseña.
  // Incluye el email y la nueva contraseña que se ha introducido en el formulario.
  const body = {
    Email: this.email.nativeElement.value, // Se obtiene el email del usuario
    NuevaContrasena: password1Value,  // Se incluye la primera contraseña (nueva) para actualizarla
  };
  // Compara si las dos contraseñas introducidas son iguales
  if (password1Value === password2Value) {
    // Si las contraseñas coinciden, marca que no hay error y resetea la variable de error
    this.contraseñaIncorrecta = false;
    alert('Las contraseñas coinciden.'); // Muestra un mensaje al usuario indicando que las contraseñas coinciden

    // Realiza la llamada al servicio para cambiar la contraseña en el backend
    // Pasa el cuerpo (body) con los datos necesarios (email y nueva contraseña)
    this.authService.cambiarContrasena(body).subscribe(
      // En caso de que la solicitud al backend sea exitosa, maneja la respuesta
      (response) => {
        // Si la respuesta del servidor tiene el estado 'success', muestra un mensaje de éxito
        if (response.status === 'success') {
          alert("Contraseña cambiada correctamente!!");
          this.router.navigate(['/login']); // Navega a la ruta '/login'
        }
      },
      // Si ocurre un error durante la solicitud, lo captura y maneja
      (error) => {
        // Imprime el error en la consola para diagnóstico
        console.error('Error al cambiar la contraseña:', error);
        // Muestra un mensaje de error al usuario en caso de fallo en la solicitud
        alert('Ocurrió un error al intentar cambiar la contraseña.');
      }
    )
  } else {
    // Si las contraseñas no coinciden, marca el error y muestra el mensaje correspondiente
    this.contraseñaIncorrecta = true;
    alert('Las contraseñas no coinciden.');
  }
}

}
