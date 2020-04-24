import { Component, OnInit } from '@angular/core';
import { LoginService } from '../controller/service/login.service';
declare var $: any;

@Component({
  selector: 'app-stuf-dash-board',
  templateUrl: './stuf-dash-board.component.html',
  styleUrls: ['./stuf-dash-board.component.css']
})
export class StufDashBoardComponent implements OnInit {

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
