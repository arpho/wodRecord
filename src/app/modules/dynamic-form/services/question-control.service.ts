import { Injectable }   from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, FormGroup, Validators } from '@angular/forms';

import { QuestionBase } from '../models/question-base';

@Injectable()
export class QuestionControlService {
  constructor(public fb:UntypedFormBuilder) { }

  questionFactory(question:QuestionBase<any>){
    const Question =  new UntypedFormControl(question.value||'');
    if(question.required){
      Question.addValidators(Validators.required)
    }
    if(question.validator){
      Question.addValidators(question.validator)

     
    }
    if(question.asyncValidator){
     Question.addAsyncValidators(question.asyncValidator)
     Question.updateValueAndValidity()
    }
    return Question
  }

  toFormGroup(questions: QuestionBase<any>[] ) {
    const group: any = {};

    questions?.forEach(question => {
      group[question.key] = this.questionFactory(question) // question.required ? new FormControl(question.value || '', Validators.required)
                                              //: new FormControl(question.value||'');
    });
    return this.fb.group(group);
  }
}
