import { User } from "./user.model";

export interface Team{
    teamName : String;
    dateOfCreation : Date;
    users : User;
}