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


  
  /**Http*/
  getEbpByEb(ebID:number){
    return this.ebHttp.get<Array<Ebp>>(this.url+ebID);
  }

  deleteProduct(ebp:Ebp) {
    this.ebHttp.delete<number>(this.url+"libelle/"+ ebp.produit.libelle).subscribe(
      data => {
        this.onEbpDelete(ebp,this.ebpList);
      }, error => {
        console.log(error);
      }
    );
  }
  /**Http*/
 
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
  /** Getter & Setter*/

  onEbpDelete(ebp:Ebp,ebpList:Array<Ebp>){
    const i=ebpList.findIndex(e=>e.produit.libelle===ebp.produit.libelle);
    if(i!==-1){
      ebpList.splice(i,1);
    }
  }


}
