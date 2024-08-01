import { configs } from "src/app/configs/configs";
import { canAdd } from "../../canAddInterface";

export class CheckExpiration implements canAdd {
  canAdd = (claims: { expirationTime?: number },locked?:boolean) => {
    return locked ?
    claims.expirationTime ? claims.expirationTime >= new Date().getTime() : false :
    true}
}