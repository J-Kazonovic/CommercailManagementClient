import { Component, OnInit } from '@angular/core';
import { EbService } from 'src/app/controller/service/eb.service';
import { EbpService } from 'src/app/controller/service/ebp.service';
import { Eb } from 'src/app/controller/entity/eb.model';
import { Ebp } from 'src/app/controller/entity/ebp.model';

@Component({
  selector: 'app-eb-list',
  templateUrl: './eb-list.component.html',
  styleUrls: ['./eb-list.component.css']
})
export class EbListComponent implements OnInit {
  date: string;
  libelle: string
  cin: string
  public ebUpdate: Eb;
  public ebDate: Date;

  constructor(private ebService: EbService
    , private ebpService: EbpService) { }

  ngOnInit() {
    this.onShowAll();
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
  get eb(): Eb {
    return this.ebService.eb;
  }
  get ebList(): Array<Eb> {
    return this.ebService.ebList;
  }
  public get ebpList(): Array<Ebp> {
    return this.ebpService.ebpList;
  }
  /** Getter */


  /** Util */

  /** Util */



}
