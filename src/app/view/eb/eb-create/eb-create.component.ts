import { Component, OnInit } from '@angular/core';
import { Eb } from 'src/app/controller/entity/eb.model';
import { EbService } from 'src/app/controller/service/eb.service';
import {formatDate} from '@angular/common';
import { UtilStatuts } from 'src/app/util/utilstatuts.module';
import { UtilValidation } from 'src/app/util/utilvalidation.module';
import { Ebp } from 'src/app/controller/entity/ebp.model';
import { Router } from '@angular/router';
@Component({
  selector: 'app-eb-create',
  templateUrl: './eb-create.component.html',
  styleUrls: ['./eb-create.component.css']
})
export class EbCreateComponent implements OnInit {

  constructor(private ebService:EbService
    , private router:Router) { }

  ngOnInit(): void {

  }
  /**Events */
  onSaveEb() {
    this.eb.statut=UtilStatuts.Decision;
    this.ebService.onSaveEb();
  }

  onShowEbsClick(){
    this.router.navigate(['stuf/ebs']);

  }
  
  /**Events */

  /**Getter */
  get eb(): Eb {
    return this.ebService.eb;
  }
  /**Getter */

  /**Util */
  public ebValidation(title:string): boolean {
    return UtilValidation.ebValidation(title);
  }
  /**Util */
}
