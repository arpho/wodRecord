import { UserType } from "../models/usersType";
import { RoleModel } from "../modules/user/models/privilegesLevelModel";
import { UserTpeModedl } from "../modules/user/models/UserTypeModel";
export enum registrationStrategy {
  regular = 0,
  twoSteps
}

export const configs = {
  localKempelen:false,
  productionUrl:"https://dev.thinkingadditive.com/v0",
  localUrl: "http://localhost:3003/v0",
  accessLevel: [
    new RoleModel({ key: "Sviluppatore", value: 1 }),
    new RoleModel({ key: "Responsabile", value: 2 }),
    new RoleModel({ key: "Utente standard", value: 3 })
  ],
  showToken:true,
  navigate2dash:false,
  appName: "ThinkingAdditive",
  landingPage:'digitalaid',
  adminField:'isProvider',// getter in the userModel used for admin privilegies
  adminPage:'providers-dashboard',// admin page
  userType: [
    { key: "regular", value: UserType.regular },
    { key: "clerk", value: UserType.clerk }
  ],
  offlineEntityNumber: 0,

  locked: true,

  enablingCodeLength: 5,
  registrationStrategy: registrationStrategy.regular

};
