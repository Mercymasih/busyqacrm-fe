import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {

  loggedIn :boolean= false;
  
  constructor(private authService:UserAuthService) { }

  ngOnInit(): void {
  
  
  }
 
  //on clicking Logout button ,logout() method is called from authService
  onLogout(){
    this.authService.logout();

  }

  //method to close an alert
  onAlertClosed(){
    this.loggedIn = false;
    
  }

}
