import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/controller/entity/user.model';
import { UserService } from 'src/app/controller/service/user.service';
import { UtilList } from 'src/app/util/utillist.module';

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


  constructor(private uService: UserService) { }

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
        }
      }, error => {
        console.log(error);
      }
    );
  }

  onUserEdit() {
    this.uService.update(this.uService.user).subscribe(
      data => {
        console.log(data);
        if (data == 1) {

        }
      }, error => {
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
