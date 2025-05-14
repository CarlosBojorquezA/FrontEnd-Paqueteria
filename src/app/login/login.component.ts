import { Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { RouterLink, RouterOutlet, Router} from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [RouterOutlet, RouterLink, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  title = 'Iniciar Sesión'
  @ViewChild('username') usernameInput!: ElementRef;
  @ViewChild('password') passwordInput!: ElementRef;

  constructor(private authService: AuthService, private router: Router) {}
  mensajeError: string = ''; // Nuevo campo para manejar errores

  login() {
    const usuario = this.usernameInput.nativeElement.value;
    const contrasena = this.passwordInput.nativeElement.value;

    // Validar formato de correo electrónico
    const correoRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!correoRegex.test(usuario)) {
        this.mensajeError = 'Ingrese un correo electrónico válido.';
        return;
      }

    // Validar que la contraseña tenga al menos una letra y un número 
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(contrasena)) {
        this.mensajeError = 'La contraseña debe tener al menos una letra y un número.';
        return;
      }

    if (!usuario || !contrasena){ // Validar que los campos de las credenciales no estén vacíos
      this.mensajeError = 'Por favor ingrese sus credenciales en todos los campos.'
      return;
    }
     
    if (contrasena.length < 8) { // Validar longitud mínima de la contraseña
      this.mensajeError = 'La contraseña debe tener al menos 8 caracteres.';
      return;
    }

    if (/\s/.test(contrasena)) { // Validar que la contraseña no contenga espacios
      this.mensajeError = 'La contraseña no debe contener espacios.';
      return;
    }

    this.mensajeError = ''; // Borra el mensaje si todo está bien

    this.authService.login(usuario, contrasena).subscribe(
      (response) => {
        if (response.status === 'success') {
          // Redirige al usuario a la página correspondiente
          this.router.navigate(['/menu']);
        }
      },
      (error) => {
        console.error('Error en el inicio de sesión:', error); // Imprime toda la respuesta de error
        // Error de autenticacion
        if (error.status === 401) {
          this.mensajeError = error.error.mensaje// Muestra el mensaje de error al iniciar sesión en la página
        } else{
          alert('Error en el servidor. Intente más tarde.');
        }
      }
    );
  }
}
