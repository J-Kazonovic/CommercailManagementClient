import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/controller/service/login.service';
declare var $: any;

@Component({
  selector: 'app-chef-dash-board',
  templateUrl: './chef-dash-board.component.html',
  styleUrls: ['./chef-dash-board.component.css']
})
export class ChefDashBoardComponent implements OnInit {

  user_name:string;
  constructor(private loginService:LoginService) { }

  ngOnInit(): void {
    this.user_name=sessionStorage.getItem("user_name");
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }




}
