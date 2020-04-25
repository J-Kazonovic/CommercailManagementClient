import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Eb } from '../entity/eb.model';
import { Ebp } from '../entity/ebp.model';

@Injectable({
  providedIn: 'root'
})
export class EbService {
  private url = "http://localhost:8090/ebs/";


  private _eb: Eb;
  private _ebListCurrent:Array<Eb>;
  private _ebp: Ebp;
  private _ebpListCurrent: Array<Ebp>;
  private _ebList: Array<Eb>;

  constructor(private ebHttp: HttpClient) { }

  /**Http Requests-Response*/
  saveEb(eb: Eb) {
    this.ebHttp.post<number>(this.url, eb).subscribe(
      data => {
        if (data == 1) {
          //this.cin=eb.personnel.cin;
          //this.getEbByPersonnel(this.cin);
          this.ebpListCurrent = null;
          this.eb = null;
        }
      }, error => {
        console.log(error);
      }
    );
  }

  updateEb(eb: Eb) {
    console.log(eb);
    this.ebHttp.put<number>(this.url, eb).subscribe(
      data => {
        if (data == 1) {
          //this.cin=eb.personnel.cin;
          //this.getEbByPersonnel(this.cin);
        }
      }, error => {
        console.log(error);
      }
    );
  }

  deleteEb(id: number) {
    this.ebHttp.delete<number>(this.url + "eb/" + id).subscribe(
      data => {
        if (data == 1) {
          this.deleteFromEbList(id, this.ebListCurrent);
          this.deleteFromEbList(id, this.ebList);
        }
      }
    );
  }

  getAllEb() {
    this.ebHttp.get<Array<Eb>>(this.url).subscribe(
      data => {
        this.ebList = data;

      }, error => {
        console.log("error" + error);
      }
    );
  }

  getEbByEntite(libelle: string) {
    this.ebHttp.get<Array<Eb>>(this.url + "entite/" + libelle).subscribe(
      data => {
        this.ebList = data;
      }, error => {
        console.log("error" + error);
      }
    );
  }

  getEbByPersonnel(cin: string) {
    this.ebHttp.get<Array<Eb>>(this.url + "personnel/" + cin).subscribe(
      data => {
        this.ebList = data;
      }, error => {
        console.log("error" + error);
      }
    );
  }

  getEbBySaveDate(date: String) {
    return this.ebHttp.get<Array<Eb>>(this.url + "date/" + date).subscribe(
      data => {
        this.ebList = data;
      }, error => {
        console.log("error" + error);
      }
    );
  }
  /**Http Requests-Response*/


  /**Events */
  onAddEbp() {
    this.ebpListCurrent.push(this.ebp);
    this.ebp = new Ebp();
  }

  onSaveEb() {
    this.eb.ebp = this.ebpListCurrent;
    this.saveEb(this.eb);
  }
  /**Events */


  /**Util & Validation*/
  public ebValidation(): boolean {
    return this.eb.title != null && this.ebpListCurrent.length > 0;
  }

  public ebpValidation(): boolean {
    return this.ebp !== null;
  }

  deleteFromEbList(id: number, ebList: Array<Eb>) {
    const i = ebList.findIndex(e => e.id === id);
    if (i !== -1) {
      ebList.splice(i, 1);
    }
  }
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

	public get ebListCurrent(): Array<Eb> {
    if (this._ebListCurrent == null) {
      this._ebListCurrent = new Array<Eb>();
    }
		return this._ebListCurrent;
	}

   
	public set ebListCurrent(value: Array<Eb>) {
		this._ebListCurrent = value;
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

  public get ebpListCurrent(): Array<Ebp> {
    if (this._ebpListCurrent == null) {
      this._ebpListCurrent = new Array<Ebp>();
    }
    return this._ebpListCurrent;
  }


  public set ebpListCurrent(value: Array<Ebp>) {
    this._ebpListCurrent = value;
  }

  public get ebList(): Array<Eb> {
    if (this._ebList == null) {
      this._ebList = new Array<Eb>();
    }
    return this._ebList;
  }

  public set ebList(value: Array<Eb>) {
    this._ebList = value;
  }
  /** Getter & Setter*/




}
