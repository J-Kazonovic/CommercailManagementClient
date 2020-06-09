import { Achat } from './achat.model';
import { Facture } from './Facture.model';

export class Paiement {

    public id:number;
    public montent:number;
    public paiementDate:string;
    public facture=new Facture();

}
