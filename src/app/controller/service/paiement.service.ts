import { Injectable } from '@angular/core';
import { Paiement } from '../entity/paiement.model';
import { Category } from '../entity/category.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
  private  _paiement:Paiement;
  

  private url="http://localhost:8090/paiement/";

  constructor(private http:HttpClient) { }

  save(p:Paiement) {
    return this.http.post<number>(this.url, p);
  }
  update(p:Paiement){
    return this.http.put<number>(this.url, p);
  }

  delete(id:number){
    return this.http.delete<number>(this.url + id);
  }

  getAllPaiements(page:number){
    return this.http.get<Array<Paiement>>(this.url);
  }

  getPaiementByFactureRef(ref:string) {
    return this.http.get<Array<Paiement>>(this.url+ "facture/ref/" + ref);
  }




	public get paiement(): Paiement {
    if(this._paiement==null) {
      this._paiement=new Paiement();
    }
		return this._paiement;
	}


	public set paiement(value: Paiement) {
		this._paiement = value;
	}
  
  

}
