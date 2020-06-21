import { Component, OnInit } from '@angular/core';
import { Eb } from 'src/app/controller/entity/eb.model';
import { EbService } from 'src/app/controller/service/eb.service';
import {formatDate} from '@angular/common';
import { UtilStatuts } from 'src/app/util/utilstatuts.module';
import { UtilValidation } from 'src/app/util/utilvalidation.module';
import { Ebp } from 'src/app/controller/entity/ebp.model';
import { Router } from '@angular/router';
import { UtilList } from 'src/app/util/utillist.module';
import { AlertService } from 'src/app/controller/service/alert.service';
@Component({
  selector: 'app-eb-create',
  templateUrl: './eb-create.component.html',
  styleUrls: ['./eb-create.component.css']
})
export class EbCreateComponent implements OnInit {

  title ="";
  isSortedByDateAsc = -1;
  ebList = new Array<Eb>();
  ebListFiltered = new Array<Eb>();

  constructor(private ebService:EbService
    , private router:Router
    ,private alertService:AlertService) { }

  ngOnInit(): void {
    this.getEbByPersonnelName(localStorage.getItem("user_name"));
  }
  /**Events */
  onSaveEb() {
    this.ebService.eb.personnel.name=localStorage.getItem("user_name");
    this.eb.ebp = this.ebpListCurrent;
    this.ebService.saveEb(this.ebService.eb).subscribe(
      data => {
        if (data == 1) {
          this.getEbByPersonnelName(localStorage.getItem("user_name"));
          this.alertService.setSuccessAlert("Expression Saved Successfuly .");
        }else{
          this.alertService.setDangerAlert("Expression Already Exist!");
        }
      }, error => {
        this.alertService.setDangerAlert("Please Try Again!");
      }
    );
    
  }

  setEbPdate(eb:Eb){
     this.ebService.ebUpdate=eb;
  }

  onShowEbsClick(){
    this.router.navigate(['stuf/ebs']);
  }
  
  onFilterAction() {
    this.ebListFiltered = this.ebList;
    this.ebListFiltered=this.ebService.searchByTitle(this.ebListFiltered,this.title);
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



  /**Getter */
  get eb(): Eb {
    return this.ebService.eb;
  }

  get ebUpdate(): Eb {
    return this.ebService.ebUpdate;
  }

  public get ebpListCurrent(): Array<Ebp> {
    return this.ebService.ebpListCurrent;
  }
  /**Getter */

  /**Util */
  public ebValidation(title:string): boolean {
    return UtilValidation.ebValidation(title);
  }
  /**Util */
}
