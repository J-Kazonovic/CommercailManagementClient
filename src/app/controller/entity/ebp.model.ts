import { Eb } from './eb.model';
import { Product } from './product.model';

export class Ebp {
	id:number;
    produit=new Product();
	eb=new Eb();
	qteDemande:number;
	qteAccorde:number;
	qteAchete:number;
	product_desc:string;
	besoin_statut:string;
}
