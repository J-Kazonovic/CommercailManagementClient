import { Component, OnInit } from '@angular/core';
import { Ebp } from 'src/app/controller/entity/ebp.model';
import { EbService } from 'src/app/controller/service/eb.service';
import { EbpService } from 'src/app/controller/service/ebp.service';
import { UtilList } from 'src/app/util/utillist.module';
declare var $:any;
@Component({
  selector: 'app-ebp-list-current',
  templateUrl: './ebp-list-current.component.html',
  styleUrls: ['./ebp-list-current.component.css']
})
export class EbpListCurrentComponent implements OnInit {
 

  constructor(private ebService:EbService, private ebpService:EbpService) { }

  ngOnInit(): void {
  }


  deleteProduct(ebp:Ebp) {
    UtilList.deleteFromListById(ebp.produit.id,this.ebpListCurrent);
  }


  public get ebpListCurrent(): Array<Ebp> {
    return this.ebService.ebpListCurrent;
  }

  


}
