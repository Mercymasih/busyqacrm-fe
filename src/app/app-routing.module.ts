import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  
  {path:'',component: LoginComponent,pathMatch: 'full'},
  {path:'loginuser',component: LoginComponent,pathMatch: 'full'},
  {path:'welcome',component: WelcomeComponent,pathMatch: 'full',canActivate:[AuthGuard]},
  {path:'signupuser',component: SignupComponent,pathMatch: 'full'}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
