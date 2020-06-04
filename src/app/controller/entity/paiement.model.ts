import { Achat } from './achat.model';

export class Paiement {

    public id:number;
    public montent:number;
    public paiementDate:string;
    public achat=new Achat();

}
