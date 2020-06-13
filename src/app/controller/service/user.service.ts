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
    this.http.post<number>(this._userURL,this.user).subscribe(
      data=>{
        if(data==1){
           this.user = null;
        }
      },error=>{
        console.log(error);
      }
    )
  }

  update(f:User){
    return this.http.put<number>(this._userURL,f);
  }

  delete(f:User){
    return this.http.delete<number>(this._userURL + f.id);
  }


  findAllRoles(){
    this.http.get<Array<Role>>(this._roleURL).subscribe(
      data=>{
        this._roles=data;
      },error=>{
        
      }
    )
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
