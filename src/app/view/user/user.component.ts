import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/controller/service/user.service';
import { User } from 'src/app/controller/entity/user.model';
import { Role } from 'src/app/controller/entity/role.model';
import { UserRole } from 'src/app/controller/entity/user-role.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  public roles = new Array<Role>();
  public _userRoles = new Array<UserRole>();

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.findAllRoles();
    this.roles=this.userService._roles;
    console.log(this.roles);
  }

  onUserCreated() {
    this.userService.user.roles=this._userRoles;
    console.log(this.user)
    this.userService.save();
  }

  addUserRole(role:Role){
    var userRole=new UserRole();
    userRole.role=role;
    this._userRoles.push(userRole);
  }

  public get user(): User {
    return this.userService.user;
  }
}
