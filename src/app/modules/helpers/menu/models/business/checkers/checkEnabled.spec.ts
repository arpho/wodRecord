import { CheckEnabled } from "./checkEnabled"

describe("checking enabled", () => {
  it("must be true", () => {
    const test = new CheckEnabled()
    const claims = { enabled: true }
    expect(test.canAdd(claims)).toBeTrue()

  })
  it("must be false", () => {
    const test = new CheckEnabled()
    const claims = {}
    expect(test.canAdd(claims,true)).toBeFalse() // locked
    expect(test.canAdd(claims,)).toBeTrue()// open
    expect(test.canAdd({},true)).toBeFalse() // locked
    expect(test.canAdd({},false)).toBeTrue() // open

  })
})