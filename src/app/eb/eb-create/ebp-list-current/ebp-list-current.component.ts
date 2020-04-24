import { Component, OnInit } from '@angular/core';
import { Ebp } from 'src/app/controller/entity/ebp.model';
import { EbService } from 'src/app/controller/service/eb.service';
declare var $:any;
@Component({
  selector: 'app-ebp-list-current',
  templateUrl: './ebp-list-current.component.html',
  styleUrls: ['./ebp-list-current.component.css']
})
export class EbpListCurrentComponent implements OnInit {
 

  constructor(private ebService:EbService) { }

  ngOnInit(): void {
   
  }

  public get ebpListCurrent(): Array<Ebp> {
    return this.ebService.ebpListCurrent;
  }

  onEbpDelete(ebp:Ebp){
    const i=this.ebpListCurrent.findIndex(e=>e.produit===ebp.produit);
    if(i!==-1){
      this.ebpListCurrent.splice(i,1);
    }
  }

}
