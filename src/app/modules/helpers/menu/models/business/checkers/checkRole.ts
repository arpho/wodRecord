import { configs } from "src/app/configs/configs";
import { canAdd } from "../../canAddInterface";

export class CheckRole implements canAdd {
  level: number
  constructor(level: number) {
    this.level = level
  }
  canAdd(claims: { level?: number },locked?:boolean) {
    let out = false
    if(locked){
      out = claims.level<= this.level
    

    }
    else{
      out = true
    }
    return out
  }
}