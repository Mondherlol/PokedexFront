import { Component, OnInit } from '@angular/core';
import { MdbModalRef } from 'mdb-angular-ui-kit/modal';
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

  constructor(public modalRef: MdbModalRef<FightModalComponent>, private userService: UserService) {}

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

}
