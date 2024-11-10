import { Attivita } from "./attivita"

export class UserModel{
birthDate=""
email= ""
firstName=""
lastName=""
key=""
prList:Attivita[]=[]

constructor(arg?:{}){
    this.build( arg );
}
    build(arg: {} | undefined) {
      Object.assign(this,arg)
    this.prList = this.prList.map(pr => new Attivita(pr));
      return this
    }
    setKey(key: string) {
            this.key = key;
        return this;
        }
}

