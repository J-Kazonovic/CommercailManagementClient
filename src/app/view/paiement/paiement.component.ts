import { Component, OnInit } from '@angular/core';
import { Achat } from 'src/app/controller/entity/achat.model';
import { Fournisseur } from 'src/app/controller/entity/fournisseur.model';
import { UtilStatuts } from 'src/app/util/utilstatuts.module';
import { AchatService } from 'src/app/controller/service/achat.service';
import { AchatItemService } from 'src/app/controller/service/achat-item.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FournisseurService } from 'src/app/controller/service/fournisseur.service';
import { UtilList } from 'src/app/util/utillist.module';
import { Paiement } from 'src/app/controller/entity/paiement.model';
import { PaiementService } from 'src/app/controller/service/paiement.service';

@Component({
  selector: 'app-paiement',
  templateUrl: './paiement.component.html',
  styleUrls: ['./paiement.component.css']
})
export class PaiementComponent implements OnInit {


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




  constructor(private achatService: AchatService
    , private piService: PaiementService
    , private fService: FournisseurService
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

  onAchatPayer(achat: Achat) {
    this.achat = achat;
    this.getAllPaiementsByAchatRef(achat.ref);
  }

  

  onPaiementSave() {
    this.piService.paiement.achat = this.achat;
    this.piService.save(this.paiement).subscribe(
      data => {
        if (data == 1) {
          this.getAllPaiementsByAchatRef(this.achat.ref);
          this.getAllAchats();
          this.updateAchat(this.achat);
        }
      }, error => {
        console.log(error);
      }
    )
  }

  onPaiementEdit(p: Paiement) {
    this.piService.paiement = p;
    this.piService.update(this.paiement).subscribe(
      data => {
        if (data == 1) {
          this.getAllPaiementsByAchatRef(this.achat.ref);
          this.getAllAchats();
          this.updateAchat(this.achat);
        }
      }, error => {
        console.log(error);
      }
    )
  }

  onPaiementDelete(p: Paiement) {
    this.piService.delete(p.id).subscribe(
      data => {
        if (data == 1) {
          UtilList.deleteFromListById(p.id, this.paiements);
          this.getAllAchats();
          this.updateAchat(this.achat);
        }
      }, error => {
        console.log(error);
      }
    )
  }


  //API Calls
  getAllPaiementsByAchatRef(ref: string) {
    this.piService.getPaiementByAchatRef(ref).subscribe(
      data => {
        this.paiements = data
      }, error => {
        console.log(error);
      }
    )
  }
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
    this.fService.getAllFournisseur().subscribe(
      data => {
        this.fournisseurs = data
      }, error => {
        console.log(error);
      }
    )
  }


  updateAchat(achat: Achat) {
    let t = achat.total;
    achat.totalPaier = 0;
    var ps = new Array<Paiement>();
    this.piService.getPaiementByAchatRef(achat.ref).subscribe(
      data => {
        data.forEach(p => {
          achat.totalPaier = achat.totalPaier + p.montent;
        });
        achat.totalRester = t - achat.totalPaier;
        this.achatService.updateAchat(achat).subscribe(
          data => {
            if (data == 1) {
              this.getAllAchats();
            }
          }, error => {
            console.log(error);
          }
        )

      }, error => {
        console.log(error);
      }
    )




  }




  get paiement(): Paiement {
    return this.piService.paiement;
  }



}
