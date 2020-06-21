import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
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
import { DemmandePrixService } from 'src/app/controller/service/demmande-prix.service';
import { Router } from '@angular/router';

declare var $: any;

@Component({
  selector: 'app-demande-prix',
  templateUrl: './demande-prix.component.html',
  styleUrls: ['./demande-prix.component.css']
})
export class DemandePrixComponent implements OnInit, OnChanges{

  statuts = [UtilStatuts.DEMMANDE_BROUILLON
    , UtilStatuts.DEMMANDE
    , UtilStatuts.DEVI_RECU
    , UtilStatuts.COMMANDE];


  fournisseurs = Array<Fournisseur>();
  fourn = new Fournisseur();
  nom: string;


  items = new Array<AchatItem>();
  constructor(private achatService: AchatService
    , private dpService: DemmandePrixService
    , private frService: FournisseurService
    , private achatItemService: AchatItemService
    , private router: Router) { }

  ngOnChanges(changes:SimpleChanges): void {
  }

  ngOnInit() {
    this.getAllFournisseurs();
  }


  //API Calls
  saveDemmande() {
    this.achat.comptable.name=localStorage.getItem("user_name");
    this.achat.achatItems = this.achatItemsCurrent;
    this.achat.statut = UtilStatuts.DEMMANDE;
    this.achatService.saveAchat(this.achat).subscribe(
      data => {
        if (data != null) {
          this.router.navigate(['comptable/dp/ref',data.ref]);
        }
      }, error => {
        console.log(error);
      }
    );
    
  }

  getFournByNom() {
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
    return this.dpService.achat;
  }

	public get achatItemsCurrent(): Array<AchatItem> {
		return this.dpService.achatItemsDB;
	}


  /**Getters & Setters */



}
