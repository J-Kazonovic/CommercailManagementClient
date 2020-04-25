import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Ebp } from '../entity/ebp.model';
@Injectable({
  providedIn: 'root'
})
export class EbpService {


  private _ebpList: Array<Ebp>;
  private url="http://localhost:8090/ebproduits/";


  constructor(private ebHttp:HttpClient) { }


  
  /**Http Requests/Response*/
  getEbpByEb(ebID:number){
    return this.ebHttp.get<Array<Ebp>>(this.url+ebID);
  }
  /**Http Requests/Response*/
 
  /** Getter & Setter*/
  get ebpList(): Array<Ebp> {
    if(this._ebpList==null){
      this._ebpList=new Array<Ebp>();
    }
		return this._ebpList;
  }
  
  set ebpList(value: Array<Ebp>) {
		this._ebpList = value;
  }
  onEbpDelete(ebp:Ebp){
    const i=this.ebpList.findIndex(e=>e.produit===ebp.produit);
    if(i!==-1){
      this.ebpList.splice(i,1);
    }
  }
  public deleteProduct(ebp:Ebp) {
    this.ebHttp.delete<number>(this.url+ebp.produit).subscribe(
      data => {
        this.onEbpDelete(ebp);
      }, error => {
        console.log('erreur');
      }
    );
  }
  /** Getter & Setter*/


}
