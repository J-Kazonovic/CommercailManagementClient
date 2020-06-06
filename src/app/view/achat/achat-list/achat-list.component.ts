import { Component, OnInit } from '@angular/core';
import { AchatService } from 'src/app/controller/service/achat.service';
import { Achat } from 'src/app/controller/entity/achat.model';
import { UtilList } from 'src/app/util/utillist.module';
import { AchatItem } from 'src/app/controller/entity/achat-item.model';
import { AchatItemService } from 'src/app/controller/service/achat-item.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UtilStatuts } from 'src/app/util/utilstatuts.module';
import { FournisseurService } from 'src/app/controller/service/fournisseur.service';
import { Fournisseur } from 'src/app/controller/entity/fournisseur.model';

@Component({
  selector: 'app-achat-list',
  templateUrl: './achat-list.component.html',
  styleUrls: ['./achat-list.component.css']
})
export class AchatListComponent implements OnInit {


  page = 0;
  pages: Array<number>;

  achats = new Array<Achat>();
  achatsFiltered = new Array<Achat>();
  achatItems=new Array<AchatItem>();

  statut = "";
  fourni = "";
  searchKey = "";

  fournisseurs = new Array<Fournisseur>();

  statuts = [UtilStatuts.DEMMANDE_BROUILLON
    , UtilStatuts.DEMMANDE
    , UtilStatuts.DEVI_RECU
    , UtilStatuts.COMMANDE];

  constructor(private achatService: AchatService
    , private achatItemService: AchatItemService
    , private route: ActivatedRoute
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
    this.achatsFiltered = this.achatService.filterByStatut(this.achatsFiltered, this.statut);
    this.achatsFiltered = this.achatService.filterByFourni(this.achatsFiltered, this.fourni);
  }

  onAchatEdit(achat: Achat) {
    if (achat.statut === this.statuts[1]) {
      this.router.navigate(['comptable/dp/ref', achat.ref]);
    } else if (achat.statut === this.statuts[2] || achat.statut === this.statuts[3]) {
      this.router.navigate(['comptable/bc/ref', achat.ref]);
    }
  }

  onAchatShow(achat: Achat) {
    this.achatItemService.getAchatItemsByAchat(achat.ref).subscribe(
      data=>{
        this.achatItems=data;
      },error=>{
        console.log(error);
      }
    )
  }

  onAchatDelete(achat: Achat) {
    this.achatService.deleteAchat(achat.id).subscribe(
      data => {
        if (data == 1) {
          UtilList.deleteFromListById(achat.id, this.achats);
        }
      }, error => {
        console.log(error);
      }
    )
  }

  getAllAchats() {
    this.achatService.getAllAchat(this.page).subscribe(
      data => {
        console.log(data);
        this.achats = data["content"];
        this.achatsFiltered = data["content"];
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

  get achat(): Achat {
    return this.achatService.achat;
  }

  set achat(achat: Achat) {
    this.achatService.achat = achat;
  }

}
