import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { Observable, Subscription } from 'rxjs';
import 'firebase/auth';
import 'firebase/database';
import { DatabaseReference, getDatabase, ref, push } from "firebase/database";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, Auth, UserCredential, sendPasswordResetEmail, onAuthStateChanged } from 'firebase/auth'
import { UserModel } from '../models/userModel'
import { credentials } from "../../../configs/credentials"
import { initializeApp } from 'firebase/app';
firebase.initializeApp(credentials.firebase);
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  auth: Auth

  constructor() { }

  loginUser(email: string, password: string): Promise<any> {
    this.auth = getAuth()

    return signInWithEmailAndPassword(this.auth, email, password);
  }

  resetPassword(email: string): Promise<void> {
    const user = getAuth()
    return sendPasswordResetEmail(user, email);
  }

  async signupUser(user: UserModel, next?, errorHandler?, complete?) {
    console.log("registering user", user)
    try {
      const auth = getAuth()
      const userCredential = await createUserWithEmailAndPassword(auth, user.email, user.password['password'])
      if (next) {
        next(userCredential)
        await sendEmailVerification(auth.currentUser)
      }
    }
    catch (errorTrown) {
      console.log("errore", errorTrown, user)
      if (errorHandler) {
        errorHandler(errorHandler)
      }

    }

  }

  getLoggedUser_Id():Promise<string>{
   return new Promise((resolve,reject)=>{
    const auth = getAuth()
    try{
      onAuthStateChanged(auth,async user=>{
        resolve(user?.uid)

      })

    }
    catch(err){
      reject(err)
    }
   })
  }
  getCurrentUserToken(){
    return getAuth().currentUser?.getIdToken()
  }
  getCurrentUser(){
    return getAuth().currentUser
  }

  getPromisedToken(): Promise<string>{

    return new Promise(async (resolve,reject)=>{
      const auth = getAuth()
      try{
      onAuthStateChanged(auth,async user=>{
        resolve((await user?.getIdTokenResult())?.token)

      })
    }
    catch(err){
      reject(err)
    }

    })
  }

async getToken(next:(token:string)=>void){
  const app = initializeApp(credentials.firebase)
      const auth = getAuth()
      let token =""
      onAuthStateChanged(auth,async user=>{
        token = (await user.getIdTokenResult()).token
        console.log("got token",token)
        next(token)
      })


}

  getCustomclaims(next: (claims) => void) {

    const auth = getAuth()
    onAuthStateChanged(auth, async (user) => {

      if (user) {
        await user.getIdTokenResult(true).then(result => {
          next(result.claims)
        })
      }
    })
  }


  createUserObserver(email, pass): Observable<unknown> {
    const auth = getAuth()
    const observer = new Observable(subscriber => {
      createUserWithEmailAndPassword(auth, email, pass)
        .then((userCredential: UserCredential) => {
          subscriber.next(userCredential);
          subscriber.complete();
        })
        .catch((error) => {
          subscriber.error(error);
          subscriber.complete();
        });
    });

    return observer;
  }

  logoutUser(): Promise<void> {
    const user = getAuth()
    return user.signOut()

  }

}