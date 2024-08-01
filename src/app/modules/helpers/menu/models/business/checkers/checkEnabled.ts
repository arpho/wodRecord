import { configs } from "src/app/configs/configs";
import { canAdd } from "../../canAddInterface";

export class CheckEnabled implements canAdd {
  canAdd = (claims: Object,locked?:boolean) => locked ? claims['enabled'] ? claims['enabled'] : false : true
  // if not locked always true

}
