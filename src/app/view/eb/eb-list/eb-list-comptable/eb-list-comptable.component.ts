import { Component, OnInit } from '@angular/core';
import { EbService } from 'src/app/controller/service/eb.service';
import { EbpService } from 'src/app/controller/service/ebp.service';
import { Eb } from 'src/app/controller/entity/eb.model';
import { Ebp } from 'src/app/controller/entity/ebp.model';
import { DeptService } from 'src/app/controller/service/dept.service';
import { Dept } from 'src/app/controller/entity/dept.model';
import { PersonnelService } from 'src/app/controller/service/personnel.service';
import { Personnel } from 'src/app/controller/entity/personnel.model';
import { UtilList } from 'src/app/util/utillist.module';
@Component({
  selector: 'app-eb-list-comptable',
  templateUrl: './eb-list-comptable.component.html',
  styleUrls: ['./eb-list-comptable.component.css']
})
export class EbListComptableComponent implements OnInit {

  date: string;
  libelle: string;
  cin: string;

  public ebUpdate: Eb;
  public ebDate: Date;

  /*Eb List*/
  public ebList:Array<Eb>;

  constructor(private ebService: EbService
    , private ebpService: EbpService
    , private deptService: DeptService
    , private personnelService: PersonnelService) { }

  ngOnInit() {
    this.onShowAll();
    this.deptService.getAllDept();
    this.personnelService.getAllPersonnel();
  }

  /**Events */

  onShowAll() {
    this.ebService.getAllEb().subscribe(
      data=>{
        this.ebList=data;
      },error=>{
        console.log("Error:"+error);
      }
    );
  }
  onEbShow(eb: Eb) {
    this.ebUpdate = eb;
    this.ebpService.getEbpByEb(eb.id).subscribe(
      data => {
        this.ebpService.ebpList = data;
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
    )
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
    )
  }
  getEbBySaveDate() {
    return this.ebService.getEbBySaveDate(this.date).subscribe(
      data=>{
        this.ebList=data;
      },error=>{
        console.log("Error:"+error);
      }
    );
  }
  getEbByEntite() {
    this.ebService.getEbByEntite(this.libelle).subscribe(
      data=>{
        this.ebList=data;
      },error=>{
        console.log("Error:"+error);
      }
    );
  }
  getEbByPersonnel() {
    this.ebService.getEbByPersonnel(this.cin).subscribe(
      data=>{
        this.ebList=data;
      },error=>{
        console.log("Error:"+error);
      }
    );
  }

  /** Getter */
  public get eb(): Eb {
    return this.ebService.eb;
  }
  
  public get ebpList(): Array<Ebp> {
    return this.ebpService.ebpList;
  }

  public get deptList(): Array<Dept> {
    return this.deptService.deptList;
  }

  public get personnelList(): Array<Personnel> {
    return this.personnelService.personnelList;
  }

}
