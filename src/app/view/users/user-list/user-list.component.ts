import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/controller/entity/user.model';
import { UserService } from 'src/app/controller/service/user.service';
import { UtilList } from 'src/app/util/utillist.module';
import { Role } from 'src/app/controller/entity/role.model';
import { UtilAuthority } from 'src/app/util/utilauthority.module';
import { AlertService } from 'src/app/controller/service/alert.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  u = new User();
  userList = new Array<User>();
  userListFiltered = new Array<User>();
  searchKey: string;

  public roles = [new Role(UtilAuthority.ROLE_COMPTABLE)
    ,new Role(UtilAuthority.ROLE_STUF)]


  constructor(private uService: UserService
    ,private alertService:AlertService) { }

  ngOnInit(): void {
    this.getAllUsers();
    this.userListFiltered= this.userList;
  }

  getClickedUser(u: User) {
    this.uService.user = u;
  }

  onUserDelete(u: User) {
    this.uService.delete(u).subscribe(
      data => {
        if (data == 1) {
          UtilList.deleteFromListById(u.id, this.userList);
          this.alertService.setSuccessAlert("User Deleted Successfuly.");
        }else{
          this.alertService.setDangerAlert("Please Try Again!");
        }
      }, error => {
        this.alertService.setDangerAlert("Please Try Again!");
        console.log(error);
      }
    );
  }

  onUserEdit() {
    this.uService.update(this.uService.user).subscribe(
      data => {
        console.log(data);
        if (data == 1) {
          this.alertService.setSuccessAlert("User Update Successfuly.");
        }else{
          this.alertService.setDangerAlert("Please Try Again!");
        }
      }, error => {
        this.alertService.setDangerAlert("Please Try Again!");
        console.log(error);
      }
    )
  }

  onUserSearch() {
    if (this.searchKey.length > 0) {
      this.userListFiltered= this.userList.filter(user => user.name.trim().toLowerCase().indexOf(this.searchKey) > -1);
    } else {
      this.userListFiltered= this.userList;
    }
  }

  getAllUsers() {
    this.uService.getAllUsers().subscribe(
      data => {
        this.userList = data;
        this.userListFiltered=data;
        console.log(this.userListFiltered);
      }, error => {
        console.log(error);
      }
    )
  }

}
