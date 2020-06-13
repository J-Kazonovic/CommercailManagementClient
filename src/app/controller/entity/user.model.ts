import { UserRole } from './user-role.model';

export class User {
    id:number;
    name:string;
    password:string;
    active:boolean;
    roles:Array<UserRole>;
}
