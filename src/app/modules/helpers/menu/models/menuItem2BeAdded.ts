import { canAdd } from "./canAddInterface";
import { MenuItem } from "./MenuItemInterface";

export interface MenuItem2BeAdded {
  menuItem: MenuItem,
  canAdd?: canAdd[],
  orLogic: boolean
}