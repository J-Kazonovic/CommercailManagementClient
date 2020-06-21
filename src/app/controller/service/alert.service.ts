import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  DANGER="danger";
  SUCCESS="success";

  
  _type:string;
  _message:string;
  _visibility=false;

  constructor() { }

  
  setDangerAlert(message:string){
    this._type=this.DANGER;
    this._visibility=true;
    this._message=message;

  }

  setSuccessAlert(message:string){
    this._type=this.SUCCESS;
    this._visibility=true;
    this._message=message;
  }

}
