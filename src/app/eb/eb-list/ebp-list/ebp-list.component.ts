import { Component, OnInit } from '@angular/core';
import { Ebp } from 'src/app/controller/entity/ebp.model';
import { EbpService } from 'src/app/controller/service/ebp.service';

@Component({
  selector: 'app-ebp-list',
  templateUrl: './ebp-list.component.html',
  styleUrls: ['./ebp-list.component.css']
})
export class EbpListComponent implements OnInit {

  constructor(private ebpService:EbpService) { }

  ngOnInit(): void {
  }

  public get ebpList(): Array<Ebp> {
    return this.ebpService.ebpList;
  }

  onEbpDelete(ebp:Ebp){
    const i=this.ebpList.findIndex(e=>e.produit===ebp.produit);
    if(i!==-1){
      this.ebpList.splice(i,1);
    }
  }

}
