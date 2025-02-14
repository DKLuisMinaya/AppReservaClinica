import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {IonInputPasswordToggle, IonContent, IonHeader, IonTitle, IonToolbar, IonLabel, IonButton, IonInput, AlertController, LoadingController } from '@ionic/angular/standalone';

import {LoginService} from '../service/-login.service'
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: true,
  imports: [IonInputPasswordToggle, IonInput, IonButton, IonLabel, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class RegistroPage implements OnInit {

  constructor(private ruta:Router, private alerta:AlertController, private load:LoadingController, private loginService:LoginService) { }

  ngOnInit() {
  }

  async registro(user:any, email:any, dni:any, password:any){
    const loading = await this.load.create({
      message: 'Cargando',
      spinner: 'circles'
    });

    loading.present();
    this.loginService.registro(user.value,email.value, dni.value, password.value ).subscribe({
      next: async (dato:any) =>{
        loading.dismiss();
        this.ruta.navigateByUrl('login')
        
      },

       error: async (error:any) => {
        loading.dismiss();
        const alert = await this.alerta.create({
          header: 'Ups!',
          message: error.error.message,
          buttons: ['Action'],
        });
    
        await alert.present();

      }
    })
  }
}
