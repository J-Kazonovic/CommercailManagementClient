import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from 'src/app/controller/service/alert.service';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.css']
})
export class AlertComponent implements OnInit {



  constructor(private alertService:AlertService) { }

  ngOnInit(): void {
  }

  onCloseClick(){
    this.alertService._visibility=false;
  }


  public get type(): string {
    return this.alertService._type;
  }

  public get message(): string {
    return this.alertService._message;
  }

  public get visibility(): boolean {
    return this.alertService._visibility;
  }


}
