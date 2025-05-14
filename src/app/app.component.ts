import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-root', // Vincula el componente a una etiqueta HTML <app-root>
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html', // Ruta del archivo HTML asociado
  styleUrls: ['./app.component.css'] // Ruta(s) del archivo CSS asociado
})
export class AppComponent {
  constructor(private router: Router, private authService: AuthService){}

  // Método para verificar si el usuario está autenticado (si el token existe)
  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
  
  irLogin(){
    this.router.navigate(['/login']); // Navega a la ruta '/login'
  }

  miCuenta(){
    this.router.navigate(['/miCuenta']);
  }
}

