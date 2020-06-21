import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Category } from '../entity/category.model';


@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  url="http://localhost:8090/category/";
  private _cat: Category;
  private _cats: Array<Category>;

  constructor(private catHttp:HttpClient) { }

  save() {
    this.catHttp.post<number>(this.url, this.cat).subscribe(
      data => {
        if (data == 1) {
          this.cat = null;
          this.findAll();
        }
      }, error => {
        console.log(error);
      }
    );
  }

  findAll() {
    this.catHttp.get<Array<Category>>(this.url).subscribe(
      data => {
        this.cats = data;
      }, error => {
        console.log(error);
      }
    );
  }

  findCategoryByLibelle(category: Category ) {
    this.catHttp.get<Category>(this.url+"libelle/"+category.libelle).subscribe(
      data => {
        this.cat = data;
        }, error => {
        console.log(error);
      }
    );
  }








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

 

}


