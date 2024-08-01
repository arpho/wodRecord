import { FunctionModel } from "src/app/models/functionModel";
import { CustomerModel } from "../../user/models/customerModel";

export class CustomerCanUseFunctions {
    fetchExpiringDate(customer:CustomerModel, func: FunctionModel) {
        const f = customer.enabledFunctions.filter(f => {
            return f.key == func.key
        })
        const d = new Date(customer.enabledFunctions.filter(f => {
            return f.key == func.key
        })[0]?.endTime)
        return d
    }
    canUse(function2Test: FunctionModel, customer: CustomerModel, locked: boolean) {
        if (customer) {
            const functionIsEnabled = customer.enabledFunctions.map(f => { return f.key }).includes(function2Test.key)
            const expiringDate = this.fetchExpiringDate(customer, function2Test)
            const isNotExpired = expiringDate.getTime() > new Date().getTime()
            return !locked || functionIsEnabled && isNotExpired
        }
    }
}