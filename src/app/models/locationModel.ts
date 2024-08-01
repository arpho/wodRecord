import { Serializers } from "../modules/helpers/serializers";
import { Genere, ItemModelInterface } from "../modules/item/models/itemModelInterface";
import { ItemServiceInterface } from "../modules/item/models/ItemServiceInterface";
import { Value } from "../modules/item/models/value";

export class LocationModel implements ItemModelInterface{
    title: string;
    note?: string;
    key: string;
    src?: string;
    icon?: string;
    description?: string;
 street: string
 name:string
 houseNumber:number
 houseNumberSuffix:string
 zipCode:string
 city:string
 archived:boolean
constructor(value?:{}){
    this?.build(value!)
}
    getCountingText(): { singular: string; plural: string; } {
        throw new Error("Method not implemented.");
    }
    getNote?(): Value {
        throw new Error("Method not implemented.");
    }
    build(item: {}) {
        Object.assign(this,item)
        return this
    }
    load?(next?: () => void) {
        throw new Error("Method not implemented.");
    }
    isArchived?(): boolean {
        return this.archived
    }
    archiveItem?(b: boolean) {
       this.archived= b
    }
    isArchivable?(): boolean {
       return false
    }
    showAddress(){
        return `${this.street} ${this.houseNumber}/${this.houseNumberSuffix} ${this.city} ${this.zipCode}`
    }
    getTitle(): Value {
        return new Value({value:this.showAddress(),label:"address"})
    }
    setKey?(key: string): LocationModel {
    this.key = key
    return this
    }
    getEditPopup(item?: ItemModelInterface, service?: ItemServiceInterface) {
        throw new Error("Method not implemented.");
    }
    initialize(item: {}): ItemModelInterface {
        throw new Error("Method not implemented.");
    }
    getAggregate?(): Value {
        throw new Error("Method not implemented.");
    }
    aggregateAction?() {
        throw new Error("Method not implemented.");
    }
    hasQuickActions?(): boolean {
       return false
    }
    QuickAction?(key: string) {
        throw new Error("Method not implemented.");
    }
    serialize() {
const serializer = new Serializers()
return {
    key:serializer.serialize2String(this.key),
    city:serializer.serialize2String(this.city),
    street:serializer.serialize2String(this.street),
    houseNumber:serializer.serialize2PositiveNumber( this.houseNumber),
    houseNumberSuffix:serializer.serialize2String(this.houseNumberSuffix),
    zipCode:serializer.serialize2String(this.zipCode)}
    }
    getElement(): { element: string; genere: Genere; } {
        throw new Error("Method not implemented.");
    }
    url?: string;
    function?: () => void;
    onClick?: () => void;
    
}