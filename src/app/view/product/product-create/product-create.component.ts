import { Component, OnInit } from '@angular/core';
import { UtilValidation } from 'src/app/util/utilvalidation.module';
import { Category } from 'src/app/controller/entity/category.model';
import { EbService } from 'src/app/controller/service/eb.service';
import { CategoryService } from 'src/app/controller/service/category.service';
import { ProductService } from 'src/app/controller/service/product.service';
import { Ebp } from 'src/app/controller/entity/ebp.model';
import { Product } from 'src/app/controller/entity/product.model';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  catLib:string;



  constructor(private catService: CategoryService
    ,private prService:ProductService) { }


  ngOnInit() {
    this.findAll();
  }

  getProductBycat(){
    this.prService.getAllCatProduct(this.catLib);
  }
  findAll( ) {
    this.catService.findAll();  
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

  saveProduct() {
    this.prService.saveProduct();
  }
  public get product(): Product {
		return this.prService.product;
  }
  findCategoryByLibelle() {
    this.catService.findCategoryByLibelle(this.product.cat);
  }
}
