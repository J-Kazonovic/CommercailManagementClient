import { Injectable, ɵConsole } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TokeninterceptorService implements HttpInterceptor {

  constructor(private router:Router) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("Intercepter");
    if (req.headers.get("skip")) return next.handle(req);
    else {
      const userToken = sessionStorage.getItem("jwt");
      if (userToken == null) {
         this.router.navigate(['/login']);
         return EMPTY; 
      } else {
        const modifiedReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${userToken}`),
        });
        return next.handle(modifiedReq);
      }

    }
  }
}
