// tslint:disable: quotemark
import { Injectable, OnInit } from "@angular/core";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { DatabaseReference, getDatabase, ref, onValue, remove, set, push, update } from "firebase/database";
import { ItemServiceInterface } from "../../item/models/ItemServiceInterface";
import { UserModel } from "../models/userModel";
import { ItemModelInterface } from "../../item/models/itemModelInterface";
import { BehaviorSubject, Observable } from 'rxjs';
import { getFunctions, httpsCallable } from "firebase/functions";
import { configs } from "src/app/configs/configs";
import "firebase/firestore";
import { initializeApp } from "firebase/app";
import { credentials } from "src/app/configs/credentials";
import { DocumentData, DocumentReference, Firestore } from "@google-cloud/firestore";

import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, setDoc, addDoc, onSnapshot,where, updateDoc } from "firebase/firestore";
import { Router } from "@angular/router";
import { Constants } from "src/app/configs/constants";
import fetch from "node-fetch";
import { AuthService } from "./auth.service";
import { ValidationErrors } from "@angular/forms";
import { FirestoreQuerySetInterface } from "src/app/models/FirestoreQuerySet";
@Injectable({
  providedIn: "root"
})
export class UsersService implements ItemServiceInterface, OnInit {
    async isAuthenticated() {
      return !! await this.fetchLoggedUser()
    }
  async getUserByEmail(email:string){
    const usersRef = collection(this.db, this.collection);
    const q = query(usersRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    let result = {}
    if(!querySnapshot.empty){
   querySnapshot.forEach((doc)=>{
    console.log("doc",doc.data())
   })
    
    }

   else{
    throw new Error("emailnotExists")
   }
   return result
  }
     checkEmailExists(value: any):ValidationErrors|null {
     
      const usersRef = collection(this.db, this.collection);
      const value2check = value?.email?value.email:""
      const q = query(usersRef, where("email", "==", value2check));
    let result = false
    getDocs(q).then(existence=>{
      existence.docs.forEach(d=>{
        d.ref
      })
      result = !existence.empty
    })

    
      
      return result?{"emaiDoesntExist":true}:null
    }



    realtimeFetchItems?(eventHandler: (items: {data:UserModel[],total:number}) => void, querySet?: any,page=1,limit=10) {
      const q = query(collection(this.db, this.collection))
      onSnapshot(q, (querySnapshot) => {
        eventHandler({data: querySnapshot.docs.slice(page*limit,page*limit+limit).map(auth => new UserModel(auth.data()).setKey(auth.id)),total:querySnapshot.docs.length})
      })
    }

  isEnabled(locked:boolean): boolean | PromiseLike<boolean> {
      return new Promise(async (resolve,reject)=>{
        const user = await this.fetchLoggedUser()
        if(user){
          resolve(!locked||user.enabled)
        }
        else{
          reject()
          resolve(!locked||false)

        }
      })
  }
/**
 * 
 * @param email: string user's email to be updated
 * @param field  field: {field:value} to be updated
 * @returns Promise<void>
 */
  updateUserbyEmail(email:string,field:{}){
    const usersRef = collection(this.db, this.collection);
   const q = query(usersRef,where("email","==",email))
  return  getDocs(q).then(user=>{
    user.docs.forEach(u=>{
      updateDoc(u.ref,field)
    })
   })
  }
  hasAccess(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      if (!configs.locked) {
        resolve(true)
      }
      else {
        const auth = getAuth()
        console.log("@#@ onauthStateChanged on service",onAuthStateChanged)
        onAuthStateChanged(auth, (user) => {
          if (user) {
            resolve(true)
          }
          else {
            resolve(false)
          }
        })
      }

    })




  }
  login() {
    console.log("login")
    this.router.navigate([Constants.LOGIN_ROUTE])
  }
  public itemsListReference: DatabaseReference;
  items_list: Array<UserModel> = []
  $items: BehaviorSubject<Array<ItemModelInterface>> = new BehaviorSubject<Array<ItemModelInterface>>([])
  _loggedUser: BehaviorSubject<UserModel> = new BehaviorSubject(new UserModel)
  loggedUser: Observable<UserModel> = this._loggedUser.asObservable()
  readonly items: Observable<Array<ItemModelInterface>> = this.$items.asObservable()
  static loggedUser: UserModel
  db: any
  usersRef
  constructor(
    private auth:AuthService,
    private router: Router) {
    this.loadDataAndPublish()
    const app = initializeApp(credentials.firebase)
    this.db = getFirestore(app)
    this.fetchLoggedUser().then(usr => {
      this.setLoggedUser(usr)
    })



  }
  $serviceWorking?: BehaviorSubject<boolean> | undefined;
  getItemFromSubcollection?(fatherKey: string, itemKey: string): Promise<ItemModelInterface> {
    throw new Error("Method not implemented.");
  }
  fetchItems(querySet?: any): Promise<ItemModelInterface[]> {
    throw new Error("Method not implemented.");
  }

  categoriesService?: ItemServiceInterface;
  suppliersService?: ItemServiceInterface;
  paymentsService?: ItemServiceInterface;
  itemsListRef: DatabaseReference;
  collection = 'users'

  ngOnInit(): void {
    console.log("init")
  }
  publish(items: UserModel[]) {
    this.$items.next(items)

  }



