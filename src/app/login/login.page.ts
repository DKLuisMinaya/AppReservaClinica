import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonInputPasswordToggle, IonContent, IonHeader, IonTitle, IonToolbar, IonInput, IonLabel, IonButton, LoadingController, AlertController } from '@ionic/angular/standalone';

import {Router, RouterLink} from '@angular/router'
import {LoginService} from '../service/-login.service'

import { AuthService } from '../service/-auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonInputPasswordToggle, IonButton, IonLabel, IonInput, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterLink]
})
export class LoginPage implements OnInit {

  constructor(private authService: AuthService, private router:Router, private loginService:LoginService, private load:LoadingController, private ruta:Router, private alerta:AlertController) { }

  ngOnInit() {
  }
  async login(dni: any, password: any) {
    const loading = await this.load.create({
        message: 'Cargando',
        spinner: 'circles'
    });

    loading.present();

    this.loginService.login(dni.value, password.value).subscribe({
        next: async (dato: any) => {
            loading.dismiss();

            localStorage.setItem('token', dato.token);
            localStorage.setItem('id', dato.dataUser.id);
            localStorage.setItem('idp',dato.dataUser.idperson);
            localStorage.setItem('user', dato.dataUser.user);
            
            const rol = dato.dataUser.rol; 
            if (rol === 3) {
                this.router.navigateByUrl('home-u');
            } else {
                const alert = await this.alerta.create({
                    header: 'Error',
                    message: 'Algo ha ocurrido intentalo de nuevo mas trade',
                    buttons: ['Ok'],
                });
                await alert.present();
            }
        },
        error: async (error: any) => {
            loading.dismiss();
            const alert = await this.alerta.create({
                header: 'Ups!',
                message: error.error.message,
                buttons: ['Ok'],
            });

            await alert.present();
        }
    });
  }

  async loginWithGoogle() {
    try {
      await this.authService.loginWithGoogle();
      this.router.navigateByUrl('home-u'); 
    } catch (error) {
      const alert = await this.alerta.create({
        header: 'Error',
        message: 'Error al iniciar sesión con Google',
        buttons: ['Ok'],
      });
      await alert.present();
    }
  }

  async loginWithFacebook() {
    try {
      await this.authService.loginWithFacebook();
      this.router.navigateByUrl('home-u'); 
    } catch (error) {
      const alert = await this.alerta.create({
        header: 'Error',
        message: 'Error al iniciar sesión con Facebook',
        buttons: ['Ok'],
      });
      await alert.present();
    }
  }

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigateByUrl('/login'); 
    } catch (error) {
      const alert = await this.alerta.create({
        header: 'Error',
        message: 'Error al cerrar sesión',
        buttons: ['Ok'],
      });
      await alert.present();
    }
  }
}
