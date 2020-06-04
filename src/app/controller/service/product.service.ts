import { Injectable } from '@angular/core';
import { Product } from '../entity/product.model';
import { Category } from '../entity/category.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public _product:Product;
  public _products:Array<Product>;
  public _categoryList:Array<Category>;
  public _catProduitsList=new Array<Product>();

  private url="http://localhost:8090/produit/";

  constructor(private http:HttpClient) { }

  save(p:Product) {
    return this.http.post<number>(this.url, p);
  }
  update(p:Product){
    return this.http.put<number>(this.url, p);
  }

  delete(id:number){
    return this.http.delete<number>(this.url + id);
  }

  getAllProducts(page:number){
    return this.http.get<Array<Product>>(this.url+"?page="+page);
  }

  getProductByRef(produit:Product) {
    return this.http.get<Product>(this.url+"ref/"+produit.ref);
  }

  getAllCatProduct(libelle:string){
    return this.http.get<Array<Product>>(this.url+"cat/libelle/"+libelle);
  }



   /** getter & Setter*/
  public get product(): Product {
    if(this._product==null){
      this._product=new Product();
    }
		return this._product;
  }
  
  public set product(value: Product) {
		this._product = value;
  }

  public get products(): Array<Product> {
    if(this._products==null){
      return  new Array<Product>();
    }
    return this._products;
  }

  public set products(value:Array<Product>)  {
		this._products = value;
  } 


  public get catProduitsList(): Array<Product> {
    if(this._catProduitsList==null){
      return  new Array<Product>();
    }
    return this._catProduitsList;
  }

  public set catProduitsList(value:Array<Product>)  {
		this._catProduitsList = value;
  } 
  /** getter & Setter*/




  //Util 
  searchByLibelle(products: Array<Product>, libelle: string) {
    if (libelle.length > 0) {
      return products.filter(p => p.libelle.trim().toLowerCase().indexOf(libelle) > -1);
    } else {
      return products;
    }
  }

  filterByCat(products: Array<Product>, cat: string) {
    if (cat.length > 0) {
      return products.filter(p => p.cat.libelle === cat);
    } else {
      return products;
    }
  }

  filterByUnite(products: Array<Product>, unite: string) {
    if (unite.length > 0) {
      return products.filter(p => p.unite.libelle === unite);
    } else {
      return products;
    }
  }


}
