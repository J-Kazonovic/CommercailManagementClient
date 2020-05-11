import { Injectable } from '@angular/core';
import { DemmandeDesPrix } from '../entity/demmande-des-prix.model';
import { DemmandeDesPrixItem } from '../entity/demmande-des-prix-item.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DemmandeService {
  private url = "http://localhost:8090/demmande/";
  private _demmande: DemmandeDesPrix;
  private _dmI: DemmandeDesPrixItem;
  private _demItems: Array<DemmandeDesPrixItem>;

  constructor(private demhttp:HttpClient) { }

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
    this.demItems.push(this.dmI);
    this.dmI = new DemmandeDesPrixItem();
  }
}
