import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthRequest } from '../entity/auth-request.model';
import { AuthResponse } from '../entity/auth-response.model';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private  _userToken:string;
  private _request:AuthRequest;
  public jwtHelper: JwtHelperService = new JwtHelperService();

   constructor(private http:HttpClient) { }
   

   login(request:AuthRequest){
     return this.http.post<AuthResponse>("http://localhost:8090/authenticate"
     , request, {  responseType: 'json' ,headers:{skip:"true"}});

   }
   
   public isAuthenticated(): boolean {
    const token = localStorage.getItem('jwt');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }


   /**
    * Getter request
    * @return {AuthRequest}
    */
 public get request(): AuthRequest {
   if(this._request==null){
     this._request=new AuthRequest();
   }
   return this._request;
 }

   /**
    * Setter request
    * @param {AuthRequest} value
    */
 public set request(value: AuthRequest) {
   this._request = value;
 }
   

   /**
    * Getter userToken
    * @return {string}
    */
 public get userToken(): string {
   return this._userToken;
 }

   /**
    * Setter userToken
    * @param {string} value
    */
 public set userToken(value: string) {
   this._userToken = value;
 }
   

}
