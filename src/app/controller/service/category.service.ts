import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../entity/category.model';
import { Product } from '../entity/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private url:"http://localhost:8090/category/";
  private _cat: Category;
  private _cats: Array<Category>;

  get cat(): Category {
    if (this._cat == null) {
      this._cat = new Category();
    }
    return this._cat;
  }

  set cat(value: Category) {
    this._cat = value;
  }
  get cats(): Array<Category> {
    if (this._cats == null) {
      this._cats = new Array<Category>();
    }
    return this._cats;
  }

  set cats(value: Array<Category>) {
    this._cats = value;
  }

  constructor(private catHttp:HttpClient) { }

  findCategoryByLibelle(category: Category ) {
    this.catHttp.get<Category>(this.url+"libelle/"+category.libelle).subscribe(
      data => {
        this.cat = data;
        }, error => {
        console.log(error);
      }
    );
  }
  public findAll() {
    this.catHttp.get<Array<Category>>(this.url).subscribe(
      data => {
        this.cats = data;
      }, error => {
        console.log('erreur');
      }
    );
  }

}


