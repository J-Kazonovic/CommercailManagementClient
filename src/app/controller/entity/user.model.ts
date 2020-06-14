import { UserRole } from './user-role.model';

export class User {
    id:number;
    name:string;
    email:string;
    tel:string;
    password:string;
    active:boolean;
    roles:Array<UserRole>;
}
