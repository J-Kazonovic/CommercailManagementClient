import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StockItem } from '../entity/stock-item.model';

@Injectable({
  providedIn: 'root'
})
export class StockItemService {

  private url="http://localhost:8090/stockItems/";

  private _item: StockItem;
  private _items: Array<StockItem>;
  constructor(private http: HttpClient) { }
  get item(): StockItem {
    if (this._item == null) {
      this._item = new StockItem();
    }
    return this._item;
  }
  set item(value: StockItem) {
    this._item = value;
  }
  get items(): Array<StockItem> {
    if (this._items == null) {
      this._items = new Array<StockItem>();
    }
    return this._items;
  }
  set items(value: Array<StockItem>) {
    this._items = value;
  }
  getAllStockItems(){
    return this.http.get<Array<StockItem>>(this.url);
  }
  
}