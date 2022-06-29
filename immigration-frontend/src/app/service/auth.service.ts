import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { BACK_END_URL } from '../app.global';
import { Router, ActivatedRoute } from '@angular/router';
// import { MatDialog, MatBottomSheet } from '@angular/material';


@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient,private router: Router) { }

    login(username: string, password: string) {
        console.log(username,password)
        return this.http.post<any>(BACK_END_URL + `api/user/login/authenticateUser`, { username: username, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            }));
    }
    candidate_login(username: string, password: string) {
        return this.http.post<any>(BACK_END_URL + `users/candidate_login`, { username: username, password: password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        // this.bottomSheetRef.dismiss();
        // this.dialogRef.closeAll();
        localStorage.removeItem('currentUser');
        localStorage.clear();
        this.router.navigate(['/login']);
    }
}