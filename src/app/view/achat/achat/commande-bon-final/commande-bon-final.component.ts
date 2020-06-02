import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { UtilStatuts } from 'src/app/util/utilstatuts.module';
import { AchatItem } from 'src/app/controller/entity/achat-item.model';
import { AchatService } from 'src/app/controller/service/achat.service';
import { AchatItemService } from 'src/app/controller/service/achat-item.service';
import { Achat } from 'src/app/controller/entity/achat.model';

@Component({
  selector: 'app-commande-bon-final',
  templateUrl: './commande-bon-final.component.html',
  styleUrls: ['./commande-bon-final.component.css']
})
export class CommandeBonFinalComponent implements OnInit,OnChanges {

  
  edit:number;
  statuts=[UtilStatuts.DEMMANDE_BROUILLON
    ,UtilStatuts.DEMMANDE
    ,UtilStatuts.DEVI_RECU
    ,UtilStatuts.COMMANDE];
    

  dbItems=new Array<AchatItem>();

  constructor(private achatService: AchatService
    , private achatItemService: AchatItemService) { }

  ngOnInit(): void {
   
  }

  ngOnChanges(changes: SimpleChanges) {
    this.edit=this.achatService.edit;
    
  }

  onEditClick(){
    this.achatService.edit=1;
    this.achat.statut=this.statuts[2];
  }

  get achat(): Achat {
    return this.achatService.achat;
  }

  set achat(achat:Achat){
    this.achatService.achat=achat;
  }

  get achatItems(): Array<AchatItem> {
    return this.achatService.achatItems;
	} 


}
