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
import { AlertService } from 'src/app/controller/service/alert.service';


declare var $: any;

@Component({
  selector: 'app-demande-prix',
  templateUrl: './demande-prix.component.html',
  styleUrls: ['./demande-prix.component.css']
})
export class DemandePrixComponent implements OnInit{

  statuts = [UtilStatuts.DEMMANDE,UtilStatuts.COMMANDE];

  fournisseurs = Array<Fournisseur>();
  fourn = new Fournisseur();
  nom: string;
  items = new Array<AchatItem>();

  constructor(private achatService: AchatService
    , private dpService: DemmandePrixService
    , private frService: FournisseurService
    , private router: Router
    , private alertService:AlertService) { }


  ngOnInit() {
    this.getAllFournisseurs();
  }


  //Events
  onDemandeSave(){
    this.saveDemande();
  }
  //Events

  //API Calls
  saveDemande() {
    this.achat.comptable.name=localStorage.getItem("user_name");
    this.achat.achatItems = this.achatItemsCurrent;
    this.achat.statut = UtilStatuts.DEMMANDE;
    this.achatService.saveAchat(this.achat).subscribe(
      data => {
        if (data != null) {
          this.alertService.setSuccessAlert("Demande Saved Successfuly.");
          this.router.navigate(['comptable/dp/ref',data.ref]);
        }
      }, error => {
        this.alertService.setSuccessAlert("Please Try Again!")
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
        console.log(error);
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
