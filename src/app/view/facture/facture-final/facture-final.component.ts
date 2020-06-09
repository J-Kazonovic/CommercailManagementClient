import { Component, OnInit } from '@angular/core';
import { AchatService } from 'src/app/controller/service/achat.service';
import { DemmandePrixService } from 'src/app/controller/service/demmande-prix.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FournisseurService } from 'src/app/controller/service/fournisseur.service';
import { AchatItemService } from 'src/app/controller/service/achat-item.service';
import { Facture } from 'src/app/controller/entity/Facture.model';
import { Achat } from 'src/app/controller/entity/achat.model';
import { UtilStatuts } from 'src/app/util/utilstatuts.module';
import { FactureService } from 'src/app/controller/service/facture.service';
import { AchatItem } from 'src/app/controller/entity/achat-item.model';

@Component({
  selector: 'app-facture-final',
  templateUrl: './facture-final.component.html',
  styleUrls: ['./facture-final.component.css']
})
export class FactureFinalComponent implements OnInit {

  private sub: any;
  ref: string;

  facture=new Facture();
  achat=new Achat();
  items=new Array<AchatItem>();

  etats = [UtilStatuts.OUVERT, UtilStatuts.PAYER];
   

  constructor(private achatService: AchatService
    , private route: ActivatedRoute
    , private router: Router
    , private facService: FactureService
    , private frService: FournisseurService
    , private achatItemService: AchatItemService) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.ref = params['ref'];
      this.getFactureByAchatRef(this.ref);
      this.getAchatByRef(this.ref);
      this.getAllDBAchatItems(this.ref);
    });
  }


  onFactureSave(){
    console.log(this.facture.etat);
    if(this.facture.etat===this.etats[0]){
      this.facService.update(this.facture).subscribe(
        data => {
          console.log(data);
        }, error => {
          console.log(error);
        }
      );
    }else{
      this.facture.etat=this.etats[0];
      this.facService.save(this.facture).subscribe(
      data => {
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
    }
    
  }

  getAchatByRef(ref:string){
    this.achatService.getAchatByRef(ref).subscribe(
      data => {
         this.achat=data;
         this.genererLaFacture(this.achat);
      }, error => {
        console.log(error);
      }
    )
  }

  getFactureByAchatRef(ref:string){
    this.facService.getFactureByAchatRef(ref).subscribe(
      data => {
        console.log(data);
         if(data!=null){
           this.facture=data;

         }
      }, error => {
        console.log(error);
      }
    )
  }

  

  getAllDBAchatItems(ref:string) {
    this.achatItemService.getAchatItemsByAchat(ref).subscribe(
      data => {
        this.items= data;
      }, error => {
        console.log(error);
      }
    );
  }


  genererLaFacture(achat:Achat){
    this.facture.achat=achat;
    this.facture.ref="Fac"+achat.ref;
  }
}
