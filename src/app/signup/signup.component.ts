import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';
import { error } from '@angular/compiler/src/util';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  user: User = <User>{};
  created :boolean = false;
  show :boolean = false;
  msg = '';
  
  constructor(private router: Router,
    private userservice :UserService) { }

  ngOnInit(): void {
  }
  signupUser(user : User) : void{
    
      console.log(user);
      this.userservice.createUser(user).subscribe({
        next : (response: any) => {
        console.log(response);
        this.created = true;
        this.show = true;
        this.msg="User created Successfully !!"
        //navigate to Login Page when successful
        setTimeout(()=>{
          this.router.navigate(['/loginuser']); 
        },1500);
        
        },
        //display error message if User is not created"
        error: (error: any)=>{
        this.created = false;
        this.show = true;
        console.log("There was an error creating User");
        this.msg=error.message;
        }
      });
      this.show = true;
      setTimeout(() => {
      this.show = false;
      },3000);
  }
   
}

