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

import {PerfilService} from '../service/-perfil.service'
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home-u',
  templateUrl: './home-u.page.html',
  styleUrls: ['./home-u.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink, ]
})
export class HomeUPage implements OnInit {
  user: any;
  profilee!:any;
  editDatos:boolean=true;

  profile:any;
  personid:any;
  userId: any;
  

  mostrarCitas: boolean = false;

  isModalOpen = false;

  setOpen(isOpen: boolean) {

    this.isModalOpen = isOpen;
    
  }

  constructor(private toastController: ToastController, private perfil:PerfilService, private cita:HomeService, private authService: AuthService, private router:Router, private alerta:AlertController) {
    
    this.personid = localStorage.getItem('id');

    
    addIcons({ eyeOutline, folderOpenOutline, homeOutline, personOutline  });
   }

  ngOnInit() {
    this.user=localStorage.getItem('username');

    this.cargarCitas();
    this.viewProfile();

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

  editPerfil(){
    this.editDatos = false;
  }

  viewProfile(){
    
    this.perfil.getOneUser(this.personid).subscribe({
      next:(data:any)=>{
        this.profilee=data;
        
      },
      error:(error:any)=>{
        
      }
    })

  }
  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 2000,
      color: color,
    });
    await toast.present();
  }
  updatePerson(){
    
    const idp =localStorage.getItem('idp');
    const personData = this.profilee.user.person; 
        this.perfil.updatePerson(idp, personData.direccion, personData.tlf,personData.sexo,personData.edad).subscribe({
          next:(data:any)=>{  
  
            this.viewProfile();
            this.mostrarToast('Datos Personales Actualizados', 'success');
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
