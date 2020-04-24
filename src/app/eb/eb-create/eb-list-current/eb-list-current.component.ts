import { Component, OnInit } from '@angular/core';
import { Eb } from 'src/app/controller/entity/eb.model';
import { EbService } from 'src/app/controller/service/eb.service';
import { EbpService } from 'src/app/controller/service/ebp.service';
import {formatDate} from '@angular/common';


@Component({
  selector: 'app-eb-list-current',
  templateUrl: './eb-list-current.component.html',
  styleUrls: ['./eb-list-current.component.css']
})
export class EbListCurrentComponent implements OnInit {

  public ebUpdate: Eb;
  public ebDate:Date;

  constructor(private ebService: EbService
    , private ebpService: EbpService) { }

  ngOnInit() {
    this.onShowAll();
  }

  /**Events */

  onShowAll(){
       this.ebService.getEbBySaveDate(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
  }

  
  onEbDelete(eb: Eb) {
    this.ebService.deleteEb(eb.id);
  }


  /**Events */


  /** Getter */

  get eb(): Eb {
    return this.ebService.eb;
  }
  public get ebListCurrent(): Array<Eb> {
    
		return this.ebService.ebListCurrent;
	}

  
  /** Getter */


  /** Util */

  /** Util */
}
