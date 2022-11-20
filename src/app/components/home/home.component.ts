import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  pokemons:any;
  pokemons2:any;
  search:String="";
  saisie:String="";
  constructor(
    private http:HttpClient) { }

  ngOnInit(): void {
    this.pokemons=[];
    this.getPokemons();
  }
  public getPokemons(){
    this.http.get('https://pokebuildapi.fr/api/v1/pokemon').subscribe((data:any)=>{
      this.pokemons = data;
      console.log(this.pokemons);
      this.pokemons2=this.pokemons;
    })
  };
  searching(){
    if(this.search!=""){
      this.pokemons=this.pokemons2;
      this.saisie=String(this.search).trim();
      this.pokemons=this.pokemons.filter((e:any)=>{
        let name= e.name.replace(/\s+/g, '').toLowerCase();
        let trimmedSearchValue = this.search.replace(/\s+/g, '');
        return name.includes(trimmedSearchValue.toLowerCase())

      })
    }else {
      this.pokemons=this.pokemons2;
    }
  };

}
