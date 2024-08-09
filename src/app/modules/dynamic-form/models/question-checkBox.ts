import { CheckBoxProperties } from "./checkBoxProperties";
import { QuestionBase } from "./question-base";

export class CheckBoxQuestion extends QuestionBase<Boolean>{
  override controlType="checkbox"
  constructor(options:CheckBoxProperties){
    super(options)
  }
}