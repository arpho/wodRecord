
import { Serializers } from "../../helpers/serializers"
import { DateModel } from "./birthDateModel"

export class EnablingCode{
    code:string=''
    creationDate: DateModel
    utilizationDate: DateModel
    customerKey:string
    key:string

    load(v?:{}){
        Object.assign(this,v)
        if(v){
        if(v["creationDate"]){
            this.creationDate = new DateModel(new Date(v["creationDate"]))
        }
        else{
            this.creationDate= new DateModel(new Date())
        }
        if(v["utilizationDate"]){
            this.utilizationDate= new DateModel(new Date(v["utilizationDate"]))
        }}
        else{
            this.creationDate = new DateModel(new Date())
        }
        return this
    }

    constructor(v?:{}){
        this.load(v)
    }
    setKey(key:string){
        this.key= key
        return this
    }
    
    serialize(){
        const serializers = new Serializers()
        return {
            code:serializers.serialize2String(this.code),
            customerKey:serializers.serialize2String( this.customerKey),
            creationDate:serializers.serialize2String(this.creationDate.formatDate()),
            utilizationDate:serializers.serialize2String(this.utilizationDate? this.utilizationDate.formatDate():'')

        }
    }
}