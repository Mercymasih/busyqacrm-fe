import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  selected = false;
  selectedusers : User[]= [];
  team_users :User[]= [];
  
  constructor(private userService :UserService) { }

  ngOnInit(): void {
  }

  public fetchSelectedUsers(id_user: number): any {
    this.userService.fetchUser(id_user)
      .subscribe(user => {
        if(user.isSelected === true){
          this.selected = true;
          this.selectedusers.push(user);
        }else{
          this.selected = false;
        }
    });	  
  }
}
