import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Dept } from '../entity/dept.model';

@Injectable({
  providedIn: 'root'
})
export class DeptService {
  private url = "http://localhost:8090/dept/";

  private _deptList:Array<Dept>;

  constructor(private http: HttpClient) {
  }

  getAllDept(){
    this.http.get<Array<Dept>>(this.url + "all").subscribe(
      data => {
        this.deptList = data;

      }, error => {
        console.log(error);
      }
    );
  }

  public get deptList(): Array<Dept> {
    if (this._deptList == null) {
      this._deptList = new Array<Dept>();
    }
		return this._deptList;
	}
   
	public set deptList(value: Array<Dept>) {
		this._deptList = value;
	}




}
