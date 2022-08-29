import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Team } from './team.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class TeamService {


  constructor(private http: HttpClient) { 

  }

  public createTeam(team : Team):Observable<any>{
  return this.http
           .post<Team>(environment.host + '/createteam',team);	  
  }
  fetchTeam(id_team: number){
    return this.http
              .get<Team[]>(environment.host + '/teams/' +id_team);
  }
  fetchTeams(){
  return this.http
            .get<Team[]>(environment.host + '/teams');
  }

  updateTeam(team :Team,id_team: number,id_user: number){
  return this.http
            .put<Team>(environment.host +'/' + id_team +'/users/'+ id_user,
            team);
  }
  deleteTeam(id_team: number){
    return this.http
             .delete(environment.host + '/teams/' + id_team);	  
  }

}
