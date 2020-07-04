import { Component, OnInit } from '@angular/core';
import { Eb } from 'src/app/controller/entity/eb.model';
import { EbService } from 'src/app/controller/service/eb.service';
import { EbpService } from 'src/app/controller/service/ebp.service';
import { Ebp } from 'src/app/controller/entity/ebp.model';
import { UtilList } from 'src/app/util/utillist.module';
import { UtilStatuts } from 'src/app/util/utilstatuts.module';
import { DeptService } from 'src/app/controller/service/dept.service';
import { Dept } from 'src/app/controller/entity/dept.model';
import { Personnel } from 'src/app/controller/entity/personnel.model';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/controller/service/user.service';
import { User } from 'src/app/controller/entity/user.model';

@Component({
  selector: 'app-eb-list-stuf',
  templateUrl: './eb-list-stuf.component.html',
  styleUrls: ['./eb-list-stuf.component.css']
})
export class EbListStufComponent implements OnInit {

  isSortedByAsc = -1;
  isSortedByDateAsc = -1;

  sortAsc=true;
  sortBy:number;


  /*Filter/Search Attribute*/
  title ="";
  date="";
  dept="";
  personnel="";

  /*Radios*/
  statuts = [UtilStatuts.Accorder, UtilStatuts.Refuser];

  /**Updated Eb*/
  //public ebUpdate: Eb;
  public ebDate: Date;

  /*Eb List*/
  ebList = new Array<Eb>();
  ebListFiltered = new Array<Eb>();
  ebpList = new Array<Ebp>();

  /**List De Personnel & Dept*/
  personnels=new Array<User>();

  constructor(private ebService: EbService
    , private ebpService: EbpService
    , private deptService: DeptService
    , private uService: UserService
    , private router:Router) { }

  ngOnInit() {
    this.getEbByPersonnelName(localStorage.getItem("user_name"));
    this.deptService.getAllDept();
  }


 

  onNewEbClick(){
    this.router.navigate(['stuf/eb']);
  }

  onFilterAction() {
    this.ebListFiltered = this.ebList;
    this.ebListFiltered=this.ebService.searchByTitle(this.ebListFiltered,this.title);
    this.ebListFiltered = this.ebService.filterByDept(this.ebListFiltered, this.dept);
    this.ebListFiltered = this.ebService.filterByPersonnel(this.ebListFiltered, this.personnel);
    this.ebListFiltered = this.ebService.filterByDate(this.ebListFiltered, this.date);
  }

  onSortAction(){
    if(this.sortBy==1){
      this.sortByString("title")
    }else if(this.sortBy==0){
      this.sortByCreatedDate()
    }
  }

  sortByString(caseSort:string) {
    if (this.isSortedByAsc==1) {
      UtilList.stringSort(this.ebListFiltered, caseSort,0);
      this.isSortedByAsc = 0;
    } else {
      UtilList.stringSort(this.ebListFiltered, caseSort,1);
      this.isSortedByAsc = 1;
    }
  }

  sortByCreatedDate(){
    if (this.isSortedByDateAsc==1) {
      UtilList.dateSort(this.ebListFiltered, "saveDate",0);
      this.isSortedByDateAsc= 0;
    } else {
      UtilList.dateSort(this.ebListFiltered, "saveDate",1);
      this.isSortedByDateAsc = 1;
    }
  }


  /**Events */
  setEbPdate(eb:Eb){
    this.ebService.ebUpdate=eb;
 }

  onEbShow(eb: Eb) {
    //this.ebUpdate = eb;
    this.ebpService.getEbpByEb(eb.id).subscribe(
      data => {
        this.ebpList = data;
      },error=>{
        console.log(error);
      }
    );
  }

  onEbpUpdate() {
    this.ebUpdate.ebp = this.ebpList;
    this.ebService.updateEb(this.ebUpdate).subscribe(
      data => {
      }, error => {
        console.log(error);
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
        console.log(error);
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
        console.log(error);
      }
    )
  }



  getEbByPersonnelName(name:string){
    this.ebService.getEbByPersonnel(name).subscribe(
      data=>{
        this.ebList = data;
        this.ebListFiltered = data;

      },error=>{
        console.log(error);
      }
    )
  }


  /** Getter */
  public get ebUpdate(): Eb {
    return this.ebService.ebUpdate;
  }
  public get eb(): Eb {
    return this.ebService.eb;
  }

  public get deptList(): Array<Dept> {
    return this.deptService.deptList;
  }
  /** Getter */


}
