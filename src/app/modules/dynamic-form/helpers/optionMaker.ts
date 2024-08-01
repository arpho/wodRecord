export class  OptionsMaker{
  makesOptionsFromArray(option:string[]){
    return option.map((value,index)=>{
      return {key: value,value: index}
    })
  }
  makesOptionsFromEnum(Enum: any){
    const options = []
    const size = Object.values(Enum).length/2
    Object.values(Enum).slice(0,size).forEach(o=>{options.push(o)})
    return this.makesOptionsFromArray(options)

  }
}