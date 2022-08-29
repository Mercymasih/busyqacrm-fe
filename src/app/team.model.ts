import { User } from "./user.model";

export interface Team {
    id_team: number;
    teamname : String;
    date_of_creation : Date;
    team_users : Array<number>;
    
}

