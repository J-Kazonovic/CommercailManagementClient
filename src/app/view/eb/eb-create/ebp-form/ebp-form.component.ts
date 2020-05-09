import { Component, OnInit } from '@angular/core';
import { EbService } from 'src/app/controller/service/eb.service';
import { Eb } from 'src/app/controller/entity/eb.model';
import { Category } from 'src/app/controller/entity/category.model';
import { Ebp } from 'src/app/controller/entity/ebp.model';
import { CategoryService } from 'src/app/controller/service/category.service';
import { ProductService } from 'src/app/controller/service/product.service';
import { Product } from 'src/app/controller/entity/product.model';
import { UtilValidation } from 'src/app/util/utilvalidation.module';

@Component({
  selector: 'app-ebp-form',
  templateUrl: './ebp-form.component.html',
  styleUrls: ['./ebp-form.component.css']
})
export class EbpFormComponent implements OnInit {

  catLib:string;



  constructor(private ebService: EbService
    ,private catService: CategoryService
    ,private prService:ProductService) { }


  ngOnInit() {
    this.findAll();
  }

  getProductBycat(){
    this.prService.getAllCatProduct(this.catLib);
  }

  onProductAdd(){
    this.ebService.onAddEbp();
  }

  findAll( ) {
    this.catService.findAll();  
  }


  /**Getters & Setters */

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
  /**Util */
  
}
