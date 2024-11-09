import { Injectable } from '@angular/core';
import { Auth, authState, signInAnonymously, signOut, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor( private auth:Auth) { }
   isUserAuthenticated() {
 return new Promise((resolve, reject) => {
    this.auth.onAuthStateChanged((user) => {
      if (user) {
        resolve(true);
      } else {
        resolve(false);
      }
    });
  });
   }
}
