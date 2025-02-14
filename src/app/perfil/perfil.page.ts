import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import {PerfilService} from '../service/-perfil.service'
import { addIcons } from 'ionicons';
import { eyeOutline, folderOpenOutline, homeOutline, personOutline } from 'ionicons/icons';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class PerfilPage implements OnInit {
  user: any;
  profile!:any;
  personid:any;
  editDatos:boolean=true;

  constructor(private perfil:PerfilService) { 
    this.personid = localStorage.getItem('id');
    addIcons({ eyeOutline, folderOpenOutline, homeOutline, personOutline  });

  }

  ngOnInit() {

    

    this.user=localStorage.getItem('username');
    this.viewProfile();
    
  }
  editPerfil(){
    this.editDatos = false;
  }

  viewProfile(){
    
    this.perfil.getOneUser(this.personid).subscribe({
      next:(data:any)=>{
        this.profile=data;
        
      },
      error:(error:any)=>{
        
      }
    })

  }

  updatePerson(){
    
    const idp =localStorage.getItem('idp');
    const personData = this.profile.user.person; 
        this.perfil.updatePerson(idp, personData.direccion, personData.tlf,personData.sexo,personData.edad).subscribe({
          next:(data:any)=>{  
  
            this.viewProfile();
            
          },
          error:(error:any)=>{
  
          }
        })
    }
}
