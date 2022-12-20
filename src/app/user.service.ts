import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // private baseUrl = "http://localhost:3000/api/";
  private baseUrl = "https://pokemonapi-5mr3.onrender.com/api/";

  constructor(private http: HttpClient) { }

  currentUser : Observable<any> = new Observable<any>;
  userToken :any;
  
  signup(user: any):Observable<any>{
    return this.http.post(`${this.baseUrl}signup`,user);
  }

  login(user:any):Observable<any>{
    return this.http.post(`${this.baseUrl}signin`,user);
  };
  isConnected():boolean{
    return  localStorage.getItem('TOKEN') != null && localStorage.getItem('TOKEN') != undefined;
    }
  getEquipe(idUser:any):Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}equipe/${idUser}`);
  };
  removePokemon(idPokemon:any,idUser:any):Observable<any>{
    return this.http.delete(`${this.baseUrl}pokemon/${idPokemon}/${idUser}`);
  }
  addPokemon(pokemon:any,idUser:any):Observable<any>{
    return this.http.put(`${this.baseUrl}addPokemon/${idUser}`,pokemon);
  };

  

}
