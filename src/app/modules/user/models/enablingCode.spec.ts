import { DateModel } from "./birthDateModel"
import { EnablingCode } from "./enablingCode"

describe("enablingCode model should work",()=>{

    it("testing with no data",()=>{
        const test = new EnablingCode()

        expect(test.code).toBe('')
        expect(test.creationDate).toBeDefined()
        expect(test.utilizationDate).toBeUndefined()
        expect(test.serialize().code).toBe('')
        expect(test.serialize().customerKey).toBe('')
        expect(test.serialize().creationDate).toBe(new DateModel(new Date()).formatDate())
    })
     it("testing with  data",()=>{
        const dataTest = {
            code:"qwerty",
            customerKey:"asdfgh",
            creationDate:"2022-08-23",
            utilizationDate:"2022-08-24"
        }
        const test = new EnablingCode(dataTest)
        expect(test.code).toBe(dataTest.code)
        expect(test.creationDate.formatDate()).toBe(dataTest.creationDate)
        expect(test.utilizationDate.formatDate()).toBe(dataTest.utilizationDate)
        expect(test.customerKey).toBe(dataTest.customerKey)
        expect(test.serialize().code).toBe(dataTest.code)
        expect(test.serialize().customerKey).toBe(dataTest.customerKey)
        expect(test.serialize().creationDate).toBe(new DateModel(new Date(dataTest.creationDate)).formatDate())
        expect(test.serialize().utilizationDate).toBe(dataTest.utilizationDate)
    })
})