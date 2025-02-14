import { Component, OnInit, inject, Input   } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { Router, RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { pin, calendar, eyeOutline, folderOpenOutline, homeOutline, personOutline } from 'ionicons/icons';
import{AgendaService} from '../service/-agenda.service'
import { ToastController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.page.html',
  styleUrls: ['./agenda.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, RouterLink]
})
export class AgendaPage implements OnInit {
  especialidadSeleccionada = '';
  doctores: any[] = [];
  @Input() doctor: any;

  fechaSeleccionada: string = '';
  horasDisponibles: string[] = [];
  doctorSeleccionado: any;


  private agendaService = inject(AgendaService);

 
  user:any;
  constructor( private alertCtrl: AlertController,private toastController: ToastController) {
    addIcons({ pin, calendar, eyeOutline, folderOpenOutline, homeOutline, personOutline  });
   }

  ngOnInit() {
    this.user= localStorage.getItem('id')
    if (!this.user) {
      console.error('No se encontró el ID del usuario en localStorage');
    }
  }

  isModalOpen = false;

  setOpen(isOpen: boolean, doctors: any) {
    this.isModalOpen = isOpen;
    if (isOpen && doctors) {
      console.log('datos del doc:', doctors);  
      localStorage.setItem('idoc', doctors.id); 
      console.log('ID del doctor:', doctors);
    }
  }

  buscarDoctores() {
    if (!this.especialidadSeleccionada) {
      return;
    }

    this.agendaService.buscar(this.especialidadSeleccionada).subscribe(
      (response: any) => {
        this.doctores = response;
      },
      (error) => {
        console.error("Error al obtener doctores:", error);
      }
    );
  }

cargarHorasDisponibles() {
  if (!this.fechaSeleccionada) return;
  localStorage.setItem('fechaSeleccionada', this.fechaSeleccionada);
  this.agendaService.obtenerHorasDisponibles(this.fechaSeleccionada).subscribe(
    (response) => {
      this.horasDisponibles = response.horasDisponibles;
    },
    (error) => {
      console.error('Error al obtener horas disponibles', error);
      this.horasDisponibles = [];
    }
  );
}

reservarCita(hora: string) {

  localStorage.setItem('horaSeleccionada', hora);
  console.log("Hora guardada:", hora);
  this.mostrarToast("Hora seleccionada, lista para reservar", "warning");
}


async mostrarToast(mensaje: string, color: string) {
  const toast = await this.toastController.create({
    message: mensaje,
    duration: 2000,
    color: color,
  });
  await toast.present();
}

enviarCitaReservada() {
  const idoc = localStorage.getItem('idoc');
  const fecha = localStorage.getItem('fechaSeleccionada');
  const hora = localStorage.getItem('horaSeleccionada');
  const id_us = localStorage.getItem('id');

  if (!idoc || !fecha || !hora || !id_us) {
    this.mostrarToast("Faltan datos para completar la reserva.", "danger");
    return;
  }
  const idocNum = Number(idoc);
  const id_usNum = Number(id_us);

  if (isNaN(idocNum) || isNaN(id_usNum)) {
    console.error('ID de doctor o usuario inválidos');
    this.mostrarToast('ID de doctor o usuario inválidos', 'danger');
    return;
  }
  this.agendaService.reservarCita(idocNum, fecha, hora, id_usNum).subscribe(
    (response) => {
      console.log('Cita reservada con éxito', response);
      this.mostrarToast('Cita reservada con éxito', 'success');
    
      const event = new CustomEvent('citaReservada');
      window.dispatchEvent(event);

    },
    (error) => {
      console.error('Error al reservar cita', error);
      this.mostrarToast('Error al reservar cita', 'danger');
    }
  );
}


isActionSheetOpen = false;

abrirActionSheet() {
  this.isActionSheetOpen = true;
}


}
