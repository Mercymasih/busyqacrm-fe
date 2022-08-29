import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavbarService } from 'src/app/navbar.service';
import { Team } from '../../team.model';
import { TeamService } from '../../team.service';
import { User } from '../../user.model';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  index :number = 0;
  id_user:number =0;
  id_team:number =0;
  
  teams : Team[] =[];
  mode: string = '';
  users: User[] = [];
  selected = false;
  selectedusers: User[] = [];
  team_users: User[]= [];
  constructor(private teamService : TeamService,
              private route: ActivatedRoute,
              private userService : UserService,
              ) { }
  
  ngOnInit(): void {
    this.fetchTeams();
    this.mode = this.route.snapshot.params['mode'];
    
    setTimeout(() => {
      this.mode = '';
    }, 5000);
  }

  onDeleteUser(idUser: number): void {
    this.deleteUser(idUser);
  }
  private fetchTeams(): void {
		  this.teamService.fetchTeams()
		  .subscribe(teams => {
        this.teams = teams;
			  console.log(this.teams);
		  });
  }
  private fetchUsers(): void {
		this.userService.fetchUsers()
		  .subscribe(users => {
        this.users = users;
			  console.log(this.users);
		  });
  }
  private deleteUser(idUser: number): void {
    this.userService.deleteUser(idUser)
      .subscribe(() => {
        this.fetchUsers();

        //this.mode = 'deleted'
        setTimeout(() => {
          this.mode = '';
        }, 5000);
      });	  
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
  onDeleteTeam(id_team: number): void {
    this.deleteTeam(id_team);
  }
  private deleteTeam(id_team: number): void {
    this.teamService.deleteTeam(id_team)
      .subscribe(() => {
        this.fetchTeams();

        this.mode = 'deleted'
        setTimeout(() => {
          this.mode = '';
        }, 5000);
      });	  
  }
}
