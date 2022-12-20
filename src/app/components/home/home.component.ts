import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild} from '@angular/core';
import { MyTeamComponent } from '../my-team/my-team.component';
import { MdbModalRef, MdbModalService } from 'mdb-angular-ui-kit/modal';
import { FightModalComponent } from '../fight-modal/fight-modal.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/user.service';
import { Router } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})


export class HomeComponent implements OnInit {
  connecte:Boolean=false;
  currentUser:any;
  charger=false;
  pokemons:any;
  pokemons2:any;
  search:String="";
  saisie:String="";
  equipe: Array<any>;
  modalRef: MdbModalRef<MyTeamComponent> | null = null;
  modalCombat: MdbModalRef<FightModalComponent> | null = null;
  @ViewChild(SidebarComponent) child:SidebarComponent;

  constructor(
    private http:HttpClient,
    private userService:UserService,
    private router:Router,
    private modalService: MdbModalService,
    private _snackBar: MatSnackBar) { }


  ngOnInit(): void {
    if(localStorage.getItem('currentUser')==null && localStorage.getItem('currentUser')==undefined){
      this.connecte=false;

      this.router.events.subscribe( event=>{
        if( localStorage.getItem('currentUser') != null && localStorage.getItem('currentUser')!= undefined){
          this.connecte=true;
          this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
        }else {
          this.connecte=false;
        }
 
      })
    }else {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      this.connecte=true;
    }
    this.pokemons=[];
    this.getPokemons();
    this.equipe= new Array<any>();

  }
  public getPokemons(){
    this.http.get('https://pokebuildapi.fr/api/v1/pokemon').subscribe((data:any)=>{
      this.pokemons = data;
      console.log(this.pokemons);
      this.pokemons2=this.pokemons;
      this.charger=true;
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
  addPokemon(p:any){
    if(!this.connecte){
      this.openErrorSnackBar("Veuillez vous connectez pour ajouter des pokémons à votre équipe !")
      return;
    }
    let pokemon= {
      "idPokemon":p.id,
      "nom":p.name,
      "image":p.image,
      "type":p.apiTypes
    };
    console.log(pokemon);
    console.log(this.currentUser._id);
    this.userService.addPokemon(pokemon,this.currentUser._id).subscribe(res=>{
      if(res){
        if(res.status==0){
          this.openErrorSnackBar(res.error);
        }else {
          this.openSuccessSnackBar();
          this.child.ngOnInit();
        }
      
      }else {
        this.openErrorSnackBar("Erreur Serveur");
      }
    })


    // this.modalRef = this.modalService.open(MyTeamComponent);

    // console.log(this.equipe.length);
    // if(this.equipe.length<=5){
    //   var existe =  this.equipe.filter(f=> f.id==p.id);
    //   if(existe.length==0){
    //     this.equipe.push(p);
    //     console.log(this.equipe);
    //   }else {
    //     alert("Vous avez déjà ce Pokémon dans votre équipe !");
    //   }
    // }else {
    //   alert("Votre équipe est déjà au complet !");
    // }

  }
  fightPokemon(){
    this.modalCombat = this.modalService.open(FightModalComponent);

  }

  openSuccessSnackBar() {
    this._snackBar.open('Pokémon ajouté avec succès !', 'OK.', {
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
