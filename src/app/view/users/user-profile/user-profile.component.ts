import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/controller/entity/user.model';
import { UserService } from 'src/app/controller/service/user.service';
import { Role } from 'src/app/controller/entity/role.model';
import { UtilAuthority } from 'src/app/util/utilauthority.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  @Input() userName:string;

  user :User;
   public roles = [new Role(UtilAuthority.ROLE_CHEF)
    ,new Role(UtilAuthority.ROLE_COMPTABLE)
    ,new Role(UtilAuthority.ROLE_STUF)];

  constructor(private userService:UserService
    ,private router:Router) { }

  ngOnInit(): void {
    this.user = new User();
    this.getUser();
  }

  logOut(){
    localStorage.clear();
    this.router.navigate(["login"]);
  }



  getUser(){
    this.userService.getUserByName(this.userName).subscribe(
      data=>{
        console.log(data);
        this.user=data;
      },error=>{
        console.log(error);
      }
    )
  }
}
