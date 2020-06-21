import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/controller/service/login.service';
import { Router } from '@angular/router';
import { AuthRequest } from 'src/app/controller/entity/auth-request.model';
import { AuthResponse } from 'src/app/controller/entity/auth-response.model';
import { UtilAuthority } from 'src/app/util/utilauthority.module';
import { UtilFormValidation } from 'src/app/util/utilformvalidation.module';

declare var $: any;


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

  myValidation = new UtilFormValidation();
  username: string;
  password: string;
  message: any
  bad_credentials = false;
  hide_spinner = true;
  response = new AuthResponse();


  constructor(private service: LoginService, private router: Router) { }

  ngOnInit() {
    this.service.userToken = localStorage.getItem("jwt");
  }

  doLogin() {
    this.hide_spinner = false;
    this.getAccessToken();
  }

  usernameValidation() {
    return UtilFormValidation.validate(this.username, this.myValidation.name);
  }
  passwordValidation() {
    return UtilFormValidation.validate(this.password, this.myValidation.password);
  }



  public getAccessToken() {
    this.service.login(this.request).subscribe(
      data => {
        if (data != null) {
          this.response = data;
          var userRoles = [];
          localStorage.setItem("jwt", this.response.jwtKey);
          localStorage.setItem("user_name", this.response.user_name);
          userRoles = this.getUserRoles(this.response.user_roles);
          if (userRoles.includes(UtilAuthority.ROLE_STUF)) {
            this.router.navigate(["/stuf"]);
          } else if (userRoles.includes(UtilAuthority.ROLE_CHEF)) {
            this.router.navigate(["/chef"]);
          } else if (userRoles.includes(UtilAuthority.ROLE_COMPTABLE)) {
            this.router.navigate(["/comptable"]);
          }

        } else {
          this.bad_credentials = true;
          this.hide_spinner = true;
        }
      }
    );


  }



  getUserRoles(user_roles: any[]) {
    var myUserRoles = [];
    user_roles.forEach(item => {
      myUserRoles.push(item["authority"]);
    })

    return myUserRoles;
  }

  public get request(): AuthRequest {
    return this.service.request;
  }

  public get userToken(): string {
    return this.service.userToken;
  }

  public set userToken(value: string) {
    this.service.userToken = value;
  }

}
