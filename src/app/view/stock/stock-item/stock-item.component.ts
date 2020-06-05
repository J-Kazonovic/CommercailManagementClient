import { Component, OnInit, Input } from '@angular/core';
import { StockService } from 'src/app/controller/service/stock.service';
import { Stock } from 'src/app/controller/entity/stock.model';
import { Category } from 'src/app/controller/entity/category.model';
import { Unite } from 'src/app/controller/entity/unite.model';
import { CategoryService } from 'src/app/controller/service/category.service';
import { ProductService } from 'src/app/controller/service/product.service';
import { UniteService } from 'src/app/controller/service/unite.service';
import { StockItem } from 'src/app/controller/entity/stock-item.model';
import { StockItemService } from 'src/app/controller/service/stock-item.service';
import { Product } from 'src/app/controller/entity/product.model';
import { UtilList } from 'src/app/util/utillist.module';

@Component({
  selector: 'app-stock-item',
  templateUrl: './stock-item.component.html',
  styleUrls: ['./stock-item.component.css']
})
export class StockItemComponent implements OnInit {
  catLib:string;
  uniteLib:string;
  prLib:string;
  constructor(private stockService: StockService,private catService: CategoryService
    ,private prService:ProductService
    ,private uService:UniteService) { }

    ngOnInit() {
      this.getAllCats();
      this.getAllUnites();
    }
  
    getAllUnites(){
      this.uService.findAll();
    }
  
    getAllCats( ) {
      this.catService.findAll();  
    }
    getProductBycat(){
      this.prService.getAllCatProduct(this.catLib);
    }
    findCategoryByLibelle() {
      this.catService.findCategoryByLibelle(this.product.cat);
    }
    onRemoveItem(item:StockItem){
      UtilList.deleteFromListByLibelle2(item.produit.libelle,this.stockItems);
    }
    get cats(): Array<Category> {
      return this.catService.cats;
    }
    get cat(): Category {
      return this.catService.cat;
    }
  
    get unite(): Unite {
      return this.uService.unite;
   }
  
   get unites(): Array<Unite> {
     return this.uService.unites;
   }
  public get catProduitsList(): Array<Product> { 
      return this.prService._catProduitsList;
    }
    public get product(): Product {
      return this.prService.product;
    }
  
  get stock(): Stock {
    return this.stockService.stock;
  }
 
get stockItems(): Array<StockItem> {
  return this.stockService.stockItems;
}
}
