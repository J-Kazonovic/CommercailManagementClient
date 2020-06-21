import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/controller/service/login.service';
import { Router } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-comptable-dash-board',
  templateUrl: './comptable-dash-board.component.html',
  styleUrls: ['./comptable-dash-board.component.css']
})
export class ComptableDashBoardComponent implements OnInit {

  loading:boolean;
  user_name:string;
  constructor(private loginService:LoginService,private router:Router) { }

  ngOnInit(): void {
    if(this.loginService.isAuthenticated()){
      this.user_name=localStorage.getItem("user_name");
    }else{
      this.router.navigate(['login']);
    }
    
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }



 

}
