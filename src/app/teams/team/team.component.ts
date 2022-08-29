import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../user-auth.service';
import { User } from '../../user.model';
import { UserService } from '../../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Team } from '../../team.model';
import { TeamService } from '../../team.service';
import { NavbarService } from 'src/app/navbar.service';
import { FormBuilder, FormGroup, FormArray,FormControl,Validators } from '@angular/forms';
import { isNgTemplate } from '@angular/compiler';
import * as e from 'express';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {
  
  form : FormGroup;
  index=0;
  
  //date_of_creation:Date= new Date();
  //team_users: Array<number>=[0,0];
  team : Team =<Team>{};
  teams : Team[]= [];
  users: User[] = [];
  selectedUsers: number[] = [];
  selected = false;
  created :boolean = false;
  show :boolean = false;
  msg = '';
  mode: string = '';
  id_team: number = 0;
  size: number =0;
  id_user: number= 0;
  newusers_id: Set<number> = new Set();
  
  constructor(private userService: UserService,
              private authService:UserAuthService,
              private route: ActivatedRoute,
              private teamService: TeamService,
              private router: Router,
              public nav: NavbarService,
              private fb : FormBuilder ) { 

                this.form = this.fb.group({
                  checkArray: this.fb.array([]),
                })

  }
  ngOnInit(): void {
    
    this.mode = this.route.snapshot.url[0].path;
    if (this.mode==='update') {
      this.id_team = this.route.snapshot.params['id_team'];
      this.id_user = this.route.snapshot.params['id_user'];
      this.fetchTeam();
      this.fetchUsers();
    }
    
    this.fetchTeams();
  }
  private fetchUsers(): void {
		this.userService.fetchUsers()
		  .subscribe(users => {
        this.users = users;
			  console.log(this.users);
		  });
  }
  private fetchTeams(): void {
		this.teamService.fetchTeams()
		  .subscribe(teams => {
        this.teams = teams;
			  console.log(this.teams);
		  });
  }

  public fetchSelectedUsers(id_user: number): any {
    this.userService.fetchUser(id_user)
      .subscribe(user => {
        if(user.isSelected === true){
          this.selected = true;
          this.selectedUsers.push(id_user);
          
        }else{
          this.selected = false;
        }
    });	  
  }
  onCheckboxChange(val : any){
     const checkArray : FormArray = this.form.get('checkArray') as FormArray;
     if(val.target.checked){
      checkArray.push(new FormControl(val.target.value));
      //this.selectedUsers.push(val.target.value);
     }
     else{
      var i=0;
      //this.selectedUsers.forEach((item :any) =>{
      checkArray.controls.forEach((item : any) =>{
        if(item.value == val.target.value){
          checkArray.removeAt(i);
          //this.selectedUsers.splice(i,i+1);
          return;
        }
        i++;
      })
       
     }
  }
  submitForm(){
    console.log(this.form.value);
  }
  /*submitForm(team : Team): void{
    
    console.log(team);
    if (this.mode==='createteam') {
      this.createTeam(team);
    } 
    else if (this.mode==='update') {
      team.team_users=[];
      this.newusers_id.forEach(id_user => team.team_users.push(id_user));
      this.updateTeam(team,this.id_team,this.id_user);
    } 
    else {
      console.warn(`Type not found: ${this.mode}`);
    }
  } */
  public fetchTeam(): void {
		this.teamService.fetchTeam(this.id_team)
		  .subscribe({
        next :(team : any) => {
        this.team=team;
        //this.team.id_team=team.id_team;
        //this.team.teamname=team.teamname;
        //this.team.date_of_creation=team.date_of_creation;
        //this.team.team_users= team.team_users;
        console.log(team);
		  }
    }); 
  } 
  private createTeam(team : Team){
    this.teamService.createTeam(team).subscribe({
      next : (response: any) => {
      
      console.log(response);
      this.created = true;
      this.show = true;
      this.msg="Team created Successfully !!"
      //navigate to List Teams Page when successful
      setTimeout(()=>{
        this.router.navigate(['/listteams']); 
      },1500);
      },
      //display error message if Team is not created"
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
  private updateTeam(team :Team, id_team :  number,id_user : number){

      id_user= this.authService.getUserId();
      //this.idUser= this.authService.setIdUser(id_user);
      //team.team_users = checkArray[];    
      //this.team_users.forEach(id_user => team.team_users.push(id_user));
      
      //console.log("New users added to team " + team.team_users);
      
    this.teamService.updateTeam(team,id_team,id_user)
    .subscribe({
      next : (response: any) => {
      console.log(response);
      this.created = true;
      this.show = true;
      this.msg="User updated Successfully !!"
      //team.team_users=this.fetchSelectedUsers(response.id_user);
     // this.authService.setIdUser(response.id_user);
      //navigate to Login Page when successful
      setTimeout(()=>{
        this.router.navigate(['/loginuser']); 
      },1500);
      
      },
      //display error message if User is not created"
      error: (error: any)=>{
      this.created = false;
      this.show = true;
      console.log("There was an error updating User");
      this.msg=error.message;
      }
    });
    this.show = true;
    setTimeout(() => {
    this.show = false;
    },3000);
  }

  onAddUser(id_user : number){
    this.AddUser(id_user);
  }

  private AddUser(idUser : number): void {
    //this.userService.AddUser(idUser)
    this.selectedUsers.forEach(idUser => this.newusers_id.add(idUser));
    console.log("Selected user" + idUser);
  }
  onDeleteUser(idUser: number): void {
    this.deleteUser(idUser);
  }
  private deleteUser(idUser: number): void {
    this.userService.deleteUser(idUser)
      .subscribe(() => {
        this.fetchUsers();

        this.mode = 'deleted'
        setTimeout(() => {
          this.mode = '';
        }, 5000);
      });	  
  }
}


