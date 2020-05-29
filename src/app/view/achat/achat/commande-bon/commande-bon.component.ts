import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { UtilStatuts } from 'src/app/util/utilstatuts.module';
import { Fournisseur } from 'src/app/controller/entity/fournisseur.model';
import { AchatService } from 'src/app/controller/service/achat.service';
import { EbService } from 'src/app/controller/service/eb.service';
import { EbpService } from 'src/app/controller/service/ebp.service';
import { CategoryService } from 'src/app/controller/service/category.service';
import { ProductService } from 'src/app/controller/service/product.service';
import { FournisseurService } from 'src/app/controller/service/fournisseur.service';
import { AchatItemService } from 'src/app/controller/service/achat-item.service';
import { AchatItem } from 'src/app/controller/entity/achat-item.model';
import { Achat } from 'src/app/controller/entity/achat.model';

@Component({
  selector: 'app-commande-bon',
  templateUrl: './commande-bon.component.html',
  styleUrls: ['./commande-bon.component.css']
})
export class CommandeBonComponent implements OnInit,OnChanges{

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
    this.achat.achatItems.forEach(item => {
      item.totalPrice=item.qteCommander*item.produit.prix;
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    //this.edit=this.achatService.edit;

  }


  //API Calls
  updateDemmande(){
    let total=0;
    this.items.forEach(item=>{
      total=total+item.totalPrice;
    });
    this.achat.achatItems=new Array<AchatItem>();
    this.achat.achatItems=this.items;
    this.achat.total=total;
    this.achat.statut=UtilStatuts.COMMANDE;
    console.log(this.achat);
    this.achatService.updateAchat(this.achat).subscribe(
      data => {
        this.achatService.edit=0;
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
