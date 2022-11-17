import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { MyTeamComponent } from './components/my-team/my-team.component';

const routes: Routes = [
  { path:'home', component:HomeComponent},
  { path: '',redirectTo:'home',pathMatch:'full'},
  { path:'myTeam',component:MyTeamComponent},
  { path:'**',component:ErrorComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
