
import { GroupModel } from "src/app/models/groupModel";
import { Serializers } from "../../helpers/serializers";
import { ItemServiceInterface } from "../../item/models/ItemServiceInterface";
import { QuickAction } from "../../item/models/QuickAction";
import { Genere, ItemModelInterface } from "../../item/models/itemModelInterface";
import { Value } from "../../item/models/value";
import { DateModel } from "./birthDateModel";
import { OrderStatus } from "./orderStatus";
import { ProductType } from "./product_type";
import { LocationModel } from "src/app/models/locationModel";
import { PatientModel } from "./patientModel";

export class OrderModel implements ItemModelInterface{
    title: string;
    note: string;
    key: string;
    quickActions?: QuickAction[];
    archived: boolean;
    service?: ItemServiceInterface;
    creationDate:DateModel
    orthotic: number
    file: string
    name:string
    status:OrderStatus
    date_created: DateModel
    date_checked: DateModel
    date_produced:DateModel
    date_shippered:DateModel
    date_order:DateModel
    left_size:number
    right_size:number
    product_type: ProductType
    quantity:number
    foam:string
    rightScanFileId:string
    rightScanFile:string
    leftScanFileId:string
    leftScanFile:string
    asset:string
    namespace:string
    detectedSize:number
    size:number
    lenght:number
    milledOr3DPrinted:string
    groupKey:string
    group:GroupModel
    location:LocationModel
    patient:PatientModel
    locationKey:string
    providerKey: string
    transformation:number[]
    patientKey: string;

    constructor(order?:{}){
        this.build(order)
    }
    getTitle(): Value {
       return new Value({value:this.title,label:'title'
    })
    }
    getCountingText(): { singular: string; plural: string; } {
        return {singular:'ordine',plural:'ordini'}
    }
    getNote(): Value {
        return new Value({value:this.note,label:"nota"})
    }
    build?(item: {}) {
        Object.assign(this,item)
         // inizializza creation date alla data presente sul db se presente, al momemto di crazione in caso contrario
        this.archived= Boolean(this.archived)
        this.status=this.status?Number(this.status) : 0
        this.date_checked = new DateModel(this.date_checked)
        this.date_created = new DateModel(this.date_created)
        this.date_order = new DateModel(this.date_order)
        this.date_produced = new DateModel(this.date_produced)
        this.date_shippered = new DateModel(this.date_shippered)
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
        return true
    }
    setKey?(key: string): OrderModel {
        this.key= key
        return this
    }
    getEditPopup(item?: ItemModelInterface, service?: ItemServiceInterface) {
        throw new Error("Method not implemented.");
    }
    initialize(item: {}): ItemModelInterface {
        return this.build(item)
    }
    getAggregate(): Value {
        throw new Error("Method not implemented.");
    }

    hasQuickActions?(): boolean {
        return false
    }
    serialize() {
      const serializer = new Serializers()
      const out = {

        key:serializer.serialize2String(this.key),
        product_type:serializer.serialize2PositiveNumber(this.product_type),
        quantity:serializer.serialize2PositiveNumber(this.quantity),
        length:serializer.serialize2PositiveNumber(this.lenght),
        asset:serializer.serialize2String(this.asset),
        left_size:serializer.serialize2PositiveNumber(this.left_size),
        right_size: serializer.serialize2PositiveNumber(this.right_size),
        transformation:serializer.serialize2Array(this.transformation),
        archived:serializer.serialize2Boolean(this.archived),
        foam:serializer.serialize2String(this.foam),
        note:serializer.serialize2String(this.note),
        namespace:serializer.serialize2String(this.namespace),
        detectedSize: serializer.serialize2PositiveNumber(this.detectedSize),
        title:serializer.serialize2String(this.title),
        rightScanFileId:serializer.serialize2String(this.rightScanFileId),
        leftScanFileId:serializer.serialize2String(this.leftScanFileId),
        rightScanFile:serializer.serialize2String(this.rightScanFile),
        leftScanFile:serializer.serialize2String(this.leftScanFile),
        providerKey:serializer.serialize2String(this.providerKey),
        locationKey:this.location? serializer.serialize2String(this.location.key):serializer.serialize2String(this.locationKey),
        groupKey:this.group?this.group.key:serializer.serialize2String(this.groupKey),
        status:serializer.serialize2PositiveNumber(this.status,0),
        patientKey:this.patient? this.patient.key: serializer.serialize2String(this.patientKey),
        milledOr3DPrinted:serializer.serialize2String(this.milledOr3DPrinted)
      }
      if(this.date_checked)
        out['date_checked']=this.date_checked.formatFullDate()
      if(this.date_created)
        out['date_created']= this.date_created.formatFullDate()
      if(this.date_order)
        out['date_order'] = this.date_order.formatFullDate()
      if(this.date_produced)
        out['date_produced'] =this.date_produced.formatFullDate()
      if(this.date_shippered)
        out['date_shippered'] = this.date_shippered.formatFullDate()

        return  this.key? {key:this.key,...out}:out
    }
    getElement(): { element: string; genere: Genere; } {
       return {element:'ordine',genere:'o'}
    }
}