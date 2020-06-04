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
  private _stockRef: Stock;
  private _stock: Stock;
  private _item: StockItem;
  private _stockItems: Array<StockItem>;
  private _stocks: Array<Stock>;
  private _stockLs: Array<Stock>;
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
  saveStock(stock:Stock) {
    this.http.post<number>(this.url, stock).subscribe(
      data => {
        if (data == 1) {
          this.stockItems=null;
          this.stock = null;
          this.getAllStock();
        }
      }, error => {
        console.log(error);
      }
    );
  }
  updateStock(stock:Stock) {
    this.http.put<number>(this.url, stock).subscribe(
      data => {
        if (data == 1) {
          this.stockItems=null;
          this.stock = null;
          this.getAllStock();
        }
      }, error => {
        console.log(error);
      }
    );
  }
  onSaveStock() {
    this.stock.stockItems = this.stockItems;
    this.saveStock(this.stock);
  }
  public addProduitOnUpdateStock(c: Stock) {
      this.stockItems.push(this.cloneStock(this.item));
      this.item= null;
  }
  updateAchat(stock:Stock) {
    return this.http.put<number>(this.url, stock).subscribe(
      data => {
        console.log(data);
        }, error => {
        console.log('erreur');
      }
    );
  }
  deleteStock(stockId: number) {
    return this.http.delete<number>(this.url + "id/" + stockId)
  }
  public findStockItemByStockRef(ref:string) {
    this.http.get<Array<StockItem>>("http://localhost:8090/stockItems/"+ "stock/ref/" + ref).subscribe(
      data => {
        this.stockItems = data;
        console.log(data);
      }
    );
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
  searchByRef(sList: Array<Stock>, ref: string) {
    if (ref.length > 0) {
      return sList.filter(eb => eb.ref === ref);
    } else {
      return sList;
    }
  }

  //Events
   onAddItem() {
    this.stock.qteInitiale+=this.item.qteStock;
    this.item.qtFinal =this.item.qteStock;
      this.stockItems.push(this.cloneStock(this.item));
      this.item= null;
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
  findStockByRef(ref:string) {
    this.http.get<Array<Stock>>(this.url +"ref/"+ref).subscribe(
      data => {
        console.log(data);
        this.stocks = data;
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
  get stockRef(): Stock {
    if (this._stockRef == null) {
      this._stockRef = new Stock();
    }
    return this._stockRef;
  }
  set stockRef(value: Stock) {
    this._stockRef = value;
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
  get stockLs(): Array<Stock> {
    if (this._stockLs == null) {
      this._stockLs = new Array<Stock>();
    }
    return this._stockLs;
  }
  set stockLs(value: Array<Stock>) {
    this._stockLs = value;
  }
}
