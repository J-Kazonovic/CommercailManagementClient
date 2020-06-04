import { Component, OnInit, Input } from '@angular/core';
import { Category } from 'src/app/controller/entity/category.model';
import { Product } from 'src/app/controller/entity/product.model';
import { ProductService } from 'src/app/controller/service/product.service';
import { CategoryService } from 'src/app/controller/service/category.service';
import { StockService } from 'src/app/controller/service/stock.service';
import { StockItem } from 'src/app/controller/entity/stock-item.model';
import { Stock } from 'src/app/controller/entity/stock.model';

@Component({
  selector: 'app-stock',
  templateUrl: './stock.component.html',
  styleUrls: ['./stock.component.css']
})
export class StockComponent implements OnInit {
  @Input() items=new Array<StockItem>();

  catLib:string;


  constructor(private catService: CategoryService
    ,private prService:ProductService,private stockService: StockService) { }

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
  get item(): StockItem {
    return this.stockService.item;
  }
  get stockItems(): Array<StockItem> {
    return this.stockService.stockItems;
  }
  onAddItem(){
    this.item.produit.cat.libelle=this.catLib;
    this.stock.qteInitiale+=this.item.qteStock;
    this.item.qtFinal =this.item.qteStock;
      if (this.item != null) {
        this.stockItems.push(this.cloneStock(this.item));
      }
  }

  private cloneStock(stockItem: StockItem) {
    const myClone = new StockItem();
    myClone.id= stockItem.id;
    myClone.ref= stockItem.ref;
    myClone.qteStock= stockItem.qteStock;
    myClone.qtAlerte= stockItem.qtAlerte;
    myClone.qtFinal= stockItem.qtFinal;
    myClone.stock= stockItem.stock;
    myClone.produit= stockItem.produit;
    return myClone;
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
  get stock(): Stock {
    return this.stockService.stock;
  }

}
