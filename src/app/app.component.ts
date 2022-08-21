import { Component } from '@angular/core';
import { UserService } from './user.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserAuthService } from './user-auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'busyqacrm-fe';

  constructor(
              private app: UserService,
              private http: HttpClient, 
              private router: Router,
              private authService:UserAuthService) {
      
   }
   //on clicking Logout button ,logout() method is called from authService
  onLogout(){
    this.authService.logout();

  }
  
}


