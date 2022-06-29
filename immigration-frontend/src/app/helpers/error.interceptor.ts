import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
 
// import { AuthenticationService } from '../services';
 
@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private router: Router) {}
 
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                // this.authenticationService.logout();
                localStorage.removeItem('currentUser');
                localStorage.clear();
                this.router.navigate(['/login']);
                // location.reload(true);
            }
             
            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}