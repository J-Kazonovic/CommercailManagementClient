import { Achat } from './achat.model';

export class Facture {
    
	id:number;
	ref:string;
	dateDeFac:string;
	etat:string;
	achat=new Achat() ;
}
