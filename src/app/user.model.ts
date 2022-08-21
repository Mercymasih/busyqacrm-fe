export interface User {
    id_user : number;
    first_name: string;
    last_name: string;
    username: string;
    password: string;
    phone: string;
    email: string;
    role: string;
    isSelected?: boolean;
}