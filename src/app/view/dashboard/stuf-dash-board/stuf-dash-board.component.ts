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

  constructor(private loginService:LoginService
    , private router:Router) { }

  ngOnInit(): void {
    this.router.navigate(['stuf/ebs']);

    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }



}
