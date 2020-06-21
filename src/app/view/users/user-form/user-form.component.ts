import { Component, OnInit, Input } from '@angular/core';
import { UtilAuthority } from 'src/app/util/utilauthority.module';
import { UserRole } from 'src/app/controller/entity/user-role.model';
import { UserService } from 'src/app/controller/service/user.service';
import { Role } from 'src/app/controller/entity/role.model';
import { User } from 'src/app/controller/entity/user.model';
import { DeptService } from 'src/app/controller/service/dept.service';
import { Dept } from 'src/app/controller/entity/dept.model';
import { Router, NavigationEnd } from '@angular/router';
import { AlertService } from 'src/app/controller/service/alert.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {

  
  @Input() isForUpdate=false;

  index:number;
  active:boolean;

  public roles = [new Role(UtilAuthority.ROLE_COMPTABLE)
    ,new Role(UtilAuthority.ROLE_STUF)]
  public _userRoles = new Array<UserRole>();

  constructor(private userService: UserService
    ,private deptService:DeptService
    ,private router:Router
    ,private alertService:AlertService) { 
     
    }

  ngOnInit(): void {
    this.deptService.getAllDept();
  }


  onUserCreated() {
    this.addUserRole();
    this.userService.user.roles=this._userRoles;
    this.userService.save().subscribe(
      data=>{
        if(data==1){
           this.userService.user = null;
           this._userRoles = null;
           this.index=null;
           this.alertService.setSuccessAlert("User Saved Successfuly .")
           this.router.navigate(['chef/users']);
        }else{
          this.alertService.setDangerAlert("UserName Already Exist!");
        }
      },error=>{
        this.alertService.setDangerAlert("Please Try Again!");
        console.log(error);
      }
    )

  }

  addUserRole(){
    var userRole=new UserRole();
    userRole.role=this.roles[this.index];
    this._userRoles.push(userRole);
  }

  public get user(): User {
    return this.userService.user;
  }
  public get deptList(): Array<Dept> {
		return this.deptService.deptList;
	}

}
