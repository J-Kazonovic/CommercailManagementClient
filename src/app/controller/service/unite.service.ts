import { Injectable } from '@angular/core';
import { Unite } from '../entity/unite.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UniteService {
  url="http://localhost:8090/unite/";
  private _unite: Unite;
  private _unites: Array<Unite>;

  constructor(private httpClient:HttpClient) { }


  save() {
    this.httpClient.post<number>(this.url, this.unite).subscribe(
      data => {
        if (data == 1) {
          this.unite = null;
          this.findAll();
        }
      }, error => {
        console.log(error);
      }
    );
  }
  findUniteByLibelle(libelle: string) {
    this.httpClient.get<Unite>(this.url+"libelle/"+ libelle).subscribe(
      data => {
        this.unite = data;
        }, error => {
        console.log(error);
      }
    );
  }
  findAll() {
    this.httpClient.get<Array<Unite>>(this.url).subscribe(
      data => {
        this.unites = data;
      }, error => {
        console.log(error);
      }
    );
  }


  get unite(): Unite {
    if (this._unite == null) {
      this._unite = new Unite();
    }
    return this._unite;
  }

  set unite(value: Unite) {
    this._unite = value;
  }

  get unites(): Array<Unite> {
    if (this._unites == null) {
      this._unites = new Array<Unite>();
    }
    return this._unites;
  }

  set unites(value: Array<Unite>) {
    this._unites = value;
  }


}
