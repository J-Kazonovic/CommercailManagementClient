import { Component, OnInit, Input } from '@angular/core';
import { StockService } from 'src/app/controller/service/stock.service';
import { StockItem } from 'src/app/controller/entity/stock-item.model';
import { Stock } from 'src/app/controller/entity/stock.model';
import { ProductService } from 'src/app/controller/service/product.service';
import { Product } from 'src/app/controller/entity/product.model';
import { UtilList } from 'src/app/util/utillist.module';
import { StockItemService } from 'src/app/controller/service/stock-item.service';

@Component({
  selector: 'app-stock-create',
  templateUrl: './stock-create.component.html',
  styleUrls: ['./stock-create.component.css']
})
export class StockCreateComponent implements OnInit {

  constructor(private stockService: StockService) { }

  ngOnInit(): void {
  }

  onSaveStock() {
    this.stockService.onSaveStock();
  }

  deleteProduct(stockItem:StockItem) {
    UtilList.deleteFromListById(stockItem.produit.id,this.stockItems);
  }

  get stockItems(): Array<StockItem> {
    return this.stockService.stockItems;
  }

  get stock(): Stock {
    return this.stockService.stock;
  }
  
  
  
}
