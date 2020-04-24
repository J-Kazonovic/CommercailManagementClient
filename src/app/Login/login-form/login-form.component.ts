import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/controller/service/login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {

 
  message: any
  constructor(private loginService:LoginService
    ,private router:Router) { }

  ngOnInit(): void {
  }

  doLogin() {
    let resp = this.loginService.login(this.username, this.password);
    resp.subscribe(data => {
      console.log(data);
      this.router.navigate(["/stuf-dashboard"]);
    
    });
  }

    /**
     * Getter username
     * @return {string}
     */
    public get username(): string {
      return this.loginService.username;
    }
  
      /**
       * Getter password
       * @return {string}
       */
    public get password(): string {
      return this.loginService.password;
    }
  
      /**
       * Setter username
       * @param {string} value
       */
    public set username(value: string) {
      this.loginService.username = value;
    }
  
      /**
       * Setter password
       * @param {string} value
       */
    public set password(value: string) {
      this.loginService.password = value;
    }
}
