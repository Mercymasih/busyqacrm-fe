import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { catchError, Observable, throwError } from "rxjs";
import { UserAuthService } from "../user-auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor{

    constructor(private authService:UserAuthService,
                private router:Router){}
    
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(req.headers.get('No-Auth')=== 'True'){
            return next.handle(req.clone());
        }
        const token = this.authService.getToken();

        req = this.addToken(req,token);

        return next.handle(req).pipe(
            catchError(
                (err:HttpErrorResponse)=>{
                    console.log(err.status);
                    if(err.status === 401){
                        this.router.navigate(['/loginuser']);
                    }
                    return throwError(()=>"Something is wrong");
                }
            )
        );
    }

    private addToken(request:HttpRequest<any>, token:string){
        return request.clone(
            {
                setHeaders:{
                    Authorization : `Bearer ${token}`
                }
            }
        );
    }
        
}