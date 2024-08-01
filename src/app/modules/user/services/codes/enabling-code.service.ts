import { Injectable, OnInit } from '@angular/core';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Database, DatabaseReference, getDatabase, onValue, push, ref, remove, update } from 'firebase/database';
import { BehaviorSubject, Observable } from 'rxjs';
import { EnablingCode } from '../../models/enablingCode';

@Injectable({
  providedIn: 'root'
})
export class EnablingCodeService  {
  db:Database
  public itemsListReference: DatabaseReference;
  items_list: Array<EnablingCode> = []
  _items: BehaviorSubject<Array<EnablingCode>> = new BehaviorSubject([])
  readonly items: Observable<Array<EnablingCode>> = this._items.asObservable()
  reference="enablingCode"
  constructor() { this.ngOnInit()}
  ngOnInit(): void {
    this.db = getDatabase()
    this.itemsListReference = ref(this.db)//,"/userProfile");
    this.loadDataAndPublish()
  }

  loadDataAndPublish() {
    const auth = getAuth();
    onAuthStateChanged(auth,(user) => {
      if (user) {
        this.itemsListReference = ref(this.db,this.reference);
        onValue(this.itemsListReference,(codes)=>{
          this.populateItems(codes)
        })
      }
    });
  }


  getItem(key: string,next:(item:EnablingCode)=>void) {
    if (this.itemsListReference) {
      const itemRef = ref(this.db,this.reference+key)
      onValue(itemRef,(snap)=>{
      const code = new EnablingCode(snap.val()).setKey(snap.key)
        
        next(code)})

    }
  }

  populateItems = (UsersListSnapshot) => {
    this.items_list = [];
    UsersListSnapshot.forEach(snap => {
      const code = new EnablingCode(snap.val()).setKey(snap.key)
      this.items_list.push(code);
   
    });
    this._items.next(this.items_list)
  }


  createItem(item: EnablingCode) {

    const itemRef = ref(this.db,this.reference)
    return push(itemRef,item.serialize());
  }

  

  updateItem(item: EnablingCode) {

    const itemRef = ref(this.db,this.reference+item.key)
    return update(itemRef,item.serialize());
  }


  deleteItem(key: string) {

    const itemRef = ref(this.db,this.reference+key)
    return remove(itemRef)
    
  }
}
