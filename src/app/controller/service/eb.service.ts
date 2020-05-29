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

  constructor(private http: HttpClient) { }

  /**Http Requests-Response*/
  saveEb(eb: Eb) {
    this.http.post<number>(this.url, eb).subscribe(
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
    return this.http.put<number>(this.url, eb);
  }
  deleteEb(id: number) {
    return this.http.delete<number>(this.url + "/eb/" + id);
  }

  getAllE() {
    return this.http.get<Array<Eb>>(this.url);
  }
  

  getAllEb(page:number) {
    return this.http.get<Array<Eb>>(this.url+"?page="+page);
  }
  getEbByEntite(libelle: string) {
    return this.http.get<Array<Eb>>(this.url + "entite/" + libelle);
  }
  getEbByPersonnel(cin: string) {
    return this.http.get<Array<Eb>>(this.url + "personnel/" + cin);
  }
  getEbBySaveDate(date: String) {
    return this.http.get<Array<Eb>>(this.url + "date/" + date);
  }
  /**Http Requests-Response*/


  /**Events */
  onAddEbp() {
    this.ebp.besoin_statut = UtilStatuts.EnAttend;
    this.ebpListCurrent.push(this.ebp);
    this.ebp = new Ebp();
  }

  onSaveEb() {
    this.eb.ebp = this.ebpListCurrent;
    this.saveEb(this.eb);
  }
  /**Events */


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



  /*Filtring & Searching*/

  searchByTitle(ebList: Array<Eb>, title: string) {
    if (title.length > 0) {
      return ebList.filter(eb => eb.title.trim().toLowerCase().indexOf(title) > -1);
    } else {
      return ebList;
    }
  }

  filterByDept(ebList: Array<Eb>, dept: string) {
    if (dept.length > 0) {
      return ebList.filter(eb => eb.dept.libelle === dept);
    } else {
      return ebList;
    }
  }

  filterByPersonnel(ebList: Array<Eb>, personnel: string) {
    if (personnel.length > 0) {
      return ebList.filter(eb => eb.personnel.name === personnel);
    } else {
      return ebList;
    }
  }

  filterByStatut(ebList: Array<Eb>, statut: string) {
    if (statut.length > 0) {
      return ebList.filter(eb => eb.statut === statut);
    } else {
      return ebList;
    }
  }

  filterByDate(ebList: Array<Eb>, date: string) {
    if (date.length > 0) {
      return ebList.filter(eb => eb.saveDate === date);
    } else {
      return ebList;
    }
  }

  /*Filtring & Searching*/

}
