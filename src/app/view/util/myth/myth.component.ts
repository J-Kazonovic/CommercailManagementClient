import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-myth',
  templateUrl: './myth.component.html',
  styleUrls: ['./myth.component.css']
})
export class MythComponent implements OnInit,OnChanges {

  @Input() data:string;
  @Input() classIcon:string;
  @Input() classStyle:string;
  @Input() isIconUp=-1;

  constructor() { }
  ngOnChanges(changes: import("@angular/core").SimpleChanges): void {
    if(this.isIconUp===0){
      this.classIcon="fa fa-sort-alpha-asc"
    }else if(this.isIconUp===1){
      this.classIcon="fa fa-sort-alpha-desc"
    }else{
      this.classIcon="fa fa-sort"
      this.classStyle=""
    }
    
  }

  ngOnInit(): void {
    
  }

  

}
