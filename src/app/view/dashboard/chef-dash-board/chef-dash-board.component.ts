import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/controller/service/login.service';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError, Event } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-chef-dash-board',
  templateUrl: './chef-dash-board.component.html',
  styleUrls: ['./chef-dash-board.component.css']
})
export class ChefDashBoardComponent implements OnInit {
  loading:boolean;

  user_name: string;
  constructor(private loginService: LoginService, private router: Router) {
    router.events.subscribe((event:Event) => this.checkRouterEvent(event))
  }

  ngOnInit(): void {
    if (this.loginService.isAuthenticated()) {
      this.user_name = localStorage.getItem("user_name");
    } else {
      this.router.navigate(['login']);
    }
    $("#menu-toggle").click(function (e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }



  checkRouterEvent(event: Event) {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }

    if (event instanceof NavigationEnd 
      || event instanceof NavigationCancel 
      || event instanceof NavigationError) {
        this.loading=false;

    }
  }



}
