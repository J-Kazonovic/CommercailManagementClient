import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/controller/service/login.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-stuf-dash-board',
  templateUrl: './stuf-dash-board.component.html',
  styleUrls: ['./stuf-dash-board.component.css']
})
export class StufDashBoardComponent implements OnInit {

  loading:boolean;
  user_name:string;


  constructor(private loginService:LoginService
    , private router:Router) { }

  ngOnInit(): void {
    if (this.loginService.isAuthenticated()) {
      this.user_name = localStorage.getItem("user_name");
      this.router.navigate(['stuf/eb']);
    } else {
      this.router.navigate(['login']);
    }    
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }



}
