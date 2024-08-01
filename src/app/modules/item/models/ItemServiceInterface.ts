
// tslint:disable:semicolon
import * as firebase from 'firebase/app';
import { ItemModelInterface } from './itemModelInterface';
import { Observable, BehaviorSubject } from 'rxjs';
import { Database, DatabaseReference } from 'firebase/database';
import { Firestore } from '@google-cloud/firestore';
export interface ItemServiceInterface {
    // extra service for complex models
    categoriesService?: ItemServiceInterface
    suppliersService?: ItemServiceInterface
    paymentsService?: ItemServiceInterface
    $serviceWorking?:BehaviorSubject<boolean>
    collection: string //it s the reference name in the realtime database
    // items?: Observable<Array<ItemModelInterface>>
    $items: BehaviorSubject<ItemModelInterface[]> // = new BehaviorSubject([])
    //serviceWorking?:BehaviorSubject<boolean>
    db: Database|any
    itemsListRef: DatabaseReference
    readonly items: Observable<Array<ItemModelInterface>>

    /**get one item from firebase
     * @param key:string
     * @returns firebase.database reference
     * @deprecated
     */
    getItem(key: string, next: (item?) => void): void;


/**
 * @description get  an item from a subcollection
 * @param fatherKey :string key of the father document
 * @param itemKey : string key of the document
 */
    getItemFromSubcollection?(fatherKey:string,itemKey:string):Promise<ItemModelInterface>
    /**modifica un item su firebase
     * @param item: ItemModelInterface the item to update
     * @returns void
     */
    updateItem(item: ItemModelInterface, ...documentKey: string[]);
    /** delete an item on firebase database
     * @param key: string the item's key
     */
    deleteItem(key: string, ...args: string[]);

    /** return a void item of the type handled by the service */
    getEmptyItem(): ItemModelInterface;
    /**aggiorna un item in firebase
     *
     */
    setItem(item: ItemModelInterface, ...keys: string[]);


    /**
     * @deprecated
     */
    loadDataAndPublish?(): void;

    /**creates un item in firestore
     * @param item:ItemModelInterface
     * @param keys: string keys to indentify all thew subcollections
     *
     */
    createItem(item: ItemModelInterface, ...keys: string[]);
    /**
     * @description  fetch the items from firestore
     * @param querySe: opzionale
     * @return ItemModelInterface[]
     *
     */
    fetchItems(querySet?):Promise<ItemModelInterface[]>
    publish(items:ItemModelInterface[])

    /*@param eventHandler: funzione di callback che deve invocare publish*
     *
     * @param querySet  opzionale
     * @description
     */
    realtimeFetchItems?(eventHandler:(result:{data:ItemModelInterface[],total:number})=>void,querySet)


}
