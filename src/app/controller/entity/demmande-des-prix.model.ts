import { Depcompt } from './depcompt.model';
import { Fournisseur } from './fournisseur.model';
import { DemmandeDesPrixItem } from './demmande-des-prix-item.model';
import { Personnel } from './personnel.model';
import { Ebp } from './ebp.model';

export class DemmandeDesPrix {
    public id:number;
    public ref:string;
    public comptable=new Personnel();
    public fournisseur=new Fournisseur();
    public demmandeItem=new Array<DemmandeDesPrixItem>();
    ebp=new Ebp();
}
