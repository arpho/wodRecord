export class Pr{
    id=0
    unity:'Kg'|'sec'='Kg'
    prestazione=""
    date:Date = new Date
    stringifiedDate = ""


    constructor(arg?:{}){
        this.build( arg );
    }
    build(arg?:{}){
        Object.assign( this, arg );
        if(this.stringifiedDate)
            this.date = new Date(this.stringifiedDate);
        return this
    }

    serialize(){
        return {
            id: this.id,
            unity: this.unity,
            prestazione: this.prestazione,
            stringifiedDate:this.date.toISOString()
        }
    }
    setId (id: number) {
        this.id = id;
        return this
}
}