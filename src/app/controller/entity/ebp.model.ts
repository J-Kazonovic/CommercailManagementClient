import { Eb } from './eb.model';
import { Product } from './product.model';

export class Ebp {
    produit=new Product();
	eb:Eb;
	qteDemande:number;
	qteAccorde:number;
	qteAchete:number;
	product_desc:string;
}
