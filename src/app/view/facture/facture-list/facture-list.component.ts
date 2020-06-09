import { Component, OnInit } from '@angular/core';
import { Facture } from 'src/app/controller/entity/Facture.model';
import { FactureService } from 'src/app/controller/service/facture.service';
import { Fournisseur } from 'src/app/controller/entity/fournisseur.model';
import { Paiement } from 'src/app/controller/entity/paiement.model';
import { Achat } from 'src/app/controller/entity/achat.model';
import { UtilStatuts } from 'src/app/util/utilstatuts.module';
import { AchatService } from 'src/app/controller/service/achat.service';
import { PaiementService } from 'src/app/controller/service/paiement.service';
import { FournisseurService } from 'src/app/controller/service/fournisseur.service';
import { Router } from '@angular/router';
import { UtilList } from 'src/app/util/utillist.module';

@Component({
  selector: 'app-facture-list',
  templateUrl: './facture-list.component.html',
  styleUrls: ['./facture-list.component.css']
})
export class FactureListComponent implements OnInit {

  factures = new Array<Facture>();
  facturesFiltered = new Array<Facture>();

  facture = new Facture();

  statut = "";
  fourni = "";
  searchKey = "";

  fournisseurs = new Array<Fournisseur>();
  paiements = new Array<Paiement>();

  statuts = [UtilStatuts.DEMMANDE_BROUILLON
    , UtilStatuts.DEMMANDE
    , UtilStatuts.DEVI_RECU
    , UtilStatuts.COMMANDE];


  constructor(private achatService: AchatService
    , private piService: PaiementService
    , private fService: FournisseurService
    , private facService: FactureService
    , private router: Router) { }

  ngOnInit(): void {
    this.getAllFourni();
    this.getAllFactures();
  }

  onFilterAction() {

  }

  onFacturePayer(facture: Facture) {
    this.facture = facture;
    this.getAllPaiementsByFactureRef(facture.ref);
  }



  onPaiementSave() {
    this.piService.paiement.facture = this.facture;
    this.piService.save(this.paiement).subscribe(
      data => {
        if (data == 1) {
          this.getAllPaiementsByFactureRef(this.facture.ref);
          this.getAllFactures();
          this.updateAchat(this.facture.achat);
        }
      }, error => {
        console.log(error);
      }
    )
  }

  onPaiementEdit(p: Paiement) {
    this.piService.paiement = p;
    this.piService.paiement.facture = this.facture;
    this.piService.update(this.paiement).subscribe(
      data => {
        if (data == 1) {
          this.getAllPaiementsByFactureRef(this.facture.ref);
          this.getAllFactures();
          this.updateAchat(this.facture.achat);
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
          this.updateAchat(this.facture.achat);
        }
      }, error => {
        console.log(error);
      }
    )
  }


  //API Calls
  getAllPaiementsByFactureRef(ref: string) {
    this.piService.getPaiementByFactureRef(ref).subscribe(
      data => {
        this.paiements = data
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

  getAllFactures() {
    this.facService.getAllFactures().subscribe(
      data => {
        this.factures = data;
      }, error => {
        console.log(error);
      }
    )
  }


  updateAchat(achat: Achat) {
    var achatDB=new Achat();
    this.achatService.getAchatByRef(achat.ref).subscribe(
      data => {
           achatDB=data;
           let t = achatDB.total;
           achatDB.totalPaier = 0;
           var ps = new Array<Paiement>();
           this.piService.getPaiementByFactureRef(this.facture.ref).subscribe(
             data => {
               data.forEach(p => {
                 achatDB.totalPaier = achatDB.totalPaier + p.montent;
               });
               achatDB.totalRester = t - achatDB.totalPaier;
               this.achatService.updateAchat(achatDB).subscribe(
                 data => {
                  console.log(data);
                 }, error => {
                   console.log(error);
                 }
               )
       
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
