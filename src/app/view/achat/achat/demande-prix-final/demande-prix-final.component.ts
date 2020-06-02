import { Component, OnInit, SimpleChanges } from '@angular/core';
import { UtilStatuts } from 'src/app/util/utilstatuts.module';
import { Fournisseur } from 'src/app/controller/entity/fournisseur.model';
import { AchatItem } from 'src/app/controller/entity/achat-item.model';
import { AchatService } from 'src/app/controller/service/achat.service';
import { FournisseurService } from 'src/app/controller/service/fournisseur.service';
import { AchatItemService } from 'src/app/controller/service/achat-item.service';
import { Achat } from 'src/app/controller/entity/achat.model';
import { ActivatedRoute } from '@angular/router';
import { DemmandePrixService } from 'src/app/controller/service/demmande-prix.service';

@Component({
  selector: 'app-demande-prix-final',
  templateUrl: './demande-prix-final.component.html',
  styleUrls: ['./demande-prix-final.component.css']
})
export class DemandePrixFinalComponent implements OnInit {

  private sub: any;
  ref: string;



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
    , private route: ActivatedRoute
    , private frService: FournisseurService
    , private achatItemService: AchatItemService) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.getFournByNom();

  }


  ngOnInit() {
    this.getAllFournisseurs();
   
    this.sub = this.route.params.subscribe(params => {
      this.ref = params['ref'];
      this.getAchatByRef(this.ref);
      this.getAllDBAchatItems(this.ref); 
      this.getFournByNom();
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  //API Calls
  
  updateDemmande() {
    this.achat.achatItems = this.achatItemsDB;
    this.achatService.updateAchat(this.achat).subscribe(
      data => {
        console.log(data);
      }, error => {
        console.log(error);
      }
    );
  }

  updateToDevis() {
    this.achat.achatItems = this.achatItemsDB;
    this.achat.statut=this.statuts[3];
    this.achatService.updateAchat(this.achat).subscribe(
      data => {
        console.log(data);
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


  getAchatByRef(ref:string){
    this.achatService.getAchatByRef(ref).subscribe(
      data => {
        this.dpService.achat = data;
      }, error => {
        console.log(error);
      }
    )
  }
  getAllDBAchatItems(ref:string) {
    this.achatItemService.getAchatItemsByAchat(ref).subscribe(
      data => {
        this.dpService.achatItemsDB= data;
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

  public get achatItemsDB(): Array<AchatItem> {
		return this.dpService.achatItemsDB;
	}

  /**Getters & Setters */

}
