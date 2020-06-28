import { UserRole } from './user-role.model';
import { Dept } from './dept.model';

export class User {
    id:number;
    name:string;
    password:string;
    email:string;
    email_password:string;
    tel:string;
    dept=new Dept();
    active:boolean;
    roles=new Array<UserRole>();
}