getToken(){
  return this.auth.getCurrentUserToken()
}

  fetchRealTimeCustomers(eventHandler: (data: UserModel[]) => void, querySet?:FirestoreQuerySetInterface) {

    if (!querySet) {
      const q = query(collection(this.db, this.collection))
      onSnapshot(q, (querySnapshot) => {
        eventHandler(querySnapshot.docs.map(prov => new UserModel(prov.data()).setKey(prov.id)))
      })
    }
    else{
      const usersRef = collection(this.db, this.collection);
      const q = query(usersRef, where(querySet.field,querySet.condition,querySet.value));
      onSnapshot(q, (querySnapshot) => {
        eventHandler(querySnapshot.docs.map(prov => new UserModel(prov.data()).setKey(prov.id)))
      })
      
    }

  }

  loadDataAndPublish() {
    const auth = getAuth();
    onAuthStateChanged(auth, this.authStateChangeHandler);
  }

  authStateChangeHandler = async () => {
    const q = query(collection(this.db, this.collection));
    const querySnapshot = await getDocs(q);
    this.$items.next(querySnapshot.docs.map(snap => new UserModel().load(snap.data()).setKey(snap.id)))
  }
  /**
   *
   * @returns Promise<UserModel> the account data of the logged user
   */
  fetchLoggedUser(): Promise<UserModel> {
    return new Promise<UserModel>(async (resolve, reject) => {
      const auth = getAuth()
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const User = await this.getItem(user.uid)
          resolve(User)
        }

      })
    })
  }

  async getItem(key: string) {
    return new UserModel((await getDoc(doc(this.db, this.collection, key?key:''))).data())
  }

  FetchRole(level: number) {
    return configs.accessLevel.filter(accesslevel => accesslevel.value == level)[0]
  }

  getLoggedUser() {
    return this.loggedUser;
  }

  //
  callCloudPushUser(user: {}) {
    const functions = getFunctions()


    const insertUser = httpsCallable(functions, 'adminAddUserProfile')
    return insertUser(user).then((msg) => {
      console.log('insert use', msg)
    }).catch((error) => {
      console.error(error);
    });

  }

  async setLoggedUser(user: UserModel) {
    const loggedUser = new UserModel(user).setKey(user.key)
    this._loggedUser.next(loggedUser);

  }

  deleteItem(key: string) {
    console.log("deleting", key)
    return deleteDoc(doc(this.db, this.collection, key))

  }


  loggedUserCanUseFunction(functionKey: string): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
      const user = await this.fetchLoggedUser()
      const enabledFunction = user.enabledFunctions.map(f => {
        return f
      }).filter(f => {
        return f.key == functionKey })[0]
      if (enabledFunction && enabledFunction.endTime >= new Date().getTime()) {
        resolve(true)
      }
      else {
        resolve(false)
      }

    })

  }

  getEmptyItem() {
    return new UserModel();
  }

  async setItem(item: ItemModelInterface) {

    return setDoc(doc(this.db, this.collection, item.key), item.serialize())
  }


  async createItem(user: UserModel) {
    return addDoc(collection(this.db, this.collection), user.serialize())
  }

  getEntitiesList(): DatabaseReference {
    return this.itemsListReference;
  }

  async updateItem(user: UserModel) {
    return setDoc(doc(this.db, this.collection, user.key), user.serialize())
  }
}
