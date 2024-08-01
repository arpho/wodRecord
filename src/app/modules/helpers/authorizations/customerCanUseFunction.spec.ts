import { FunctionModel } from "src/app/models/functionModel"
import { CustomerModel } from "../../user/models/customerModel"
import { Customer } from "functions/lib/models/Customer"
import { CustomerCanUseFunctions } from "./customerCanUseFunction"

describe("customer can use function",()=>{

    it("check whether customer is enabled with locked platform",()=>{
        const minute = 60000
        const hour = 60*minute
        const day= 24*hour

        const customer = new CustomerModel({

            enabledFunctions:[{key:'a',endTime:new Date(new Date().getTime()+day).getTime()}]
        })
            const func = new FunctionModel({key:'a'})
            const funcb = new FunctionModel({key:'b'})
            expect(new CustomerCanUseFunctions().canUse(func,customer,true)).toBeTrue()
            expect( new CustomerCanUseFunctions().canUse(funcb,customer,true)).toBeFalse()
            expect( new CustomerCanUseFunctions().canUse(funcb,customer,true)).toBeFalse()
            //customer with expired Date
            const customerb = new CustomerModel(
                {
                    enabledFunctions:[{key:'a',endTime: new Date("10-26-2023")}]
                }
            )

            expect(new CustomerCanUseFunctions().canUse(func,customerb,true)).toBeFalse()
        })
        it("check customer wwith open platform ",()=>{
            const customer = new CustomerModel({
                enabledFunctions:[{key:'a',endTime:new Date("12-26-2023").getTime()}]
            })
                const func = new FunctionModel({key:'a'})
                const funcb = new FunctionModel({key:'b'})
                expect(new CustomerCanUseFunctions().canUse(func,customer,false)).toBeTrue()
                expect( new CustomerCanUseFunctions().canUse(funcb,customer,false)).toBeTrue()
                expect( new CustomerCanUseFunctions().canUse(funcb,customer,false)).toBeTrue()
                 //customer with expired Date
            const customerb = new CustomerModel(
                {
                    enabledFunctions:[{key:'a',endTime: new Date("10-26-2023")}]
                }
            )

            expect(new CustomerCanUseFunctions().canUse(func,customerb,false)).toBeTrue()

        })

    })