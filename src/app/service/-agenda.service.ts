import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AgendaService {

  constructor(private http:HttpClient) { }

  buscar(especialidadId: string) {
    return this.http.get('http://localhost:3000/api/getDocs/'+especialidadId);
  }

  reservarCita(idoc:any, fecha:any, hora:any, id_us:any){
    let data={
      "idoc":idoc,
      "fecha":fecha,
      "hora":hora,
      "id_us":id_us
    }
    return this.http.post('http://localhost:3000/api/reservaC', data);
  }

  
  private apiUrl = 'http://localhost:3000/api/horasDisponibles';
  obtenerHorasDisponibles(fecha: string): Observable<{ horasDisponibles: string[] }> {
    return this.http.get<{ horasDisponibles: string[] }>(`${this.apiUrl}?fecha=${fecha}`);
  }
}
