import { Component, OnInit, Input } from '@angular/core';
import { AchatItem } from 'src/app/controller/entity/achat-item.model';
import { EbService } from 'src/app/controller/service/eb.service';
import { CategoryService } from 'src/app/controller/service/category.service';
import { ProductService } from 'src/app/controller/service/product.service';
import { AchatService } from 'src/app/controller/service/achat.service';
import { Category } from 'src/app/controller/entity/category.model';
import { Product } from 'src/app/controller/entity/product.model';

@Component({
  selector: 'app-achat-item-form',
  templateUrl: './achat-item-form.component.html',
  styleUrls: ['./achat-item-form.component.css']
})
export class AchatItemFormComponent implements OnInit {

  item=new AchatItem();
  @Input() items=new Array<AchatItem>();

  catLib:string;


  constructor(private achatService: AchatService
    ,private catService: CategoryService
    ,private prService:ProductService) { }

  ngOnInit(): void {
  }

  getProductBycat(){
    this.prService.getAllCatProduct(this.catLib).subscribe(
      data=>{
        this.prService.catProduitsList=data;
      },error=>{
        console.log(error);
      }
    )
  }

  onAddItem(){
    this.item.produit.cat.libelle=this.catLib;
      if (this.item != null) {
        this.items.push(this.item);
      }
  }

  findAllCats( ) {
    this.catService.findAll();  
  }

  public get catProduitsList(): Array<Product> {
    return this.prService._catProduitsList;
  }
  get cats(): Array<Category> {
    return this.catService.cats;
  }
  get cat(): Category {
    return this.catService.cat;
  }
 




}
