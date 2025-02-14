import { HttpHeaders , HttpClient} from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor(private http:HttpClient) { }

  updatePerson(id:any, direccion:string, tlf:string, sexo:string, edad:string){
    
    const data ={
      id:id,
      direccion:direccion,
      tlf:tlf,
      sexo:sexo,
      edad:edad
      
    }
    const header = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.put<any>('http://localhost:3000/api/Uperson/'+id, data, { headers: header });
  }

  getOneUser(id:number){
    const header = new HttpHeaders()
    .set('Authorization', `Bearer ${localStorage.getItem('token')}`);
    return this.http.get('http://localhost:3000/api/user/'+id, { headers: header });
  }
  
}
