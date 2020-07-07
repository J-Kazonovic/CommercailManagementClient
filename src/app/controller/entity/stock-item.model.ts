
import { Product } from './product.model';
import { Stock } from './stock.model';

export class StockItem {
    id:number;
    ref:string;
    qteStock:number;
    qtFinal:number;
	produit=new Product();
    stock=new Stock();
    constructor() {
        this.qtFinal = 0;
      }
}