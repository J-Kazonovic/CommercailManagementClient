import { Component, OnInit } from '@angular/core';
import { Eb } from 'src/app/controller/entity/eb.model';
import { EbService } from 'src/app/controller/service/eb.service';
import { EbpService } from 'src/app/controller/service/ebp.service';
import { Ebp } from 'src/app/controller/entity/ebp.model';
import { UtilList } from 'src/app/util/utillist.module';

@Component({
  selector: 'app-eb-list-stuf',
  templateUrl: './eb-list-stuf.component.html',
  styleUrls: ['./eb-list-stuf.component.css']
})
export class EbListStufComponent implements OnInit {

  public ebUpdate: Eb;
  public ebDate: Date;

  ebList= new Array<Eb>();
  ebpList= new Array<Ebp>();

  constructor(private ebService: EbService
    , private ebpService: EbpService) { }

  ngOnInit() {
    this.onShowPersonnelEb()
  }

  /**Events */
  onShowPersonnelEb() {
    this.ebService.getEbByPersonnel("C1").subscribe(
      data => {
        this.ebList = data;
      }, error => {
        console.log("Error:" + error);
      }
    );
  }
  onEbShow(eb: Eb) {
    this.ebUpdate = eb;
    this.ebpService.getEbpByEb(eb.id).subscribe(
      data => {
        this.ebpList = data;
      }
    );
  }
  onEbpUpdate() {
    this.ebUpdate.ebp = this.ebpList;
    this.ebService.updateEb(this.ebUpdate).subscribe(
      data=>{
        this.onEbShow(this.eb);
      },error=>{
        console.log("Error:"+error);
      }
    );
  }
  onEbDelete(eb: Eb) {
    this.ebService.deleteEb(eb.id).subscribe(
      data=>{
        if(data==1){
          UtilList.deleteFromListById(eb.id,this.ebList);
        }
      },error=>{
        console.log("Error:"+error);
      }
    );
  }
  onEbpDelete(ebp: Ebp) {
    this.ebpService.deleteEbp(ebp).subscribe(
      data=>{
        if(data==1){
          UtilList.deleteFromListById(ebp.id,this.ebpList);
        }
      },error=>{
        console.log("Error:"+error);
      }
    );
  }
  /**Events */


  /** Getter */
  get eb(): Eb {
    return this.ebService.eb;
  }
  /** Getter */


}
