import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ɵConsole,
  OnChanges,
  SimpleChanges,
  forwardRef
} from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, NG_VALUE_ACCESSOR, ControlValueAccessor, UntypedFormBuilder } from '@angular/forms';

import { QuestionBase } from '../../models/question-base';

@Component({
  selector: 'app-question',
  templateUrl: './question-form-component.html',
  styleUrls:['./question-form-component.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  
})
export class QuestionFormComponent implements OnInit, OnChanges {
/**
 * 
 * @param value valore da convertire in booleano puro
 * @returns  Boolean
 */
convert2boolean(value:boolean|undefined){
  return  Boolean(value)
}

convert2string(value:string|undefined){
  return value?value:""
}

  constructor(private fb: UntypedFormBuilder) { }

  writeValue(obj: any): void {
    throw new Error('Method not implemented.');
  }
  setDisabledState?(isDisabled: boolean): void {
    throw new Error('Method not implemented.');
  }
  public value: any;
  @Input() question: QuestionBase<any>;
  @Input() form: UntypedFormGroup;
  /**
   * @description converts the type of question.key from string|undefined to string|null  
   * @param key 
   * @returns 
   */
  converterUndefined2null(key:string|undefined){
    return key? key: null
  }

  ngOnInit() {
    this.value = this.question ? this.question.value : undefined;
    this.form = this.form
      ? this.form
      : this.fb.group({
        // I need an instance of formgroup for run the tests
        name: new UntypedFormControl(this.question?.key),
        value: new UntypedFormControl(this.question?.value)
      });
  }

  ngOnChanges(changes: SimpleChanges) {
  }
  get isValid() {
    return this.question ? this.form.controls[this.question.key]?.valid : false;
  }
  get getValue() {
    return this.question.key ? this.form.get(this.question.key)?.value : '';
  }

  getIcon() {
    return this.form.get(this.question.key)?.value ? String(this.question.iconTrue) : String(this.question.iconFalse)
  }
}
