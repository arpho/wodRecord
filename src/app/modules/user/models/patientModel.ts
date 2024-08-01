import { LocationModel } from "src/app/models/locationModel";
import { Serializers } from "../../helpers/serializers";
import { DateModel } from "./birthDateModel";
import { OrderModel } from "./orderModel";
import { UserModel } from "./userModel";
import { Value } from "../../item/models/value";

export class PatientModel extends UserModel {
    getDisplayName() {
  return this.displayName? this.displayName:`${this.lastName} ${this.firstName}`
    }
    height: number
    gender:string
    providerKey:string
    weight: number
    orders: string[]


    constructor(patient?: {}, key?: string) {
        super(patient, key)
    }

    setKey(key: string): PatientModel {
        this.key = key
        return this
    }
    getTitle(): Value {
        return new Value({value:this.makeTitle(),label:"display name"})
    }
    makeTitle(): string | Number | Boolean {
        return !this.displayName?`${this.firstName} ${this.lastName}`:this.displayName
    }
  

    serialize() {
        const serializer = new Serializers()
        return {
            ...super.serialize(),
            height: serializer.serialize2PositiveNumber(this.height),
            weight: serializer.serialize2PositiveNumber(this.weight),
            gender: serializer.serialize2String(this.gender),
            providerKey: serializer.serialize2String(this.providerKey)
            //orders:serializer.SerilizeSerializable(this.orders)
        }
    }


}