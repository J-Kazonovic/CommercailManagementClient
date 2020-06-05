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
  page:number;
  constructor(private http: HttpClient,private stockItemService:StockItemService) { }

  
  saveStock(stock:Stock) {
    this.http.post<number>(this.url, stock).subscribe(
      data => {
        if (data == 1) {
          this.stockItems=null;
          this.stock = null;
          this.getAllStock(this.page);
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
          this.getAllStock(this.page);
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

  getAllStock(page:number) {
    return this.http.get<Array<Stock>>(this.url+"?page="+page);
  }

  getStockByDate(date: String) {
    return this.http.get<Array<Stock>>(this.url + "date/" + date);
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
  
  searchByRef(stocks: Array<Stock>, ref: string) {
    if (ref.length > 0) {
      return stocks.filter(stock => stock.ref.trim().toLowerCase().indexOf(ref) > -1);
    } else {
      return stocks;
    }
  }

  get item(): StockItem {
    if (this._item == null) {
      this._item = new StockItem();
    }
    return this._item;
  }
  set item(value: StockItem) {
    this._item = value;
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
