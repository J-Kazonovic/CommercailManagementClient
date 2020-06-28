import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/controller/entity/user.model';
import { Role } from 'src/app/controller/entity/role.model';
import { UtilAuthority } from 'src/app/util/utilauthority.module';
import { UserService } from 'src/app/controller/service/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  @Input() userName:string;

  user = new User();
  public roles = [new Role(UtilAuthority.ROLE_CHEF)
   ,new Role(UtilAuthority.ROLE_COMPTABLE)
   ,new Role(UtilAuthority.ROLE_STUF)];

 constructor(private userService:UserService
   ,private router:Router) { }

 ngOnInit(): void {
   this.getUser();
 }

 logOut(){
   localStorage.clear();
   this.router.navigate(["login"]);
 }



 getUser(){
   this.userService.getUserByName(localStorage.getItem("user_name")).subscribe(
     data=>{
       console.log(data);
       this.user=data;
     },error=>{
       console.log(error);
     }
   )
 }

 onUserUpdate(){
   this.userService.update(this.user).subscribe(
    data=>{
      console.log(data);
    },error=>{
      console.log(error);
    }
  )
 }
}
