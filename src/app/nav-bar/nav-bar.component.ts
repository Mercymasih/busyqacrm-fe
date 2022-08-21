import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../navbar.service';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  

  constructor(public nav: NavbarService,
              private authService:UserAuthService) { }

  ngOnInit(): void {
  }
//on clicking Logout button ,logout() method is called from authService
onLogout(){
  this.authService.logout();

}
}
