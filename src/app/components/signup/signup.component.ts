import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl| null, form: FormGroupDirective | NgForm | null): boolean {
    const invalidCtrl = !!(control && control.invalid && control?.parent?.touched);
    const invalidParent = !!(control && control.parent && control.parent.invalid && control.parent.touched);
    return (invalidCtrl || invalidParent);
  }
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  signUpFormGroup : FormGroup = new FormGroup({});
  user:any;

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private userService: UserService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.signUpFormGroup = this._formBuilder.group({
      username:[,[Validators.required,Validators.minLength(3)]],
      password:[,[Validators.required,Validators.minLength(3)]],
      confirmPassword:['']
    }, { validator : this.checkPasswords}
    )
  }
  checkPasswords(group: FormGroup) {
    let mdp = group.controls['password'].value;
    let confirmMdp = group.controls['confirmPassword'].value;

    return mdp === confirmMdp ? null : { notSame: true}
  }
  isShortMdp(){
    return this.signUpFormGroup.controls['password'].errors?.["minlength"] && this.signUpFormGroup.controls['password'].dirty;
  }
  isInvalidPseudo(){
    return this.signUpFormGroup.controls['username'].errors?.["required"] && this.signUpFormGroup.controls['username'].touched;
  }
  isShortPseudo(){
    return this.signUpFormGroup.controls['username'].errors?.["minlength"] && this.signUpFormGroup.controls['username'].dirty;
  }
  isInvalidMdp(){
    return this.signUpFormGroup.controls['password'].errors?.["required"] && this.signUpFormGroup.controls['password'].touched;
  }

  

  inscrire(){
    this.user = this.signUpFormGroup.value;
    console.log(this.user);

    this.userService.signup(this.user).subscribe( //on l'enregistre
    (res)=>{              
          if(res){
            if(res.status==0){
              this.openErrorSnackBar(res.error);
            }else {
       //Inscription réussie
       this.openSuccessSnackBar();
       this.router.navigate(["/login"]);
            }
     
          }
          else {
            //erreur serveur
            this.openErrorSnackBar('Erreur serveur');
          }
          },
      (err)=>{
        //erreur de création de compte
        console.log(err);
        this.openErrorSnackBar("Une erreur est survenue");
       
      }
     )
  
}

  openSuccessSnackBar() {
    this._snackBar.open('Compte créé avec succès !', 'OK.', {
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
