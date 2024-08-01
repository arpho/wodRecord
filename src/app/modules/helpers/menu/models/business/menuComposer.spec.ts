import { MenuItem2BeAdded } from "../menuItem2BeAdded"
import { CheckEnabled } from "./checkers/checkEnabled"
import { CheckRole } from "./checkers/checkRole"
import { menuComposer } from "./menuComposer"

describe("menuComposer works", () => {
  it("composes a menu  with one only rule,  checking only enabled", () => {
    const test = new menuComposer()
    const menuList: MenuItem2BeAdded[] = [
      {
        menuItem: {
          title: 'Algoritmo Genial',
          src: "/assets/icon/icons/genial.svg",
          url: '/magic', icon: 'mail',
          function: () => { }
        },
        orLogic: false,
        canAdd: [new CheckEnabled(),
          /*     {canAdd:new Checkers().checkExpired},
              {canAdd:new Checkers().checkRole(1)} */
        ]
      }
    ]
    const claims = { enabled: true }
    expect(menuComposer.composeMenuByClaims(menuList, claims,false).length).toBe(1)
    expect(menuComposer.composeMenuByClaims(menuList, claims,true).length).toBe(1)


  }

  )
  it("compose a menu with two rules: enabled and level with andLogic", () => {

    const menuList: MenuItem2BeAdded[] = [
      {
        menuItem: {
          title: 'Algoritmo Genial',
          src: "/assets/icon/icons/genial.svg",
          url: '/magic', icon: 'mail',
          function: () => { }
        },
        orLogic: false,
        canAdd: [new CheckEnabled(),
        /*     {canAdd:new Checkers().checkExpired},*/
        new CheckRole(2)
        ]
      }
    ]
    const claims = { enabled: true, level: 1 }
    expect(menuComposer.composeMenuByClaims(menuList, claims,false).length).toBe(1)

  })
  it("compose a menu with two rules: enabled and level with orLogic", () => {

    const menuList: MenuItem2BeAdded[] = [
      {
        menuItem: {
          title: 'Algoritmo Genial',
          src: "/assets/icon/icons/genial.svg",
          url: '/magic', icon: 'mail',
          function: () => { }
        },
        orLogic: false,
        canAdd: [new CheckEnabled(),
        /*     {canAdd:new Checkers().checkExpired},*/
        new CheckRole(2)
        ]
      }
    ]
    const claims4AndLogicOk = { enabled: true, level: 1 }
    expect(menuComposer.composeMenuByClaims(menuList, claims4AndLogicOk,false).length).toBe(1)
    const claims4AndLogicNoOk = { enabled: false, level: 1 }
    expect(menuComposer.composeMenuByClaims(menuList, claims4AndLogicNoOk,false).length).toBe(1)
    menuList[0].orLogic = true
    expect(menuComposer.composeMenuByClaims(menuList, claims4AndLogicNoOk,false).length).toBe(1)

  })

})