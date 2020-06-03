import { Personnel } from './personnel.model';
import { StockItem } from './stock-item.model';

export class Stock {
    id:number;
	ref:string;
	qteInitiale:number;
	dateResu:string;
    comptable=new Personnel();
    stockItems= new Array<StockItem>();
    constructor() {
        this.qteInitiale = 0;
      }
}
