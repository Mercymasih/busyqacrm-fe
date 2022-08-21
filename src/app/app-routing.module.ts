import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { AuthGuard } from './auth/auth.guard';
import { ListComponent } from './list/list.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { TeamComponent } from './team/team.component';
import { WelcomeComponent } from './welcome/welcome.component';


const routes: Routes = [
  
  {path:'',component: SignupComponent,pathMatch: 'full'},
  {path:'loginuser',component: LoginComponent,pathMatch: 'full'},
  {path:'admin',component: AdminComponent,pathMatch: 'full'},
  {path:'welcome',component: WelcomeComponent,pathMatch: 'full',canActivate:[AuthGuard]},
  {path:'signupuser',component: SignupComponent,pathMatch: 'full'},
  {path: 'list', component: ListComponent },
  {path:'createteam',component:TeamComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
