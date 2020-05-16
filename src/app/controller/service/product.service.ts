import { Injectable } from '@angular/core';
import { Product } from '../entity/product.model';
import { Category } from '../entity/category.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  public _product:Product;
  public _categoryList:Array<Category>;
  public _catProduitsList=new Array<Product>();

  private url="http://localhost:8090/produit/";

  constructor(private produitHttp:HttpClient) { }

  saveProduct() {
    this.produitHttp.post<number>(this.url, this.product).subscribe(
      data => {
        if (data == 1) {
          this.product = null;
        }
      }, error => {
        console.log(error);
      }
    );
  }


  public getAllCatProduct(libelle:string){
    this.produitHttp.get<Array<Product>>(this.url+"cat/libelle/"+libelle).subscribe(
      data=>{

        this.catProduitsList=data;
      },error=>{
        console.log("Error:"+error);
      }
    )
  }



   /** getter & Setter*/
  public get product(): Product {
    if(this._product==null){
      return new Product();
    }
		return this._product;
  }
  
  public set product(value: Product) {
		this._product = value;
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
}
