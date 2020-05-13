import { Injectable } from '@angular/core';
import { DemmandeDesPrix } from '../entity/demmande-des-prix.model';
import { DemmandeDesPrixItem } from '../entity/demmande-des-prix-item.model';
import { HttpClient } from '@angular/common/http';
import { Ebp } from '../entity/ebp.model';

@Injectable({
  providedIn: 'root'
})
export class DemmandeService {
  private url = "http://localhost:8090/demmande/";
  private _demmande: DemmandeDesPrix;
  private _dmI: DemmandeDesPrixItem;
  private _demItems: Array<DemmandeDesPrixItem>;
  private _ebp:Ebp;

  constructor(private demhttp:HttpClient) { }
  get ebp(): Ebp {
    if (this._ebp == null) {
      this._ebp= new Ebp();
    }
    return this._ebp;
  }

  set ebp(value: Ebp) {
    this._ebp = value;
  }
  ge
  get demmande(): DemmandeDesPrix {
    if (this._demmande == null) {
      this._demmande = new DemmandeDesPrix();
    }
    return this._demmande;
  }

  set demmande(value: DemmandeDesPrix) {
    this._demmande = value;
  }
  get dmI(): DemmandeDesPrixItem {
    if (this._dmI == null) {
      this._dmI = new DemmandeDesPrixItem();
    }
    return this._dmI;
  }

  set dmI(value: DemmandeDesPrixItem) {
    this._dmI = value;
  }
  get demItems(): Array<DemmandeDesPrixItem> {
    if (this._demItems == null) {
      this._demItems = new Array<DemmandeDesPrixItem>();
    }
    return this._demItems;
  }

  set demItems(value: Array<DemmandeDesPrixItem>) {
    this._demItems = value;
  }
  saveDemmande(demmande: DemmandeDesPrix) {
    this.demhttp.post<number>(this.url, demmande).subscribe(
      data => {
        if (data == 1) {
          this.demItems = null;
          this.dmI = null;
        }
      }, error => {
        console.log(error);
      }
    );
  }
  onAddEbp() {
    this.dmI.qteCommander+=this.ebp.qteAccorde;
    this.demItems.push(this.dmI);
    this.dmI = new DemmandeDesPrixItem();
  }
  public addProduit() {
    this.demmande.demmandeItem.push(this.cloneProduitAchat(this.dmI));
    this.dmI = null;
  }
  
  private cloneProduitAchat(dmI:DemmandeDesPrixItem) {
    const myClone = new DemmandeDesPrixItem();
    myClone.id = dmI.id;
    myClone.demmande = dmI.demmande;
    myClone.produit= dmI.produit;
    myClone.qteCommander = dmI.qteCommander;
    myClone.qteLivrer = dmI.qteLivrer;
    return myClone;
  }
}
