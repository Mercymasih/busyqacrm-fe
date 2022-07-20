import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { UserAuthService } from '../user-auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {
  
  user: User = <User>{};
  credentials = {username: '', password: ''};

  constructor(private userService:UserService,private router: Router,
    private http: HttpClient,private userAuth:UserAuthService) { }

  ngOnInit(): void {
  }

   loginUser(user:User): void {
    this.userService.loginUser(user).subscribe(
      (data : any) => {
         this.userAuth.setToken(data.jwtToken);
         console.log("User Logged In");
         this.router.navigate(['/welcome']);
       }
      );
  
  }
  
  
}