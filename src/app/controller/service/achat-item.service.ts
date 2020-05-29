import { Injectable } from '@angular/core';
import { AchatItem } from '../entity/achat-item.model';
import { HttpClient } from '@angular/common/http';
import { Product } from '../entity/product.model';

@Injectable({
  providedIn: 'root'
})
export class AchatItemService {

  private url="http://localhost:8090/achatItems/";

  

  constructor(private http: HttpClient) { }


  getAllAchatItems(){
    return this.http.get<Array<AchatItem>>(this.url);
  }

  getAchatItemsByAchat(achatRef:string){
    return this.http.get<Array<AchatItem>>(this.url+"achat/ref/"+ achatRef);
  }

  deleteAchatItem(achatItem:AchatItem) {
    return this.http.delete<number>(this.url + achatItem.id);
  }


}
