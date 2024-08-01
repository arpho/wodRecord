import { ItemModelInterface } from "../../item/models/itemModelInterface";
import { listProperties } from "../../item/models/listProperties";
import { QuestionBase } from "./question-base";

export class  ListQuestion extends QuestionBase<ItemModelInterface>{
    controlType="listField"

    constructor(options:listProperties){
        super(options)
        console.log("itemUpdatedMessage **",options['itemUpdatedMessage'])
    }
}