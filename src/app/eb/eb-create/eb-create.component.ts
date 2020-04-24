import { Component, OnInit } from '@angular/core';
import { Eb } from 'src/app/controller/entity/eb.model';
import { EbService } from 'src/app/controller/service/eb.service';
import {formatDate} from '@angular/common';

@Component({
  selector: 'app-eb-create',
  templateUrl: './eb-create.component.html',
  styleUrls: ['./eb-create.component.css']
})
export class EbCreateComponent implements OnInit {

  constructor(private ebService:EbService) { }

  ngOnInit(): void {

  }

  /**Events */
  onSaveEb() {
    this.eb.statut="Decision";
    this.ebService.onSaveEb();
    this.ebService.getEbBySaveDate(formatDate(new Date(), 'yyyy-MM-dd', 'en'));

  }
  /**Events */

  /**Getter */
  get eb(): Eb {
    return this.ebService.eb;
  }
  /**Getter */

  /**Util */
  public ebValidation(): boolean {
    return this.ebService.ebValidation();
  }
  /**Util */
}
