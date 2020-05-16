import { Category } from './category.model';

export class Product {
    public id:number;
    public ref:string;
    public qte:number;
    public libelle:string;
    public prix:number;
    public cat=new Category();
}
