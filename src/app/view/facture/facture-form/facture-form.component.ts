import { Component, OnInit } from '@angular/core';
import { FactureService } from 'src/app/controller/service/facture.service';
import { Facture } from 'src/app/controller/entity/Facture.model';
import { FournisseurService } from 'src/app/controller/service/fournisseur.service';
import { AchatService } from 'src/app/controller/service/achat.service';
import { Achat } from 'src/app/controller/entity/achat.model';
import { Paiement } from 'src/app/controller/entity/paiement.model';
import { UtilList } from 'src/app/util/utillist.module';
import { Fournisseur } from 'src/app/controller/entity/fournisseur.model';
import { UtilStatuts } from 'src/app/util/utilstatuts.module';
import { Router } from '@angular/router';

@Component({
  selector: 'app-facture-form',
  templateUrl: './facture-form.component.html',
  styleUrls: ['./facture-form.component.css']
})
export class FactureFormComponent implements OnInit {
  page = 0;
  pages: Array<number>;

  achats = new Array<Achat>();
  achatsFiltered = new Array<Achat>();
  statut = "";
  fourni = "";
  searchKey = "";

  fournisseurs = new Array<Fournisseur>();
  paiements = new Array<Paiement>();

  achat = new Achat();

  statuts = [UtilStatuts.DEMMANDE_BROUILLON
    , UtilStatuts.DEMMANDE
    , UtilStatuts.DEVI_RECU
    , UtilStatuts.COMMANDE];

  facture=new Facture();

  constructor(private facService:FactureService
    , private achatService: AchatService
    , private frService: FournisseurService
    , private router: Router) { }

    ngOnInit(): void {
      this.getAllFourni();
      this.getAllAchats();
    }
  
  
    setPage(i: number, event: any) {
      event.preventDefault()
      this.page = i;
      this.getAllAchats();
    }
  
    onFilterAction() {
      this.achatsFiltered = this.achats;
      this.achatsFiltered = this.achatService.searchByRef(this.achatsFiltered, this.searchKey);
      this.achatsFiltered = this.achatService.filterByFourni(this.achatsFiltered, this.fourni);
    }
  
    onAchatFacturation(achat: Achat) {
      this.achat = achat;
      this.router.navigate(['comptable/facture/achat/',this.achat.ref]);
    }

    //API Calls

    getAllAchats() {
      this.achatService.getAllAchat(this.page).subscribe(
        data => {
          this.achats = data["content"];
          this.achatsFiltered = data["content"];
          this.achatsFiltered = this.achatService.filterByStatut(this.achatsFiltered, this.statuts[3]);
          this.pages = new Array(data["totalPages"]);
        }, error => {
          console.log(error);
        }
      )
  
    }
    getAllFourni() {
      this.frService.getAllFournisseur().subscribe(
        data => {
          this.fournisseurs = data
        }, error => {
          console.log(error);
        }
      )
    }

}
