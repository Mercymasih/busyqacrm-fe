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
  loggedIn :boolean= false;
  msg='';
  show :boolean = false;
  isAdmin :boolean = false;

  constructor(private userService:UserService,private router: Router,
    private http: HttpClient,private authService:UserAuthService) { }

  ngOnInit(): void {
  }
      
  
   loginUser(user:User): void {

    //generate token 
    this.authService.generateToken(user).subscribe({
      next: (response : any) => {
         console.log("User Logged In");
         console.log(response);
         
         this.show= true;
          this.msg="Login Successful !!"
         //login-save token in local storage
         this.authService.setToken(response.token);
         this.authService.setRole(response.role);
         
         //get current User
         this.authService.getCurrentUser().subscribe({
          next :(user: any) =>{
            
            this.authService.setUser(user);//save user in local storage
            
            console.log(user);
            this.loggedIn= true;
            //console.log(response);
              
              if(user.role === 'Admin'){
                
                setTimeout(()=>{
                  this.router.navigate(['/admin']);//navigate to Admin Page if user is Admin
                },1500);
              }else if(response.role === 'Simple_User' || 'Manager')
              {
               
                //naviage to Welcome Page when login successful
                setTimeout(()=>{
                this.router.navigate(['/welcome']);
                },1500);
              }
              
            
          },error: (error: any)=>{
            this.loggedIn= false;
            this.show= true;
            this.msg=error.message;
          }
        });
          
         
      },error: (error: any)=>{
          this.loggedIn= false;
          this.show= true;
          this.msg=error.message;
      }
    });
      this.show = true;
      setTimeout(() => {
      this.show = false;
      },3000);
      
   }
   onAlertClosed(){
    this.loggedIn = false;
    
  }
}

function role(role: any) {
  throw new Error('Function not implemented.');
}
