import { Component, OnInit } from '@angular/core';
import { Ebp } from 'src/app/controller/entity/ebp.model';
import { EbpService } from 'src/app/controller/service/ebp.service';
import { EbService } from 'src/app/controller/service/eb.service';
import { Eb } from 'src/app/controller/entity/eb.model';
import { DeptService } from 'src/app/controller/service/dept.service';
import { Dept } from 'src/app/controller/entity/dept.model';
import { PersonnelService } from 'src/app/controller/service/personnel.service';
import { UtilStatuts } from 'src/app/util/utilstatuts.module';
import { Personnel } from 'src/app/controller/entity/personnel.model';
import { UtilList } from 'src/app/util/utillist.module';
declare var $: any;
@Component({
  selector: 'app-eb-list-chef',
  templateUrl: './eb-list-chef.component.html',
  styleUrls: ['./eb-list-chef.component.css']
})
export class EbListChefComponent implements OnInit {

  isSortedByTitleAsc = false;
  isSortedByDateAsc = false;


  /*Filter/Search Attribute*/
  date: string;
  libelle: string;
  cin: string;

  /*Radios*/
  statuts = [UtilStatuts.Accorder, UtilStatuts.Refuser];

  /**Updated Eb*/
  public ebUpdate: Eb;
  public ebDate: Date;

  /*Eb List*/
  ebList = new Array<Eb>();
  ebpList = new Array<Ebp>();

  constructor(private ebService: EbService
    , private ebpService: EbpService
    , private deptService: DeptService
    , private personnelService: PersonnelService) { }

  ngOnInit() {
    this.onShowAll();
    this.deptService.getAllDept();
    this.personnelService.getAllPersonnel();
  }


  onSortByTitleClick() {
    $("th").css("background-color", "");
    $("#eb-title").css("background-color", "blue");
    if (!this.isSortedByTitleAsc) {
      UtilList.stringSortAsc(this.ebList, "title");
      this.isSortedByTitleAsc = true;
    }else{
      UtilList.stringSortDesc(this.ebList, "title");
      this.isSortedByTitleAsc = false;
    }
  }

  onSortByCreatedDate(){
    $("th").css("background-color", "");
    $("#eb-date").css("background-color", "blue");
    if (!this.isSortedByDateAsc) {
      UtilList.dateSortAsc(this.ebList, "saveDate");
      this.isSortedByDateAsc = true;
    }else{
      UtilList.dateSortDesc(this.ebList, "saveDate");
      this.isSortedByDateAsc = false;
    }

  }

  /**Events */

  onShowAll() {
    this.ebService.getAllEb().subscribe(
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
      data => {
      }, error => {
        console.log("Error:" + error);
      }
    );
  }
  onEbDelete(eb: Eb) {
    this.ebService.deleteEb(eb.id).subscribe(
      data => {
        if (data == 1) {
          UtilList.deleteFromListById(eb.id, this.ebList);
        }
      }, error => {
        console.log("Error:" + error);
      }
    )
  }

  onEbpDelete(ebp: Ebp) {
    this.ebpService.deleteEbp(ebp).subscribe(
      data => {
        if (data == 1) {
          UtilList.deleteFromListById(ebp.id, this.ebpList);
        }
      }, error => {
        console.log("Error:" + error);
      }
    )
  }


  /**Events */

  getEbBySaveDate() {
    return this.ebService.getEbBySaveDate(this.date).subscribe(
      data => {
        this.ebList = data;
      }, error => {
        console.log("Error:" + error);
      }
    );
  }
  getEbByEntite() {
    this.ebService.getEbByEntite(this.libelle).subscribe(
      data => {
        this.ebList = data;
      }, error => {
        console.log("Error:" + error);
      }
    );
  }
  getEbByPersonnel() {
    this.ebService.getEbByPersonnel(this.cin).subscribe(
      data => {
        this.ebList = data;
      }, error => {
        console.log("Error:" + error);
      }
    );
  }


  /** Getter */
  public get eb(): Eb {
    return this.ebService.eb;
  }

  public get deptList(): Array<Dept> {
    return this.deptService.deptList;
  }

  public get personnelList(): Array<Personnel> {

    return this.personnelService.personnelList;
  }


  /** Getter */


  /** Util */

  /** Util */

}
