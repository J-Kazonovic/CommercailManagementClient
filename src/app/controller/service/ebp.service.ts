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

  getAllEbp(){
    return this.ebHttp.get<Array<Ebp>>(this.url);
  }

  getEbpByEb(ebID:number){
    return this.ebHttp.get<Array<Ebp>>(this.url+ebID);
  }

  deleteEbp(ebp:Ebp) {
    return this.ebHttp.delete<number>(this.url + ebp.id);
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

  

}
