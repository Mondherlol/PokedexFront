import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
import { PokemonFightService } from 'src/app/pokemon-fight.service';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-fight-modal',
  templateUrl: './fight-modal.component.html',
  styleUrls: ['./fight-modal.component.scss']
})
export class FightModalComponent implements OnInit {
  pokemon : any;

  connecte:Boolean=false;
  currentUser:any;
  charger=false;
  neutral:any[]=[];
  resistant:any[]=[];
  vulnerable:any[]=[];
  twice_resistant:any[]=[];
  twice_vulnerable:any[]=[];


  equipe:any[] =[];

  constructor(public modalRef: MdbModalRef<FightModalComponent>, private userService: UserService, private fightService : PokemonFightService) {}

  ngOnInit(): void {
    this.pokemon.apiResistances.forEach((r: any) => {
      switch (r.damage_relation) {
        case "neutral":
          this.neutral.push(r);
          break;
        case "resistant":
          this.resistant.push(r);
          break;
        case "vulnerable":
          this.vulnerable.push(r);
          break;
        case "twice_resistant":
          this.twice_resistant.push(r);
          break;
        case "twice_vulnerable":
          console.log(r);
          this.twice_vulnerable.push(r);
          break;

        default:
          break;
      }
      
    });
    if(localStorage.getItem('currentUser')==null && localStorage.getItem('currentUser')==undefined){
      this.connecte=false;
    }else {
      this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
      this.connecte=true;
      this.userService.getEquipe(this.currentUser._id).subscribe(e=>{
        this.equipe=e;
        this.charger=true;
      
      })
      // this.equipe=JSON.parse(localStorage.getItem('pokemons') || '{}');
      // console.log(this.equipe[0]);

    }
  }
  fight(){
    let stock:any[]=[];
    let s:string="";
    //Ajouter les types de l'équipe
    this.equipe.forEach(p => {
      s="";
      p.type.forEach((t: { name: string; }) => {
        s=s+","+ this.preventNameError(t.name);
      });
      s=s.substring(1);
      stock.push(s);
    });
    while(stock.length!=6){
      stock.push("x");
    };

    //Ajouter les types du pokémon adversaire
    s="";
    this.pokemon.apiTypes.forEach((t: { name: string; }) => {
      s=s+","+ this.preventNameError(t.name);
    });
    s=s.substring(1);
    stock.push(s);
    
    let poke =   {
      "Poke1":stock[0],
      "Poke2":stock[1],
      "Poke3":stock[2],
      "Poke4":stock[3],
      "Poke5":stock[4],
      "Poke6":stock[5],
      "Adv":stock[6]
  }
  console.log(poke);
  this.fightService.fight(poke).subscribe(
    (res)=>{
      console.log("res");
    }
  )
  }
  preventNameError(t:string){
    t=t.toLowerCase();
    if(t=="électrik")  t="electrik";
    if(t=="fée") t="fee";
    if(t=="ténèbres") t="tenebres";
    return t;
  }
}
