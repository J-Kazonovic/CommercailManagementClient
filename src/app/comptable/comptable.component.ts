import { Component, OnInit } from '@angular/core';
import { LoginService } from '../controller/service/login.service';
declare var $: any;
@Component({
  selector: 'app-comptable',
  templateUrl: './comptable.component.html',
  styleUrls: ['./comptable.component.css']
})
export class ComptableComponent implements OnInit {

 
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }


 public get username(): string {
   return this.loginService.username;
 }
}
