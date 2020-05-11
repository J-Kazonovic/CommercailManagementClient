import { Component, OnInit } from '@angular/core';
import { DemmandeService } from 'src/app/controller/service/demmande.service';
import { DemmandeDesPrix } from 'src/app/controller/entity/demmande-des-prix.model';
import { EbService } from 'src/app/controller/service/eb.service';
import { EbpService } from 'src/app/controller/service/ebp.service';
import { Eb } from 'src/app/controller/entity/eb.model';
import { UtilList } from 'src/app/util/utillist.module';
import { Ebp } from 'src/app/controller/entity/ebp.model';
import { UtilStatuts } from 'src/app/util/utilstatuts.module';
import { UtilValidation } from 'src/app/util/utilvalidation.module';
import { CategoryService } from 'src/app/controller/service/category.service';
import { ProductService } from 'src/app/controller/service/product.service';
import { Category } from 'src/app/controller/entity/category.model';
import { Product } from 'src/app/controller/entity/product.model';
import { DemmandeDesPrixItem } from 'src/app/controller/entity/demmande-des-prix-item.model';
import { FournisseurService } from 'src/app/controller/service/fournisseur.service';
import { Fournisseur } from 'src/app/controller/entity/fournisseur.model';

@Component({
  selector: 'app-demmande-list-create',
  templateUrl: './demmande-list-create.component.html',
  styleUrls: ['./demmande-list-create.component.css']
})
export class DemmandeListCreateComponent implements OnInit {
  cin: string;
  public ebUpdate: Eb;
  public ebDate: Date;
  catLib:string;
  public ebList=new Array<Eb>();
  public ebpList=new Array<Ebp>();
  constructor(private demService: DemmandeService,private ebService: EbService
    , private ebpService: EbpService,private catService: CategoryService
    ,private prService:ProductService,private frService: FournisseurService) { }

    ngOnInit() {
      this.onShowPersonnelEb();
      this.findAll();
      this.frService.getAllFournisseur();
    }
  
    /**Events */
    onShowPersonnelEb() {
      this.ebService.getEbByPersonnel("C1").subscribe(
        data => {
          this.ebList = data;
        }, error => {
          console.log("Error:" + error);
        }
      );
    }
  
   
  
    onEbShow(eb: Eb) {
      this.ebUpdate = eb;
      this.ebpService.getEbpByEb(eb.id).subscribe(
        data => {
          this.ebpList = data;
        }
      );
    }
  
  get demmande(): DemmandeDesPrix {
    return this.demService.demmande;
  }

  public get fournList(): Array<Fournisseur> {
		return this.frService.fournList;
	}
  /**Events */
  onSaveEb() {
    this.eb.statut=UtilStatuts.Decision;
    this.ebService.onSaveEb();
  }
  
  /**Events */

  /**Getter */
  get eb(): Eb {
    return this.ebService.eb;
  }
  /**Getter */

  /**Util */
  public ebValidation(title:string): boolean {
    return UtilValidation.ebValidation(title);
  }

  getProductBycat(){
    this.prService.getAllCatProduct(this.catLib);
  }

  public addProduit() {
    this.demService.onAddEbp();
  }

  findAll( ) {
    this.catService.findAll();  
  }


  /**Getters & Setters */
  get dmI(): DemmandeDesPrixItem {
    return this.demService.dmI;
  }
  get demItems(): Array<DemmandeDesPrixItem> {
    return this.demService.demItems;
  }
  get ebp(): Ebp {
    return this.ebService.ebp;
  }
  get cats(): Array<Category> {
    return this.catService.cats;
  }
  get cat(): Category {
    return this.catService.cat;
  }

  public get catProduitsList(): Array<Product> {
    
    return this.prService._catProduitsList;
  }

  /**Getters & Setters */

  /**Util */
  public ebpValidation(libelle:string,qte:number):boolean{
    return UtilValidation.ebpValidation(libelle,qte);
  }
  saveDemmande(demmande: DemmandeDesPrix) {
   this.demService.saveDemmande(demmande);
  }
}
