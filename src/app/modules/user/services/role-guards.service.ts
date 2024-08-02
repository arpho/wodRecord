import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot } from "@angular/router";
// import { decode } from "jwt-decode";
import firebase from 'firebase/compat/app';
import "firebase/auth";
import { UsersService } from "./users.service";
import { UserModel } from "../models/userModel";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {credentials} from "../../../configs/credentials"
import { configs } from "src/app/configs/configs";

@Injectable({
  providedIn: "root"
})
export class RoleGuardService  {
  public loggedUser: UserModel;
  constructor(public router: Router, public Users: UsersService) {}

  async canActivate(route: ActivatedRouteSnapshot): Promise<boolean> {
    // this will be passed from the route config
    // on the data property
    console.log('role guard',route)
    const maximumRoleLevel = this.Users.FetchRole(route.data['maximumRoleLevel']);
    const locked = route.data['locked'] as boolean
    console.log("minimum role",maximumRoleLevel)
    const firebaseApp = firebase.initializeApp(credentials.firebase)
    const auth = getAuth(firebaseApp)
    onAuthStateChanged(auth,(async (user: firebase.User) => {
      if(!locked){
       return true
      }
      if (user) {
        console.log("logged user",user)
        if (!await this.Users.getLoggedUser()) {
        }
        return true;
      } else {
        
        this.router.navigate(["/users/login"]);
      }
    }));
    if(auth.currentUser){
    auth
      .currentUser.getIdTokenResult(true)
      .then(token => {
        console.log("claims", token.claims);
        if(!configs.locked){
          return true
        }
        // tslint:disable-next-line: curly
        if(configs.locked){ // se locked we check claims.role
        if (token.claims['level'] <= maximumRoleLevel.value) return true;
        else {
          const message =
            `per accedere a questa sezione devi godere almeno dei privilegi di ${maximumRoleLevel.key} 
             per chiarimenti rivolgiti all'amministratore`;
          this.router.navigate(["users/not-authorized", message]);
          return "users/not-authorized"
        }}
        else{ // app is open we pass
          return true
        }
      });}

    // const token = localStorage.getItem("token");
    // decode the token to get its payload
    // const tokenPayload = decode(token);
    /* 
    if (tokenPayload.role !== expectedRole) {
      this.router.navigate(["login"]);
      return false;
    }*/
    console.log("logged user", this.Users.getLoggedUser());
    return true; // this.Users.getLoggedUser().privileges.isAllowed(expectedRole);
  }
}
