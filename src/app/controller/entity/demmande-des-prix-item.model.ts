import { DemmandeDesPrix } from './demmande-des-prix.model';
import { Eb } from './eb.model';
import { Product } from './product.model';

export class DemmandeDesPrixItem {
    public id:number;
    public qteCommander:number;
    public qteLivrer:number;
    public demmande=new DemmandeDesPrix();
    public produit=new Product();
}
