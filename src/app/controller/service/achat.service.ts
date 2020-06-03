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

  private _achatItems: Array<AchatItem>;
 

  constructor(private http: HttpClient
    ,private achatItemService:AchatItemService) { }


  saveAchat(achat:Achat) {
    return this.http.post<Achat>(this.url, achat);
  }

  updateAchat(achat:Achat) {
    return this.http.put<number>(this.url, achat);
  }

  deleteAchat(achatId: number) {
    return this.http.delete<number>(this.url + "id/" + achatId)
  }

  getAchatByRef(ref:string){
    return this.http.get<Achat>(this.url + "ref/" + ref);

  }

  getAllAchat(page:number) {
    return this.http.get<Array<Achat>>(this.url+"?page="+page);
  }

  



  searchByRef(achats: Array<Achat>, ref: string) {
    if (ref.length > 0) {
      return achats.filter(achat => achat.ref.trim().toLowerCase().indexOf(ref) > -1);
    } else {
      return achats;
    }
  }

  filterByStatut(achats: Array<Achat>, statut: string) {
    if (statut.length > 0) {
      return achats.filter(achat => achat.statut === statut);
    } else {
      return achats;
    }
  }

  filterByFourni(achats: Array<Achat>, fourni: string) {
    if (fourni.length > 0) {
      return achats.filter(achat => achat.fournisseur.nom === fourni);
    } else {
      return achats;
    }
  }

  get achat(): Achat {
    if (this._achat == null) {
      this._achat = new Achat();
    }
    return this._achat;
  }
  set achat(value: Achat) {
    this._achat = value;
  }

  get achatItems(): Array<AchatItem> {
		if(this._achatItems==null){
      this._achatItems=new Array<AchatItem>();
    }
    return this._achatItems;
	} 
	set achatItems(value: Array<AchatItem>) {
		this._achatItems = value;
	}


  
}
