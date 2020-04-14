
import { Observable, of } from 'rxjs';
import { ApiService } from './api.service';

import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { BehaviorSubject } from 'rxjs';



import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

    authState = new BehaviorSubject(false);

    constructor(public api: ApiService, private http: HttpClient, 
        private storage: Storage, private platform: Platform, public router: Router) {
        this.platform.ready().then(() => {
            this.ifLoggedIn();
        });
    }


//   login(email: String, password: String) {
//     return this.http.post('https://prystins.herokuapp.com/api/token',
//       {email: email, password: password}
//     ).pipe(
//       tap(token => {
//         this.storage.setItem('token', token)
//         .then(
//           () => {
//             console.log('Token Stored');
//           },
//           error => console.error('Error storing item', error)
//         );
//         this.token = token;
//         this.isLoggedIn = true;
//         return token;
//       }),
//     );
//   }



    ifLoggedIn() {
        this.storage.get('USER_INFO').then((response) => {
            if (response) {
                this.authState.next(true);
            }
        });
    }



    login() {
        this.storage.set('USER_INFO', 'dummy_response').then((response) => {
            this.router.navigate(['home']);
            this.authState.next(true);
        });
    }



    logout() {
        this.storage.remove('USER_INFO').then(() => {
            window.localStorage.clear();
            this.router.navigate(['login']);
            this.authState.next(false);
        });
    }



    isAuthenticated() {
        return this.authState.value;
    }





}
