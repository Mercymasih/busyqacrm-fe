import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/auth.guard';
import { ListComponent } from './teams/list/list.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TeamComponent } from './teams/team/team.component';
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
  
  {path:'',component: LoginComponent,pathMatch: 'full'},
  {path:'loginuser',component: LoginComponent,pathMatch: 'full'},
  {path:'admin',component: AdminComponent,pathMatch: 'full'},
  {path:'welcome',component: WelcomeComponent,pathMatch: 'full',canActivate:[AuthGuard]},
  {path:'signupuser',component: SignupComponent,pathMatch: 'full'},
  {path: 'listteams', component: ListComponent },
  {path:'createteam',component:TeamComponent},
  {path:'update/:id_team',component: TeamComponent},
  {path:'/:id_team/users/:id_user',component:TeamComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
