import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Eb } from '../entity/eb.model';
import { Ebp } from '../entity/ebp.model';
import { UtilStatuts } from 'src/app/util/utilstatuts.module';

@Injectable({
  providedIn: 'root'
})
export class EbService {

  private url = "http://localhost:8090/ebs/";

  private _eb: Eb;
  private _ebp: Ebp;
  private _ebpListCurrent: Array<Ebp>;

  constructor(private ebHttp: HttpClient) { }

  /**Http Requests-Response*/
  saveEb(eb: Eb) {
    this.ebHttp.post<number>(this.url, eb).subscribe(
      data => {
        if (data == 1) {
          this.ebpListCurrent = null;
          this.eb = null;
        }
      }, error => {
        console.log(error);
      }
    );
  }

  updateEb(eb: Eb) {
    return this.ebHttp.put<number>(this.url, eb);
  }

  deleteEb(id: number) {
    return this.ebHttp.delete<number>(this.url + "eb/" + id);
  }

  getAllEb() {
   return  this.ebHttp.get<Array<Eb>>(this.url);
  }

  getEbByEntite(libelle: string) {
    return this.ebHttp.get<Array<Eb>>(this.url + "entite/" + libelle);
  }

  getEbByPersonnel(cin: string) {
    return this.ebHttp.get<Array<Eb>>(this.url + "personnel/" + cin);
  }

  getEbBySaveDate(date: String) {
    return this.ebHttp.get<Array<Eb>>(this.url + "date/" + date);
  }
  /**Http Requests-Response*/


  /**Events */
  onAddEbp() {
    this.ebp.besoin_statut=UtilStatuts.EnAttend;
    this.ebpListCurrent.push(this.ebp);
    this.ebp = new Ebp();
  }

  onSaveEb() {
    this.eb.ebp = this.ebpListCurrent;
    this.saveEb(this.eb);
  }
  /**Events */




  
  /**Util & Validation*/


  /** Getter & Setter*/
  get eb(): Eb {
    if (this._eb == null) {
      this._eb = new Eb();
    }
    return this._eb;
  }

  set eb(value: Eb) {
    this._eb = value;
  }

  get ebp(): Ebp {
    if (this._ebp == null) {
      this._ebp = new Ebp();
    }
    return this._ebp;
  }

  set ebp(value: Ebp) {
    this._ebp = value;
  }

  get ebpListCurrent(): Array<Ebp> {
    if (this._ebpListCurrent == null) {
      this._ebpListCurrent = new Array<Ebp>();
    }
    return this._ebpListCurrent;
  }

  set ebpListCurrent(value: Array<Ebp>) {
    this._ebpListCurrent = value;
  }

  
  /** Getter & Setter*/




}
