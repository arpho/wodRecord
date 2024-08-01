import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, User } from 'firebase/auth';
import { Observable } from 'rxjs';
import { configs } from 'src/app/configs/configs';
import { credentials } from 'src/app/configs/credentials';

@Injectable({
  providedIn: 'root'
})
export class ExpirationTimeGuard  {

  constructor(private router: Router) { }
  isCurrent(expirationTime: string, locked?: boolean) {
    const out = locked ? Number(expirationTime) >= new Date().getTime() : true
    console.log("#@",locked,expirationTime, Number(expirationTime) > new Date().getTime(),'result',out)
    return out
  }
  canActivate(route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):
    boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    return new Promise((resolve, reject) => {
      const isKarma = document.getElementsByTagName("title")[0].innerHTML === 'Karma';
      if (!isKarma) {
        const app = initializeApp(credentials.firebase)

        const auth = getAuth(app)
        onAuthStateChanged(auth, ((user: User) => {
          auth.currentUser.getIdTokenResult(true).then(token => {
            console.log("token expiration", token.claims)
            if (this.isCurrent(String(token.claims["expirationTime"]))) {
              resolve(true)
            }
            else {

              const message =
                `il tuo account è scaduto 
                 per chiarimenti rivolgiti all'amministratore`;
              this.router.navigate(["users/not-authorized", message]);
              resolve(false)
            }

          })
        }))
      }
    })




  }
}
