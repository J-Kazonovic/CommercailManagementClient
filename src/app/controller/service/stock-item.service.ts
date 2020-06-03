import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StockItem } from '../entity/stock-item.model';

@Injectable({
  providedIn: 'root'
})
export class StockItemService {

  private url="http://localhost:8090/stockItems/";

  private _item: StockItem;

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

  getAllStockItems(){
    return this.http.get<Array<StockItem>>(this.url);
  }

  getStockItemsByStock(stockRef:string){
    return this.http.get<Array<StockItem>>(this.url+"stock/ref/"+ stockRef);
  }

  deleteStockItem(stockItem:StockItem) {
    return this.http.delete<number>(this.url + stockItem.id);
  }
  
}
