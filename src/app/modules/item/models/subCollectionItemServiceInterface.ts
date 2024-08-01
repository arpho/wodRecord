import { ItemModelInterface } from "./itemModelInterface";
import { ItemServiceInterface } from "./ItemServiceInterface";

export interface subCollectionsItemServiceInterface extends ItemServiceInterface{
      /*@param eventHandler: funzione di callback che deve invocare publish*
     *@param fatherKey:string  key of the father's document
     * @param querySet  opzionale
     * @description interface to be implemented from service that works on subcollections
     */
      realtimeFetchItemsFromSubCollection?(fatherKey:string,eventHandler:(result:{data:ItemModelInterface[],total:number})=>void,querySet?)
      getItemFromSubcollection(fatherKey: string, itemKey:string): Promise<ItemModelInterface> 
}