import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/controller/service/category.service';
import { ProductService } from 'src/app/controller/service/product.service';
import { Category } from 'src/app/controller/entity/category.model';
import { Product } from 'src/app/controller/entity/product.model';
import { Unite } from 'src/app/controller/entity/unite.model';
import { UniteService } from 'src/app/controller/service/unite.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  catLib: string;
  uniteLib: string;

  constructor(private catService: CategoryService
    , private prService: ProductService
    , private uService: UniteService) { }


  ngOnInit() {
    this.getAllCats();
    this.getAllUnites();
  }

  saveProduct() {
    this.prService.save(this.product).subscribe(
      data=>{

      },error=>{

      }
    )
  }

  getAllUnites() {
    this.uService.findAll();
  }
  
  getAllCats() {
    this.catService.findAll();
  }

  findCategoryByLibelle() {
    this.catService.findCategoryByLibelle(this.product.cat);
  }


  public get product(): Product {
    return this.prService.product;
  }

  get cat(): Category {
    return this.catService.cat;
  }
  get cats(): Array<Category> {
    return this.catService.cats;
  }
  get unite(): Unite {
    return this.uService.unite;
  }
  get unites(): Array<Unite> {
    return this.uService.unites;
  }





}
