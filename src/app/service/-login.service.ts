import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClient) { }

  login(dni:string, password:string){
    let datos ={
      "dni":dni,
      "password":password
    }
    return this.http.post('http://localhost:3000/api/login', datos)
    
  } 

  registro(user:string, email:string, dni:string, password:string){
    let dataRegistro ={
      "user": user,
      "email": email,
      "dni": dni,
      "password": password
    }
    return this.http.post('http://localhost:3000/api/register', dataRegistro)
  }
}
