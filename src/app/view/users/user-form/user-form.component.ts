import { Component, OnInit, Input } from '@angular/core';
import { UtilAuthority } from 'src/app/util/utilauthority.module';
import { UserRole } from 'src/app/controller/entity/user-role.model';
import { UserService } from 'src/app/controller/service/user.service';
import { Role } from 'src/app/controller/entity/role.model';
import { User } from 'src/app/controller/entity/user.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  
  @Input() isForUpdate=false;

  role:string;
  active:boolean;

  public roles = [UtilAuthority.ROLE_COMPTABLE
    ,UtilAuthority.ROLE_STUF]
  public _userRoles = new Array<UserRole>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
  }

  onUserCreated() {
    this.userService.user.roles=this._userRoles;
    this.userService.save();
  }

  addUserRole(){
    console.log(this.role)
    var role=new Role();
    role.libelle=this.role;
    var userRole=new UserRole();
    userRole.role=role;
    this._userRoles.push(userRole);
  }

  public get user(): User {
    return this.userService.user;
  }

}
