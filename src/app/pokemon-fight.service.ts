import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonFightService {


  private baseUrl = "http://localhost:4000/fight";


  constructor(private http: HttpClient) { }
  
  fight(pokemons: any):Observable<any>{
    return this.http.post(`${this.baseUrl}`,pokemons);
  }
  
}
