
interface Serializable{
  serialize():{}
}
export class Serializers{

    serialize2String = (v: string) => {
      return   v ? v : ''
    }

    serialize2PositiveNumber = (n: number,defaultNumber=-1) => {
      return  n ? n : defaultNumber
    }
    serialize2Array(v:Array<any>){
      return v?v:[]

    }
    /**
     * @description serializes an array of serializables
     * @param v  :Serializable[]: array of serializables
     * @returns  an array of {} if v is defined an empty array if v is undefined
     */
    SerilizeSerializable( v: Serializable[]){
      return v? v.map(i=>i.serialize()):[]
    }
  
   
    serialize2Boolean(v){
      return Boolean(v)
    }
}