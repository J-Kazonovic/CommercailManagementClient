import { Category } from './category.model';
import { Unite } from './unite.model';

export class Product {
    public id:number;
    public ref:string;
    public qte:number;
    public libelle:string;
    public qteStock:number;
    public prix:number;
    public unite=new Unite();
    public cat=new Category();
}
