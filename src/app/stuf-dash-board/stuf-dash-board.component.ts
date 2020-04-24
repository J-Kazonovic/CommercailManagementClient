import { Component, OnInit } from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-stuf-dash-board',
  templateUrl: './stuf-dash-board.component.html',
  styleUrls: ['./stuf-dash-board.component.css']
})
export class StufDashBoardComponent implements OnInit {

  constructor() { }


  ngOnInit(): void {
    $("#menu-toggle").click(function(e) {
      e.preventDefault();
      $("#wrapper").toggleClass("toggled");
    });
  }

}
