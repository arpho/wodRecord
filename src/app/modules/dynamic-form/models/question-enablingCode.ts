import { AbstractControl, ValidationErrors } from "@angular/forms";
import { QuestionBase } from "./question-base";
import { QuestionProperties } from "./questionproperties";

export interface CodeProperties extends QuestionProperties<string>{
    generatorFunction:()=> Promise<string> // function that generates the code
    validator:(control: AbstractControl)=> ValidationErrors; // validator for the code
}


export class EnablingCodeQuestion extends QuestionBase<string>{
    controlType: string="code"
    constructor(options:CodeProperties){
        super(options)
    }
}