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
  date: string;
  ref: string;
  reference ="";
  stockLists= new Array<Stock>();
  stockList= new Array<Stock>();
  sList=new Array<Stock>();
  stockUpdate:Stock;
  stockListItems =new Array<StockItem>();
  constructor(private stockService: StockService,private stockItemServ: StockItemService) { }

  ngOnInit(): void {
    this.stockService.getAllStock();
  }
  onFilterAction() {
    this.stockList = this.sList;
    this.stockList=this.stockService.searchByRef(this.stockList,this.reference);
    console.log(this.stockList);
  }
  get stocks(): Array<Stock> {
    return this.stockService.stocks;
  }
  get stockLs(): Array<Stock> {
    return this.stockService.stockLs;
  }
  get stock(): Stock {
    return this.stockService.stock;
  }
  getAllStock() {
    this.stockService.getAllStock();
  }
  getStockByDate() {
    this.stockService.getStockByDate(this.date);
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
  get item(): StockItem {
    return this.stockService.item;
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
    this.stock.stockItems=this.stockItems;
    this.stockService.updateStock(this.stock);
  }
  public addProduitOnUpdateStock() {
    this.stockListItems=this.stockUpdate.stockItems;
    console.log(this.stockUpdate.stockItems);
    this.stockService.addProduitOnUpdateStock(this.stockUpdate);
  }
  onStockItemShow(stock:Stock) {
    this.stockItemServ.getStockItemByStock(stock.id).subscribe(
      data => {
        this.stockListItems = data;
        console.log(data);
      }
    );
  }
  findStockItemByRef(ref: string) {
    this.stockService.findStockItemByRef(ref);
  }
  get stockItems(): Array<StockItem> {
    return this.stockService.stockItems;
  }
  findStockByRef() {
    this.stockService.findStockByRef(this.ref);
  }
  public findStockItemByStockRef(stock:Stock) {
    this.stockService.findStockItemByStockRef(stock.ref);
  }
}