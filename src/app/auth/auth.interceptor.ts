import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest,HTTP_INTERCEPTORS } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { UserAuthService } from "../user-auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private authService:UserAuthService,
                private router:Router){}
    
    intercept(
        req: HttpRequest<any>, 
        next: HttpHandler
        ): Observable<HttpEvent<any>> {

        let authReq= req;
        const token = this.authService.getToken();
        
        console.log("Inside Interceptor");
        if(token != null){
            authReq = authReq.clone(
                {
                    setHeaders:{
                        Authorization: `Bearer ${token}`
                    },
                });
         }
        return next.handle(authReq);
    }       
}

export const authInterceptorProviders = [

{
    provide:HTTP_INTERCEPTORS,
    useClass:AuthInterceptor,
    multi:true
},
    
];