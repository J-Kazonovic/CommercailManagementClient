import { Component, OnInit } from '@angular/core';
import { Ebp } from 'src/app/controller/entity/ebp.model';
import { EbpService } from 'src/app/controller/service/ebp.service';
import { UtilList } from 'src/app/util/utillist.module';
import { UtilStatuts } from 'src/app/util/utilstatuts.module';
import { AchatService } from 'src/app/controller/service/achat.service';
import { AchatItem } from 'src/app/controller/entity/achat-item.model';
import { CategoryService } from 'src/app/controller/service/category.service';
import { Category } from 'src/app/controller/entity/category.model';

@Component({
  selector: 'app-product-search',
  templateUrl: './product-search.component.html',
  styleUrls: ['./product-search.component.css']
})
export class ProductSearchComponent implements OnInit {

  ebpList = new Array<Ebp>();
  ebpListFinal = new Array<AchatItem>();
  ebpListFilter = new Array<AchatItem>();

  catLib = "All";
  key="";


  constructor(private ebpService: EbpService
    , private dService: AchatService
    , private cService: CategoryService) { }

  ngOnInit(): void {
    this.getAllEbp();
    this.findAllCats();
    this.ebpListFilter = this.ebpListFinal;
  }

  addEbpToDemmande(item: AchatItem) {
    this.dService.onAddItem(item);
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
        this.ebpListFilter = this.ebpListFinal.filter(ebp => ebp.produit.libelle.trim().toLowerCase().indexOf(this.key) > -1);
        this.ebpListFilter = this.ebpListFilter.filter(ebp => ebp.produit.cat.libelle === this.catLib);

      }else{
        this.ebpListFilter = this.ebpListFinal.filter(ebp => ebp.produit.cat.libelle === this.catLib);
      }
    } else {
      this.ebpListFilter = this.ebpListFinal;
      if (this.key.length > 0) {
        this.ebpListFilter = this.ebpListFinal.filter(ebp => ebp.produit.libelle.trim().toLowerCase().indexOf(this.key) > -1);
      }
    }
  }

  searchProduitByKey() {
    this.key = this.key.trim().toLowerCase();
    if (this.catLib !== "All") {
      if (this.key!=null && this.key.length > 0) {
        this.ebpListFilter = this.ebpListFinal.filter(ebp => ebp.produit.libelle.trim().toLowerCase().indexOf(this.key) > -1);
      }
      this.ebpListFilter = this.ebpListFilter.filter(ebp => ebp.produit.cat.libelle === this.catLib);


    } else {
      this.ebpListFilter = this.ebpListFinal;
      if (this.key.length > 0) {
        this.ebpListFilter = this.ebpListFinal.filter(ebp => ebp.produit.libelle.trim().toLowerCase().indexOf(this.key) > -1);
      }
    }
    
  }
  //Search Methods


  addSameProductQuantite() {
    var ebpListTemp = this.ebpList;

    while (ebpListTemp.length > 0) {
      var ebpTemp = new Ebp();
      var ebpI = ebpListTemp[0];
      var qteTotal = ebpI.qteAccorde;
      for (var _i = 1; _i < ebpListTemp.length; _i++) {
        var ebpNext = ebpListTemp[_i];
        if (ebpI.produit.libelle === ebpNext.produit.libelle) {
          qteTotal = qteTotal + ebpNext.qteAccorde;
        }
      }
      var demI = new AchatItem();
      this.cloneObj(demI, ebpI);
      demI.qteCommander = qteTotal;
      this.ebpListFinal.push(demI);
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
    ebp.produit.id = ebpI.produit.id;
    ebp.produit.prix = ebpI.produit.prix; 
  }


  get cats(): Array<Category> {
    return this.cService.cats;
  }
}
