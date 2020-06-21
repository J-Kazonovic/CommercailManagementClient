import { UserRole } from './user-role.model';
import { Dept } from './dept.model';

export class User {
    id:number;
    name:string;
    email:string;
    tel:string;
    password:string;
    dept=new Dept();
    active:boolean;
    roles:Array<UserRole>;
}
