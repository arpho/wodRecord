import { MenuItem } from "../modules/helpers/menu/models/MenuItemInterface";
import { Serializers } from "../modules/helpers/serializers";
import { ItemServiceInterface } from "../modules/item/models/ItemServiceInterface";
import { QuickAction } from "../modules/item/models/QuickAction";
import { Genere, ItemModelInterface } from "../modules/item/models/itemModelInterface";
import { Value } from "../modules/item/models/value";

export class FunctionModel implements ItemModelInterface,MenuItem{
    title: string;
    note?: string;
    key: string;
    endTime:number;
    description:string
    cloudAuthorization: string
    icon:string
    url:string
    quickActions?: QuickAction[];
    archived?: boolean;
    service?: ItemServiceInterface;
    constructor(f?:any){
        this.initialize(f)
    }
  
    getCountingText(): { singular: string; plural: string; } {
        return {
            singular:"funzione",
            plural:"e"
        }
    }

    isArchived?(): boolean {
        return this.archived!
    }
    archiveItem?(b: boolean) {
        this.archived = b
    }
    isArchivable?(): boolean {
        return true
    }

    setKey(key: string): FunctionModel {
        this.key = key
        return this
    }
    getEditPopup(item?: ItemModelInterface, service?: ItemServiceInterface) {
        throw new Error("Method not implemented.");
    }
    initialize(item: {}): FunctionModel {
        Object.assign(this,item)
        return this
     
    }
    getTitle(){
        return new Value({value:this.title,label:'title'})
    }

    serialize() {
        const serializer = new Serializers()
        const  out  = {
            key:serializer.serialize2String(this.key),
            title: serializer.serialize2String(this.title),
            note:serializer.serialize2String(this.note!),
            description:serializer.serialize2String(this.description),
            icon: serializer.serialize2String(this.icon),
            url:serializer.serialize2String(this.url),
            cloudAuthorization:this.cloudAuthorization
        }
        return out
    }
    getElement(): { element: string; genere: Genere; } {
        return {element:"funzione",genere:"a"}
    }

}