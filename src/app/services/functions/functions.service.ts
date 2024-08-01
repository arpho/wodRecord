import { Injectable } from '@angular/core';
import { Database, DatabaseReference } from '@firebase/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { FunctionModel } from 'src/app/models/functionModel';
import { ItemServiceInterface } from 'src/app/modules/item/models/ItemServiceInterface';
import { ItemModelInterface } from 'src/app/modules/item/models/itemModelInterface';
import { initializeApp } from "firebase/app";
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, setDoc, addDoc, onSnapshot } from "firebase/firestore";
import { credentials } from 'src/app/configs/credentials';
import { QuerySnapshot } from '@google-cloud/firestore';
import { EnabledFunction } from 'src/app/modules/user/models/enabledFunction';
@Injectable({
  providedIn: 'root'
})
export class FunctionsService implements ItemServiceInterface {

  constructor() {
    const app = initializeApp(credentials.firebase)
    this.db = getFirestore(app)
  }
  collection = "funzioni"
  $items: BehaviorSubject<ItemModelInterface[]> = new BehaviorSubject<ItemModelInterface[]>([]);
  db: any;
  itemsListRef: DatabaseReference;
  readonly items: Observable<ItemModelInterface[]> = this.$items.asObservable();
  getItem(key: string, next?: (item?: any) => void): Promise<FunctionModel> {

    return new Promise(async (resolve, reject) => {
      if (key) {
        const ref = doc(this.db, this.collection, key)
        const docSnap = await getDoc(ref)
        const func = new FunctionModel()
        if (docSnap.data()) {
          func.initialize(docSnap.data()!)
          resolve(new FunctionModel(func));
          if (next) {
            next(func)
          }
        }
        else {
          console.log("funzione non trovata per", key)
          reject()
        }
      }
      else {
        reject();
      }
    })
    console.log("key", key)


  }
  updateItem(provider: FunctionModel, ...documentKey: string[]) {
    return setDoc(doc(this.db, this.collection, provider.key), provider.serialize())
  }
  deleteItem(key: string, ...args: string[]) {
    return deleteDoc(doc(this.db, this.collection, key))
  }
  getEmptyItem(): FunctionModel {
    return new FunctionModel()
  }
  setItem(item: FunctionModel, ...keys: string[]) {

    return setDoc(doc(this.db, this.collection, item.key), item.serialize())
  }


  createItem(provider: FunctionModel, ...keys: string[]) {

    return addDoc(collection(this.db, this.collection), provider.serialize())
  }
  fetchItems?(querySet?: any): Promise<FunctionModel[]> {
    return new Promise(async (resolve, reject) => {

      if (!querySet) {

        try {
          const q = query(collection(this.db, this.collection))
          const querySnapShot = await getDocs(q)
          resolve(querySnapShot.docs.map(prov => new FunctionModel(prov.data()).setKey(prov.id)))
        }
        catch (error) {
          reject(error)
        }
      }

    })
  }
  publish(items: FunctionModel[]) {
    this.publishData(items)
  }
  publishData(functions: FunctionModel[]) {
    this.$items.next(functions)
  }
  realtimeFetchItems(eventHandler: (items: {data:FunctionModel[],total:number}) => void, querySet?: any) {
    if (!querySet) {
      const q = query(collection(this.db, this.collection))
      onSnapshot(q, (querySnapshot) => {
        eventHandler({data:querySnapshot.docs.map(func => new FunctionModel(func.data()).setKey(func.id)),total:querySnapshot.docs.length})
      })
    }
    else{
      const q = query(collection(this.db, this.collection,querySet))
      onSnapshot(q, (querySnapshot) => {
        eventHandler({data:querySnapshot.docs.map(func => new FunctionModel(func.data()).setKey(func.id)),total:querySnapshot.docs.length})
    })

  }
}}

