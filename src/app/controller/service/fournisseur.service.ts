import { Injectable } from '@angular/core';
import { Fournisseur } from '../entity/fournisseur.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {
  private url = "http://localhost:8090/fournisseur/";
  private _fournList:Array<Fournisseur>;
  constructor(private http: HttpClient) { }

  getAllFournisseur(){
    this.http.get<Array<Fournisseur>>(this.url).subscribe(
      data => {
        this.fournList = data;

      }, error => {
        console.log("error" + error);
      }
    );
  }

  public get fournList(): Array<Fournisseur> {
    if (this._fournList == null) {
      this._fournList = new Array<Fournisseur>();
    }
		return this._fournList;
	}
   
	public set fournList(value: Array<Fournisseur>) {
		this._fournList = value;
  }
  getfournByNom(nom: string) {
    return this.http.get<Fournisseur>(this.url + "nom/" + nom);
  }
}

