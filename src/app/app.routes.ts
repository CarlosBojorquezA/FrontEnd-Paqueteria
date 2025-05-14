import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';
import { AppComponent } from './app.component';
import { MenuPrincipalComponent } from './menu-principal/menu-principal.component';
import { RecuperacionComponent } from './recuperacion/recuperacion.component';
import { CotizarComponent } from './cotizar/cotizar.component';
import { RastreoComponent } from './rastreo/rastreo.component';
import { PreguntasComponent } from './preguntas/preguntas.component';
import { CuentaComponent } from './cuenta/cuenta.component';


export const routes: Routes = [
    {path: '', component: MenuPrincipalComponent}, // Ruta predeterminada para la pantalla de menu principal
    {path: 'menu', component: MenuPrincipalComponent}, // Ruta para la pantalla de menu principal
    {path: 'login', component: LoginComponent}, // Ruta para la pantalla de login
    {path: 'registro', component: RegistroComponent}, // Ruta para la pantalla de registrarse
    {path: 'miCuenta', component: CuentaComponent}, // Ruta para editar la cuenta
    {path: 'recuperacion', component: RecuperacionComponent}, // Ruta para la pantalla de recuperar contraseña
    {path: 'CotizarEnvio',component: CotizarComponent}, // Ruta para la pantalla de cotizar envios
    {path: 'rastreo', component: RastreoComponent}, // Ruta para rastrear un paquete
    {path: 'preguntas', component: PreguntasComponent} // Ruta para las preguntas frecuentes
];
