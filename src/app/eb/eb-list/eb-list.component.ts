import { Component, OnInit } from '@angular/core';
import { EbService } from 'src/app/controller/service/eb.service';
import { EbpService } from 'src/app/controller/service/ebp.service';
import { Eb } from 'src/app/controller/entity/eb.model';
import { Ebp } from 'src/app/controller/entity/ebp.model';
import { DeptService } from 'src/app/controller/service/dept.service';
import { Dept } from 'src/app/controller/entity/dept.model';
import { PersonnelService } from 'src/app/controller/service/personnel.service';
import { Personnel } from 'src/app/controller/entity/personnel.model';
@Component({
  selector: 'app-eb-list',
  templateUrl: './eb-list.component.html',
  styleUrls: ['./eb-list.component.css']
})
export class EbListComponent implements OnInit {

  valider = "Valider";
  date: string;
  libelle: string;
  cin: string;
  public ebUpdate: Eb;
  public ebDate: Date;

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
    this.ebService.getAllEb();
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
    this.ebUpdate.statut = this.valider;
    this.ebService.updateEb(this.ebUpdate);
  }

  onEbDelete(eb: Eb) {
    this.ebService.deleteEb(eb.id);
  }
  /**Events */

  getEbBySaveDate() {
    return this.ebService.getEbBySaveDate(this.date);
  }
  getEbByEntite() {
    this.ebService.getEbByEntite(this.libelle);
  }
  getEbByPersonnel() {
    this.ebService.getEbByPersonnel(this.cin);
  }

  /** Getter */
  public get eb(): Eb {
    return this.ebService.eb;
  }
  public get ebList(): Array<Eb> {
    return this.ebService.ebList;
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
  /** Getter */


  /** Util */

  /** Util */



}
