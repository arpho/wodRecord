import { canAdd } from "../canAddInterface";
import { MenuItem2BeAdded } from "../menuItem2BeAdded";

export class menuComposer {

  private static evaluateClaims(claims: {}, checkList: canAdd[], orLogic = false,locked:boolean) {
    let out = !orLogic
    if (!orLogic) {
      if(checkList){
      checkList.forEach(check => {
        out = out && check.canAdd(claims)
      })}
      else{
        out = true
      }
    }
    else {
      checkList.forEach(check => {
        out = out || check.canAdd(claims)
      })
    }
    return out
  }
  public static composeMenuByClaims(items: MenuItem2BeAdded[], claims: {},locked:boolean) {
    const menu = []
    items.forEach(item => {
      if (this.evaluateClaims(claims, item.canAdd, item.orLogic,locked)) {
        menu.push(item.menuItem)
      }

    })
    return menu
  }
}