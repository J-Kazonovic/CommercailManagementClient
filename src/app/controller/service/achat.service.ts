import { Injectable } from '@angular/core';
import { Achat } from '../entity/achat.model';
import { AchatItem } from '../entity/achat-item.model';
import { HttpClient } from '@angular/common/http';
import { Ebp } from '../entity/ebp.model';
import { UtilClone } from 'src/app/util/utilclone.module';
import { AchatItemService } from './achat-item.service';

@Injectable({
  providedIn: 'root'
})
export class AchatService {
  private url = "http://localhost:8090/achats/";

  edit=1;
  private _achat: Achat;
  private _items: Array<AchatItem>;

  constructor(private http: HttpClient,private achatItemService:AchatItemService) { }


  saveAchat() {
    this.http.post<Achat>(this.url, this.achat).subscribe(
      data => {
        if (data != null) {
          this.achat=data;
        }
      }, error => {
        console.log(error);
      }
    );
  }

  updateAchat(achat:Achat) {
    return this.http.put<number>(this.url, achat);
  }

  deleteAchat(achatId: number) {
    return this.http.delete<number>(this.url + "id/" + achatId)
  }

  getAllAchat() {
    return this.http.get<Array<Achat>>(this.url);
  }

  //Events
  onAddItem(item: AchatItem) {
    if (item != null) {
      this.items.push(item);
    }
  }
  //Events



  get achat(): Achat {
    if (this._achat == null) {
      this._achat = new Achat();
    }
    return this._achat;
  }
  set achat(value: Achat) {
    this._achat = value;
  }

  get items(): Array<AchatItem> {
    if (this._items == null) {
      this._items = new Array<AchatItem>();
    }
    return this._items;
  }
  set items(value: Array<AchatItem>) {
    this._items = value;
  }



}
