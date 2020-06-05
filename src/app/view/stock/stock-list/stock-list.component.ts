import { Component, OnInit, Input } from '@angular/core';
import { Stock } from 'src/app/controller/entity/stock.model';
import { StockService } from 'src/app/controller/service/stock.service';
import { UtilList } from 'src/app/util/utillist.module';
import { StockItem } from 'src/app/controller/entity/stock-item.model';
import { StockItemService } from 'src/app/controller/service/stock-item.service';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  page = 0;
  pages: Array<number>;
  date: string;
  ref: string;
  searchKey = "";
  stockUpdate:Stock;
  stocksFiltered= new Array<Stock>();
  stocks= new Array<Stock>();
 
  constructor(private stockService: StockService,private stockItemServ: StockItemService) { }

  ngOnInit(): void {
    this.getAllStock();
  }

  onFilterAction() {
    this.stocksFiltered = this.stocks;
    this.stocksFiltered= this.stockService.searchByRef(this.stocksFiltered, this.searchKey);
  }

  setPage(i: number, event: any) {
    event.preventDefault()
    this.page = i;
    this.getAllStock();
  }

  getAllStock() {
    this.stockService.getAllStock(this.page).subscribe(
      data => {
        this.stocks = data["content"];
        this.stocksFiltered = data["content"];
        this.pages = new Array(data["totalPages"]);
      }, error => {
        console.log('erreur');
      }
    )
  }
  
  getStockByDate() {
     this.stockService.getStockByDate(this.date).subscribe(
      data => {
        this.stocks = data;
        this.stocksFiltered = data;
        console.log(data);
      }, error => {
        console.log('erreur');
      }
    );
  }

  onStockDelete(stock:Stock){
    this.stockService.deleteStock(stock.id).subscribe(
      data=>{
        if(data==1){
          UtilList.deleteFromListById(stock.id,this.stocks);
        }
      },error=>{
        console.log(error);
      }
    )
  }
 
  onAddItemUpdate(){
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

  updateStock() {
    this.stockUpdate.stockItems=this.stockItems;
    console.log(this.stockUpdate);
    this.stockService.updateStock(this.stockUpdate);
  }

  findStockByRef() {
    this.stockService.findStockByRef(this.ref);
  }

  public findStockItemByStockRef(stock:Stock) {
    this.stockUpdate=stock
    this.stockService.findStockItemByStockRef(stock.ref);
  }

  get stock(): Stock {
    return this.stockService.stock;
  }

  get stockItems(): Array<StockItem> {
    return this.stockService.stockItems;
  }

  get item(): StockItem {
    return this.stockService.item;
  }

}