import { Injectable } from '@angular/core';
import { Stock } from '../entity/stock.model';
import { StockItem } from '../entity/stock-item.model';
import { HttpClient } from '@angular/common/http';
import { StockItemService } from './stock-item.service';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private url = "http://localhost:8090/stocks/";

  private _stock: Stock;
  private _item: StockItem;
  private _stockItems: Array<StockItem>;
  private _stocks: Array<Stock>;

  constructor(private http: HttpClient,private stockItemService:StockItemService) { }

  get item(): StockItem {
    if (this._item == null) {
      this._item = new StockItem();
    }
    return this._item;
  }
  set item(value: StockItem) {
    this._item = value;
  }
  saveStock() {
    this.http.post<number>(this.url, this.stock).subscribe(
      data => {
        if (data > 0) {
          this.stock = null;
          this.getAllStock();
        }
      }, error => {
        console.log(error);
      }
    );
  }

 

  deleteStock(stockId: number) {
    return this.http.delete<number>(this.url + "id/" + stockId)
  }

  getAllStock() {
    this.http.get<Array<Stock>>(this.url).subscribe(
      data => {
        this.stocks = data;
      }, error => {
        console.log('erreur');
      }
    );
  }
  //Events
  onAddItem(item:StockItem) {
    this.stock.qteInitiale+=this.item.produit.qte;
    this.item.qtFinal =this.item.produit.qte;
      this.stock.stockItems.push(this.cloneStock(this.item));
      this.item=null;
  }
  private cloneStock(stockItem: StockItem) {
    const myClone = new StockItem();
    myClone.id= stockItem.id;
    myClone.ref= stockItem.ref;
    myClone.qtAlerte= stockItem.qtAlerte;
    myClone.qtFinal= stockItem.qtFinal;
    myClone.stock= stockItem.stock;
    myClone.produit= stockItem.produit;
    return myClone;
  }
  //Events
  getStockByDate(date: String) {
    return this.http.get<Array<Stock>>(this.url + "date/" + date).subscribe(
      data => {
        this.stocks = data;
        console.log(data);
      }, error => {
        console.log('erreur');
      }
    );
  }
  findProductByRef(stock:StockItem) {
    this.http.get<Array<StockItem>>("http://localhost:8090/stockItems/"+"produit/ref/"+stock.produit.ref).subscribe(
      data => {
        console.log(data);
        this.stockItems = data;
      }, error => {
        console.log('erreur');
      }
    );
  }
  findStockItemByRef(ref:string) {
    this.http.get<Array<StockItem>>("http://localhost:8090/stockItems/"+"stock/ref/"+ref).subscribe(
      data => {
        console.log(data);
        this.stockItems = data;
      }, error => {
        console.log('erreur');
      }
    );
  }
  findStockByRef(stock:Stock) {
    this.http.get<Stock>(this.url +"ref/"+stock.ref).subscribe(
      data => {
        console.log(data);
        this.stock = data;
      }, error => {
        console.log('erreur');
      }
    );
  }
  getStockByRef(ref: String) {
    return this.http.get<Stock>(this.url + "ref/" + ref).subscribe(
      data => {
        console.log(data);
        this.stock = data;
        console.log(data);
      }, error => {
        console.log('erreur');
      }
    );
  }


  get stock(): Stock {
    if (this._stock == null) {
      this._stock = new Stock();
    }
    return this._stock;
  }
  set stock(value: Stock) {
    this._stock = value;
  }

  get stockItems(): Array<StockItem> {
    if (this._stockItems == null) {
      this._stockItems = new Array<StockItem>();
    }
    return this._stockItems;
  }
  set stockItems(value: Array<StockItem>) {
    this._stockItems = value;
  }
  get stocks(): Array<Stock> {
    if (this._stocks == null) {
      this._stocks = new Array<Stock>();
    }
    return this._stocks;
  }
  set stocks(value: Array<Stock>) {
    this._stocks = value;
  }
}
