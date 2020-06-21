import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../entity/user.model';
import { Role } from '../entity/role.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  _userURL="http://localhost:8090/users/";
   _roleURL="http://localhost:8090/roles/";
  


  private _user:User;
  public _roles=new Array<Role>();


  constructor(private http:HttpClient) { }


  save(){
    return this.http.post<number>(this._userURL,this.user);
  }

  update(u:User){
    return this.http.put<number>(this._userURL,u);
  }

  delete(u:User){
    return this.http.delete<number>(this._userURL + u.id);
  }

  getUserByName(name:string){
    return  this.http.get<User>(this._userURL + "name/" + name );
  }

  getAllUsers(){
     return  this.http.get<Array<User>>(this._userURL);
  }

  

  
	public get user(): User {
    if(this._user==null){
      this._user=new User();
    }
		return this._user;
	}
	public set user(value: User) {
		this._user = value;
	}

}
