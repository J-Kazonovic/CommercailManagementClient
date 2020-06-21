import { Component, OnInit, Input } from '@angular/core';
import { Ebp } from 'src/app/controller/entity/ebp.model';
import { EbpService } from 'src/app/controller/service/ebp.service';
import { UtilList } from 'src/app/util/utillist.module';
import { UtilStatuts } from 'src/app/util/utilstatuts.module';
import { AchatService } from 'src/app/controller/service/achat.service';
import { AchatItem } from 'src/app/controller/entity/achat-item.model';
import { CategoryService } from 'src/app/controller/service/category.service';
import { Category } from 'src/app/controller/entity/category.model';
import { AchatitemEbpLink } from 'src/app/controller/entity/achatitem-ebp-link.model';

@Component({
  selector: 'app-achat-item-search',
  templateUrl: './achat-item-search.component.html',
  styleUrls: ['./achat-item-search.component.css']
})
export class AchatItemSearchComponent implements OnInit {

  ebpList = new Array<Ebp>();
  achatItemListFinal = new Array<AchatItem>();
  achatItemListFilter = new Array<AchatItem>();

  catLib = "All";
  key = "";

  @Input() items = new Array<AchatItem>();

  constructor(private ebpService: EbpService
    , private dService: AchatService
    , private cService: CategoryService) { }

  ngOnInit(): void {
    this.getAllEbp();
    this.findAllCats();
    this.achatItemListFilter = this.achatItemListFinal;
  }

  addEbpToDemmande(item: AchatItem) {
    if (item != null) {
      console.log(item);
      this.items.push(item);
    }
  }

  getAllEbp() {
    this.ebpService.getAllEbp().subscribe(
      data => {
        this.ebpList = data;
        this.ebpList = this.ebpList.filter(ebp => ebp.besoin_statut == UtilStatuts.Accorder);
        this.addSameProductQuantite();
      }, error => {
        console.log(error);
      }
    )
  }

  findAllCats() {
    this.cService.findAll();
  }

  //Search Methods
  getProductBycat() {
    this.key = this.key.trim().toLowerCase();
    if (this.catLib !== "All") {
      if (this.key.length > 0) {
        this.achatItemListFilter = this.achatItemListFinal.filter(ebp => ebp.produit.libelle.trim().toLowerCase().indexOf(this.key) > -1);
        this.achatItemListFilter = this.achatItemListFilter.filter(ebp => ebp.produit.cat.libelle === this.catLib);

      } else {
        this.achatItemListFilter = this.achatItemListFinal.filter(ebp => ebp.produit.cat.libelle === this.catLib);
      }
    } else {
      this.achatItemListFilter = this.achatItemListFinal;
      if (this.key.length > 0) {
        this.achatItemListFilter = this.achatItemListFinal.filter(ebp => ebp.produit.libelle.trim().toLowerCase().indexOf(this.key) > -1);
      }
    }
  }

  searchProduitByKey() {
    this.key = this.key.trim().toLowerCase();
    if (this.catLib !== "All") {
      if (this.key != null && this.key.length > 0) {
        this.achatItemListFilter = this.achatItemListFinal.filter(ebp => ebp.produit.libelle.trim().toLowerCase().indexOf(this.key) > -1);
      }
      this.achatItemListFilter = this.achatItemListFilter.filter(ebp => ebp.produit.cat.libelle === this.catLib);
    } else {
      this.achatItemListFilter = this.achatItemListFinal;
      if (this.key.length > 0) {
        this.achatItemListFilter = this.achatItemListFinal.filter(ebp => ebp.produit.libelle.trim().toLowerCase().indexOf(this.key) > -1);
      }
    }

  }
  //Search Methods


  /** */
  addSameProductQuantite() {
    var ebpListTemp = this.ebpList;
    while (ebpListTemp.length > 0) {
      var ebpI = ebpListTemp[0];

      var qteTotal = ebpI.qteAccorde;
      for (var _i = 1; _i < ebpListTemp.length; _i++) {
        var ebpNext = ebpListTemp[_i];
        if (ebpI.produit.libelle === ebpNext.produit.libelle) {
          qteTotal = qteTotal + ebpNext.qteAccorde;
        }
      }
      var links = new Array<AchatitemEbpLink>();
      var demI = new AchatItem();
      var link = new AchatitemEbpLink();
      link.ebp = ebpI;
      links.push(link);
      this.cloneObj(demI, ebpI);
      demI.ebLinks = links;
      demI.qteCommander = qteTotal;
      this.achatItemListFinal.push(demI);
      this.removeItemsWithLibelle(ebpListTemp, ebpI.produit.libelle);
    }
  }

  removeItemsWithLibelle(items: any, libelle: string): void {
    for (let i = 0; i < items.length; i++) {
      if (items[i].produit.libelle === libelle) {
        items.splice(i--, 1);
      }
    }
  }

  cloneObj(ebp: AchatItem, ebpI: Ebp) {
    ebp.produit.libelle = ebpI.produit.libelle;
    ebp.produit.cat.libelle = ebpI.produit.cat.libelle;
    ebp.produit.unite.libelle = ebpI.produit.unite.libelle;
    ebp.produit.id = ebpI.produit.id;
    ebp.produit.prix = ebpI.produit.prix;
  }


  get cats(): Array<Category> {
    return this.cService.cats;
  }
}
