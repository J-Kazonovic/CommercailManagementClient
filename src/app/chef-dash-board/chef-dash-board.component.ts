import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-chef-dash-board',
  templateUrl: './chef-dash-board.component.html',
  styleUrls: ['./chef-dash-board.component.css']
})
export class ChefDashBoardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }

}
