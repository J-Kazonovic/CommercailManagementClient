import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/controller/service/user.service';
import { User } from 'src/app/controller/entity/user.model';
import { Role } from 'src/app/controller/entity/role.model';
import { UserRole } from 'src/app/controller/entity/user-role.model';
import { UtilAuthority } from 'src/app/util/utilauthority.module';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  role:string;
  active:boolean;

  public roles = [UtilAuthority.ROLE_COMPTABLE
    ,UtilAuthority.ROLE_STUF]
  public _userRoles = new Array<UserRole>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.findAllRoles();
  }

  onUserCreated() {
    this.userService.user.roles=this._userRoles;
    this.userService.user.active=this.active;
    console.log(this.user)
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
