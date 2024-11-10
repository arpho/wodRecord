import { Pr } from "./Pr"

export class Attivita{
    descrizione=""
    girl= false
    hero= false
    key=""
    typePr:"benchmark"| "training"| "rest"="benchmark"
    unity:'Kg'|'sec'='Kg'
    prList:Pr[]=[]

    constructor(arg?:{}){
        this.build( arg );
    }
    build(arg: {} | undefined) {
        Object.assign( this, arg );
        this.prList = this.prList.map(pr => new Pr(pr));
        return this
    }
    setKey(key: string) { 
        this.key = key; 
    return this;
    }
}