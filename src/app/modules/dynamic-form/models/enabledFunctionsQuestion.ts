import { QuestionBase } from "./question-base";
import { QuestionProperties } from "./questionproperties";

export class EnabledFunctionsQuestion extends QuestionBase<string> {
  controlType = "enabledFunctions"
  constructor(options: QuestionProperties<string>) {
    super(options)
  }
}