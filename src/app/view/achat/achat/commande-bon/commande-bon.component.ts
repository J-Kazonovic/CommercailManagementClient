import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
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
export class CommandeBonComponent implements OnInit, OnChanges {

  @Input() isNew = 1;

  statuts = [UtilStatuts.DEMMANDE_BROUILLON
    , UtilStatuts.DEMMANDE
    , UtilStatuts.DEVI_RECU
    , UtilStatuts.COMMANDE];

  fournisseurs = new Array<Fournisseur>();
  fourn = new Fournisseur();
  nom: string;
  



  constructor(private achatService: AchatService, private ebService: EbService
    , private ebpService: EbpService
    , private catService: CategoryService
    , private prService: ProductService
    , private frService: FournisseurService
    , private achatItemService: AchatItemService) { }



  ngOnInit() {
    this.getAllFournisseurs();
  }

  ngOnChanges(changes: SimpleChanges) {
  }

  onAchatSave() {
    if (this.isNew == 1) {
      this.achatService.saveAchat(null);
    } else {
      this.updateAchat();
      this.getAllDBAchatItems();
    }
  }

  //API Calls
  updateAchat() {
    this.achat.achatItems = this.achatItems;
    this.achat.statut = UtilStatuts.COMMANDE;
    this.achat.total=this.calculTotal();
    this.achatService.updateAchat(this.achat).subscribe(
      data => {
        this.achatService.edit = 0;
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
 
  getAllDBAchatItems() {
    this.achatItemService.getAchatItemsByAchat(this.achat.ref).subscribe(
      data => {
        this.achatService.achatItems=data;
      }, error => {
        console.log(error);
      }
    );
  }
  //API Calls

  calculTotal(){
    let total=0;
    this.achatItems.forEach(item=>{
      total=total+ item.totalPrice;
    })

    return total;
  }

  


  /**Getters & Setters */
  get achat(): Achat {
    return this.achatService.achat;
  }
  get achatItems(): Array<AchatItem> {
    return this.achatService.achatItems;
	} 

  /**Getters & Setters */

}
