import { Eb } from './eb.model';
import { Product } from './product.model';
import { Ebp } from './ebp.model';
import { Achat } from './achat.model';
import { AchatitemEbpLink } from './achatitem-ebp-link.model';

export class AchatItem {
	
	id:number;
	
    produit=new Product();
	achat=new Achat();

	totalPrice:number;
	unitPrice:number;
	qteCommander:number;
	qteRecu:number;

	ebLinks=new Array<AchatitemEbpLink>();

}
