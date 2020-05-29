import { Eb } from './eb.model';
import { Product } from './product.model';
import { Ebp } from './ebp.model';
import { Achat } from './achat.model';

export class AchatItem {
	
	id:number;
	
    produit=new Product();
	achat=new Achat();

	totalPrice:number;
	qteCommander:number;
	qteRecu:number;


}
