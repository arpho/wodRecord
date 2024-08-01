import { FunctionModel } from "../../../models/functionModel";

export interface EnabledFunction {
    key: string,
    endTime: number,
    EnabledFunction?: FunctionModel
}

export interface loadEnabledFunction {
    enabledFunction: FunctionModel,
    endTime: number
}