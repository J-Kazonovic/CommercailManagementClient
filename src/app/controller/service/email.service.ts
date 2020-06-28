import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';
import { Email } from '../entity/email.model';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  private _mail: Email;

  constructor(private http: HttpClient) { }

  postMethod(files: FileList,email:string,email_password:string) {
     console.log(this.mail)
    let formData = new FormData();
    const blobOverrides = new Blob([JSON.stringify(this.mail)], {
      type: 'application/json',
    });

    formData.append('address',email);
    formData.append('password',email_password);
    formData.append('emailTo',this.mail.emailTo);
    formData.append('subject', this.mail.subject);
    formData.append('message', this.mail.message);

    formData.append('file', files.item(0),files.item(0).name);

    return this.http.post('http://localhost:8090/email/',formData);
  }



  get mail(): Email {
    if (this._mail == null) {
      this._mail = new Email();
    }
    return this._mail;
  }

  set mail(value: Email) {
    this._mail = value;
  }




}
