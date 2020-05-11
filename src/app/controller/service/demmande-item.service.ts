import { Injectable } from '@angular/core';
import { DemmandeDesPrixItem } from '../entity/demmande-des-prix-item.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DemmandeItemService {
  private url="http://localhost:8090/demmandeItem/";
  private _demmandeItems: Array<DemmandeDesPrixItem>;
  constructor(private demItemHttp: HttpClient) { }

  get demmandeItems(): Array<DemmandeDesPrixItem> {
    if (this._demmandeItems == null) {
      this._demmandeItems = new Array<DemmandeDesPrixItem>();
    }
    return this._demmandeItems;
  }

  set demmandeItems(value: Array<DemmandeDesPrixItem>) {
    this._demmandeItems = value;
  }
  

}
