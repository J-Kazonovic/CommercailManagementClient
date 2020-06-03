import { Component, OnInit } from '@angular/core';
import { Stock } from 'src/app/controller/entity/stock.model';
import { StockService } from 'src/app/controller/service/stock.service';
import { UtilList } from 'src/app/util/utillist.module';
import { StockItem } from 'src/app/controller/entity/stock-item.model';

@Component({
  selector: 'app-stock-list',
  templateUrl: './stock-list.component.html',
  styleUrls: ['./stock-list.component.css']
})
export class StockListComponent implements OnInit {
  date: string;
  ref: string;
  refer:string
  stock="";
  stockList= new Array<Stock>();
  constructor(private stockService: StockService) { }

  ngOnInit(): void {
    this.stockService.getAllStock();
  }
  get stocks(): Array<Stock> {
  
    return this.stockService.stocks;
  }
  getAllStock() {
    this.stockService.getAllStock();
  }
  getStockByDate() {
    this.stockService.getStockByDate(this.date);
  }
  getStockByRef() {
    this.stockService.getStockByRef(this.ref);
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
  findStockItemByRef(ref: string) {
    this.stockService.findStockItemByRef(ref);
  }
  get stockItems(): Array<StockItem> {
    return this.stockService.stockItems;
  }
  findStockByRef(stock:Stock) {
    this.stockService.findStockByRef(stock);
  }
}
