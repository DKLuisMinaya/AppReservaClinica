import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { eyeOutline, folderOpenOutline, homeOutline, personOutline } from 'ionicons/icons';
import { AlertController } from '@ionic/angular/standalone';
import {HomeService} from '../service/-home.service'

import { AuthService } from '../service/-auth.service';

@Component({
  selector: 'app-home-u',
  templateUrl: './home-u.page.html',
  styleUrls: ['./home-u.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, ]
})
export class HomeUPage implements OnInit {

  profile:any;
  personid:any;
  userId: any;

  mostrarCitas: boolean = false;

  constructor(private cita:HomeService, private authService: AuthService, private router:Router, private alerta:AlertController) {
    
    this.personid = localStorage.getItem('id');

    addIcons({ eyeOutline, folderOpenOutline, homeOutline, personOutline  });
   }

  ngOnInit() {
    
    this.cargarCitas();

    window.addEventListener('citaReservada', () => {
      this.cargarCitas();
    });
  }

  cargarCitas() {
    this.cita.obtenerCitas(this.personid).subscribe({
      next:(data:any)=>{
        this.profile=data;
        
      },
      error:(error:any)=>{
        
      }
    })
  }

  

  async logout() {
    try {
      await this.authService.logout();
      this.router.navigateByUrl('/login'); // Redirige al login después del logout
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
