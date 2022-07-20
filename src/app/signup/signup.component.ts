import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  user: User = <User>{};
  
 
  constructor(private router: Router,
    private userservice :UserService) { }

  ngOnInit(): void {
  }
  signupUser(user : User) : void{

      console.log(user);
      this.userservice.signupUser(user).subscribe(
        data => {
        console.log(data);
        this.router.navigate(['/loginuser']); 
      });
      
  }
   
  
}
