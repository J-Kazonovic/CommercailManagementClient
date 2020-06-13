import { Fournisseur } from './fournisseur.model';
import { AchatItem } from './achat-item.model';
import { Personnel } from './personnel.model';
import { Ebp } from './ebp.model';

export class Achat {

    id:number;
    ref:string;
    statut:string;
    modePaiment:string;
    dateLivraison:string;
    dateCommande:string;

    comptable=new Personnel();
    fournisseur=new Fournisseur();
    achatItems=new Array<AchatItem>();

    total:number;// Total Si l'achat devient une Bon de Commande
	totalPaier:number;// totalPaier=totalPaier + montentPaiment
    totalRester:number;// totalRester=total-totalPaier

}
