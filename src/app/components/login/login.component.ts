import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginFormGroup : FormGroup = new FormGroup({});
  user:any;
  erreur:String="";
  constructor(
    private _formBuilder:FormBuilder,
    private _snackBar : MatSnackBar,
    private userService:UserService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.loginFormGroup = this._formBuilder.group({
      username:['',Validators.required],
      password:['',Validators.required]

    })
  }
  connexion(){
    this.user = this.loginFormGroup.value;
    console.log(this.user);
      this.userService.login(this.user).subscribe(
        (res)=>{              
              if(res){
                if(res.status==0){
                  this.errorSnackBar(res.error);
                }else {
           //connexion réussie
           this.openSnackBar();
           console.log(res);
           localStorage.setItem('TOKEN', res.token);
           localStorage.setItem('userId',res.id);
           localStorage.setItem('pokemons',JSON.stringify(res.pokemons));
           localStorage.setItem('currentUser',JSON.stringify(res.user));
           this.router.navigate(['/home']);


                }
     
              }
              else {
                //erreur serveur
                this.errorSnackBar('Erreur serveur');
              }
              },
          (err)=>{
            //erreur de connexion
            this.erreur=err.error.message;
            this.errorSnackBar(this.erreur+"");
          }
         )
  }

  openSnackBar() {
    this._snackBar.open('Connecté', 'OK.', {
      verticalPosition: 'bottom',
      duration: 5000,
      panelClass: ['success-snackbar'],
    });
  }
  errorSnackBar(msg: string) {
    this._snackBar.open(msg, 'Erreur.', {
      verticalPosition: 'bottom',
      duration: 5000,
      panelClass: ['error-snackbar'],
    });
  }

}
