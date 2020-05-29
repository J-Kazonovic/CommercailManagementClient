import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { AchatService } from 'src/app/controller/service/achat.service';
import { Achat } from 'src/app/controller/entity/achat.model';
import { AchatItem } from 'src/app/controller/entity/achat-item.model';
import { UtilStatuts } from 'src/app/util/utilstatuts.module';
declare var $:any;

@Component({
  selector: 'app-achat',
  templateUrl: './achat.component.html',
  styleUrls: ['./achat.component.css']
})
export class AchatComponent implements OnInit,OnChanges {


  edit:number;
  statuts=[UtilStatuts.DEMMANDE_BROUILLON
    ,UtilStatuts.DEMMANDE
    ,UtilStatuts.DEVI_RECU
    ,UtilStatuts.COMMANDE];


  constructor(private achatService: AchatService) { }

  ngOnInit(): void {
    this.achat=new Achat();
    this.achat.statut=this.statuts[0];
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

  get items(): Array<AchatItem> {
    return this.achatService.items;
  }

 

}
