import { configs } from "src/app/configs/configs"
import { CheckRole } from "./checkRole"

describe("checkRole works", () => {
  it("testing role 2", () => {
    const test = new CheckRole(2)// utente responsabile
    const claims = { level: 2 }
    expect(test.canAdd(claims)).toBeTrue()
    claims.level = 1
    
    expect(test.canAdd(claims)).toBeTrue()
    expect(test.canAdd({},false)).toBeTrue()
    expect(test.canAdd({},true)).toBeFalse()
    expect(test.canAdd({ level: 3 },false)).toBeTrue()
    expect(test.canAdd({ level: 3 },true)).toBeFalse()
  })
})