import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Facture } from '../entity/Facture.model';

@Injectable({
  providedIn: 'root'
})
export class FactureService {

  private url="http://localhost:8090/factures/";


  constructor(private http:HttpClient) { }


  save(p:Facture) {
    return this.http.post<number>(this.url, p);
  }
  update(p:Facture){
    return this.http.put<number>(this.url, p);
  }

  delete(id:number){
    return this.http.delete<number>(this.url + id);
  }

  getAllFactures(page:number){
    return this.http.get<Array<Facture>>(this.url);
  }

  getFactureByRef(ref:string) {
    return this.http.get<Array<Facture>>(this.url+ "ref/" + ref);
  }
}
