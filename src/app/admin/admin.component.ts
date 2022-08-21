import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../navbar.service';
import { UserAuthService } from '../user-auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private nav : NavbarService,
              private authService:UserAuthService,
              ) { }

  ngOnInit(): void {
    this.nav.show();

  }

  //on clicking Logout button ,logout() method is called from authService
  onLogout(){
    this.authService.logout();

  }
}
