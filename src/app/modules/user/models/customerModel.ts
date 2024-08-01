
import { FunctionModel } from "src/app/models/functionModel";
import { Serializers } from "../../helpers/serializers";
import { UserModel } from "./userModel";
import { EnabledFunction, loadEnabledFunction } from "./enabledFunction";
import { FunctionsService } from "src/app/services/functions/functions.service";

export class CustomerModel extends UserModel {
    /**
     *
     * @param key: string chiave della funzione da verificare
     * @returns boolean true se la funzione è presente e la data di scadenza è maggiore della data attuale
     */
    hasFunctionEnabled(key: string) {

        const function2Check = this.enabledFunctions?.filter(f => { return f.key == key })[0]
        return function2Check ? new Date(function2Check.endTime).getTime() >= new Date().getTime() : false
    }
    enabledFunctions: EnabledFunction[]
    loadedEnabledFunctions: loadEnabledFunction[]
    constructor(obj?: {}) {
        super(obj)
    }

    /**trasforma enabledFunction from {key:string,endTime:number} nel formato accettato da EnabledFunction.component */
    enabledFunctionAdapter(functionsService: FunctionsService, arg: {}): Promise<{ enabledFunction: FunctionModel, endTime: number }> {
        return new Promise(async (resolve, reject) => {
            const enabledFunction = await functionsService.getItem(arg['key'])
            resolve({ enabledFunction: enabledFunction, endTime: arg['endTime'] })
        })

    }
    /**
     * @description fetch the definition of the enabled functions and set loadedEnabledFunctions
     * @param functionsService :FunctionService
     */
    async fetchEnabledFunctions(functionsService: FunctionsService) {
        if (this.enabledFunctions) {
            this.loadedEnabledFunctions = await Promise.all(this.enabledFunctions.map(arg => { return this.enabledFunctionAdapter(functionsService, arg) }))
        }

    }
    setKey(key: string): CustomerModel {
        this.key = key
        return this
    }

    load(args?: {}) {
        return super.load(args)
        this.enabledFunctions = this.enabledFunctions
    }


    serialize() {
        const out = {
            ...super.serialize(),
            enabledFunctions: this.enabledFunctions
        }
        console.log("serialized customer",out)
        return out
    }

}
