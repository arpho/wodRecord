import { FunctionModel } from "src/app/models/functionModel"
import { CustomerModel } from "./customerModel"
import {EnabledFunction} from './enabledFunction'

describe("CustomerModel should be instantiated ",()=>{
    var customer:CustomerModel

    beforeEach(async ()=>{
        const arg = {
            firstName:'nome',
        lastName:'cognome',
        email:'email@iol.it',
            birthDate:'1977-03-16',
            dor:'2023-10-15',
            enabledFunctions:[{key:'asd',endTime:123456}]
        }
        /* const mopcker = new  functionServiceMocker(arg.enabledFunctions)
        console.log("@#@ trallallà mocker",mopcker) */
        customer = new CustomerModel(arg)
       // await test.loadEnabledFunction(arg.enabledFunctions,new functionServiceMocker(arg.enabledFunctions))
        // customer =await  new CustomerModel(arg).loadEnabledFunction(arg.enabledFunctions,new functionServiceMocker(arg.enabledFunctions))
    })
   
 
    it("customer is ok ",()=>{
        expect(customer).toBeDefined()

    })
    it("enabledFunction well defined",()=>{
        expect(customer.enabledFunctions.length).toBe(1)
        //expect(customer.enabledFunctions[0]).toBeInstanceOf(EnabledFunction)

        expect(customer.enabledFunctions[0].key).toBe('asd')
    })
})