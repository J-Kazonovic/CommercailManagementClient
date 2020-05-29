import { Injectable } from '@angular/core';
import { Fournisseur } from '../entity/fournisseur.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FournisseurService {

  private url = "http://localhost:8090/fournisseur/";

  private _fournisseur:Fournisseur;
  private _fournList:Array<Fournisseur>;
  
  constructor(private http: HttpClient) { }

  save(){
    this.http.post<number>(this.url,this.fournisseur).subscribe(
      data=>{
        if(data==1){
           this.fournisseur = null;
        }
      },error=>{
        console.log(error);
      }
    )
  }

  update(f:Fournisseur){
    return this.http.put<number>(this.url,f);
  }

  delete(f:Fournisseur){
    return this.http.delete<number>(this.url+f.id);
  }


  getAllFournisseur(){
    return this.http.get<Array<Fournisseur>>(this.url);
  }

  getfournByNom(nom: string) {
    return this.http.get<Fournisseur>(this.url + "nom/" + nom);
  }

  searchByTerm(term: string) {
    return this.http.get<Array<Fournisseur>>(this.url + "term/" + term);
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

	public get fournisseur(): Fournisseur {
    if(this._fournisseur==null){
      this._fournisseur=new Fournisseur();
    }
		return this._fournisseur;
	}
	public set fournisseur(value: Fournisseur) {
		this._fournisseur = value;
	}
  

  
}

