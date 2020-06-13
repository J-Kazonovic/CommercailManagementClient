import { User } from './user.model';
import { Role } from './role.model';

export class UserRole {
    id:number;
    role=new Role();
    user=new User();
}
