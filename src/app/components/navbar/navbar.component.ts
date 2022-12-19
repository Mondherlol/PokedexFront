import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  connecte:Boolean=false;
  currentUser:any;

  constructor(
    private userService:UserService,
    private router:Router
  ) { }

  ngOnInit(): void {
    if(localStorage.getItem('currentUser')==null && localStorage.getItem('currentUser')==undefined){
      this.connecte=false;

      this.router.events.subscribe( event=>{
        if( localStorage.getItem('currentUser') != null && localStorage.getItem('currentUser')!= undefined){
          this.connecte=true;
          this.currentUser= localStorage.getItem('currentUser');
        }else {
          this.connecte=false;
        }
 
      })
    }else {
      this.currentUser = localStorage.getItem('currentUser');
      this.connecte=true;
    }
  }
  logout(){
    localStorage.clear();
    this.router.navigateByUrl('/login');
    this.ngOnInit();
  }

}
