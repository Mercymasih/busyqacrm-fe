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
  

  constructor(private userService:UserService,private router: Router,
    private http: HttpClient,private authService:UserAuthService) { }

  ngOnInit(): void {
  }

   loginUser(user:User): void {
    //generate token 
    this.authService.generateToken(user).subscribe(
      (response : any) => {
         console.log("User Logged In");
         console.log(response);

         //login-save token in local storage
         this.authService.setToken(response.token);

         //get current User- save user in local storage
         this.authService.getCurrentUser().subscribe(
          (user: any) =>{
            this.authService.setUser(user)
            console.log(user);
            this.router.navigate(['/welcome']);
          });
         
       }
      );
  
  }
  
  
}