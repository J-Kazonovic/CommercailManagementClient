import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Eb } from 'src/app/controller/entity/eb.model';
import { Ebp } from 'src/app/controller/entity/ebp.model';
import { EbService } from 'src/app/controller/service/eb.service';
import { UtilStatuts } from 'src/app/util/utilstatuts.module';
import { AlertService } from 'src/app/controller/service/alert.service';

@Component({
  selector: 'app-eb-edit',
  templateUrl: './eb-edit.component.html',
  styleUrls: ['./eb-edit.component.css']
})
export class EbEditComponent implements OnInit {

  private sub: any;
  ref: string;
  ebpList=new Array<Ebp>();
  statuts = [UtilStatuts.EnAttend,UtilStatuts.Accorder, UtilStatuts.Refuser];


  constructor( private ebService:EbService
    ,private alertService:AlertService) { }
  

  ngOnInit(): void {
    
  }

  onEbUpdate(){
    this.ebService.updateEb(this.ebUpdate).subscribe(
      data => {
        if (data == 1) {
          this.alertService.setSuccessAlert("Expression Updated Successfuly .");
        }else{
          this.alertService.setDangerAlert("Expression est Supperimer!");
        }
      }, error => {
        this.alertService.setDangerAlert("Please Try Again!");
      }
    )

  }

  get ebUpdate(): Eb {
    return this.ebService.ebUpdate;
  }
}
