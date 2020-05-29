import { Category } from './category.model';
import { Unite } from './unite.model';

export class Product {
    public id:number;
    public libelle:string;
    public ref:string;
    public qteStock:number;
    public prix:number;
    public unite=new Unite();
    public cat=new Category();
}
