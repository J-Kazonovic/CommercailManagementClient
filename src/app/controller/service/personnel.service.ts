import { Injectable } from '@angular/core';
import { Personnel } from '../entity/personnel.model';
import { HttpClient } from '@angular/common/http';
import { Dept } from '../entity/dept.model';

@Injectable({
  providedIn: 'root'
})
export class PersonnelService {

  private url = "http://localhost:8090/personnel/";

  private _personnelList:Array<Personnel>;

  constructor(private http: HttpClient) {
  }

  getAllPersonnel(){
    this.http.get<Array<Personnel>>(this.url + "all").subscribe(
      data => {
        this.personnelList = data;

      }, error => {
        console.log("error" + error);
      }
    );
  }

  public get personnelList(): Array<Personnel> {
    if (this._personnelList == null) {
      this._personnelList = new Array<Personnel>();
    }
		return this._personnelList;
	}
   
	public set personnelList(value: Array<Personnel>) {
		this._personnelList = value;
	}
}
