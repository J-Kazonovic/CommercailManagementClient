import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/controller/service/login.service';
declare var $: any;

@Component({
  selector: 'app-comptable-dash-board',
  templateUrl: './comptable-dash-board.component.html',
  styleUrls: ['./comptable-dash-board.component.css']
})
export class ComptableDashBoardComponent implements OnInit {

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
