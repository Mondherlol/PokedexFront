import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  connecte:Boolean=false;
  currentUser:any;
  pokemons:any[]=[
    {"nom":"Pikachu","idPokemon":0},
    {"nom":"Héricendre","idPokemon":1}
  ]
  equipe:any[] =[];

  constructor(
    private userService: UserService,
    private router:Router,
    private _snackBar: MatSnackBar,


  ) { }

  ngOnInit(): void {

    if(localStorage.getItem('currentUser')==null && localStorage.getItem('currentUser')==undefined){
      this.connecte=false;
    }else {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      this.connecte=true;
      this.userService.getEquipe(this.currentUser._id).subscribe(e=>{
        this.equipe=e;
      })
      // this.equipe=JSON.parse(localStorage.getItem('pokemons') || '{}');
      // console.log(this.equipe[0]);

    }
  }
  removePokemon(idPokemon:any){
    console.log(idPokemon);
    this.userService.removePokemon(idPokemon,this.currentUser._id).subscribe(res=>{
      if(res){
        console.log(res);
        if(res.status==1){
          this.openSuccessSnackBar();
          this.ngOnInit();
        }else{
          this.openErrorSnackBar(res.error);
        }
      }else{
        this.openErrorSnackBar("Erreur Reseau");
      }
    })
  }

  openSuccessSnackBar() {
    this._snackBar.open('Pokémon effacé avec succès !', 'OK.', {
      verticalPosition: 'top',
      duration: 5000,
      panelClass: 'notif-success',
    });
  }
  openErrorSnackBar(msg: string) {
    this._snackBar.open(msg, 'Erreur.', {
      verticalPosition: 'bottom',
      duration: 5000,
      panelClass:  ['error-snackbar'],
    });
  }

}
