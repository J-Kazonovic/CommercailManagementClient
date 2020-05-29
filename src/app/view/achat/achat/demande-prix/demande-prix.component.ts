import { Component, OnInit, Input } from '@angular/core';
import { Eb } from 'src/app/controller/entity/eb.model';
import { Fournisseur } from 'src/app/controller/entity/fournisseur.model';
import { Ebp } from 'src/app/controller/entity/ebp.model';
import { AchatService } from 'src/app/controller/service/achat.service';
import { EbService } from 'src/app/controller/service/eb.service';
import { EbpService } from 'src/app/controller/service/ebp.service';
import { CategoryService } from 'src/app/controller/service/category.service';
import { ProductService } from 'src/app/controller/service/product.service';
import { FournisseurService } from 'src/app/controller/service/fournisseur.service';
import { AchatItemService } from 'src/app/controller/service/achat-item.service';
import { Achat } from 'src/app/controller/entity/achat.model';
import { UtilStatuts } from 'src/app/util/utilstatuts.module';
import { UtilValidation } from 'src/app/util/utilvalidation.module';
import { AchatItem } from 'src/app/controller/entity/achat-item.model';
import { Category } from 'src/app/controller/entity/category.model';
import { Product } from 'src/app/controller/entity/product.model';

declare var $: any;

@Component({
  selector: 'app-demande-prix',
  templateUrl: './demande-prix.component.html',
  styleUrls: ['./demande-prix.component.css']
})
export class DemandePrixComponent implements OnInit {

  statuts=[UtilStatuts.DEMMANDE_BROUILLON
    ,UtilStatuts.DEMMANDE
    ,UtilStatuts.DEVI_RECU
    ,UtilStatuts.COMMANDE];

  fournisseurs=Array<Fournisseur>();


  fourn=new Fournisseur();
  nom:string;



  constructor(private achatService: AchatService, private ebService: EbService
    , private ebpService: EbpService
    , private catService: CategoryService
    , private prService: ProductService
    , private frService: FournisseurService
    , private achatItemService: AchatItemService) { }



  ngOnInit() {
    this.getAllFournisseurs();
  }



  //API Calls
  saveDemmande() {
    this.achat.achatItems=this.items;
    this.achat.statut=UtilStatuts.DEMMANDE;
    console.log(this.items);
    this.achatService.saveAchat();
  }

  updateDemmande(){
    this.achat.achatItems=new Array<AchatItem>();
    this.achat.achatItems=this.items;
    this.achat.dateCommande=this.achat.dateCommande;
    this.achat.statut=UtilStatuts.DEVI_RECU;
    console.log(this.achat);
    this.achatService.updateAchat(this.achat).subscribe(
      data => {
       
      }, error => {
        console.log(error);
      }
    );
  }

  getfournByNom() {
    this.frService.getfournByNom(this.achat.fournisseur.nom).subscribe(
      data => {
        this.fourn = data;
      }, error => {
        console.log(error);
      }
    );
  }

  getAllFournisseurs() {
    this.frService.getAllFournisseur().subscribe(
      data => {
        this.fournisseurs = data;
      }, error => {
        console.log("error" + error);
      }
    );
  }
  //API Calls

  
  /**Getters & Setters */
  get achat(): Achat {
    return this.achatService.achat;
  }

  get items(): Array<AchatItem> {
    return this.achatService.items;
  }
  /**Getters & Setters */



}
