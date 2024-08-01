import { Injectable } from "@angular/core";
import { getAuth, getIdToken, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app"
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { Observable } from "rxjs";
import firebase from 'firebase/app';
import "firebase/auth";
import { UsersService } from "./users.service";
import { UserModel } from "../models/userModel";
import { credentials } from "src/app/configs/credentials";
@Injectable({
  providedIn: "root"
})
export class AuthGuard  {
  constructor(private router: Router, private users: UsersService) { }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean> | Promise<boolean> {
    console.log("can activate");
    return new Promise((resolve, reject) => {

      const app = initializeApp(credentials.firebase)
      const auth = getAuth()
      onAuthStateChanged(auth,(user) => {
        if (user) {
          console.log("user from auth", user);
          this.users.setLoggedUser(new UserModel(user,user.uid));

          resolve(true);
        } else {
          console.log("User is not logged in");
          this.router.navigate(["/users/login"]);
          console.log("routing to the login");
          resolve(false);
        }
      });
    });
  }
}
