import { Component, OnInit, OnChanges, SimpleChanges, Input, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { AchatService } from 'src/app/controller/service/achat.service';
import { Achat } from 'src/app/controller/entity/achat.model';
import { AchatItem } from 'src/app/controller/entity/achat-item.model';
import { UtilStatuts } from 'src/app/util/utilstatuts.module';
import { AchatItemService } from 'src/app/controller/service/achat-item.service';
import { ActivatedRoute } from '@angular/router';
declare var $: any;

@Component({
  selector: 'app-achat',
  templateUrl: './achat.component.html',
  styleUrls: ['./achat.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class AchatComponent implements OnInit, OnChanges {

  a:boolean;
  b:boolean;
  c:boolean;

  private sub: any;
  ref:string;

  edit: number;
  statuts = [UtilStatuts.DEMMANDE_BROUILLON
    , UtilStatuts.DEMMANDE
    , UtilStatuts.DEVI_RECU
    , UtilStatuts.COMMANDE];

  dbItems = new Array<AchatItem>();

  constructor(private achatService: AchatService
    , private achatItemService: AchatItemService
    ,private route: ActivatedRoute
    ,private cdRef : ChangeDetectorRef) { }

  ngOnInit(): void {
    /*this.a=this.achat.statut===this.statuts[3]||this.achat.statut===this.statuts[2];
    this.b=this.achat.statut!==this.statuts[2] || this.edit==0;
    this.c=this.achat.statut!==this.statuts[3] || this.edit==1;*/
    this.sub = this.route.params.subscribe(params => {
      this.ref = params['ref']; // (+) converts string 'id' to a number

      
      this.achatService.getAchatByRef(this.ref).subscribe(
        data=>{
          this.achatService.achat=data;
          console.log(this.achatService.achat);
        },error=>{
          console.log(error);
        }
      )
      // In a real app: dispatch action to load the details here.
   });

   console.log(this.achat);
  }

   
   ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log("Change");
    this.edit = this.achatService.edit;
    this.getAllDBAchatItems();
  }

  /*ngAfterViewChecked() {
   
      this.cdRef.detectChanges();
    
  }*/

  onEditClick() {
    this.achatService.edit = 1;
    this.achat.statut = this.statuts[2];
  }

  getAllDBAchatItems() {
    this.achatItemService.getAchatItemsByAchat(this.achat.ref).subscribe(
      data => {
        this.achatService.achatItems = data;
      }, error => {
        console.log(error);
      }
    );
  }

  get achat(): Achat {
    return this.achatService.achat;
  }

  set achat(achat: Achat) {
    this.achatService.achat = achat;
  }

  get achatItems(): Array<AchatItem> {
    return this.achatService.achatItems;
  }

}
