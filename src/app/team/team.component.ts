import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../user-auth.service';
import { User } from '../user.model';
import { UserService } from '../user.service';
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel} from '@angular/cdk/collections';
import { Team } from '../team.model';
@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  
  users: User[]= [];
  selecteduser: User = <User>{};
  selected = false;
  created :boolean = false;
  show :boolean = false;
  msg = '';
  
  
  constructor(private userService: UserService) { 

  }
  ngOnInit(): void {
    this.fetchUsers();
  }
  private fetchUsers(): void {
		this.userService.fetchUsers()
		  .subscribe(users => {
        this.users = users;
			  console.log(this.users);
		  });
  }

  onAddUser(id_user: number): void {
    this.userService.fetchUser(id_user)
      .subscribe(user => {
        user = user;
        console.log(user);
    });
  }
  public fetchUser(id_user: number): void {
    this.userService.fetchUser(id_user)
      .subscribe(selecteduser => {
        if(selecteduser.isSelected === true){
          this.selected = true;
          this.selecteduser = selecteduser;
        }else{
          this.selected = false;
        }
    });	  
  }
  submitTeam(team : Team): void{
    
    console.log(team);
    //this.selectedusers[]=this.selectedusers;
    this.userService.createTeam(team).subscribe({
      next : (response: any) => {
      console.log(response);
      this.created = true;
      this.show = true;
      this.msg="Team created Successfully !!"
      //navigate to Login Page when successful
      setTimeout(()=>{
       // this.router.navigate(['/loginuser']); 
      },1500);
      
      },
      //display error message if User is not created"
      error: (error: any)=>{
      this.created = false;
      this.show = true;
      console.log("There was an error creating Team");
      this.msg=error.message;
      }
    });
    this.show = true;
    setTimeout(() => {
    this.show = false;
    },3000);
  }
  
}
